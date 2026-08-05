export const initPreloader = () => {
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
};
