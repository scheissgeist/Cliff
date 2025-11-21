// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effects
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    function updateNavbar() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(44, 62, 80, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    }
    
    window.addEventListener('scroll', updateNavbar);
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for grid items
                if (entry.target.closest('.skills-grid') || 
                    entry.target.closest('.testimonials-grid')) {
                    const siblings = Array.from(entry.target.parentNode.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Observe elements for animations
    const elementsToAnimate = document.querySelectorAll(
        '.skill-item, .testimonial-card, .stat-card, .equipment-gallery img'
    );
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const consent = this.querySelector('input[type="checkbox"]').checked;
            
            if (!name || !email) {
                alert('Please fill in all required fields.');
                return;
            }
            
            if (!consent) {
                alert('Please agree to receiving marketing materials.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.btn-newsletter');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for subscribing! We\'ll keep you updated on workshops and film industry opportunities.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Enhanced hover effects for skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Testimonial card interactions
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderTopColor = '#f39c12';
            this.style.borderTopWidth = '6px';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderTopColor = '#8b4513';
            this.style.borderTopWidth = '4px';
        });
    });

    // Equipment gallery lightbox effect (simple version)
    const equipmentImages = document.querySelectorAll('.equipment-gallery img');
    equipmentImages.forEach(img => {
        img.addEventListener('click', function() {
            // Create overlay
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                cursor: pointer;
            `;
            
            // Create enlarged image
            const enlargedImg = document.createElement('img');
            enlargedImg.src = this.src;
            enlargedImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 10px;
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
            `;
            
            overlay.appendChild(enlargedImg);
            document.body.appendChild(overlay);
            
            // Close on click
            overlay.addEventListener('click', function() {
                document.body.removeChild(overlay);
            });
            
            // Close on escape key
            const closeOnEscape = function(e) {
                if (e.key === 'Escape') {
                    document.body.removeChild(overlay);
                    document.removeEventListener('keydown', closeOnEscape);
                }
            };
            document.addEventListener('keydown', closeOnEscape);
        });
    });

    // Parallax effect for hero section (subtle)
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Active section highlighting in navigation
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);

    // Counter animation for statistics (if you add any)
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #8b4513, #f39c12);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(scrollProgress);

    function updateScrollProgress() {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = Math.min(scrollPercent, 100) + '%';
    }

    window.addEventListener('scroll', updateScrollProgress);

    // Form validation enhancements
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim() === '') {
                    this.style.borderColor = '#e74c3c';
                } else {
                    this.style.borderColor = '#27ae60';
                }
            });
            
            input.addEventListener('focus', function() {
                this.style.borderColor = '#8b4513';
            });
        });
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Button click effects
    const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary, .btn-primary-large, .btn-register');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .nav-menu a.active {
            color: #8b4513;
        }
        
        .nav-menu a.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);

    // Workshop date countdown (optional enhancement)
    const workshopDate = new Date('2025-11-15T09:00:00');
    
    function updateCountdown() {
        const now = new Date();
        const diff = workshopDate - now;
        
        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            
            // You could add a countdown display here if desired
            console.log(`Workshop in ${days} days, ${hours} hours`);
        }
    }
    
    setInterval(updateCountdown, 60000);
    updateCountdown();

    console.log('Film Crew Workshop V2 - All interactive features loaded successfully!');
});

// Utility functions
window.WorkshopUtils = {
    // Smooth scroll to element
    scrollToElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            const offsetTop = element.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    },
    
    // Track engagement (placeholder for analytics)
    trackEvent(eventName, eventData = {}) {
        console.log('Event:', eventName, eventData);
        // Integration point for analytics services
    },
    
    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#8b4513'};
            color: white;
            border-radius: 5px;
            z-index: 10000;
            font-weight: 500;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
};