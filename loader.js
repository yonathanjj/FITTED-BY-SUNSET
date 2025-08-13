// loader.js
document.addEventListener("DOMContentLoaded", () => {

    const loadComponent = (url, placeholderId, callback) => {
        const cacheBust = `?v=${Date.now()}`;
        fetch(url + cacheBust)
            .then(res => {
                if (!res.ok) throw new Error(`Failed to load ${url} (${res.status})`);
                return res.text();
            })
            .then(html => {
                const placeholder = document.getElementById(placeholderId);
                if (!placeholder) {
                    console.error(`Placeholder #${placeholderId} not found`);
                    return;
                }
                placeholder.innerHTML = html;
                if (typeof callback === "function") callback();
            })
            .catch(err => console.error(err));
    };

    // Initialize hamburger menu after navbar loads
    const initializeNavbar = () => {
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const closeMenuBtn = document.getElementById('close-menu-btn');

        if (!hamburgerBtn || !mobileMenu || !closeMenuBtn) {
            console.error("Navbar elements not found after load.");
            return;
        }

        hamburgerBtn.addEventListener('click', () => {
            mobileMenu.classList.add('open');
            document.body.style.overflow = 'hidden';
        });

        closeMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });

        // Optional: close menu when a link is clicked
        document.querySelectorAll('.mobile-nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    };

    loadComponent("navbar.html", "navbar-placeholder", initializeNavbar);
    loadComponent("footer.html", "footer-placeholder");
});
