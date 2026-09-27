import React, { useState } from 'react';
import { ContactFormData, ServiceTierId } from '../types';
import { SERVICES_LIST, COMPANY_INFO } from '../data/servicesData';
import { SocialLinks } from '../components/SocialLinks';
import { trackEvent } from '../utils/analytics';
import { 
  getHourlySlotsForDate, 
  isFridayDate 
} from '../utils/schedule';
import { 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  Send, 
  CalendarCheck, 
  Clock, 
  AlertCircle,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Lock
} from 'lucide-react';

interface ContactViewProps {
  initialServiceId?: ServiceTierId;
  initialMotorType?: 'thermique' | 'hybride' | 'electrique';
  initialCity?: string;
  initialDate?: string;
  initialTimeSlot?: string;
}

const normalizeTimeSlot = (slot?: string): string => {
  if (!slot || slot === 'matin') return '09:00';
  if (slot === 'apres-midi') return '14:00';
  if (slot === 'soiree') return '19:30';
  return slot;
};

export const ContactView: React.FC<ContactViewProps> = ({
  initialServiceId = 'complet',
  initialMotorType = 'thermique',
  initialCity = '',
  initialDate = '',
  initialTimeSlot = '09:00'
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    phone: '',
    email: '',
    serviceId: initialServiceId,
    motorType: initialMotorType,
    vehicleBrandModel: '',
    vehiclePlateOrVin: '',
    vehicleYear: '',
    vehicleMileage: '',
    cityPostalCode: initialCity,
    preferredDate: initialDate,
    preferredTimeSlot: normalizeTimeSlot(initialTimeSlot),
    symptoms: '',
    message: ''
  });

  const [honeypot, setHoneypot] = useState('');
  const [formMountedAt] = useState(() => Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isSelectedDateFriday = isFridayDate(formData.preferredDate);
  const currentHourlySlots = getHourlySlotsForDate(formData.preferredDate);

  const getTimeSlotLabel = (slot: string, isFriday = false): string => {
    if (!slot) return 'À convenir';
    if (slot.includes(':')) {
      return `${slot} (Heure précise)`;
    }
    if (isFriday) {
      return 'Matinée (08h00 - 12h00)';
    }
    switch (slot) {
      case 'matin':
        return 'Matin (08h00 - 12h00)';
      case 'apres-midi':
        return 'Après-midi (14h00 - 18h00)';
      case 'soiree':
        return 'Soirée (19h30 - 23h30)';
      default:
        return slot;
    }
  };

  const selectedService = SERVICES_LIST.find((s) => s.id === formData.serviceId) || SERVICES_LIST[1];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // 1. Anti-spam: Honeypot check
    if (honeypot.trim() !== '') {
      // Quietly ignore bots without giving hints
      setIsSubmitted(true);
      return;
    }

    // 2. Anti-spam: Form submission speed cooldown (prevent instantaneous automated bots)
    if (Date.now() - formMountedAt < 1200) {
      setErrorMessage('Validation trop rapide. Veuillez patienter une seconde avant de soumettre.');
      return;
    }

    // 3. Validation: Full name
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      setErrorMessage('Veuillez renseigner votre nom complet.');
      return;
    }

    // 4. Validation: Telephone (French format check)
    const phoneClean = formData.phone.replace(/[\s.-]/g, '');
    const phoneRegex = /^(?:(?:\+|00)33|0)[1-9]\d{8}$/;
    if (!phoneRegex.test(phoneClean)) {
      setErrorMessage('Veuillez saisir un numéro de téléphone valide (ex: 06 12 34 56 78 ou 07 ...).');
      return;
    }

    // 5. Validation: Email (Required by FormBold)
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setErrorMessage('Veuillez saisir une adresse email valide (ex: hello@domaine.com).');
      return;
    }

    // 6. Validation: Vehicle brand/model
    if (!formData.vehicleBrandModel.trim()) {
      setErrorMessage('Veuillez préciser la marque et le modèle de votre véhicule.');
      return;
    }

    // 7. Validation: Location
    if (!formData.cityPostalCode.trim()) {
      setErrorMessage('Veuillez indiquer la ville ou le code postal pour l’intervention.');
      return;
    }

    // 8. Validation: Message / Symptoms
    const userMessage = (formData.message || formData.symptoms || '').trim();
    if (!userMessage) {
      setErrorMessage('Veuillez rédiger votre message ou préciser les symptômes constatés.');
      return;
    }

    // 9. Validation: Slot availability check
    if (formData.preferredDate && formData.preferredTimeSlot) {
      const chosenSlot = currentHourlySlots.find(s => s.time === formData.preferredTimeSlot);
      if (chosenSlot && chosenSlot.isTaken) {
        setErrorMessage(`Le créneau de ${formData.preferredTimeSlot} est déjà réservé pour le ${formData.preferredDate}. Veuillez choisir une autre heure disponible.`);
        return;
      }
      if (chosenSlot && chosenSlot.isClosed) {
        setErrorMessage(`Ce créneau n'est pas disponible pour cette date (le vendredi, interventions le matin uniquement).`);
        return;
      }
    }

    setIsSubmitting(true);

    // Track analytics event safely
    trackEvent('booking_submitted', {
      serviceId: formData.serviceId,
      motorType: formData.motorType,
      city: formData.cityPostalCode
    });

    try {
      // Dispatch payload to FormBold: https://formbold.com/s/oeYw5
      const formPayload = new FormData();
      formPayload.append('email', formData.email.trim());
      formPayload.append('message', userMessage);
      formPayload.append('name', formData.fullName.trim());
      formPayload.append('fullName', formData.fullName.trim());
      formPayload.append('phone', formData.phone.trim());
      formPayload.append('service', `${selectedService.name} (${selectedService.price}€)`);
      formPayload.append('motorType', formData.motorType);
      formPayload.append('vehicle', `${formData.vehicleBrandModel} ${formData.vehicleYear ? `(${formData.vehicleYear})` : ''} ${formData.vehiclePlateOrVin ? `[${formData.vehiclePlateOrVin}]` : ''}`.trim());
      formPayload.append('mileage', formData.vehicleMileage || 'Non spécifié');
      formPayload.append('cityPostalCode', formData.cityPostalCode.trim());
      formPayload.append('preferredDate', formData.preferredDate || 'Dès que possible');
      formPayload.append('preferredTimeSlot', getTimeSlotLabel(formData.preferredTimeSlot, isSelectedDateFriday));

      await fetch('https://formbold.com/s/oeYw5', {
        method: 'POST',
        body: formPayload,
        headers: {
          Accept: 'application/json'
        }
      });
    } catch (err) {
      console.warn('FormBold submission dispatch:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="pb-24 pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-amber-400 block">
          Formulaire de Contact & Réservation
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
          Demande d'intervention à domicile
        </h1>
        <p className="text-sm text-neutral-300">
          Complétez le formulaire ci-dessous pour convenir d’un créneau. Le technicien WAM Auto vous répond ou vous rappelle sous 2 heures.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Contact Form */}
        <div className="lg:col-span-8">
          {isSubmitted ? (
            /* Success confirmation state */
            <div className="rounded-3xl border border-emerald-500/40 bg-neutral-900/90 p-8 sm:p-10 shadow-2xl text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-extrabold text-2xl text-white">
                  Demande bien reçue !
                </h3>
                <p className="text-sm text-neutral-300 max-w-md mx-auto">
                  Merci <strong className="text-white">{formData.fullName}</strong>. Votre demande pour la formule <strong className="text-amber-400">{selectedService.name} ({selectedService.price}€)</strong> à <strong className="text-white">{formData.cityPostalCode}</strong> a bien été enregistrée.
                </p>
              </div>

              {/* Summary box */}
              <div className="text-left p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800 text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-400">Véhicule :</span>
                  <span className="text-white font-semibold">{formData.vehicleBrandModel || 'Non spécifié'} {formData.vehicleYear ? `(${formData.vehicleYear})` : ''}</span>
                </div>
                {formData.vehiclePlateOrVin && (
                  <div className="flex justify-between border-b border-neutral-800 pb-2">
                    <span className="text-neutral-400">Plaque / VIN :</span>
                    <span className="text-amber-400 font-mono font-semibold uppercase">{formData.vehiclePlateOrVin}</span>
                  </div>
                )}
                {formData.vehicleMileage && (
                  <div className="flex justify-between border-b border-neutral-800 pb-2">
                    <span className="text-neutral-400">Kilométrage :</span>
                    <span className="text-white font-semibold">{formData.vehicleMileage}</span>
                  </div>
                )}
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-400">Motorisation :</span>
                  <span className="text-white font-semibold capitalize">{formData.motorType}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-400">Téléphone de contact :</span>
                  <span className="text-amber-400 font-mono font-semibold">{formData.phone}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-neutral-400">Créneau souhaité :</span>
                  <span className="text-white font-semibold">{formData.preferredDate || 'Dès que possible'} — {getTimeSlotLabel(formData.preferredTimeSlot, isSelectedDateFriday)}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/30 text-xs text-amber-300 max-w-md mx-auto">
                <p>
                  ⚡ Le technicien vous contactera par téléphone ou SMS au <span className="font-mono font-bold text-white">{formData.phone}</span> pour valider l'heure exacte.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs"
                >
                  <Phone className="w-4 h-4" />
                  <span>Appeler le technicien ({COMPANY_INFO.phoneFormatted})</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-4 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold cursor-pointer"
                >
                  Faire une autre demande
                </button>
              </div>
            </div>
          ) : (
            /* Main Form */
            <form 
              action="https://formbold.com/s/oeYw5" 
              method="POST" 
              onSubmit={handleSubmit} 
              className="rounded-3xl border border-neutral-800 bg-neutral-900/70 p-6 sm:p-10 shadow-xl space-y-8"
            >
              {/* FormBold compatibility hidden fields */}
              <input type="hidden" name="service" value={`${selectedService.name} (${selectedService.price}€)`} />
              <input type="hidden" name="motorType" value={formData.motorType} />
              <input type="hidden" name="preferredDate" value={formData.preferredDate} />
              <input type="hidden" name="preferredTimeSlot" value={formData.preferredTimeSlot} />

              {/* Anti-spam honeypot (invisible to humans) */}
              <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                <label htmlFor="website_url_check">Ne pas remplir</label>
                <input
                  type="text"
                  id="website_url_check"
                  name="website_url_check"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* 1. Formule Selection */}
              <div className="space-y-3">
                <label className="text-xs uppercase font-bold tracking-wider text-neutral-300 block">
                  1. Choisissez votre formule de diagnostic
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {SERVICES_LIST.map((service) => {
                    const isSelected = formData.serviceId === service.id;
                    return (
                      <div
                        key={service.id}
                        onClick={() => setFormData({ ...formData, serviceId: service.id })}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-amber-400/10 border-amber-400 shadow-md shadow-amber-500/10'
                            : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-display font-bold text-sm text-white">
                              {service.name}
                            </span>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-amber-400 bg-amber-400' : 'border-neutral-600'
                            }`}>
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-neutral-950" />}
                            </div>
                          </div>
                          <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2">
                            {service.tagline}
                          </p>
                        </div>
                        <div className="mt-3 pt-2 border-t border-neutral-800 flex items-center justify-between">
                          <span className="font-display font-extrabold text-base text-amber-400 tabular-nums">
                            {service.price}€
                          </span>
                          <span className="text-[10px] text-neutral-400">
                            {service.duration}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. Motorisation & Véhicule */}
              <div className="space-y-4">
                <label className="text-xs uppercase font-bold tracking-wider text-neutral-300 block">
                  2. Informations sur le véhicule
                </label>

                {/* Motor Type Buttons */}
                <div className="space-y-1.5">
                  <span className="text-xs text-neutral-400 block">Type de motorisation :</span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'thermique', label: 'Thermique (Essence/Diesel)' },
                      { id: 'hybride', label: 'Hybride' },
                      { id: 'electrique', label: '100% Électrique' },
                    ].map((type) => (
                      <button
                        type="button"
                        key={type.id}
                        onClick={() => setFormData({ ...formData, motorType: type.id as any })}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          formData.motorType === type.id
                            ? 'bg-amber-400 text-neutral-950 border-amber-400'
                            : 'bg-neutral-950/60 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-neutral-300">Marque & Modèle *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Peugeot 308, Renault Clio, BMW Série 3..."
                      value={formData.vehicleBrandModel}
                      onChange={(e) => setFormData({ ...formData, vehicleBrandModel: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-neutral-300">Plaque d'immatriculation ou VIN</label>
                      <span className="text-[10px] text-neutral-400">Optionnel</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Ex: AA-123-BB ou VF3..."
                      value={formData.vehiclePlateOrVin}
                      onChange={(e) => setFormData({ ...formData, vehiclePlateOrVin: e.target.value.toUpperCase() })}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors uppercase font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-neutral-300">Année de mise en circulation</label>
                    <input
                      type="text"
                      placeholder="Ex: 2018"
                      value={formData.vehicleYear}
                      onChange={(e) => setFormData({ ...formData, vehicleYear: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-neutral-300">Kilométrage</label>
                    <input
                      type="text"
                      placeholder="Ex: 125 000 km"
                      value={formData.vehicleMileage}
                      onChange={(e) => setFormData({ ...formData, vehicleMileage: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="message" className="text-xs text-neutral-300 font-semibold">
                      Your Message / Votre message (symptômes constatés, voyant ou précisions) *
                    </label>
                    <span className="text-[10px] text-amber-400 font-mono">Requis</span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Type your message / Ex: Voyant moteur allumé orange, perte de puissance à l'accélération, voyant airbag suite à un changement de batterie, check-up avant achat d'occasion..."
                    value={formData.message || formData.symptoms}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value, symptoms: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                  />
                </div>
              </div>

              {/* 3. Lieu & Date d'intervention */}
              <div className="space-y-4">
                <label className="text-xs uppercase font-bold tracking-wider text-neutral-300 block">
                  3. Lieu & Date d’intervention souhaitée
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1 space-y-1.5">
                    <label className="text-xs text-neutral-300">Ville ou Code Postal *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: 59000 Lille, Roubaix..."
                      value={formData.cityPostalCode}
                      onChange={(e) => setFormData({ ...formData, cityPostalCode: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-neutral-300">Date souhaitée</label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => {
                        const newDate = e.target.value;
                        const isFri = isFridayDate(newDate);
                        setFormData((prev) => ({
                          ...prev,
                          preferredDate: newDate,
                          preferredTimeSlot: isFri ? 'matin' : prev.preferredTimeSlot
                        }));
                      }}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="preferredTimeSlot" className="text-xs text-neutral-300 font-semibold">
                        Heure de RDV (heure par heure) *
                      </label>
                      {isSelectedDateFriday && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                          Vendredi : 8h - 12h
                        </span>
                      )}
                    </div>
                    <select
                      id="preferredTimeSlot"
                      name="preferredTimeSlot"
                      required
                      value={formData.preferredTimeSlot}
                      onChange={(e) => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
                    >
                      <option value="" disabled>-- Sélectionnez une heure disponible --</option>

                      <optgroup label="🌅 Matinée (08h00 - 12h00)">
                        {currentHourlySlots.filter((s) => s.period === 'matin').map((slot) => (
                          <option 
                            key={slot.time} 
                            value={slot.time}
                            disabled={slot.isTaken}
                          >
                            {slot.time} {slot.isTaken ? '— 🔴 CRÉNEAU PRIS / RÉSERVÉ' : '— 🟢 Disponible'}
                          </option>
                        ))}
                      </optgroup>

                      {!isSelectedDateFriday && (
                        <>
                          <optgroup label="☀️ Après-midi (14h00 - 18h00)">
                            {currentHourlySlots.filter((s) => s.period === 'apres-midi').map((slot) => (
                              <option 
                                key={slot.time} 
                                value={slot.time}
                                disabled={slot.isTaken}
                              >
                                {slot.time} {slot.isTaken ? '— 🔴 CRÉNEAU PRIS / RÉSERVÉ' : '— 🟢 Disponible'}
                              </option>
                            ))}
                          </optgroup>

                          <optgroup label="🌙 Soirée (19h30 - 23h30)">
                            {currentHourlySlots.filter((s) => s.period === 'soiree').map((slot) => (
                              <option 
                                key={slot.time} 
                                value={slot.time}
                                disabled={slot.isTaken}
                              >
                                {slot.time} {slot.isTaken ? '— 🔴 CRÉNEAU PRIS / RÉSERVÉ' : '— 🟢 Disponible'}
                              </option>
                            ))}
                          </optgroup>
                        </>
                      )}
                    </select>

                    {isSelectedDateFriday ? (
                      <p className="text-[11px] text-amber-300 flex items-center gap-1.5 mt-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Le vendredi, les interventions ont lieu uniquement de 8h00 à 12h00.</span>
                      </p>
                    ) : (
                      <p className="text-[11px] text-neutral-400 mt-1">
                        Les créneaux déjà réservés sont indiqués en rouge (désactivés).
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* 4. Coordonnées de contact */}
              <div className="space-y-4">
                <label className="text-xs uppercase font-bold tracking-wider text-neutral-300 block">
                  4. Vos Coordonnées
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-neutral-300">Nom & Prénom *</label>
                    <input
                      type="text"
                      required
                      placeholder="Votre nom complet"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-neutral-300">Numéro de téléphone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="06 .. .. .. .. ou 07 .."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="email" className="text-xs text-neutral-300 font-semibold">
                        Your Email / Votre email *
                      </label>
                      <span className="text-[10px] text-amber-400 font-mono">Requis</span>
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      placeholder="hello@tailgrids.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 space-y-3">
                {/* Guarantee Reassurance Notice */}
                <div className="p-3.5 rounded-2xl bg-amber-400/5 border border-amber-400/30 flex items-center gap-3 text-xs text-neutral-300">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/30">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Garantie Satisfait ou Remboursé</span>
                    <span className="text-[11px] text-neutral-400">Si notre valise professionnelle ne parvient pas à communiquer avec vos calculateurs, vous ne payez rien.</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-neutral-950 font-bold text-sm tracking-wide transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-99"
                >
                  {isSubmitting ? (
                    <span>Envoi en cours via FormBold...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Envoyer ma demande de diagnostic ({selectedService.price}€)</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-neutral-500 text-center mt-3">
                  🔒 Vos données personnelles restent strictement confidentielles. Aucun démarchage commercial.
                </p>
              </div>
            </form>
          )}
        </div>

        {/* Right Column: Direct Info & Socials */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Call Box */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/70 p-6 space-y-5">
            <h3 className="font-display font-extrabold text-lg text-white">
              Une urgence ? Appelez directement
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Pour une panne immédiate ou une intervention urgente dans la journée, joignez directement le technicien WAM Auto :
            </p>

            <a
              href={`tel:${COMPANY_INFO.phone}`}
              onClick={() => trackEvent('phone_call_clicked', { source: 'contact_sidebar' })}
              className="flex items-center justify-between p-4 rounded-2xl bg-neutral-950 border border-amber-400/40 hover:border-amber-400 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">Téléphone direct</span>
                  <span className="font-mono font-bold text-base text-white tabular-nums">{COMPANY_INFO.phoneFormatted}</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href={`https://wa.me/33782993591?text=${encodeURIComponent("Bonjour WAM Auto, je souhaiterais un rendez-vous pour un diagnostic automobile.")}`}
              onClick={() => trackEvent('whatsapp_clicked', { source: 'contact_sidebar' })}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contacter par WhatsApp / SMS</span>
            </a>

            <div className="pt-3 border-t border-neutral-800 flex items-center gap-3 text-xs text-neutral-400">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white truncate">
                {COMPANY_INFO.email}
              </a>
            </div>
          </div>

          {/* Business Hours Card */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/70 p-6 space-y-4">
            <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Horaires d’intervention</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between font-semibold text-neutral-200">
                  <span>Samedi au Jeudi</span>
                  <span className="text-emerald-400 text-[11px] font-medium">3 plages / jour</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-[11px]">
                  <div className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200">
                    08h - 12h
                  </div>
                  <div className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200">
                    14h - 18h
                  </div>
                  <div className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200">
                    19h30 - 23h30
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-400/5 border border-amber-400/25 flex items-center justify-between">
                <div>
                  <span className="font-bold text-amber-300 block">Vendredi</span>
                  <span className="text-[11px] text-neutral-400">Matinée uniquement</span>
                </div>
                <span className="font-mono font-bold text-sm text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/30">
                  08h - 12h
                </span>
              </div>
            </div>
          </div>

          {/* Intervention Zone Details */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/70 p-6 space-y-4">
            <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Secteurs d’intervention</span>
            </h3>

            <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-white">
                <span>Métropole Lilloise</span>
                <span className="text-emerald-400 font-mono text-[11px]">0€ déplacement</span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Lille, Roubaix, Tourcoing, Villeneuve d'Ascq, Marcq, Ronchin, Lambersart, Wattrelos, etc.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-white">
                <span>Nord & Hauts-de-France</span>
                <span className="text-amber-400 font-mono text-[11px]">0,70 € / km</span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Au-delà de la MEL : 0,70 € par kilomètre (Lens, Douai, Valenciennes, Arras, Cambrai, Béthune, Dunkerque...)
              </p>
            </div>
          </div>

          {/* Social Links Cards */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/70 p-6 space-y-3">
            <h3 className="font-display font-bold text-base text-white">
              Suivez WAM Auto en vidéo
            </h3>
            <p className="text-xs text-neutral-400">
              Découvrez nos diagnostics réels, effacements de voyants et explications mécaniques sur nos réseaux :
            </p>
            <div className="pt-1">
              <SocialLinks variant="cards" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
