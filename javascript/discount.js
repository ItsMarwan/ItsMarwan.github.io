document.addEventListener('DOMContentLoaded', () => {
    window.initDiscountModal = () => {
        const popupModal = document.getElementById('popup-modal');
        const closeModalBtn = document.getElementById('close-modal-btn');
        const discountCodeElement = document.getElementById('discount-code');
        const copiedTooltip = document.getElementById('copied-tooltip');
        const hasPopupBeenShown = localStorage.getItem('popupShown');
        const enabled = true;

        function fireConfetti() {
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            // The key change is here: setting zIndex to a high value.
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100000 };
        
            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }
        
            const interval = setInterval(() => {
                const timeLeft = animationEnd - Date.now();
                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }
        
                const particleCount = 50 * (timeLeft / duration);
                // Adjusting the origin to be at the bottom of the screen (y: 1)
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.9), y: 1 } }));
            }, 250);
        }

        if (!hasPopupBeenShown && enabled) {
            // Delay the popup a bit to give the user time to see the page
            setTimeout(() => {
                if (popupModal) {
                    popupModal.classList.remove('hidden');
                    // A small delay to allow for the transition
                    setTimeout(() => {
                        popupModal.classList.add('visible');
                        popupModal.classList.add('fade-in-up'); // Added fade-in-up class here
                        fireConfetti();
                        localStorage.setItem('popupShown', 'true');
                    }, 10);
                }
            }, 3000); // 3-second delay after the page is fully loaded
        }
    
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                if (popupModal) {
                    // Start the fade-out animation first
                    popupModal.classList.add('fade-out-down'); 
                    popupModal.classList.remove('visible');
                    // Remove the fade-in-up class when closing
                    popupModal.classList.remove('fade-in-up');
                    setTimeout(() => {
                        // After the animation, hide the element completely
                        popupModal.classList.add('hidden');
                        popupModal.classList.remove('fade-out-down');
                    }, 300);
                }
            });
        }
    
        function copyToClipboard(text) {
            if (!navigator.clipboard) {
                const textArea = document.createElement("textarea");
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    document.execCommand('copy');
                } catch (err) {
                    console.error('Failed to copy text', err);
                }
                document.body.removeChild(textArea);
                return;
            }
            navigator.clipboard.writeText(text).then(() => {
                console.log('Text copied successfully!');
            }).catch(err => {
                console.error('Failed to copy text', err);
            });
        }

        if (discountCodeElement && copiedTooltip) {
            discountCodeElement.addEventListener('click', () => {
                const code = discountCodeElement.innerText || discountCodeElement.textContent;
                copyToClipboard(code);
                
                copiedTooltip.classList.remove('hidden');
                setTimeout(() => {
                    copiedTooltip.classList.add('show');
                }, 10);

                setTimeout(() => {
                    copiedTooltip.classList.remove('show');
                    setTimeout(() => {
                        copiedTooltip.classList.add('hidden');
                    }, 300);
                }, 2000);
            });
        }
    };

    // The entire logic is now wrapped in window.initDiscountModal,
    // which is called by loading.js when the page is ready.
});
