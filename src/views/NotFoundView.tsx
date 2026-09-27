import React from 'react';
import { PageView } from '../types';
import { AlertTriangle, Home, Wrench, Phone, ArrowLeft } from 'lucide-react';
import { COMPANY_INFO } from '../data/servicesData';

interface NotFoundViewProps {
  onNavigate: (page: PageView) => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Diagnostic Icon */}
        <div className="w-20 h-20 rounded-3xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto text-amber-400">
          <AlertTriangle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest block">
            Code Erreur : 404_PAGE_NOT_FOUND
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
            Calculateur introuvable
          </h1>
          <p className="text-sm text-neutral-400 leading-relaxed">
            La page que vous tentez de rejoindre n'existe pas ou a été déplacée. Notre système de diagnostic vous oriente vers les sections principales :
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Page d'accueil</span>
          </button>

          <button
            onClick={() => {
              onNavigate('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs border border-neutral-700 transition-colors cursor-pointer"
          >
            <Wrench className="w-4 h-4 text-amber-400" />
            <span>Formules de diagnostic</span>
          </button>
        </div>

        <div className="pt-6 border-t border-neutral-800/80">
          <p className="text-xs text-neutral-400">
            Besoin d'aide immédiate ? Joignez directement le technicien au{' '}
            <a href={`tel:${COMPANY_INFO.phone}`} className="text-amber-400 font-mono font-bold hover:underline">
              {COMPANY_INFO.phoneFormatted}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
