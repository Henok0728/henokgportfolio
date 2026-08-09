// Immediately restore theme preference (defaults to dark mode)
export const restoreTheme = () => {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('portfolio-theme', 'dark');
};

// Light / Dark Mode Toggle Event Listener
export const initTheme = () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            if (isLight) {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('portfolio-theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('portfolio-theme', 'light');
            }
        });
    }
};
