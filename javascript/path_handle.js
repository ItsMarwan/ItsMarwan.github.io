const code = document.getElementById("Code");
const codeDescription = document.getElementById("Code_Description");

// Common message and title
const redirectMessage = "It looks like the page you found is guiding you to a new destination.\nLet's take you where you need to be.";
const redirectTitle = "Redirecting...";

// Map of paths and their corresponding redirect URLs
const redirects = {
    "/home": "/",
    "/products/bmc": "https://buymeacoffee.com/itsmarwan",
    "/products/patreon": "https://buymeacoffee.com/itsmarwan",
    "/discord": "https://discord.gg/Fwd9MgB8Ww",
    "/youtube": "https://youtube.com/@itsmarwan"
};

// Check if current path is in the redirects list
const currentPath = window.location.pathname;
if (redirects[currentPath]) {
    code.innerText = "200";
    codeDescription.innerText = redirectMessage;
    document.title = redirectTitle;
    console.log(`Redirecting to: ${redirects[currentPath]}`);
    window.location.replace(redirects[currentPath]);
}
