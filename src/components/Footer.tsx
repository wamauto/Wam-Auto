import React from 'react';
import { PageView } from '../types';
import { WamAutoLogo } from './WamAutoLogo';
import { SocialLinks } from './SocialLinks';
import { COMPANY_INFO } from '../data/servicesData';
import { Phone, Mail, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800/80 pt-16 pb-12 text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-neutral-800/60">
          {/* Col 1: Brand & Presentation */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => onNavigate('home')}
              className="cursor-pointer inline-block"
            >
              <WamAutoLogo size={48} showText={true} />
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              Entreprise individuelle de diagnostic électronique automobile à domicile dans le Nord et toute la région Hauts-de-France. Intervention rapide sur véhicules thermiques, hybrides et 100% électriques.
            </p>
            <div className="pt-1">
              <span className="text-xs uppercase tracking-wider font-semibold text-neutral-300 block mb-2">
                Suivez-nous sur les réseaux
              </span>
              <SocialLinks variant="minimal" />
            </div>
          </div>

          {/* Col 2: Navigation rapide */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-neutral-200">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Formules & Tarifs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  À propos du technicien
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Contact & Réservation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('cgu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 transition-colors text-left text-xs text-neutral-400"
                >
                  Mentions Légales & CGU
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('rgpd'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 transition-colors text-left text-xs text-neutral-400"
                >
                  Politique de Confidentialité (RGPD)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Tarifs & Prestations */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-neutral-200">
              Formules Claires
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center justify-between pr-4">
                <span>Diagnostic Express</span>
                <span className="font-mono font-semibold text-amber-400">35€</span>
              </li>
              <li className="flex items-center justify-between pr-4">
                <span>Diagnostic Complet</span>
                <span className="font-mono font-semibold text-amber-400">50€</span>
              </li>
              <li className="flex items-center justify-between pr-4">
                <span>Diagnostic Premium</span>
                <span className="font-mono font-semibold text-amber-400">80€</span>
              </li>
              <li className="pt-2 text-xs text-neutral-300">
                <span className="text-emerald-400 font-medium">Déplacement offert</span> sur la métropole lilloise
              </li>
            </ul>
          </div>

          {/* Col 4: Contact direct */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-neutral-200">
              Coordonnées
            </h4>
            <div className="space-y-2.5 text-sm">
              <a 
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors group"
              >
                <div className="w-7 h-7 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400 shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span className="tabular-nums font-mono text-neutral-200">{COMPANY_INFO.phoneFormatted}</span>
              </a>

              <a 
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors group"
              >
                <div className="w-7 h-7 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400 shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="text-neutral-200 text-xs truncate">{COMPANY_INFO.email}</span>
              </a>

              <div className="flex items-start gap-2.5 pt-1">
                <div className="w-7 h-7 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs text-neutral-400">
                  <span className="text-neutral-200 font-medium block">Intervention à domicile</span>
                  Métropole Lilloise & Hauts-de-France (Nord 59)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} WAM Auto. Tous droits réservés.</span>
            <span aria-hidden="true">·</span>
            <span>Micro-entreprise</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-neutral-300">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Garantie Satisfait ou Remboursé</span>
            </span>
            <span aria-hidden="true" className="text-neutral-700 hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Technicien qualifié & valise multimarque pro</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
