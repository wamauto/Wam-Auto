import React, { useState } from 'react';
import { MotorType, ServiceTierId } from '../types';
import { SERVICES_LIST } from '../data/servicesData';
import { Wrench, Zap, MapPin, ChevronRight, Check } from 'lucide-react';

interface QuickSelectorProps {
  onSelectAndBook: (selection: {
    motorType: 'thermique' | 'hybride' | 'electrique';
    serviceId: ServiceTierId;
    zone: string;
  }) => void;
}

export const QuickSelector: React.FC<QuickSelectorProps> = ({ onSelectAndBook }) => {
  const [motorType, setMotorType] = useState<'thermique' | 'hybride' | 'electrique'>('thermique');
  const [serviceId, setServiceId] = useState<ServiceTierId>('complet');
  const [zone, setZone] = useState<string>('lille');

  const selectedService = SERVICES_LIST.find((s) => s.id === serviceId) || SERVICES_LIST[1];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSelectAndBook({
      motorType,
      serviceId,
      zone: zone === 'lille' ? 'Métropole Lilloise (Déplacement Offert)' : 'Hauts-de-France',
    });
  };

  return (
    <div className="glass-panel-elevated rounded-2xl p-6 sm:p-7 border border-neutral-700/80 shadow-2xl relative overflow-hidden">
      {/* Top subtle golden accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
        <div>
          <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
            <span>Configurer mon intervention</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-400 font-semibold border border-amber-400/30">
              Intervention à domicile
            </span>
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Intervention rapide du lundi au samedi dans les Hauts-de-France
          </p>
        </div>
        <div className="text-right shrink-0">
          <span className="text-xs text-neutral-400 block">Tarif estimé</span>
          <span className="font-display font-extrabold text-2xl text-amber-400 tabular-nums">
            {selectedService.price}€
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {/* Motorisation */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Motorisation</span>
            </label>
            <select
              value={motorType}
              onChange={(e) => setMotorType(e.target.value as any)}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-neutral-100 font-medium focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
            >
              <option value="thermique">Thermique (Essence / Diesel)</option>
              <option value="hybride">Hybride (MHEV / PHEV)</option>
              <option value="electrique">100% Électrique (VE)</option>
            </select>
          </div>

          {/* Formule de diagnostic */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-amber-400" />
              <span>Formule</span>
            </label>
            <select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value as ServiceTierId)}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-neutral-100 font-medium focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
            >
              <option value="express">Diagnostic Express — 35€</option>
              <option value="complet">Diagnostic Complet — 50€ (Recommandé)</option>
              <option value="premium">Diagnostic Premium / Pré-achat — 80€</option>
            </select>
          </div>

          {/* Secteur géographique */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Zone d’intervention</span>
            </label>
            <select
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-neutral-100 font-medium focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
            >
              <option value="lille">Métropole Lilloise (Déplacement OFFERT)</option>
              <option value="nord">Nord & Bassin Minier (0,70 € / km hors MEL)</option>
              <option value="hdf">Autre secteur Hauts-de-France (0,70 € / km hors MEL)</option>
            </select>
          </div>
        </div>

        {/* Selected recap ticker */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs">
          <div className="flex items-center gap-2 text-neutral-300">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong className="text-white">{selectedService.name}</strong> ({selectedService.duration}) · {selectedService.tagline}
            </span>
          </div>
          {zone === 'lille' ? (
            <span className="text-emerald-400 font-semibold shrink-0">
              ✓ Déplacement 100% offert
            </span>
          ) : (
            <span className="text-amber-400 font-semibold shrink-0 font-mono">
              0,70 € par kilomètre (hors MEL)
            </span>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-99 text-neutral-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
        >
          <span>Continuer et choisir mon créneau</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
