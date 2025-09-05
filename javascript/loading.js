//   RANDOM LOADING MESSAGES
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
    "Aligning imagination with algorithms...",
    "Breathing soul into scripts...",
    "Assembling your digital playground...",
    "Rolling dice behind the scenes...",
    "Casting spells on polygons...",
    "Summoning epic assets...",
    "Respawning fresh ideas...",
    "Loading your next level of wonder...",
    "Unlocking sandbox mode...",
    "Pixel potions brewing...",
    "Compiling dreams into design...",
    "Debugging the impossible...",
    "Rendering reality in real time...",
    "Merging imagination with logic...",
    "Optimizing your creative core...",
    "Deploying digital daydreams...",
    "Every pixel tells a story...",
    "Imagination loading, reality pending...",
    "Creation is just code with a soul...",
    "From idea to infinity...",
    "Dreams take time to render...",
    "Loading the future, one frame at a time...",
    "Every great journey starts with a progress bar..."
];

const loadingTextElement = document.getElementById('loading-text');

//   RANDOM MESSAGE PICKER

function getRandomMessage() {
    const randomIndex = Math.floor(Math.random() * loadingMessages.length);
    return loadingMessages[randomIndex];
}

//   UPDATE LOADING TEXT WITH FADE

function updateLoadingTextWithFade() {
    if (loadingTextElement) {
        // Fade the current text OUT & move it DOWN
        loadingTextElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        loadingTextElement.style.opacity = '0';
        loadingTextElement.style.transform = 'translateY(20px)';

        // After fade-out, switch message and fade IN moving UP
        setTimeout(() => {
            loadingTextElement.textContent = getRandomMessage();

            // Reset position ABOVE, invisible
            loadingTextElement.style.opacity = '0';
            loadingTextElement.style.transform = 'translateY(-20px)';

            // Fade IN and slide DOWN to original position
            setTimeout(() => {
                loadingTextElement.style.opacity = '1';
                loadingTextElement.style.transform = 'translateY(0)';
            }, 50);
        }, 500); // Matches CSS fade-out duration
    }
}

//   INITIALIZE LOADING TEXT
if (loadingTextElement) {
    // Set first random message
    loadingTextElement.textContent = getRandomMessage();

    // Animate first line with your existing "fade-in-up" class
    loadingTextElement.classList.add('fade-in-up');

    // Remove the class after animation to avoid conflicts later
    setTimeout(() => {
        loadingTextElement.classList.remove('fade-in-up');
    }, 600); // Should match your CSS fade-in-up duration
}

// Change message every 3 seconds
const textInterval = setInterval(updateLoadingTextWithFade, 3000);

//   LOADING SCREEN FADE & INIT

window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');

    if (loadingScreen) {
        // Fade out loading screen
        loadingScreen.style.opacity = '0';

        // Fully hide after fade-out
        setTimeout(() => {
            loadingScreen.style.display = 'none';
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
        if (typeof initializeScrollEffects === 'function') {
            initializeScrollEffects();
        }
    }
});
