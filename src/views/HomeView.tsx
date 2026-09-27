import React, { useState } from 'react';
import { PageView, ServiceTierId } from '../types';
import { QuickSelector } from '../components/QuickSelector';
import { SocialLinks } from '../components/SocialLinks';
import { SERVICES_LIST, ADVANTAGES, COVERAGE_ZONES, TESTIMONIALS, FAQ_ITEMS, COMPANY_INFO } from '../data/servicesData';
import { 
  CheckCircle2, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  ChevronDown, 
  CalendarCheck,
  Star,
  Clock,
  Sparkles,
  Search
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (page: PageView) => void;
  onSelectService: (serviceId: ServiceTierId, motorType?: 'thermique' | 'hybride' | 'electrique', city?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onSelectService }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleQuickSelect = (selection: {
    motorType: 'thermique' | 'hybride' | 'electrique';
    serviceId: ServiceTierId;
    zone: string;
  }) => {
    onSelectService(selection.serviceId, selection.motorType, selection.zone);
    onNavigate('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCardBook = (tierId: ServiceTierId) => {
    onSelectService(tierId);
    onNavigate('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-24 md:space-y-32 pb-20">
      {/* ========================================================= */}
      {/* 1. HERO SECTION (Inspired by luxury automotive reference) */}
      {/* ========================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-4 md:pt-8">
        <div className="max-w-7xl mx-auto">
          {/* Framed luxury floating hero card container */}
          <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl min-h-[640px] flex flex-col justify-between">
            {/* Background vehicle image with contrast scrims */}
            <div className="absolute inset-0 z-0">
              <img
                src="/src/assets/images/hero_automotive_diag_1790425202994.jpg"
                alt="Diagnostic automobile électronique à domicile WAM Auto sur véhicule moderne dans le Nord"
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter brightness-65 contrast-105"
              />
              {/* Radial and gradient overlays to match reference dark aesthetics */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/60 to-transparent" />
            </div>

            {/* Top Bar pill inside hero */}
            <div className="relative z-10 p-6 sm:p-10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Intervention à domicile & sur lieu de travail</span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span className="text-amber-400 font-bold">Hauts-de-France (Nord 59)</span>
              </div>

              <div className="hidden sm:flex items-center gap-3 text-xs text-neutral-300">
                <span className="text-emerald-400 font-medium">Déplacement 0€ Métropole Lilloise</span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span>Dès 35€</span>
              </div>
            </div>

            {/* Main Hero Content & Split with Quick Selector */}
            <div className="relative z-10 px-6 sm:px-10 pb-10 pt-4 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
              {/* Left Column: Headline and Value Proposition */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-3">
                  <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08] text-balance">
                    Diagnostic Auto <br />
                    <span className="text-gold-gradient">à Domicile</span>
                  </h1>
                  <p className="text-base sm:text-lg text-neutral-300 max-w-xl font-normal leading-relaxed">
                    Spécialiste du diagnostic électronique automobile pour véhicules <strong className="text-white">thermiques, hybrides et 100% électriques</strong>. Plus besoin d'attendre au garage ni de payer un remorquage : nous intervenons directement chez vous.
                  </p>
                </div>

                {/* Direct Actions & Proof Metrics */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => {
                      onNavigate('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-amber-500/20 active:scale-98 cursor-pointer"
                  >
                    <CalendarCheck className="w-4 h-4 text-neutral-950" />
                    <span>Demander un diagnostic</span>
                  </button>

                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-neutral-100 font-semibold text-sm border border-neutral-700/80 backdrop-blur-sm transition-all"
                  >
                    <Phone className="w-4 h-4 text-amber-400" />
                    <span className="tabular-nums">{COMPANY_INFO.phoneFormatted}</span>
                  </a>
                </div>

                {/* Unboxed Metadata Trust Signals */}
                <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-neutral-400">
                  <div className="flex items-center gap-1.5 text-neutral-300">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span className="font-semibold text-white">Garantie Satisfait ou Remboursé</span>
                  </div>
                  <span aria-hidden="true" className="text-neutral-700">·</span>
                  <div className="flex items-center gap-1.5 text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Déplacement offert sur Lille & agglo</span>
                  </div>
                  <span aria-hidden="true" className="text-neutral-700">·</span>
                  <div className="flex items-center gap-1.5 text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Valise pro multimarque de pointe</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Quick Selector Card */}
              <div className="lg:col-span-5 w-full">
                <QuickSelector onSelectAndBook={handleQuickSelect} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. OUR DIFFERENCE SECTION (Directly mirroring reference)  */}
      {/* ========================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text / Advantages */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-400 block">
                Pourquoi choisir WAM Auto
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                Notre différence face aux garages traditionnels
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                Les concessions et garages généralistes imposent souvent des délais de plusieurs semaines, des devis opaques et négligent les spécificités des véhicules électriques. WAM Auto réinvente le diagnostic automobile par la proximité, l’indépendance et la technologie.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {ADVANTAGES.map((adv, idx) => (
                <div
                  key={adv.title}
                  className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700 transition-colors space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-amber-400">
                      0{idx + 1}.
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300">
                      {adv.highlight}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-base text-white">
                    {adv.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {adv.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  onNavigate('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors group cursor-pointer"
              >
                <span>Découvrir l’histoire et les compétences du technicien</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Image Container */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900 group">
              <img
                src="/src/assets/images/valise_diagnostic_tool_1790432794389.jpg"
                alt="Valise de diagnostic électronique automobile multimarque haute précision utilisée par WAM Auto"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-[480px] sm:h-[540px] object-cover object-center transition-transform duration-500 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
              
              {/* Floating diagnostic badge overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl glass-panel-elevated border border-neutral-700/80">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-white">
                        Diagnostic Électronique Haute Précision
                      </h4>
                      <p className="text-xs text-neutral-400">
                        Scan en direct · Interprétation immédiate des calculateurs
                      </p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-block font-mono text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-lg">
                    100% Mobile
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. TRANSPARENT PRICING & SERVICES (The 3 authentic tiers) */}
      {/* ========================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-400 block">
            Tarifs Clairs & Sans Surprise
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Trois formules simples, adaptées à vos besoins
          </h2>
          <p className="text-sm text-neutral-400">
            Tous nos tarifs sont fermes et transparents. Vous savez exactement ce que vous payez avant l’intervention, sans surfacturation imprévue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.id}
              className={`rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 ${
                service.popular
                  ? 'bg-neutral-900 border-2 border-amber-400/80 shadow-2xl shadow-amber-500/10 relative scale-102 lg:-translate-y-2'
                  : 'bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700'
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-400 text-neutral-950 font-bold text-xs tracking-wide shadow-md">
                  Le Plus Demandé
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{service.duration}</span>
                    </span>
                    <span className="font-mono text-neutral-400">Formule 0{service.id === 'express' ? '1' : service.id === 'complet' ? '2' : '3'}</span>
                  </div>
                  <h3 className="font-display font-extrabold text-2xl text-white">
                    {service.name}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 min-h-[32px]">
                    {service.tagline}
                  </p>
                </div>

                <div className="pt-2 pb-4 border-y border-neutral-800 flex items-baseline gap-2">
                  <span className="font-display font-extrabold text-4xl text-white tabular-nums">
                    {service.price}€
                  </span>
                  <span className="text-xs text-neutral-400">
                    / intervention complète
                  </span>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block">
                    Prestations incluses :
                  </span>
                  <ul className="space-y-2.5 text-xs text-neutral-300">
                    {service.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => handleCardBook(service.id)}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    service.popular
                      ? 'bg-amber-400 hover:bg-amber-300 text-neutral-950 shadow-md shadow-amber-500/20'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                  }`}
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>Réserver ({service.price}€)</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-8 p-5 sm:p-6 rounded-3xl bg-neutral-900/80 border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/40">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-display font-extrabold text-sm sm:text-base text-white">
                  Garantie Satisfait ou Remboursé
                </h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Engagement Total
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Si notre équipement de diagnostic professionnel ne parvient pas à établir la communication avec les calculateurs de votre véhicule, l’intervention ne vous est pas facturée.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              onNavigate('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="shrink-0 w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs transition-colors cursor-pointer text-center"
          >
            Prendre rendez-vous en confiance
          </button>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              onNavigate('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Voir le tableau comparatif complet des 3 formules</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. DUAL EXPERTISE SPOTLIGHT: HYBRIDE/EV + PRE-PURCHASE    */}
      {/* ========================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Electric & Hybrid Vehicle Expertise */}
          <div className="rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900/80 flex flex-col justify-between group">
            <div className="h-64 sm:h-72 relative overflow-hidden">
              <img
                src="/src/assets/images/electric_vehicle_only_1790432165771.jpg"
                alt="Diagnostic spécialisé pour véhicules électriques et hybrides haute tension par WAM Auto"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 backdrop-blur-sm">
                  Spécialiste Hybrides & Électriques
                </span>
              </div>
            </div>

            <div className="p-7 space-y-4">
              <h3 className="font-display font-extrabold text-xl text-white">
                Un diagnostic qualifié pour les nouvelles motorisations
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Les véhicules électriques (Tesla, Renault Zoé, Peugeot e-208, Nissan Leaf, etc.) et hybrides (Toyota, Stellantis, BMW, Mercedes) nécessitent un équipement spécifique pour interroger les calculateurs haute tension, le BMS (Battery Management System) et l’onduleur. WAM Auto intervient en toute sécurité sur votre véhicule.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    onSelectService('complet', 'electrique');
                    onNavigate('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <span>Prendre RDV pour un véhicule électrique ou hybride</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Pre-Purchase Inspection (Diagnostic Pré-achat) */}
          <div className="rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900/80 flex flex-col justify-between group">
            <div className="h-64 sm:h-72 relative overflow-hidden">
              <img
                src="/src/assets/images/car_check_headless_1790433537919.jpg"
                alt="Expertise et inspection mécanique pré-achat sous le capot d'une voiture d'occasion à Lille"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 backdrop-blur-sm">
                  Sécurisation Achat Occasion — 80€
                </span>
              </div>
            </div>

            <div className="p-7 space-y-4">
              <h3 className="font-display font-extrabold text-xl text-white">
                Évitez les vices cachés avant d'acheter votre voiture
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Vous avez repéré un véhicule d'occasion chez un particulier ou un revendeur ? Le technicien WAM Auto vous accompagne sur le lieu de vente dans les Hauts-de-France. Nous scannons l'historique complet, vérifions la concordance kilométrique et contrôlons l’ensemble des points vitaux.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    onSelectService('premium');
                    onNavigate('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <span>Réserver un diagnostic pré-achat (80€)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. ZONE D'INTERVENTION (Hauts-de-France & Lille Métropole) */}
      {/* ========================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-400 block">
                Rayonnement Géographique
              </span>
              <h2 className="font-display font-extrabold text-3xl text-white tracking-tight">
                Où intervenons-nous ?
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Basé au cœur de la Métropole Lilloise, WAM Auto dessert l’ensemble du département du Nord et se déplace dans toute la région Hauts-de-France à votre convenance.
              </p>
              <div className="pt-2">
                <div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-200 text-xs leading-relaxed space-y-1">
                  <div className="font-bold text-amber-400 text-sm flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <span>Déplacement OFFERT sur la Métropole Lilloise</span>
                  </div>
                  <p>
                    Lille, Roubaix, Tourcoing, Villeneuve d'Ascq, Marcq-en-Barœul et communes limitrophes. Zéro frais kilométrique supplémentaire !
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {COVERAGE_ZONES.map((zone) => (
                <div
                  key={zone.name}
                  className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                      <MapPin className={`w-4 h-4 ${zone.isFree ? 'text-emerald-400' : 'text-amber-400'}`} />
                      <span>{zone.name}</span>
                    </h3>
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                      zone.isFree
                        ? 'bg-emerald-400/15 text-emerald-400 border border-emerald-400/30'
                        : 'bg-neutral-800 text-neutral-300'
                    }`}>
                      {zone.badge}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {zone.cities}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. VERIFIED TESTIMONIALS (Social Proof)                   */}
      {/* ========================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto space-y-3 mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-400 block">
            Témoignages Réels
          </span>
          <h2 className="font-display font-extrabold text-3xl text-white tracking-tight">
            La satisfaction de nos clients dans le Nord
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Retours d'expérience de conducteurs et acheteurs ayant fait appel à WAM Auto à domicile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-800 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{t.author}</span>
                  <span className="text-neutral-500 font-mono text-[11px]">{t.city}</span>
                </div>
                <div className="text-[11px] text-amber-400 mt-0.5">
                  {t.vehicle} · {t.service}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. FAQ SECTION                                            */}
      {/* ========================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-400 block">
            Questions Fréquentes
          </span>
          <h2 className="font-display font-extrabold text-3xl text-white tracking-tight">
            Tout ce que vous devez savoir avant le rendez-vous
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-neutral-800 bg-neutral-900/50 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-800/40 transition-colors"
                >
                  <span className="font-display font-semibold text-sm sm:text-base text-white">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-400 leading-relaxed border-t border-neutral-800/60 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. BOTTOM CONVERSION CTA BANNER                           */}
      {/* ========================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-amber-950/40 border border-amber-500/30 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl space-y-6 relative z-10">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Prise de contact rapide
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                Un voyant allumé ou un projet d'achat ?
              </h2>
              <p className="text-sm text-neutral-300">
                Remplissez notre formulaire de contact en 1 minute ou appelez directement le technicien pour convenir d'un créneau à votre domicile.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  onNavigate('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Formulaire de contact</span>
              </button>

              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-semibold text-sm border border-neutral-700 transition-all"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span className="tabular-nums">Appeler {COMPANY_INFO.phoneFormatted}</span>
              </a>
            </div>

            {/* Socials integration */}
            <div className="pt-2">
              <span className="text-xs text-neutral-400 block mb-2">
                Retrouvez nos interventions en vidéo sur :
              </span>
              <SocialLinks variant="badges" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
