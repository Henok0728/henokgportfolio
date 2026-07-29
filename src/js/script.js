const init = () => {
   
    const preloader = document.getElementById('preloader');
    if (preloader) {
        
        const waitingTime = new Promise(resolve => setTimeout(resolve, 2000));
        
        waitingTime.then(() => {
        
            preloader.classList.add('fade-out');
            
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 600);
        });
    }
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // Profile Morph Logic
    let isMorphed = false;
    const profilePic = document.getElementById('profile-pic');
    const heroSlot = document.getElementById('hero-profile-slot');
    const navSlot = document.getElementById('nav-profile-slot');

    function morphProfile(toNav) {
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


    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let current = "home";
        const scrollPosition = window.scrollY || window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop - sectionHeight / 3) {
                const id = section.getAttribute("id");
                if (id) current = id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            const href = link.getAttribute("href");
            if (href && href.includes(current)) {
                link.classList.add("active");
            }
        });

        
        morphProfile(current !== "home");
    });

    const cards = document.querySelectorAll(".project-card");
    
    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = centerY ? ((y - centerY) / centerY) * -5 : 0;
            const rotateY = centerX ? ((x - centerX) / centerX) * 5 : 0;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = 'none';
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s ease';
        });
        
        card.addEventListener("mouseenter", () => {
            card.style.transition = 'none';
        });
    });

   
    const headline = document.querySelector('.headline');
    if (headline) {
        headline.innerHTML = '';
        const text1 = "Hi, I am ";
        const roles = [" Backend Developer", " Embedded Systems Developer"];
        let roleIndex = 0;
        
        let i = 0;
        let isDeleting = false;
        let spanElement = null;
        let state = 0; 


        function typeWriter() {
            if (state === 0) {
                if (i < text1.length) {
                    headline.appendChild(document.createTextNode(text1.charAt(i)));
                    i++;
                    setTimeout(typeWriter, 60);
                } else {
                    state = 1;
                    i = 0;
                    spanElement = document.createElement('span');
                    spanElement.className = 'accent-text';
                    headline.appendChild(spanElement);
                    setTimeout(typeWriter, 60);
                }
            } else if (state === 1) {
                const currentRole = roles[roleIndex];
                if (!isDeleting) {
                    if (i < currentRole.length) {
                        spanElement.textContent = currentRole.substring(0, i + 1);
                        i++;
                        setTimeout(typeWriter, 60);
                    } else {
                        state = 2;
                        i = 0;
                        setTimeout(typeWriter, 60);
                    }
                } else {
                    if (i > 0) {
                        spanElement.textContent = currentRole.substring(0, i - 1);
                        i--;
                        setTimeout(typeWriter, 30);
                    } else {
                        isDeleting = false;
                        roleIndex = (roleIndex + 1) % roles.length;
                        setTimeout(typeWriter, 400);
                    }
                }
            } else if (state === 2) {
                if (!isDeleting) {
                    headline.appendChild(document.createTextNode("."));
                    state = 3;
                    setTimeout(typeWriter, 2500);
                } else {
                    if (headline.lastChild && headline.lastChild.nodeType === Node.TEXT_NODE && headline.lastChild.nodeValue === ".") {
                        headline.removeChild(headline.lastChild);
                    }
                    state = 1;
                    i = roles[roleIndex].length;
                    setTimeout(typeWriter, 30);
                }
            } else if (state === 3) {
                isDeleting = true;
                state = 2;
                setTimeout(typeWriter, 30);
            }
        }
        
        setTimeout(typeWriter, 500);
    }

    
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.submit-btn');
            if (!submitBtn) return;
            const originalText = submitBtn.textContent;

            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            const formspreeEndpoint = 'https://formspree.io/f/xykvppky';

            try {
                const response = await fetch(formspreeEndpoint, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                const data = await response.json();

                console.log('Formspree Status:', response.status);
                console.log('Formspree Response:', data);

                if (response.ok) {
                    submitBtn.textContent = '✓ Message Sent!';
                    submitBtn.style.backgroundColor = '#10b981';

                    contactForm.reset();
                } else {
                    let errorMessage = 'Submission Failed';

                    if (data.errors && data.errors.length > 0) {
                        errorMessage = data.errors[0].message;
                    } else if (data.error) {
                        errorMessage = data.error;
                    }

                    submitBtn.textContent = errorMessage;
                    submitBtn.style.backgroundColor = '#ef4444';

                    console.error('Formspree Error:', data);
                }
            } catch (error) {
                console.error('Network Error:', error);

                submitBtn.textContent = 'Network Error';
                submitBtn.style.backgroundColor = '#ef4444';
            }

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.style.color = '';
            }, 4000);
        });
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
