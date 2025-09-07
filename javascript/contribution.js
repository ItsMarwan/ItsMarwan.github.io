document.addEventListener('DOMContentLoaded', () => {
    // Array of Fortnite map data
    const fortniteMapsData = [
        {
            title: "WILD SNIPER ONE SHOT",
            image: "https://cdn-0001.qstv.on.epicgames.com/TykRJCOzXdLxjrQBtP/image/landscape_comp.jpeg",
            description: "Lazy Lake X Tilted! Unlimited fun, custom leaderboard & ranks, instant respawn, aim practice, saved stats & loadouts. become the GOAT!",
            code: "0684-9159-3647",
            link: "https://www.fortnite.com/@nvgs/0684-9159-3647?lang=en-US"
        },
        {
            title: "EDIT LAVA WARS",
            image: "https://cdn-0001.qstv.on.epicgames.com/JZkhlyrmPhBIWNtbbl/image/landscape_comp.jpeg",
            description: "You'll have tons of fun playing this! Edit down players, use funny weapons, unlock 10 hero powers, survive across 3 layers, and avoid the lava.",
            code: "0483-7073-2749",
            link: "https://www.fortnite.com/@steal-a-brainrot/0483-7073-2749?lang=en-US"
        },
        {
            title: "99 BOTS CREATIVE RELOAD",
            image: "https://cdn-0001.qstv.on.epicgames.com/huLvfkjrrRmoBXrISy/image/landscape_comp.jpeg",
            description: "Best practice map with build reset and unlimited fun. Master piece control, boxfights, aim, edits, snipes, and play like pros Rezon, MrSavage, Mongraal.",
            code: "2238-9573-4879",
            link: "https://www.fortnite.com/@steal-a-brainrot/2238-9573-4879?lang=en-US"
        },
        {
            title: "BLITZ RELOAD 1v1v1",
            image: "https://cdn-0001.qstv.on.epicgames.com/iRuOVirxtjMCoQoeWQ/image/landscape_comp.jpeg",
            description: "Jump out of a battle plane and practice realistic fights. Have fun with friends, enjoy epic battles, resets every 30 mins, and race to reach Unreal first.",
            code: "6430-9798-8604",
            link: "https://www.fortnite.com/@nvgs/6430-9798-8604?lang=en-US"
        },
        {
            title: "TIKTOK SCRIMS 1V1V1",
            image: "https://cdn-0001.qstv.on.epicgames.com/auqUFUMVyrwGllGCpS/image/landscape_comp.jpeg",
            description: "Practice realistic fights, have fun with friends, enjoy epic battles, use funny items like grapplers and shockwaves, reset every 30 mins, and race to Unreal.",
            code: "5440-8422-89494",
            link: "https://www.fortnite.com/@rezon-bhe-goated/5440-8422-8949?lang=en-US"
        }
    ];

    const mapsGrid = document.getElementById('maps-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const mapsToLoad = 6;
    let currentIndex = 0;

    // Create and append map cards
    function renderFortniteMaps() {
        if (!mapsGrid) {
            console.error('Maps grid element not found!');
            return;
        }

        const endIndex = Math.min(currentIndex + mapsToLoad, fortniteMapsData.length);
        
        for (let i = currentIndex; i < endIndex; i++) {
            const map = fortniteMapsData[i];
            
            // Create map card element
            const mapCard = document.createElement('div');
            mapCard.className = 'map-card bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700 transition-all duration-300 ease-out cursor-pointer';
            
            // Build card content
            mapCard.innerHTML = `
                <img src="${map.image}" alt="${map.title} Map" class="rounded-lg w-full h-auto object-cover mb-4 shadow-md">
                <h2 class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700 mb-2">
                    ${map.title}
                </h2>
                <p class="text-gray-400 text-sm mb-4">${map.description}</p>
                <div class="flex items-center justify-between mb-4">
                    <span class="text-lg font-bold">Code:</span>
                    <span class="text-blue-400 font-mono text-lg">${map.code}</span>
                </div>
                <button 
                    class="copy-btn w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    data-code="${map.code}">
                    <i class="fas fa-copy mr-2"></i>Copy Code
                </button>
            `;
            
            // Add hover effects with JavaScript
            mapCard.addEventListener('mouseenter', () => {
                mapCard.style.transform = 'translateY(-8px) scale(1.02)';
                mapCard.style.boxShadow = '0 20px 40px rgba(0, 229, 255, 0.15), 0 8px 16px rgba(0, 229, 255, 0.1)';
            });
            
            mapCard.addEventListener('mouseleave', () => {
                mapCard.style.transform = 'translateY(0) scale(1)';
                mapCard.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
            });
            
            // Add copy functionality
            const copyBtn = mapCard.querySelector('.copy-btn');
            copyBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                copyCodeToClipboard(map.code);
            });
            
            // Add fade-in animation
            mapCard.style.opacity = '0';
            mapCard.style.transform = 'translateY(20px)';
            
            mapsGrid.appendChild(mapCard);
            
            // Trigger fade-in animation
            setTimeout(() => {
                mapCard.style.opacity = '1';
                mapCard.style.transform = 'translateY(0)';
            }, 100 * (i - currentIndex));
        }

        currentIndex = endIndex;
        updateLoadMoreButton();
    }

    // Update load more button visibility
    function updateLoadMoreButton() {
        if (!loadMoreBtn) return;
        
        if (currentIndex < fortniteMapsData.length) {
            loadMoreBtn.style.display = 'block';
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }

    // Copy code to clipboard function
    function copyCodeToClipboard(code) {
        // Try modern clipboard API first
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(code).then(() => {
                showNotification('Code Copied!');
            }).catch(() => {
                // Fallback to old method
                fallbackCopy(code);
            });
        } else {
            // Fallback for older browsers
            fallbackCopy(code);
        }
    }

    // Fallback copy method
    function fallbackCopy(code) {
        const tempInput = document.createElement('input');
        tempInput.value = code;
        tempInput.style.position = 'fixed';
        tempInput.style.left = '-9999px';
        document.body.appendChild(tempInput);
        tempInput.select();
        
        try {
            document.execCommand('copy');
            showNotification('Code Copied!');
        } catch (err) {
            showNotification('Failed to copy code');
        }
        
        document.body.removeChild(tempInput);
    }

    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-green-500 text-white font-bold rounded-full shadow-lg transition-all duration-300 z-50';
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(20px) scale(0.8)';
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(-50%) translateY(0) scale(1)';
        }, 10);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(-50%) translateY(-20px) scale(0.8)';
            
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 2000);
    }

    // Load more button event listener
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', renderFortniteMaps);
    }

    // Initial render
    renderFortniteMaps();
});