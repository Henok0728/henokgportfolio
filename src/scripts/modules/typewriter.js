export const initTypewriter = () => {
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
};
