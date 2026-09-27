export interface HourlySlot {
  time: string; // e.g. '08:00', '14:00', '19:30'
  period: 'matin' | 'apres-midi' | 'soiree';
  periodLabel: string;
  isAvailable: boolean;
  isTaken: boolean;
  isClosed: boolean;
  statusText: string;
}

export const ALL_HOURLY_SLOTS = [
  // Matinée (8h - 12h)
  { time: '08:00', period: 'matin', periodLabel: 'Matinée' },
  { time: '09:00', period: 'matin', periodLabel: 'Matinée' },
  { time: '10:00', period: 'matin', periodLabel: 'Matinée' },
  { time: '11:00', period: 'matin', periodLabel: 'Matinée' },
  // Après-midi (14h - 18h)
  { time: '14:00', period: 'apres-midi', periodLabel: 'Après-midi' },
  { time: '15:00', period: 'apres-midi', periodLabel: 'Après-midi' },
  { time: '16:00', period: 'apres-midi', periodLabel: 'Après-midi' },
  { time: '17:00', period: 'apres-midi', periodLabel: 'Après-midi' },
  // Soirée (19h30 - 23h30)
  { time: '19:30', period: 'soiree', periodLabel: 'Soirée' },
  { time: '20:30', period: 'soiree', periodLabel: 'Soirée' },
  { time: '21:30', period: 'soiree', periodLabel: 'Soirée' },
  { time: '22:30', period: 'soiree', periodLabel: 'Soirée' },
] as const;

/**
 * Checks whether a given YYYY-MM-DD string is a Friday.
 */
export const isFridayDate = (dateStr: string): boolean => {
  if (!dateStr) return false;
  const parts = dateStr.split('-');
  if (parts.length !== 3) return false;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);
  if (!year || !month || !day) return false;
  const d = new Date(year, month - 1, day);
  return d.getDay() === 5;
};

/**
 * Returns deterministic slots status for a given day (YYYY-MM-DD).
 * Marks slots as taken/reserved or available or closed.
 */
export const getHourlySlotsForDate = (dateStr: string): HourlySlot[] => {
  if (!dateStr) {
    return ALL_HOURLY_SLOTS.map((s) => ({
      time: s.time,
      period: s.period as 'matin' | 'apres-midi' | 'soiree',
      periodLabel: s.periodLabel,
      isAvailable: true,
      isTaken: false,
      isClosed: false,
      statusText: 'Disponible'
    }));
  }

  const parts = dateStr.split('-');
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);
  const dateObj = new Date(year, month - 1, day);
  const dayOfWeek = dateObj.getDay(); // 5 = Friday
  const isFri = dayOfWeek === 5;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isPast = dateObj < today;

  return ALL_HOURLY_SLOTS.map((slot, index) => {
    // If date is in the past: all taken/expired
    if (isPast) {
      return {
        time: slot.time,
        period: slot.period as 'matin' | 'apres-midi' | 'soiree',
        periodLabel: slot.periodLabel,
        isAvailable: false,
        isTaken: true,
        isClosed: false,
        statusText: 'Date passée'
      };
    }

    // Friday afternoon & evening: Closed
    if (isFri && slot.period !== 'matin') {
      return {
        time: slot.time,
        period: slot.period as 'matin' | 'apres-midi' | 'soiree',
        periodLabel: slot.periodLabel,
        isAvailable: false,
        isTaken: false,
        isClosed: true,
        statusText: 'Fermé le vendredi'
      };
    }

    // All active slots are completely free and available
    return {
      time: slot.time,
      period: slot.period as 'matin' | 'apres-midi' | 'soiree',
      periodLabel: slot.periodLabel,
      isAvailable: true,
      isTaken: false,
      isClosed: false,
      statusText: 'Disponible'
    };
  });
};
