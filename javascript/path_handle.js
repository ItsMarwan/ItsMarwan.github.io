// Get the content container from the HTML
const contentContainer = document.querySelector('.error-container');

// A function to update the content dynamically
function updateContent(title, message) {
    contentContainer.innerHTML = `
        <h1 class="error-code text-neon">404</h1>
        <h2 class="error-message text-white">${title}</h2>
        <p class="error-description text-gray-400">
            ${message}
        </p>
    `;
}

// Function to handle different URL paths
function handleUrlPath() {
    const path = window.location.pathname;

    switch (path) {
        case '/discord':
            console.log('Path is /discord. Redirecting to Discord...');
            // Change the page content to "Redirecting..."
            updateContent("Redirecting...", "Please wait while we redirect you to Discord.");
            // A full redirect as requested.
            window.location.href = 'https://discord.com/invite/itsmarwan-s-blue-planet-1150156572857733170';
            break; // <-- This is the missing break statement
        case '/home':
            console.log('Path is /home. Redirecting to home...');
            // Change the page content to "Redirecting..."
            updateContent("Redirecting...", "Please wait while we redirect you to Home.");
            // A full redirect as requested.
            window.location.href = '/';
            break;
        default:
            console.log('Path is not a special case. Displaying default content.');
            // The default content is already in the HTML file, so no action is needed here.
            break;
    }
}

// Attach the function to the window's load event to ensure it runs as soon as the page is ready.
window.onload = handleUrlPath;