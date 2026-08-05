let isMorphed = false;

export function morphProfile(toNav) {
    const profilePic = document.getElementById('profile-pic');
    const heroSlot = document.getElementById('hero-profile-slot');
    const navSlot = document.getElementById('nav-profile-slot');

    if (!profilePic || !heroSlot || !navSlot || toNav === isMorphed) return;

    const first = profilePic.getBoundingClientRect();

    if (toNav) {
        navSlot.appendChild(profilePic);
        profilePic.classList.add('morphed');
    } else {
        heroSlot.appendChild(profilePic);
        profilePic.classList.remove('morphed');
    }
    isMorphed = toNav;

    const last = profilePic.getBoundingClientRect();

    const deltaX = first.left - last.left;
    const deltaY = first.top - last.top;
    const deltaW = last.width ? first.width / last.width : 1;
    const deltaH = last.height ? first.height / last.height : 1;

    profilePic.animate([
        { transformOrigin: 'top left', transform: `translate(${deltaX}px, ${deltaY}px) scale(${deltaW}, ${deltaH})` },
        { transformOrigin: 'top left', transform: 'none' }
    ], {
        duration: 600,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'both'
    });
}
