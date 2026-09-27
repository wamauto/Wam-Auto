import React, { useState, useEffect } from 'react';
import { getCookieConsent, setCookieConsent, trackEvent } from '../utils/analytics';
import { ShieldCheck, Cookie, X } from 'lucide-react';
import { PageView } from '../types';

interface CookieBannerProps {
  onNavigate: (page: PageView) => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const existingConsent = getCookieConsent();
    if (!existingConsent) {
      // Small timeout for smooth appearance
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setCookieConsent('accepted');
    setIsVisible(false);
    trackEvent('cookie_consent_accepted');
  };

  const handleDecline = () => {
    setCookieConsent('declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Gestion des cookies et confidentialité"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-neutral-900/95 backdrop-blur-md border border-neutral-700/80 rounded-2xl p-5 shadow-2xl text-xs space-y-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Cookie className="w-4 h-4 text-amber-400" />
            <span>Respect de votre vie privée</span>
          </div>
          <button
            onClick={handleDecline}
            aria-label="Fermer le bandeau cookies"
            className="text-neutral-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-neutral-300 leading-relaxed">
          WAM Auto utilise des traceurs strictement nécessaires au bon fonctionnement du site et, avec votre accord, des mesures anonymes de fréquentation pour améliorer nos services de diagnostic. Aucun profil publicitaire n'est créé.
        </p>

        <div className="pt-1 flex flex-wrap items-center gap-2">
          <button
            onClick={handleAccept}
            className="flex-1 py-2 px-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs transition-colors cursor-pointer text-center"
          >
            Accepter tout
          </button>
          <button
            onClick={handleDecline}
            className="py-2 px-3.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-xs border border-neutral-700 transition-colors cursor-pointer"
          >
            Refuser
          </button>
          <button
            onClick={() => {
              onNavigate('rgpd');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="py-2 px-2 text-neutral-400 hover:text-white text-xs underline underline-offset-2 transition-colors cursor-pointer"
          >
            En savoir plus
          </button>
        </div>
      </div>
    </aside>
  );
};
