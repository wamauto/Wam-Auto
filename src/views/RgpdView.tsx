import React from 'react';
import { PageView } from '../types';
import { ShieldCheck, Lock, Mail, ArrowLeft, CheckCircle2, FileText, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/servicesData';

interface RgpdViewProps {
  onNavigate: (page: PageView) => void;
}

export const RgpdView: React.FC<RgpdViewProps> = ({ onNavigate }) => {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Conformité RGPD & CNIL</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Politique de Confidentialité & Protection des Données
          </h1>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Dernière mise à jour : 26 septembre 2026. WAM Auto accorde une importance primordiale à la protection et au respect de votre vie privée.
          </p>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-8 text-neutral-300 text-sm leading-relaxed border-t border-neutral-800 pt-8">
        {/* Section 1 */}
        <section className="space-y-3 p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
          <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs">1</span>
            <span>Responsable du Traitement</span>
          </h2>
          <p>
            Le responsable du traitement des données à caractère personnel collectées sur ce site est :
          </p>
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs space-y-1 font-mono text-neutral-200">
            <div><strong>Entité :</strong> WAM Auto (Entreprise Individuelle)</div>
            <div><strong>Activité :</strong> Diagnostic électronique automobile à domicile</div>
            <div><strong>Zone :</strong> Métropole de Lille & Hauts-de-France (59)</div>
            <div><strong>Email :</strong> <a href={`mailto:${COMPANY_INFO.email}`} className="text-amber-400 underline">{COMPANY_INFO.email}</a></div>
            <div><strong>Téléphone :</strong> <a href={`tel:${COMPANY_INFO.phone}`} className="text-amber-400 underline">{COMPANY_INFO.phoneFormatted}</a></div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
          <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs">2</span>
            <span>Données Personnelles Collectées</span>
          </h2>
          <p>
            Dans le cadre strict de l'estimation, de la prise de rendez-vous et de la réalisation de la prestation de diagnostic automobile, les données suivantes peuvent être collectées :
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2">
            <li className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Nom et prénom</span>
            </li>
            <li className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Numéro de téléphone portable</span>
            </li>
            <li className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Adresse email (optionnelle)</span>
            </li>
            <li className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Ville ou commune d'intervention</span>
            </li>
            <li className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Marque, modèle et motorisation du véhicule</span>
            </li>
            <li className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Plaque d'immatriculation / Numéro VIN (optionnel)</span>
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
          <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs">3</span>
            <span>Finalités et Base Juridique</span>
          </h2>
          <p>
            Vos données sont traitées pour des finalités précises et légitimes :
          </p>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
              <strong className="text-white block mb-0.5">Exécution de mesures précontractuelles et contractuelles (Art. 6.1.b RGPD) :</strong>
              Prise de contact, confirmation d'horaire, déplacement à domicile et exécution du diagnostic électronique.
            </div>
            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
              <strong className="text-white block mb-0.5">Obligations légales et comptables (Art. 6.1.c RGPD) :</strong>
              Tenue de la facturation et justificatifs de trésorerie conformément au droit français.
            </div>
            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
              <strong className="text-white block mb-0.5">Aucune revente commerciale :</strong>
              Vos données ne sont JAMAIS commercialisées, cédées ou transmises à des tiers annonceurs.
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
          <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs">4</span>
            <span>Durée de Conservation des Données</span>
          </h2>
          <p className="text-xs">
            Les données relatives aux demandes de devis et réservations non finalisées sont conservées pendant une durée maximale de <strong>12 mois</strong>. Pour les prestations réalisées, les factures et fiches d'intervention sont archivées pendant la durée légale requise (10 ans selon l'article L. 123-22 du Code de commerce).
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3 p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
          <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs">5</span>
            <span>Vos Droits Informatique & Libertés</span>
          </h2>
          <p className="text-xs">
            Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez des droits suivants :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800"><strong>Droit d'accès :</strong> Obtenir une copie de vos données.</div>
            <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800"><strong>Droit de rectification :</strong> Mettre à jour une information erronée.</div>
            <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800"><strong>Droit à l'effacement :</strong> Demander la suppression de vos coordonnées.</div>
            <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800"><strong>Droit d'opposition :</strong> Vous opposer à tout traitement non nécessaire.</div>
          </div>
          <p className="text-xs pt-2">
            Pour exercer l'un de ces droits, il vous suffit de nous adresser un courriel à <a href={`mailto:${COMPANY_INFO.email}`} className="text-amber-400 underline font-semibold">{COMPANY_INFO.email}</a> en joignant un justificatif d'identité si nécessaire. Vous disposez également du droit d'introduire une réclamation auprès de la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-amber-400 underline">www.cnil.fr</a>).
          </p>
        </section>
      </div>

      {/* Bottom Action */}
      <div className="pt-6 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => {
            onNavigate('contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs transition-colors cursor-pointer"
        >
          Formulaire de contact & réservation
        </button>
        <button
          onClick={() => {
            onNavigate('cgu');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-xs text-neutral-400 hover:text-white underline transition-colors cursor-pointer"
        >
          Consulter les Mentions Légales & CGU
        </button>
      </div>
    </div>
  );
};
