// loader.js

// Function to load a component from an HTML file
async function loadComponent(url, elementId) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const html = await response.text();
        const placeholder = document.getElementById(elementId);
        if (placeholder) {
            placeholder.innerHTML = html;
        } else {
            console.error(`Placeholder element with ID '${elementId}' not found.`);
        }
    } catch (error) {
        console.error(`Could not load component from ${url}:`, error);
    }
}

// Call the function to load the components
document.addEventListener('DOMContentLoaded', async () => {
    await loadComponent('/Repeat/navbar.html', 'navbar-placeholder');
    loadComponent('/Repeat/footer.html', 'footer-placeholder');
    
    // This function will now run only after the navbar is loaded.
    if (typeof initializeMenuButton === 'function') {
        initializeMenuButton();
    }
});