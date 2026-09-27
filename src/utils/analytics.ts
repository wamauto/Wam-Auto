/**
 * Privacy-friendly, lightweight client-side analytics module.
 * Strictly respects GDPR/RGPD consent stored in localStorage.
 */

export type AnalyticsEventName =
  | 'page_view'
  | 'service_selected'
  | 'booking_started'
  | 'booking_submitted'
  | 'phone_call_clicked'
  | 'whatsapp_clicked'
  | 'cookie_consent_accepted'
  | 'cookie_consent_declined';

const CONSENT_KEY = 'wam_auto_cookie_consent_v1';

export const getCookieConsent = (): 'accepted' | 'declined' | null => {
  try {
    return localStorage.getItem(CONSENT_KEY) as 'accepted' | 'declined' | null;
  } catch {
    return null;
  }
};

export const setCookieConsent = (consent: 'accepted' | 'declined') => {
  try {
    localStorage.setItem(CONSENT_KEY, consent);
  } catch {
    // ignore
  }
};

export const trackEvent = (name: AnalyticsEventName, properties: Record<string, any> = {}) => {
  const consent = getCookieConsent();
  // If user declined or hasn't accepted, do not store/send tracking data
  if (consent !== 'accepted') {
    return;
  }

  const payload = {
    event: name,
    timestamp: new Date().toISOString(),
    path: window.location.pathname,
    ...properties
  };

  // Safe client event logger without external cookies
  if (process.env.NODE_ENV === 'development') {
    // Useful for testing without privacy issues
    console.debug('[Analytics Tracked]', payload);
  }
};
