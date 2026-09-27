import React, { useState } from 'react';
import { PageView } from '../types';
import { WamAutoLogo } from './WamAutoLogo';
import { COMPANY_INFO } from '../data/servicesData';
import { Phone, Menu, X, CalendarCheck } from 'lucide-react';

interface HeaderProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageView; label: string }[] = [
    { id: 'home', label: 'Accueil' },
    { id: 'about', label: 'À propos' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark & Official Emblem */}
        <div 
          onClick={() => handleNavClick('home')}
          className="cursor-pointer group flex items-center shrink-0"
        >
          <WamAutoLogo size={52} showText={true} />
        </div>

        {/* Zone 2: Navigation Links (Text with clean hover) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-normal text-neutral-300">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`relative py-1 transition-colors hover:text-white cursor-pointer ${
                currentPage === link.id
                  ? 'text-amber-400 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-400'
                  : 'text-neutral-300'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Actions (Phone + Book CTA) */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="flex items-center gap-2 text-xs font-semibold text-neutral-300 hover:text-white transition-colors py-2 px-3 rounded-lg border border-neutral-800 hover:border-neutral-700 bg-neutral-900/60"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="tabular-nums">{COMPANY_INFO.phoneFormatted}</span>
          </a>

          <button
            onClick={() => handleNavClick('contact')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 active:scale-98 transition-all rounded-lg shadow-sm whitespace-nowrap cursor-pointer"
          >
            <CalendarCheck className="w-3.5 h-3.5 text-neutral-950" />
            <span>Prendre RDV</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="p-2 rounded-lg bg-neutral-900 text-amber-400 border border-neutral-800"
            aria-label="Appeler WAM Auto"
          >
            <Phone className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-neutral-900 text-neutral-200 border border-neutral-800 cursor-pointer"
            aria-label="Ouvrir le menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-neutral-950 px-5 pt-3 pb-6 space-y-4">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === link.id
                    ? 'bg-amber-400/10 text-amber-400 font-semibold'
                    : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-neutral-900 flex flex-col gap-2.5">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-semibold text-white"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Appeler {COMPANY_INFO.phoneFormatted}</span>
            </a>
            <button
              onClick={() => handleNavClick('contact')}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-amber-400 hover:bg-amber-300 text-xs font-bold text-neutral-950"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Demander un diagnostic</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
