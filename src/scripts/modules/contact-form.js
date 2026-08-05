export const initContactForm = () => {
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
