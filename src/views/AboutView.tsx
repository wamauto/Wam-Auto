import React from 'react';
import { PageView } from '../types';
import { COMPANY_INFO, ADVANTAGES } from '../data/servicesData';
import { WamAutoLogo } from '../components/WamAutoLogo';
import { 
  Wrench, 
  Cpu, 
  ShieldCheck, 
  MapPin, 
  CheckCircle2, 
  Phone, 
  CalendarCheck,
  Zap,
  ArrowRight,
  Eye,
  Award
} from 'lucide-react';

interface AboutViewProps {
  onNavigate: (page: PageView) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-20 md:space-y-28 pb-20 pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 1. Header Banner */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-bold tracking-widest text-amber-400 block">
          À Propos de WAM Auto
        </span>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight leading-tight">
          L’expertise diagnostic automobile directement sur votre pas de porte
        </h1>
        <p className="text-base text-neutral-300 leading-relaxed">
          Fondée par un technicien automobile passionné dans le département du Nord, WAM Auto a été créée pour offrir une alternative moderne, transparente et réactive aux concessions et centres auto traditionnels.
        </p>
      </section>

      {/* 2. Story & Identity Card */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-wider">
              Une Entreprise Individuelle à Votre Écoute
            </span>
            <h2 className="font-display font-extrabold text-3xl text-white">
              Un interlocuteur unique, mécanicien qualifié
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Chez WAM Auto, vous ne parlez pas à un centre d'appels ou à un réceptionnaire pressé : vous échangez directement avec le technicien qui intervient sur votre voiture. Chaque voyant, chaque anomalie moteur ou dysfonctionnement électronique fait l’objet d’une analyse méthodique et rigoureuse.
            </p>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Contrairement à un atelier classique qui cherche souvent à vous facturer des pièces de rechange au prix fort, <strong>WAM Auto est 100% indépendant</strong> : notre seul objectif est d’identifier avec précision l’origine exacte de votre panne, sans aucun conflit d’intérêt.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white text-sm block">Transparence totale et explications claires</strong>
                <p className="text-xs text-neutral-400">
                  Pas de termes incompréhensibles : nous vous montrons l’écran de la valise et vous expliquons concrètement la signification de chaque code défaut (DTC).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white text-sm block">Spécialisation thermique, hybride & électrique</strong>
                <p className="text-xs text-neutral-400">
                  Formé aux systèmes électroniques complexes des moteurs essence et diesel récents, ainsi qu’aux protocoles de sécurité des batteries haute tension et onduleurs.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white text-sm block">Intervention sur site rapide</strong>
                <p className="text-xs text-neutral-400">
                  À votre domicile ou sur votre lieu de travail dans toute la région Hauts-de-France, avec déplacement 100% offert dans la métropole lilloise.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Emblem Card */}
        <div className="lg:col-span-6">
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/80 p-8 sm:p-12 flex flex-col items-center text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="mb-6 w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-400/20 via-amber-500/10 to-transparent border border-amber-400/30 flex items-center justify-center shadow-xl shadow-amber-500/10">
              <Cpu className="w-12 h-12 text-amber-400" />
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="font-display font-black text-3xl tracking-tight text-white">WAM</span>
              <span className="font-display font-black text-3xl tracking-tight text-amber-400">AUTO</span>
            </div>
            <span className="text-xs text-amber-400 font-semibold tracking-wider uppercase mt-1">
              Nord · Hauts-de-France
            </span>

            <div className="mt-6 pt-6 border-t border-neutral-800 grid grid-cols-3 gap-4 w-full">
              <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                <span className="font-display font-extrabold text-xl text-white block">100%</span>
                <span className="text-[11px] text-neutral-400">À Domicile</span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                <span className="font-display font-extrabold text-xl text-amber-400 block">Dès 35€</span>
                <span className="text-[11px] text-neutral-400">Tarif Clair</span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                <span className="font-display font-extrabold text-xl text-emerald-400 block">0€</span>
                <span className="text-[11px] text-neutral-400">Déplacement Lille</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Outillage & Équipements Professionnels */}
      <section className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-8 sm:p-12">
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-10">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-400 block">
            Équipement Professionnel
          </span>
          <h2 className="font-display font-extrabold text-3xl text-white tracking-tight">
            Des outils de pointe pour un diagnostic sans faille
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Pour être efficace, un diagnostic automobile exige un matériel professionnel mis à jour en continu pour dialoguer avec les derniers calculateurs constructeurs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">
              Valises de diagnostic multimarque
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Outils professionnels couvrant plus de 90 marques (françaises, allemandes, japonaises, coréennes, américaines). Lecture précise de tous les bus de communication (CAN, LIN, DoIP, FlexRay).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">
              Électronique Hybride & Électrique
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Matériel d'interrogation spécifique pour mesurer l'état de santé (SoH) des packs de batterie, équilibrage des cellules, convertisseurs DC/DC et moteurs synchrones à aimants permanents.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">
              Contrôle dynamique en temps réel
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Visualisation en direct des paramètres moteur : pression de rampe commune d'injection, saturation du FAP en suie, température des gaz d'échappement, tension de charge alternateur.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CTA to book */}
      <section className="text-center max-w-xl mx-auto space-y-6">
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
          Besoin d'un avis d'expert sur votre véhicule ?
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400">
          Prenez rendez-vous facilement par notre formulaire de contact en ligne ou contactez-nous par téléphone.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => {
              onNavigate('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Prendre rendez-vous</span>
          </button>
          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm border border-neutral-700"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span className="tabular-nums">{COMPANY_INFO.phoneFormatted}</span>
          </a>
        </div>
      </section>
    </div>
  );
};
