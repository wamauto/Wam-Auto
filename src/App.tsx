/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageView, ServiceTierId } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { ServicesView } from './views/ServicesView';
import { ContactView } from './views/ContactView';
import { RgpdView } from './views/RgpdView';
import { CguView } from './views/CguView';
import { NotFoundView } from './views/NotFoundView';
import { CookieBanner } from './components/CookieBanner';
import { COMPANY_INFO } from './data/servicesData';
import { trackEvent } from './utils/analytics';
import { Phone, CalendarCheck } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceTierId>('complet');
  const [selectedMotorType, setSelectedMotorType] = useState<'thermique' | 'hybride' | 'electrique'>('thermique');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('09:00');

  useEffect(() => {
    trackEvent('page_view', { page: currentPage });
  }, [currentPage]);

  const handleSelectService = (
    serviceId: ServiceTierId,
    motorType: 'thermique' | 'hybride' | 'electrique' = 'thermique',
    city: string = ''
  ) => {
    setSelectedServiceId(serviceId);
    setSelectedMotorType(motorType);
    if (city) setSelectedCity(city);
  };

  const navigateTo = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070709] text-neutral-100 selection:bg-amber-400 selection:text-neutral-950 font-sans">
      {/* Top Banner Notice */}
      <div className="bg-neutral-900 border-b border-neutral-800 text-[11px] text-neutral-300 py-1.5 px-4 text-center">
        <span className="inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Intervention <strong>7j/7 du Lundi au Dimanche</strong> dans les <strong>Hauts-de-France</strong></span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span className="text-emerald-400 font-semibold">Déplacement OFFERT sur la Métropole Lilloise</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span>RDV rapide au <strong>{COMPANY_INFO.phoneFormatted}</strong></span>
        </span>
      </div>

      {/* Primary Top Navigation adhering to 3-Zone Contract */}
      <Header currentPage={currentPage} onNavigate={navigateTo} />

      {/* Active Page View */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomeView
            onNavigate={navigateTo}
            onSelectService={handleSelectService}
          />
        )}

        {currentPage === 'about' && (
          <AboutView onNavigate={navigateTo} />
        )}

        {currentPage === 'services' && (
          <ServicesView
            onNavigate={navigateTo}
            onSelectService={(sId) => handleSelectService(sId)}
          />
        )}

        {currentPage === 'contact' && (
          <ContactView
            initialServiceId={selectedServiceId}
            initialMotorType={selectedMotorType}
            initialCity={selectedCity}
            initialDate={selectedDate}
            initialTimeSlot={selectedTimeSlot}
          />
        )}

        {currentPage === 'rgpd' && (
          <RgpdView onNavigate={navigateTo} />
        )}

        {currentPage === 'cgu' && (
          <CguView onNavigate={navigateTo} />
        )}

        {currentPage === '404' && (
          <NotFoundView onNavigate={navigateTo} />
        )}
      </main>

      {/* Modern Quiet Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Privacy-Friendly Cookie Consent Banner */}
      <CookieBanner onNavigate={navigateTo} />

      {/* Floating mobile quick CTA bar (Strictly under 15% mobile viewport height) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 p-2.5 flex items-center gap-2 shadow-2xl">
        <a
          href={`tel:${COMPANY_INFO.phone}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-100 text-xs font-semibold active:scale-98 transition-all"
        >
          <Phone className="w-3.5 h-3.5 text-amber-400" />
          <span>Appeler</span>
        </a>
        <button
          onClick={() => navigateTo('contact')}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-400 text-neutral-950 text-xs font-bold active:scale-98 transition-all shadow-md shadow-amber-500/20"
        >
          <CalendarCheck className="w-3.5 h-3.5 text-neutral-950" />
          <span>Prendre RDV</span>
        </button>
      </div>
    </div>
  );
}
