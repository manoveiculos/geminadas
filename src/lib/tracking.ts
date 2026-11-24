export type TrackingEventName = 'Lead' | 'Contact' | 'InitiateCheckout' | 'ViewContent';

export interface TrackingParams {
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
  unit?: string;
  source?: string;
  has_vehicle?: boolean;
  entry_value?: number;
  [key: string]: string | number | boolean | undefined;
}

declare global {
  interface Window {
    fbq?: (action: string, eventName: string, params?: Record<string, unknown>) => void;
    gtag?: (command: string, action: string, params?: Record<string, unknown>) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/**
 * Dispara eventos de conversão padronizados para Meta Pixel (fbq) e Google Analytics 4 (gtag/dataLayer).
 */
export function trackEvent(eventName: TrackingEventName, params: TrackingParams = {}): void {
  if (typeof window === 'undefined') return;

  const payload = {
    currency: 'BRL',
    value: 395000,
    ...params,
  };

  try {
    // 1. Meta Pixel (Facebook / Instagram Ads)
    if (typeof window.fbq === 'function') {
      window.fbq('track', eventName, payload);
    }

    // 2. Google Analytics 4 (gtag.js)
    const gaEventMap: Record<TrackingEventName, string> = {
      Lead: 'generate_lead',
      Contact: 'contact_whatsapp',
      InitiateCheckout: 'begin_simulation',
      ViewContent: 'view_gallery',
    };

    if (typeof window.gtag === 'function') {
      window.gtag('event', gaEventMap[eventName] || eventName, {
        event_category: 'conversion',
        event_label: params.source || params.content_name || 'residencial_alero',
        ...payload,
      });
    }

    // 3. Google Tag Manager dataLayer fallback
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: gaEventMap[eventName] || eventName,
        meta_event: eventName,
        ...payload,
      });
    }
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[trackEvent]', err);
    }
  }
}
