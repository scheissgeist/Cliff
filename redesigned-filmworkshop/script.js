// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    const elementsToAnimate = document.querySelectorAll('.skill-card, .testimonial-card, .pricing-card');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Navbar scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollY = window.scrollY;
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const name = this.querySelector('input[type="text"]').value;
            
            if (email && name) {
                // Here you would normally send the data to your server
                alert('Thank you for subscribing! We\'ll keep you updated on upcoming workshops.');
                this.reset();
            } else {
                alert('Please fill in both your name and email address.');
            }
        });
    }

    // Pricing card interactions
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('featured')) {
                this.style.transform = 'scale(1.05)';
            } else {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // Add click tracking for CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button-primary, .cta-button-nav, .pricing-cta, .alert-cta');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add analytics tracking here
            console.log('CTA clicked:', this.textContent);
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Countdown timer for urgency (optional)
    function updateCountdown() {
        const workshopDate = new Date('2025-11-15T09:00:00');
        const now = new Date();
        const diff = workshopDate - now;

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            
            // You can add a countdown display here if desired
            console.log(`Workshop in ${days} days, ${hours} hours`);
        }
    }

    // Update countdown every minute
    setInterval(updateCountdown, 60000);
    updateCountdown();

    // Mobile menu toggle (if you want to add a hamburger menu later)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth scroll to registration section
    window.scrollToRegistration = function() {
        const registrationSection = document.getElementById('registration');
        if (registrationSection) {
            registrationSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // Add loading states to forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitButton = this.querySelector('button[type="submit"]');
            if (submitButton) {
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Processing...';
                submitButton.disabled = true;
                
                // Re-enable after 3 seconds (adjust based on your actual form processing)
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 3000);
            }
        });
    });

    // Add scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #e74c3c, #f39c12);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = Math.min(scrollPercent, 100) + '%';
    });

    // Add testimonial rotation (optional)
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;

    function rotateTestimonials() {
        testimonialCards.forEach((card, index) => {
            if (index === currentTestimonial) {
                card.style.transform = 'scale(1.05)';
                card.style.boxShadow = '0 20px 40px rgba(231, 76, 60, 0.2)';
            } else {
                card.style.transform = 'scale(1)';
                card.style.boxShadow = '';
            }
        });
        
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    }

    // Rotate testimonials every 5 seconds
    setInterval(rotateTestimonials, 5000);
});

// Add utility functions for external use
window.FilmWorkshopUtils = {
    // Track conversion events
    trackConversion: function(eventName, eventData = {}) {
        console.log('Conversion Event:', eventName, eventData);
        // Integrate with Google Analytics, Facebook Pixel, etc.
    },

    // Show pricing modal (if you want to add one later)
    showPricingModal: function(workshopType) {
        console.log('Show pricing for:', workshopType);
        // Implementation for pricing modal
    },

    // Calculate savings
    calculateSavings: function(originalPrice, discountPercent) {
        return originalPrice * (discountPercent / 100);
    }
};

// Performance optimization: Lazy load images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});