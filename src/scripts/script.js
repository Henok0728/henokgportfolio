import { restoreTheme, initTheme } from './modules/theme.js';
import { initPreloader } from './modules/preloader.js';
import { initScrollObserver } from './modules/animations.js';
import { initNavigation } from './modules/navigation.js';
import { initTypewriter } from './modules/typewriter.js';
import { init3DCardTilt } from './modules/3d-card.js';
import { initContactForm } from './modules/contact-form.js';
import { initPhysicsBackground } from './modules/physics-bg.js';

// Immediately restore theme preference from localStorage to avoid theme flash
restoreTheme();

const init = () => {
    // Initialize modern physics equations background
    initPhysicsBackground();

    initTheme();
    initNavigation();
    initPreloader();
    initScrollObserver();
    initTypewriter();
    init3DCardTilt();
    initContactForm();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
