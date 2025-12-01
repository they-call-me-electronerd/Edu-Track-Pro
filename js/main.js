document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Shrink Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // Theme Toggle
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('i');
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
        
        // Toggle theme on click
        themeToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentTheme = document.documentElement.getAttribute('data-theme');
            
            if (currentTheme === 'light') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        });
    }

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '60px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = '#1e293b';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
            }
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // Advanced 3D Magnetic Tilt for Floating Card
    const floatingCard = document.querySelector('.floating-card');
    if (floatingCard) {
        floatingCard.addEventListener('mousemove', (e) => {
            const rect = floatingCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * 15;
            const rotateY = ((centerX - x) / centerX) * 15;
            
            floatingCard.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                scale3d(1.05, 1.05, 1.05)
                translateZ(20px)
            `;
        });
        
        floatingCard.addEventListener('mouseleave', () => {
            floatingCard.style.transform = `
                perspective(1000px) 
                rotateY(-12deg) 
                rotateX(8deg) 
                scale3d(1, 1, 1)
                translateZ(0px)
            `;
        });
        
        // Add parallax effect
        document.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            
            const techVisual = document.querySelector('.tech-visual');
            if (techVisual) {
                techVisual.style.transform = `
                    translate(${moveX}px, ${moveY}px) 
                    translateY(-15px)
                `;
            }
        });
    }

    // Benefit Cards Minimal Hover Effects
    document.querySelectorAll('.benefit-card').forEach((card, index) => {
        card.style.setProperty('--card-index', index);
    });

    // Feature Card Spotlight Effect
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Scroll Animation Observer with Stagger
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active', 'fade-in-up');
            }
        });
    }, observerOptions);

    const simContainer = document.querySelector('.simulation-container');
    if (simContainer) {
        observer.observe(simContainer);
    }
    
    // Observe section headings
    document.querySelectorAll('.section-title, h2').forEach(heading => {
        observer.observe(heading);
    });
});
