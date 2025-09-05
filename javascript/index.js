// --- Function to fetch data from API and initialize the app ---
async function fetchRatingsAndInitialize() {
    const userIds = [
        '983752185919709274',
        '521003985436409896',
        '773761739351261205',
        '1335411515930443857',
        '1399165813092520128',
        '495229734138019841',
        '638391726058504243',
        '1403719811598520351'
    ];

    const staticRatings = [
        { rating: 5, comment: '+ vouch for a design & systems good quality and fast thanks bro!' },
        { rating: 5, comment: '10/10 service, reasonable prices and good response time\nif you ever have problem with anything uefn dm marwan he will help you out!' },
        { rating: 5, comment: '12/10 service, Very reasonable on the price. My man hooked me up quickly and brought my vision to life.' },
        { rating: 5, comment: 'Nice service , found a solution to my problem' },
        { rating: 5, comment: '10/10 Service everything worked out quick answers when you need help' },
        { rating: 5, comment: '10/10 Perfect service Very reasonable on the price. I recommend 👌🏽' },
        { rating: 5, comment: 'Very good service, attentive to the customer 👌🏽' },
        { rating: 5, comment: 'very nice service 👍' }
    ];

    const baseApiUrl = 'https://discordlookup.mesalytic.moe/v1/user/';
    const defaultAvatar = '/imgs/default-user.png';

    // --- STEP 1: Show placeholders instantly ---
    initializeRatingsCarousel(staticRatings.map(data => ({
        name: 'Loading...',
        rating: data.rating,
        comment: data.comment,
        image: defaultAvatar
    })));

    // Helper: fetch with timeout
    const fetchWithTimeout = (url, ms = 3000) =>
        Promise.race([
            fetch(url).then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            }),
            new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), ms))
        ]);

    try {
        
        // --- STEP 2: Fetch usernames + avatars ---
        const fetchPromises = userIds.map(id =>
            fetchWithTimeout(`${baseApiUrl}${id}`)
                .then(user => ({
                    name: user.global_name || user.username || 'Unknown User',
                    image: user.avatar && user.avatar.id
                        ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar.id}.png?size=128`
                        : defaultAvatar
                }))
                .catch(() => ({
                    name: 'Unknown User',
                    image: defaultAvatar
                }))
        );

        const apiResults = await Promise.all(fetchPromises);

        // --- STEP 3: Merge API data with static ratings ---
        const ratingsData = apiResults.map((userData, index) => ({
            ...userData,
            rating: staticRatings[index].rating,
            comment: staticRatings[index].comment
        }));

        // --- STEP 4: Update carousel with real data ---
        initializeRatingsCarousel(ratingsData);
        calculateAverageRating(ratingsData);

    } catch (error) {
        console.error('API failed, showing static data:', error);

        // If API completely fails, just show static ratings
        const ratingsData = staticRatings.map(data => ({
            ...data,
            name: 'Unknown User',
            image: defaultAvatar
        }));

        initializeRatingsCarousel(ratingsData);
        calculateAverageRating(ratingsData);
    }
}

// --- Function to show a skeleton loading state for the average rating ---
function showAverageRatingSkeleton() {
    const container = document.getElementById('average-rating-container');
    if (container) {
        container.innerHTML = `
            <div class="flex items-center space-x-2">
                <div class="w-24 h-6 bg-gray-700 rounded animate-pulse"></div>
                <div class="w-12 h-6 bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div class="mt-2 w-32 h-4 bg-gray-700 rounded animate-pulse"></div>
        `;
    }
}

// --- Ratings Carousel Functions ---
function initializeRatingsCarousel(ratingsData) {
    const carouselTrack = document.getElementById('carousel-track');
    const carouselDots = document.getElementById('carousel-dots');
    
    if (!carouselTrack || !carouselDots) return;

    carouselTrack.innerHTML = '';
    carouselDots.innerHTML = '';

    ratingsData.forEach((rating, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide min-w-full p-8 flex items-center bg-gray-800';
        slide.innerHTML = `
            <img src="${rating.image}" alt="${rating.name}" class="w-16 h-16 rounded-full mr-6 object-cover border-2 border-gray-600">
            <div class="flex-1">
                <div class="flex items-center mb-2">
                    <h4 class="text-white font-semibold mr-3">${rating.name}</h4>
                    <div class="flex text-yellow-400">
                        ${Array(5).fill().map((_, i) => 
                            `<i class="fas fa-star${i < rating.rating ? '' : ' text-gray-600'}"></i>`
                        ).join('')}
                    </div>
                </div>
                <p class="text-gray-300 text-sm leading-relaxed">${rating.comment}</p>
            </div>
        `;
        carouselTrack.appendChild(slide);

        const dot = document.createElement('button');
        // This line is changed to no longer set the initial active class.
        dot.className = `w-3 h-3 rounded-full bg-gray-600 transition-colors duration-300`;
        dot.addEventListener('click', () => goToSlide(index));
        carouselDots.appendChild(dot);
    });

    window.currentSlide = 0;
    window.totalSlides = ratingsData.length;
    
    setupCarouselNavigation();
    startCarouselAutoplay();
    // This new line ensures the correct dot is selected immediately after creation.
    updateCarousel(); 
}

function updateCarousel() {
    const carouselTrack = document.getElementById('carousel-track');
    const carouselDots = document.getElementById('carousel-dots');
    
    if (!carouselTrack || !carouselDots) return;

    // Move the carousel track
    const slideWidth = carouselTrack.children[0].clientWidth;
    carouselTrack.style.transform = `translateX(-${window.currentSlide * slideWidth}px)`;

    // Update the dots
    const dots = carouselDots.querySelectorAll('button');
    dots.forEach((dot, index) => {
        dot.classList.remove('bg-blue-500');
        dot.classList.add('bg-gray-600');
        if (index === window.currentSlide) {
            dot.classList.add('bg-blue-500');
            dot.classList.remove('bg-gray-600');
        }
    });
}

function setupCarouselNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            clearInterval(window.carouselInterval);
            window.currentSlide = (window.currentSlide - 0.5 + window.totalSlides) % window.totalSlides;
            updateCarousel();
            startCarouselAutoplay();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            clearInterval(window.carouselInterval);
            window.currentSlide = (window.currentSlide + 0.5) % window.totalSlides;
            updateCarousel();
            startCarouselAutoplay();
        });
    }
}

const slideDuration = 5000;

function startCarouselAutoplay() {
    const progressBar = document.getElementById('carousel-progress-bar');
    if (window.carouselInterval) clearInterval(window.carouselInterval);

    function startProgressBar() {
        if (!progressBar) return;
        progressBar.style.width = '0%';

        let startTime = Date.now();
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min((elapsed / slideDuration) * 100, 100);
            progressBar.style.width = `${progress}%`;
            if (progress < 100) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }

    window.carouselInterval = setInterval(() => {
        window.currentSlide = (window.currentSlide + 1) % window.totalSlides;
        updateCarousel();
        startProgressBar();
    }, slideDuration);

    // Start first progress bar immediately
    startProgressBar();
}


function goToSlide(slideIndex) {
    clearInterval(window.carouselInterval);
    window.currentSlide = slideIndex;
    updateCarousel();
    startCarouselAutoplay();
}

function calculateAverageRating(ratingsData) {
    const averageRatingElement = document.getElementById('average-rating');
    const averageStarsElement = document.getElementById('average-stars');
    
    if (!averageRatingElement || !averageStarsElement) return;
    
    const totalRating = ratingsData.reduce((sum, rating) => sum + rating.rating, 0);
    const averageRating = (totalRating / ratingsData.length).toFixed(1);
    
    averageRatingElement.textContent = `${averageRating}/5.0`;
    
    const fullStars = Math.floor(averageRating);
    const hasHalfStar = averageRating % 1 >= 0.5;
    
    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) starsHtml += '<i class="fas fa-star"></i>';
        else if (i === fullStars && hasHalfStar) starsHtml += '<i class="fas fa-star-half-alt"></i>';
        else starsHtml += '<i class="far fa-star"></i>';
    }
    
    averageStarsElement.innerHTML = starsHtml;
}

// --- Projects Data ---
const projectsData = [{
    title: 'FULL Health Bar Customizable',
    description: 'Complete health bar system with managers and bars included. Fully customizable and ready to use.',
    image: 'https://cdn.buymeacoffee.com/uploads/rewards/2025-07-31/1/163104_Logopit_1753979075823.jpg@1200w_0e.jpg',
    price: '€15.00',
    shops: {
        buymeacoffee: 'https://buymeacoffee.com/itsmarwan/e/441215',
        patreon: 'https://www.patreon.com/posts/138063553'
    },
    tags: ['Verse', 'Materials', 'Assets']
}, {
    title: 'Health Bar Customizable',
    description: 'Customizable health bars from the demo video. Does not include the health managers for control.',
    image: 'https://cdn.buymeacoffee.com/uploads/rewards/2025-07-31/1/163104_Logopit_1753979075823.jpg@1200w_0e.jpg',
    price: '€10.00',
    shops: {
        buymeacoffee: 'https://buymeacoffee.com/itsmarwan/e/441225',
        patreon: 'https://www.patreon.com/posts/138063305'
    },
    tags: ['Verse', 'Materials', 'Assets']
}, {
    title: '[Skeleton] UEFN Wallhacks VFX',
    description: 'Custom VFX designed for UEFN. Fully safe and visual only. No cheats or real wallhacks are included.',
    image: 'https://cdn.buymeacoffee.com/uploads/rewards/2025-07-06/1/201118_Logopit_1751832454519.jpg@1200w_0e.jpg',
    price: '€10.00',
    shops: {
        buymeacoffee: 'https://buymeacoffee.com/itsmarwan/e/429192',
        patreon: 'https://www.patreon.com/posts/135722355'
    },
    tags: ['Niagara', 'Verse']
}, {
    title: 'XP Custom Collectables V3',
    description: 'Revamped XP collectables with better meshes, animations, and emissive effects. Easy setup, no edits.',
    image: 'https://cdn.buymeacoffee.com/uploads/rewards/2025-06-15/1/195356_Screenshot_20250615_224307.png@1200w_0e.png',
    price: '€10.00',
    shops: {
        buymeacoffee: 'https://buymeacoffee.com/itsmarwan/e/364541',
        patreon: 'https://www.patreon.com/posts/135722486'
    },
    tags: ['Assets', 'Animations']
}, {
    title: '[Rectangle] UEFN Wallhacks VFX',
    description: 'High-quality visual wallhack VFX for UEFN. Safe, customizable, and 100% cheat-free implementation.',
    image: 'https://cdn.buymeacoffee.com/uploads/rewards/2025-04-13/1/200049_1000030524.jpg@1200w_0e.jpg',
    price: '€9.00',
    shops: {
        buymeacoffee: 'https://buymeacoffee.com/itsmarwan/e/396983',
        patreon: 'https://www.patreon.com/posts/rectangle-uefn-135727168?'
    },
    tags: ['Niagara', 'Verse']
}, {
    title: 'XP Overlay For Tiktok Videos',
    description: 'Custom XP overlay effect for TikTok videos. Features emissive visuals, smooth animations, and setup.',
    image: 'https://cdn.buymeacoffee.com/uploads/rewards/2025-06-07/1/205633_Screenshot_20250607_232837.png@1200w_0e.png',
    price: '€10.00',
    shops: {
        buymeacoffee: 'https://buymeacoffee.com/itsmarwan/e/418811',
        patreon: 'https://www.patreon.com/posts/135722571'
    },
    tags: ['Video', 'Assets']
}, {
    title: 'Custom Emoji Heads',
    description: 'Emoji head assets in .UASSET format. Import easily into your UEFN project directly via explorer.',
    image: 'https://cdn.buymeacoffee.com/uploads/rewards/2025-03-26/1/222556_Screenshot_20250327_002227.png@1200w_0e.png',
    price: '€10.00',
    shops: {
        buymeacoffee: 'https://buymeacoffee.com/itsmarwan/e/390543',
        patreon: 'https://www.patreon.com/posts/135726641'
    },
    tags: ['Niagara', 'Assets']
}, {
    title: 'Pre-Made KICKS',
    description: 'Custom kick assets for 1v1 or FFA maps. Unique sizes included, with options for personal requests.',
    image: 'https://cdn.buymeacoffee.com/uploads/rewards/2025-01-31/1/195623_Screenshot_20250131_215433.png@1200w_0e.png',
    price: '€9.00',
    shops: {
        buymeacoffee: 'https://buymeacoffee.com/itsmarwan/e/366747',
        patreon: 'https://www.patreon.com/posts/135725777'
    },
    tags: ['Niagara', 'Assets']
}, {
    title: 'Ultimate Brainrot Pack',
    description: 'Bundle of 11 cursed 3D memes, sounds, and UEFN assets. Perfect for fun, chaos, and wild creativity.',
    image: 'https://cdn.buymeacoffee.com/uploads/rewards/2025-05-01/1/131346_Screenshot_20250501_161019.png@1200w_0e.png',
    price: '€8.00',
    shops: {
        buymeacoffee: 'https://buymeacoffee.com/itsmarwan/e/403585',
        patreon: 'https://www.patreon.com/posts/135726860'
    },
    tags: ['Assets']
}, {
    title: 'Pre-Made Backblings',
    description: 'Pre-made custom backblings for your maps. Includes tutorial to create your own personalized designs.',
    image: 'https://cdn.buymeacoffee.com/uploads/rewards/2025-03-06/1/143913_1000029409.png@1200w_0e.png',
    price: '€8.00',
    shops: {
        buymeacoffee: 'https://buymeacoffee.com/itsmarwan/e/382560',
        patreon: 'https://www.patreon.com/c/itsmarwan'
    },
    tags: ['Niagara', 'Assets']
}, {
    title: 'Crown 3D Model',
    description: 'Crown 3D Model I Used In The "How To Make a Leaderboard" Video Which includes The Niagara System and the 3D Model!',
    image: 'https://i.ytimg.com/vi/FNPTE6Jewew/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCWpzNtaeIfFMEBIkCccFtng7Higw',
    price: '€0.00',
    downloadLink: 'https://sub2unlock.io/osQSb',
    shops: {
        buymeacoffee: 'https://buymeacoffee.com/itsmarwan/e/382560',
        patreon: 'https://www.patreon.com/c/itsmarwan'
    },
    tags: ['Free', 'Assets']
}, {
    title: 'Pickaxe Manager',
    description: 'Verse Code I Used To Fix The Clipping Of Pickaxes In The Weapons!',
    image: 'https://i.ytimg.com/vi/RRwGqAWyAqY/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAngzYgGNIp9OIiJXNuh4F7Mb07DQ',
    price: '€0.00',
    downloadLink: 'https://sub2unlock.io/3M8NB',
    shops: {
        buymeacoffee: 'https://buymeacoffee.com/itsmarwan/e/382560',
        patreon: 'https://www.patreon.com/c/itsmarwan'
    },
    tags: ['Verse', 'Free']
}, {
    title: 'Custom Car',
    description: 'The Custom Car Verse i Used In My Video (credit @frozenpawn for the verse)!',
    image: 'https://i.ytimg.com/vi/zwIcbON_UsU/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBmjPaMvsGE4Je6bbY-jM1AKE-_1A',
    price: '€0.00',
    downloadLink: 'https://sub2unlock.io/5OHhe',
    shops: {
        buymeacoffee: 'https://buymeacoffee.com/itsmarwan/e/382560',
        patreon: 'https://www.patreon.com/c/itsmarwan'
    },
    tags: ['Verse', 'Assets' , 'Free']
}];

// New global state variables for pagination
const PRODUCTS_PER_PAGE = 6;
let currentPage = 0;
let filteredProjects = [];

// --- Projects Page Functions ---
function renderProjects(projectsToRender, append = false) {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;
    
    // Clear the grid only if not appending
    if (!append) {
        projectsGrid.innerHTML = '';
    }

    const startIndex = currentPage * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    const projectsToDisplay = projectsToRender.slice(startIndex, endIndex);

    projectsToDisplay.forEach(project => {
        const isFree = !project.price || project.price === '0.00£ (0.00£ (€0.00))';

        const projectCard = document.createElement('div');
        projectCard.classList.add('card', 'card-hover', 'rounded-xl', 'shadow-lg', 'border', 'border-gray-700', 'overflow-hidden', 'flex', 'flex-col');
        projectCard.setAttribute('data-tags', project.tags.join(','));
        // Add a data attribute for search filtering
        projectCard.setAttribute('data-search-terms', `${project.title.toLowerCase()} ${project.description.toLowerCase()} ${project.tags.join(' ').toLowerCase()}`);


        const buttonHtml = isFree ? 
            `<a href="${project.downloadLink || '#'}" class="inline-block px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300" target="_blank" rel="noopener noreferrer">Download</a>` :
            `<button class="buy-btn inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300" data-buymeacoffee="${project.shops.buymeacoffee}" data-patreon="${project.shops.patreon}">Buy</button>`;

        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover">
            <div class="p-6 flex flex-col flex-grow">
                <h3 class="text-2xl font-semibold mb-2 text-neon">${project.title}</h3>
                <p class="text-gray-400 text-sm mb-4 flex-grow">${project.description}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${project.tags.map(tag => `<span class="bg-gray-700 text-xs px-2 py-1 rounded-full">${tag}</span>`).join('')}
                </div>
                <div class="flex justify-between items-center mt-auto">
                    <span class="text-xl font-bold text-white">${isFree ? 'Free' : project.price}</span>
                    ${buttonHtml}
                </div>
            </div>
        `;

        projectsGrid.appendChild(projectCard);
    });
}

function updateLoadMoreButtonState() {
    const loadMoreBtnContainer = document.getElementById('load-more-container');
    if (!loadMoreBtnContainer) return;
    
    // Check if there are more products to load
    const hasMoreProducts = (currentPage + 1) * PRODUCTS_PER_PAGE < filteredProjects.length;
    
    if (hasMoreProducts) {
        loadMoreBtnContainer.style.display = 'block';
    } else {
        loadMoreBtnContainer.style.display = 'none';
    }
}

function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search-input');
    const loadMoreBtn = document.getElementById('load-more-btn');

    if (!filterButtons.length || !searchInput) return;

    // Filter and search logic combined in a single function
    const applyFiltersAndSearch = () => {
        const activeFilter = document.querySelector('.filter-btn.active-filter')?.dataset.filter || 'all';
        const searchTerm = searchInput.value.toLowerCase().trim();

        // 1. Filter the projectsData array based on active filter and search term
        filteredProjects = projectsData.filter(project => {
            const tags = project.tags;
            const searchTerms = `${project.title.toLowerCase()} ${project.description.toLowerCase()} ${tags.join(' ').toLowerCase()}`;
            
            const isFilterMatch = activeFilter === 'all' || tags.includes(activeFilter);
            const isSearchMatch = searchTerms.includes(searchTerm);
            
            return isFilterMatch && isSearchMatch;
        });

        // 2. Reset the page and render the filtered results
        currentPage = 0;
        renderProjects(filteredProjects);
        updateLoadMoreButtonState();
    };
    
    // Handle "Load More" button click
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            currentPage++;
            renderProjects(filteredProjects, true); // Pass `true` to append
            updateLoadMoreButtonState();
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active-filter'));
            button.classList.add('active-filter');
            applyFiltersAndSearch();
        });
    });

    // Event listener for the search input
    searchInput.addEventListener('input', applyFiltersAndSearch);

    // Initial call to set up the display
    document.querySelector('.filter-btn[data-filter="all"]')?.click();
}

