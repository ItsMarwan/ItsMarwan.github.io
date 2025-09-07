// --- RANDOM LOADING MESSAGES ---
const loadingMessages = [
    "Loading awesomeness…",
    "Building your experience…",
    "Unlocking creative mode…",
    "Compiling Verse scripts…",
    "Generating possibilities…",
    "Rendering ideas into reality…",
    "Optimizing performance…",
    "Shaping immersive worlds…",
    "Calibrating assets…",
    "Pushing polygons…",
    "Preparing something epic…",
    "Streaming digital magic…",
    "Designing for perfection…",
    "Merging creativity with code…",
    "Spawning interactive wonders…",
    "Connecting to Blue Planet…",
    "Breathing life into pixels…",
    "Generating your adventure…",
    "Finalizing game mechanics…",
    "Bringing tutorials online…",
    "Powering up innovation…",
    "Launching creativity.exe…",
    "Stitching dimensions together…",
    "Syncing with developer universe…",
    "Animating the impossible…",
    "Injecting hidden magic…",
    "Final touches loading…",
    "Curating custom assets…",
    "Dreaming in polygons…",
    "Preparing immersive tutorials…",
    "Channeling creative energy…",
    "Upgrading your experience…",
    "Inventing something new…",
    "Fueling developer mode…",
    "Ready. Set. Create.",
    "Weaving code into cosmos...",
    "Charging creativity circuits...",
    "Crafting realities beyond pixels...",
    "Spawning infinite possibilities...",
    "Connecting the dots...",
    "Igniting inspiration...",
    "Assembling the impossible...",
    "Designing new frontiers...",
    "Bringing dreams to life...",
    "Creating the future of UEFN..."
];

const loadingTextElement = document.getElementById('loading-text');
let messageIndex = 0;

function updateLoadingText() {
    if (loadingTextElement) {
        loadingTextElement.innerText = loadingMessages[messageIndex];
        messageIndex = (messageIndex + 1) % loadingMessages.length;
    }
}

function updateLoadingTextWithFade() {
    if (!loadingTextElement) return;

    loadingTextElement.classList.add('fade-out');
    setTimeout(() => {
        updateLoadingText();
        loadingTextElement.classList.remove('fade-out');
    }, 500); // Wait for fade-out to complete before changing text
    
    setTimeout(() => {
        loadingTextElement.classList.add('fade-in-up');
    }, 500);

    setTimeout(() => {
        loadingTextElement.classList.remove('fade-in-up');
    }, 1100); // Should match your CSS fade-in-up duration
}

// Change message every 3 seconds
const textInterval = setInterval(updateLoadingTextWithFade, 3000);

// --- LOADING SCREEN FADE & INIT ---
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');

    if (loadingScreen) {
        // Fade out loading screen
        loadingScreen.style.opacity = '0';

        // Fully hide after fade-out
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            // Trigger the discount.js logic ONLY after the loading screen is hidden
            if (window.initDiscountModal) {
                window.initDiscountModal();
            }
        }, 350);

        // Animate progress bars
        const progressBars = document.querySelectorAll('.progress-bar-fill');
        progressBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width') || '100%';
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.transition = 'width 1.3s ease-in-out';
                bar.style.width = targetWidth;
            }, 10);
        });

        // Trigger animations on elements
        const animatedElements = document.querySelectorAll('.animated-element');
        animatedElements.forEach(el => {
            el.classList.add('fade-in-up');
        });

        // Initialize custom scroll effects if available
        if (typeof initScrollEffects === 'function') {
            initScrollEffects();
        }

        // Clean up the text interval once loading is done
        clearInterval(textInterval);
    }
});

// Update the initial message
updateLoadingText();
