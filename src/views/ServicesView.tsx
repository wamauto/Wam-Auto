import React from 'react';
import { PageView, ServiceTierId } from '../types';
import { SERVICES_LIST, COMPANY_INFO } from '../data/servicesData';
import { 
  CheckCircle2, 
  X, 
  Clock, 
  Zap, 
  CalendarCheck, 
  ArrowRight,
  ShieldCheck,
  Search,
  FileText,
  UserCheck
} from 'lucide-react';

interface ServicesViewProps {
  onNavigate: (page: PageView) => void;
  onSelectService: (serviceId: ServiceTierId) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onNavigate, onSelectService }) => {
  const handleBook = (tierId: ServiceTierId) => {
    onSelectService(tierId);
    onNavigate('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const comparisonCriteria = [
    { label: 'Tarif fixe', express: '35€', complet: '50€', premium: '80€' },
    { label: 'Durée moyenne sur site', express: '~20-30 min', complet: '~45-60 min', premium: '~1h15-1h30' },
    { label: 'Lecture des calculateurs moteur & dépollution', express: true, complet: true, premium: true },
    { label: 'Effacement des voyants & défauts fugitifs', express: true, complet: true, premium: true },
    { label: 'Scan 100% de tous les calculateurs (ABS, Airbag, Boîte, Climatisation)', express: false, complet: true, premium: true },
    { label: 'Analyse des paramètres dynamiques en temps réel', express: false, complet: true, premium: true },
    { label: 'Contrôle systèmes spécifiques Hybrides & VE (Batterie BMS)', express: false, complet: true, premium: true },
    { label: 'Détection des codes défauts masqués ou effacés avant vente', express: false, complet: false, premium: true },
    { label: 'Contrôle de cohérence du kilométrage dans les calculateurs', express: false, complet: false, premium: true },
    { label: 'Contrôle physique des points vitaux (freins, pneus, compartiment moteur)', express: false, complet: false, premium: true },
    { label: 'Bilan d’évaluation complet & conseil négociation d’achat', express: false, complet: false, premium: true },
    { label: 'Garantie Satisfait ou Remboursé (non facturé si échec de connexion OBD)', express: true, complet: true, premium: true },
  ];

  const steps = [
    {
      step: '01',
      title: 'Prise de contact en ligne ou appel',
      desc: 'Indiquez la formule souhaitée, la marque de votre véhicule et votre adresse dans les Hauts-de-France. Nous validons un créneau ensemble sous 2h.',
      icon: <CalendarCheck className="w-5 h-5 text-amber-400" />
    },
    {
      step: '02',
      title: 'Arrivée du technicien chez vous',
      desc: 'Nous intervenons directement à votre domicile ou sur votre lieu de travail avec notre matériel professionnel de diagnostic embarqué.',
      icon: <UserCheck className="w-5 h-5 text-amber-400" />
    },
    {
      step: '03',
      title: 'Connexion valise & analyse en direct',
      desc: 'Branchement sur la prise OBD2. Vous suivez en direct sur notre tablette le scan des calculateurs et les paramètres des capteurs.',
      icon: <Search className="w-5 h-5 text-amber-400" />
    },
    {
      step: '04',
      title: 'Compte-rendu & explications claires',
      desc: 'Nous décodons chaque anomalie en langage clair, effaçons les défauts résolus et vous orientons en toute indépendance.',
      icon: <FileText className="w-5 h-5 text-amber-400" />
    }
  ];

  return (
    <div className="space-y-20 md:space-y-28 pb-20 pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 1. Page Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-bold tracking-widest text-amber-400 block">
          Nos Prestations & Tarifs
        </span>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
          Des formules adaptées à chaque situation
        </h1>
        <p className="text-base text-neutral-300">
          Du simple voyant moteur au check-up complet avant d'acheter un véhicule d'occasion, WAM Auto vous garantit une intervention rigoureuse, rapide et sans mauvaise surprise financière.
        </p>
      </section>

      {/* 2. Detailed Service Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SERVICES_LIST.map((service) => (
          <div
            key={service.id}
            className={`rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 ${
              service.popular
                ? 'bg-neutral-900 border-2 border-amber-400 shadow-2xl shadow-amber-500/10 relative scale-102 lg:-translate-y-2'
                : 'bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700'
            }`}
          >
            {service.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-400 text-neutral-950 font-bold text-xs tracking-wide shadow-md">
                Formule Recommandée
              </div>
            )}

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{service.duration}</span>
                  </span>
                  <span className="font-mono text-neutral-400">
                    Formule 0{service.id === 'express' ? '1' : service.id === 'complet' ? '2' : '3'}
                  </span>
                </div>
                <h2 className="font-display font-extrabold text-2xl text-white">
                  {service.name}
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  {service.tagline}
                </p>
              </div>

              <div className="pt-2 pb-4 border-y border-neutral-800 flex items-baseline gap-2">
                <span className="font-display font-extrabold text-4xl text-white tabular-nums">
                  {service.price}€
                </span>
                <span className="text-xs text-neutral-400">
                  / prestation à domicile
                </span>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed bg-neutral-950/60 p-3.5 rounded-xl border border-neutral-800">
                <strong className="text-white block mb-1">Pour qui ?</strong>
                {service.targetAudience}
              </p>

              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block">
                  Détail de la prestation :
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
                onClick={() => handleBook(service.id)}
                className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  service.popular
                    ? 'bg-amber-400 hover:bg-amber-300 text-neutral-950 shadow-md shadow-amber-500/20'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                }`}
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>Choisir cette formule ({service.price}€)</span>
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Guarantee Highlight Banner */}
      <section className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-amber-400/30 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/40">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <h3 className="font-display font-extrabold text-base sm:text-lg text-white">
                  Garantie Satisfait ou Remboursé
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Zéro Risque
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
                Chez WAM Auto, nous nous engageons sur un résultat concret. Si notre valise multimarque professionnelle ne parvient pas à communiquer avec votre véhicule, aucun montant ne vous est réclamé. Vous réservez en toute sérénité.
              </p>
            </div>
          </div>
          <button
            onClick={() => handleBook('complet')}
            className="shrink-0 w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs tracking-wide transition-all shadow-lg shadow-amber-500/10 cursor-pointer text-center"
          >
            Réserver mon diagnostic
          </button>
        </div>
      </section>

      {/* 3. Detailed Side-by-Side Comparison Table */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-400 block">
            Comparateur
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            Tableau comparatif des 3 diagnostics
          </h2>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-neutral-800 bg-neutral-900/60 shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-950/80">
                <th className="p-4 sm:p-5 text-xs font-bold text-neutral-300 w-2/5">
                  Prestation & Points contrôlés
                </th>
                <th className="p-4 sm:p-5 text-xs font-bold text-center text-white w-1/5">
                  <div>Diagnostic Express</div>
                  <div className="font-mono text-amber-400 text-sm mt-0.5">35€</div>
                </th>
                <th className="p-4 sm:p-5 text-xs font-bold text-center text-amber-400 w-1/5 bg-amber-400/5">
                  <div>Diagnostic Complet</div>
                  <div className="font-mono text-amber-400 text-sm mt-0.5">50€</div>
                </th>
                <th className="p-4 sm:p-5 text-xs font-bold text-center text-white w-1/5">
                  <div>Pré-achat Premium</div>
                  <div className="font-mono text-amber-400 text-sm mt-0.5">80€</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80 text-xs">
              {comparisonCriteria.map((item, idx) => (
                <tr key={idx} className="hover:bg-neutral-800/30 transition-colors">
                  <td className="p-4 sm:p-5 text-neutral-300 font-medium">
                    {item.label}
                  </td>
                  
                  {/* Express */}
                  <td className="p-4 sm:p-5 text-center">
                    {typeof item.express === 'string' ? (
                      <span className="font-semibold text-white tabular-nums">{item.express}</span>
                    ) : item.express ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-neutral-600 mx-auto" />
                    )}
                  </td>

                  {/* Complet */}
                  <td className="p-4 sm:p-5 text-center bg-amber-400/5">
                    {typeof item.complet === 'string' ? (
                      <span className="font-bold text-amber-400 tabular-nums">{item.complet}</span>
                    ) : item.complet ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-neutral-600 mx-auto" />
                    )}
                  </td>

                  {/* Premium */}
                  <td className="p-4 sm:p-5 text-center">
                    {typeof item.premium === 'string' ? (
                      <span className="font-semibold text-white tabular-nums">{item.premium}</span>
                    ) : item.premium ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-neutral-600 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Process Walkthrough (How it works) */}
      <section className="space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-400 block">
            Déroulement
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            Comment se déroule votre rendez-vous ?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Un processus simple, rapide et sans immobilisation de véhicule.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div
              key={s.step}
              className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3 relative"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-400">
                  Étape {s.step}
                </span>
                <div className="p-2 rounded-lg bg-neutral-800">
                  {s.icon}
                </div>
              </div>
              <h3 className="font-display font-bold text-base text-white">
                {s.title}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Bottom banner */}
      <section className="text-center max-w-xl mx-auto space-y-6 pt-4">
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
          Prêt à réserver votre diagnostic ?
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400">
          Choisissez la formule qui correspond à votre véhicule et obtenez un créneau rapide dans les Hauts-de-France.
        </p>
        <button
          onClick={() => {
            onNavigate('contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm shadow-lg shadow-amber-500/20 cursor-pointer"
        >
          <CalendarCheck className="w-4 h-4" />
          <span>Accéder au formulaire de contact</span>
        </button>
      </section>
    </div>
  );
};