// --- Mobile Navigation Select ---
function initializeMobilePlanetSelect() {
    const mobileSelect = document.getElementById('mobile-planet-select');
    if (mobileSelect) {
        // Change the event listener from 'click' to 'change'
        mobileSelect.addEventListener('change', (event) => {
            const selectedUrl = event.target.value;
            if (selectedUrl) {
                window.location.href = selectedUrl;
            }
        });
    }
}


// --- Shop Modal Functions ---
function initializeShopModal() {
    const modal = document.getElementById('shop-modal');
    const projectsGrid = document.getElementById('projects-grid');

    if (!modal || !projectsGrid) return;
    
    // Use the new, correct ID for the shop modal close button
    const closeModalBtn = document.getElementById('close-shop-modal-btn');
    // Also use the modal-bg for background clicks
    const modalBg = document.querySelector('.modal-bg');

    const bmcLinkEl = document.getElementById('buymeacoffee-link');
    const patreonLinkEl = document.getElementById('patreon-link');

    function showShopModal(bmcLink, patreonLink) {
        bmcLinkEl.href = bmcLink;
        patreonLinkEl.href = patreonLink;
        // First, remove the 'hidden' class to make it visible
        modal.classList.remove('hidden');
        // Add a slight delay to allow the browser to register the removal of 'hidden'
        // before adding the 'visible' class, which triggers the animation.
        setTimeout(() => {
            modal.classList.add('visible');
            modal.classList.remove('opacity-0');
        }, 10);
    }

    function closeShopModal() {
        // Add back the opacity-0 class to fade the modal out
        modal.classList.add('opacity-0');
        // Remove the 'visible' class to start the fade-out animation
        modal.classList.remove('visible');
        // Wait for the transition to finish (300ms) before adding the 'hidden' class
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 310);
    }

    // Event Delegation for Buy buttons
    projectsGrid.addEventListener('click', (e) => {
        const buyButton = e.target.closest('.buy-btn');
        if (buyButton) {
            const { buymeacoffee, patreon } = buyButton.dataset;
            showShopModal(buymeacoffee, patreon);
        }
    });

    // Event listener for the "X" button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeShopModal);
    }
    
    // Event listener for the modal background
    if (modalBg) {
        modalBg.addEventListener('click', closeShopModal);
    }
    
    // Close modal on 'Escape' key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('visible')) {
            closeShopModal();
        }
    });
}

