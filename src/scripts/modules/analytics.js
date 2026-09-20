/**
 * Vercel Web Analytics Integration
 * Automatically tracks page views, unique visitors, referrers, and geography
 * on your Vercel project dashboard.
 */
import { inject } from '@vercel/analytics';

export function initAnalytics() {
    try {
        inject();
    } catch (err) {
        // Graceful fallback if running offline or in unsupported environment
        console.debug('Vercel Analytics init note:', err);
    }
}
