// loader.js

// Wait for the initial HTML document to be fully loaded and parsed.
document.addEventListener("DOMContentLoaded", () => {

    /**
     * The function that makes the hamburger menu interactive.
     * It should only be called AFTER the navbar has been loaded into the DOM.
     */
    const initializeNavbar = () => {
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const closeMenuBtn = document.getElementById('close-menu-btn');

        // Safety check: if any element is missing, log an error and stop.
        if (!hamburgerBtn || !mobileMenu || !closeMenuBtn) {
            console.error("Navbar interactive elements not found. Check navbar.html for IDs: hamburger-btn, mobile-menu, close-menu-btn.");
            return;
        }

        const openMenu = () => {
            mobileMenu.classList.add('open');
            document.body.style.overflow = 'hidden'; // Prevents scrolling the background
        };

        const closeMenu = () => {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = ''; // Re-enables scrolling
        };

        // Event listeners
        hamburgerBtn.addEventListener('click', openMenu);
        closeMenuBtn.addEventListener('click', closeMenu);

        // Also close the menu if a navigation link is clicked inside the mobile menu
        const navLinks = mobileMenu.querySelectorAll('.mobile-nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    };

    /**
     * Fetches HTML content from a file and injects it into a placeholder element.
     * @param {string} url - The path to the HTML file to load.
     * @param {string} placeholderId - The ID of the element to inject the HTML into.
     * @param {function} [callback] - An optional function to run after the content is loaded.
     */
    const loadComponent = (url, placeholderId, callback) => {
        // Add a cache-busting query parameter to prevent loading old versions
        const cacheBust = `?v=${new Date().getTime()}`;
        fetch(url + cacheBust)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${url}: ${response.statusText}`);
                }
                return response.text();
            })
            .then(html => {
                const placeholder = document.getElementById(placeholderId);
                if (placeholder) {
                    placeholder.innerHTML = html;
                    // If a callback function was provided, execute it.
                    // This is the key to making the navbar interactive.
                    if (typeof callback === 'function') {
                        callback();
                    }
                } else {
                    console.error(`Placeholder element with ID #${placeholderId} not found.`);
                }
            })
            .catch(error => console.error(error));
    };

    // --- SCRIPT EXECUTION ---
    // 1. Load the navbar.
    // 2. WHEN it's finished, run the initializeNavbar function as a callback.
    loadComponent('navbar.html', 'navbar-placeholder', initializeNavbar);

    // Load the footer (assuming you have a footer.html and a footer-placeholder).
    // It doesn't need a callback if it's not interactive.
    loadComponent('footer.html', 'footer-placeholder');

});