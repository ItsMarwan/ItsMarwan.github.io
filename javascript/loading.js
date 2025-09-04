// Array of random loading messages
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
    "Ready. Set. Create."
];

const loadingTextElement = document.getElementById('loading-text');
let currentMessageIndex = 0;

// Function to get a random message from the array
function getRandomMessage() {
    const randomIndex = Math.floor(Math.random() * loadingMessages.length);
    return loadingMessages[randomIndex];
}

// Function to update the text with a fade-in/fade-out effect
function updateLoadingTextWithFade() {
    if (loadingTextElement) {
        // Fade the current text down and out
        loadingTextElement.style.opacity = '0';
        loadingTextElement.style.transform = 'translateY(20px)';

        // After the fade-out, change the text and fade it back in
        setTimeout(() => {
            // Set the new text
            loadingTextElement.textContent = getRandomMessage();

            // Reset transform for the new text and set it to fade up
            loadingTextElement.style.opacity = '0';
            loadingTextElement.style.transform = 'translateY(-20px)';

            // Trigger the fade-in-up animation
            setTimeout(() => {
                loadingTextElement.style.opacity = '1';
                loadingTextElement.style.transform = 'translateY(0)';
            }, 50); // Small delay to ensure the browser registers the starting position
        }, 500); // This delay should match the CSS transition duration
    }
}

// Set the initial text immediately without any animation to prevent layout shifts
if (loadingTextElement) {
    loadingTextElement.textContent = getRandomMessage();
}

// Set the interval to change the text every 2 seconds (5000 milliseconds)
const textInterval = setInterval(updateLoadingTextWithFade, 5000);


window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        // First, fade the loading screen out.
        loadingScreen.style.opacity = '0';

        // Then, after the fade-out transition, hide it completely.
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 350); // This delay should match the CSS transition duration

        // Trigger progress bar animations immediately on load
        const progressBars = document.querySelectorAll('.progress-bar-fill');
        progressBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width') || '100%';
            
            // Set the initial width to 0% to ensure the animation starts correctly.
            bar.style.width = '0%';
            
            // Allow a brief moment for the browser to register the initial 0% width.
            setTimeout(() => {
                bar.style.transition = 'width 1.3s ease-in-out';
                bar.style.width = targetWidth;
            }, 10);
        });
        
        // Trigger other animations and initialization
        const animatedElements = document.querySelectorAll('.animated-element');
        animatedElements.forEach(el => {
            el.classList.add('fade-in-up');
        });
        
        if (typeof initializeScrollEffects === 'function') {
            initializeScrollEffects();
        }
    }
});
