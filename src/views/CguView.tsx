import React from 'react';
import { PageView } from '../types';
import { Scale, ArrowLeft, ShieldCheck, FileCheck, Phone, Mail } from 'lucide-react';
import { COMPANY_INFO } from '../data/servicesData';

interface CguViewProps {
  onNavigate: (page: PageView) => void;
}

export const CguView: React.FC<CguViewProps> = ({ onNavigate }) => {
  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      {/* Top Breadcrumb / Return */}
      <div>
        <button
          onClick={() => {
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-amber-400 transition-colors cursor-pointer mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à l'accueil</span>
        </button>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
            <Scale className="w-3.5 h-3.5" />
            <span>Informations Légales & Contractuelles</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Mentions Légales & Conditions Générales d'Utilisation
          </h1>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Dernière mise à jour : 26 septembre 2026. Conditions régissant l'utilisation du site et les prestations de diagnostic automobile WAM Auto.
          </p>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-8 text-neutral-300 text-sm leading-relaxed border-t border-neutral-800 pt-8">
        {/* Section 1: Mentions légales */}
        <section className="space-y-3 p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
          <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs">1</span>
            <span>Mentions Légales</span>
          </h2>
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs space-y-1.5 font-mono text-neutral-200">
            <div><strong>Nom commercial :</strong> WAM Auto</div>
            <div><strong>Forme juridique :</strong> Entreprise Individuelle (Micro-entreprise)</div>
            <div><strong>Activité :</strong> Entretien et diagnostic de véhicules automobiles légers</div>
            <div><strong>Zone d'activité :</strong> Métropole Européenne de Lille & Département du Nord (59)</div>
            <div><strong>Téléphone :</strong> <a href={`tel:${COMPANY_INFO.phone}`} className="text-amber-400 underline">{COMPANY_INFO.phoneFormatted}</a></div>
            <div><strong>Email de contact :</strong> <a href={`mailto:${COMPANY_INFO.email}`} className="text-amber-400 underline">{COMPANY_INFO.email}</a></div>
            <div><strong>Statut TVA :</strong> TVA non applicable, article 293 B du Code Général des Impôts (CGI)</div>
          </div>
        </section>

        {/* Section 2: Objet des prestations */}
        <section className="space-y-3 p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
          <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs">2</span>
            <span>Objet des Prestations & Tarifs</span>
          </h2>
          <p>
            WAM Auto propose des prestations de diagnostic électronique automobile à domicile ou sur le lieu de stationnement du client (véhicules thermiques, hybrides et 100% électriques) :
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li><strong>Diagnostic Express (35€) :</strong> Lecture des calculateurs principaux, identification du voyant d'alerte et effacement des défauts fugitifs.</li>
            <li><strong>Diagnostic Complet (50€) :</strong> Scan intégral multi-calculateurs (moteur, ABS, airbags, habitacle), analyse des flux de données en direct.</li>
            <li><strong>Diagnostic Premium & Avant-Achat (80€) :</strong> Analyse approfondie, cohérence kilométrique, détection de défauts masqués et inspection visuelle vitale.</li>
          </ul>
          <p className="text-xs pt-1">
            Les prix sont fermes et transparents, exprimés en Euros nets. Le déplacement est offert sur l'ensemble de la Métropole Européenne de Lille. Au-delà du périmètre de la MEL, les frais de déplacement kilométriques sont de 0,70 € par kilomètre.
          </p>
        </section>

        {/* Section 3: Garantie Satisfait ou Remboursé */}
        <section className="space-y-3 p-6 rounded-2xl bg-amber-400/5 border border-amber-400/30">
          <h2 className="font-display font-bold text-lg text-amber-400 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span>Garantie Satisfait ou Remboursé</span>
          </h2>
          <p className="text-xs leading-relaxed text-neutral-300">
            WAM Auto s'engage sur une obligation de communication technique. Si le matériel de diagnostic professionnel ne parvient pas à établir la liaison de communication électronique avec les calculateurs du véhicule présenté (hors dysfonctionnement électrique majeur de la prise OBD du véhicule imputable à un tiers), <strong>l'intervention ne vous est pas facturée</strong>.
          </p>
        </section>

        {/* Section 4: Obligations du client et Responsabilité */}
        <section className="space-y-3 p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
          <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs">4</span>
            <span>Responsabilités & Engagements</span>
          </h2>
          <p className="text-xs">
            Le client certifie être le propriétaire légitime du véhicule confié ou disposer d'un mandat exprès. Le diagnostic électronique consiste en une prestation d'analyse, de conseil et d'orientation technique pour identifier la cause probable d'un dysfonctionnement. WAM Auto ne réalise pas de réparations mécaniques lourdes sans accord préalable et n'assume pas la responsabilité d'une avarie mécanique préexistante.
          </p>
        </section>

        {/* Section 5: Propriété intellectuelle */}
        <section className="space-y-3 p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
          <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs">5</span>
            <span>Propriété Intellectuelle & Droit Applicable</span>
          </h2>
          <p className="text-xs">
            L'ensemble des marques, textes, photos, infographies et logos présents sur ce site sont la propriété exclusive de WAM Auto. Toute reproduction sans accord écrit préalable est interdite. Les présentes conditions sont soumises au droit français. En cas de contestation, une solution amiable sera privilégiée avant toute action devant les juridictions compétentes du ressort de Lille.
          </p>
        </section>
      </div>

      {/* Bottom Action */}
      <div className="pt-6 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => {
            onNavigate('services');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs transition-colors cursor-pointer"
        >
          Voir les prestations & tarifs
        </button>
        <button
          onClick={() => {
            onNavigate('rgpd');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-xs text-neutral-400 hover:text-white underline transition-colors cursor-pointer"
        >
          Consulter la Politique de Confidentialité (RGPD)
        </button>
      </div>
    </div>
  );
};
