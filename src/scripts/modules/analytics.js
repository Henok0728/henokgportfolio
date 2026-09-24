/**
 * Vercel Web Analytics Integration
 * Automatically tracks page views, unique visitors, referrers, and geography
 * on your Vercel project dashboard.
 */
import { track } from '@vercel/analytics';

/**
 * Track custom user interactions (e.g. contact form submission, project clicks)
 * @param {string} eventName
 * @param {Record<string, string | number | boolean>} [properties]
 */
export function trackEvent(eventName, properties) {
  try {
    track(eventName, properties);
  } catch (err) {
    // Graceful fallback in development or unsupported environment
    console.debug(`[Vercel Analytics] Track event '${eventName}':`, err);
  }
}

export { track };