// --- Menu & Scroll Effects ---
function initializeMenuButton() {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            // Toggle the `is-open` class on the menu for visibility
            mobileMenu.classList.toggle('is-open');
            // Toggle the `active` class on the button for the animation
            menuBtn.classList.toggle('active');
        });
    }
}

// Initialize the menu button immediately after the HTML is loaded.
initializeMenuButton();

function initializeScrollEffects() {
    const backToTopBtn = document.getElementById('back-to-top');
    const navbar = document.querySelector('nav');
    const footerItems = document.querySelectorAll('.footer-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    footerItems.forEach(item => observer.observe(item));

    window.addEventListener('scroll', () => {
        if (backToTopBtn) backToTopBtn.classList.toggle('visible', window.scrollY > 300);
        if (navbar) navbar.classList.toggle('bg-opacity-80', window.scrollY > 50);
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
}

// --- FAQ Section Functionality ---
function initializeFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.fa-chevron-down');

            // Close all other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                    otherItem.querySelector('.fa-chevron-down').style.transform = 'rotate(0deg)';
                }
            });

            // Toggle the clicked item
            item.classList.toggle('active');
            if (item.classList.contains('active')) {
                // Set the height to scrollHeight for smooth transition
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.style.transform = 'rotate(180deg)';
            } else {
                answer.style.maxHeight = '0';
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
}

// --- Main Initializer ---
document.addEventListener('DOMContentLoaded', () => {
    fetchRatingsAndInitialize();
    
    if (document.getElementById('projects-grid')) {
        initializeProjectFilters();
        initializeShopModal();
    }
    
    // Add this line to initialize the FAQ functionality
    if (document.getElementById('faq')) {
        initializeFaqAccordion();
    }
    
    // This call is now removed. It will be initialized from loaders.js
});