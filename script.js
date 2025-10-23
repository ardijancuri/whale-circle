// Main JavaScript for Whale Circle Website

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');

            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 2px 20px rgba(14, 17, 22, 0.08)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate elements on scroll
    const animateElements = document.querySelectorAll(
        '.service-card, .process-step, .stat-item, .about-text, .about-image'
    );

    animateElements.forEach(el => {
        // Skip paradigm elements as they're animated with GSAP
        if (!el.classList.contains('paradigm-card') && !el.classList.contains('paradigm-image')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        }
    });

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);

            // Here you would typically send the data to a server
            // For now, we'll just show a success message
            showNotification('Thank you! Your message has been sent successfully.', 'success');

            // Reset form
            contactForm.reset();
        });
    }

    // CTA Button interactions
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta');

    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (!button.closest('form')) {
                e.preventDefault();

                // Add ripple effect
                createRipple(e, button);

                // Scroll to contact section for CTA buttons
                if (button.textContent.includes('Get Started') ||
                    button.textContent.includes('Explore More')) {
                    setTimeout(() => {
                        const contactSection = document.querySelector('#contact');
                        if (contactSection) {
                            const navHeight = document.querySelector('.nav').offsetHeight;
                            const targetPosition = contactSection.offsetTop - navHeight;

                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }, 300);
                }
            }
        });
    });

    // Service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            serviceCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.style.opacity = '0.6';
                }
            });
        });

        card.addEventListener('mouseleave', () => {
            serviceCards.forEach(otherCard => {
                otherCard.style.opacity = '1';
            });
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');

        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });

    // Stats counter animation
    const statsNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                animateStats();
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    function animateStats() {
        statsNumbers.forEach(stat => {
            const target = stat.textContent;
            const isPercent = target.includes('%');
            const isPlus = target.includes('+');
            const number = parseInt(target.replace(/\D/g, ''));

            let current = 0;
            const increment = number / 50;
            const duration = 2000;
            const stepTime = duration / 50;

            const timer = setInterval(() => {
                current += increment;

                if (current >= number) {
                    current = number;
                    clearInterval(timer);
                }

                let displayValue = Math.floor(current);
                if (isPlus) displayValue += '+';
                if (isPercent) displayValue += '%';

                stat.textContent = displayValue;
            }, stepTime);
        });
    }

    // GSAP ScrollTrigger animations for About section
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Wait for everything to be ready
        window.addEventListener('load', () => {
            // Make sure cards are visible initially
            gsap.set('.paradigm-card', { opacity: 1, x: 0 });
            gsap.set('.paradigm-image', { opacity: 1, scale: 1 });
            gsap.set('.connection-card', { opacity: 1, y: 0 });
            gsap.set('.connection-image-top', { opacity: 1, scale: 1 });
            gsap.set('.process-step', { opacity: 1, x: 0 });
            gsap.set('.wellness-image', { opacity: 1, scale: 1 });
            gsap.set('.stat-circle', { opacity: 1, scale: 1 });
            gsap.set('.padel-quote', { opacity: 1, x: 0 });
            gsap.set('.timeline-item', { opacity: 1, x: 0 });
            gsap.set('.timeline-number', { opacity: 1, scale: 1, rotation: 0 });
            gsap.set('.cryptocare-tagline', { opacity: 1, y: 0 });
            gsap.set('.event-image-wrapper', { opacity: 1, x: 0 });
            gsap.set('.event-card', { opacity: 1, y: 0 });

            // Animate paradigm cards on scroll
            gsap.from('.paradigm-card', {
                scrollTrigger: {
                    trigger: '.paradigm-cards',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                    markers: false
                },
                x: -50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out'
            });

            // Fade in the paradigm image
            gsap.from('.paradigm-image', {
                scrollTrigger: {
                    trigger: '.paradigm-image',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                    markers: false
                },
                opacity: 0,
                scale: 0.95,
                duration: 1,
                ease: 'power2.out'
            });

            // Fade in the connection image at top
            gsap.from('.connection-image-top', {
                scrollTrigger: {
                    trigger: '.connection-image-top',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                    markers: false
                },
                opacity: 0,
                scale: 0.95,
                duration: 1,
                ease: 'power2.out'
            });

            // Animate connection cards on scroll (from bottom)
            gsap.from('.connection-card', {
                scrollTrigger: {
                    trigger: '.connection-cards-row',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                    markers: false
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out'
            });

            // Animate wellness process steps
            gsap.from('.process-step', {
                scrollTrigger: {
                    trigger: '.process-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                    markers: false
                },
                x: -50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out'
            });

            // Fade in wellness image
            gsap.from('.wellness-image', {
                scrollTrigger: {
                    trigger: '.wellness-image',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                    markers: false
                },
                opacity: 0,
                scale: 0.95,
                duration: 1,
                ease: 'power2.out'
            });

            // Animate padel circular stats
            gsap.from('.stat-circle', {
                scrollTrigger: {
                    trigger: '.padel-stats',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                    markers: false
                },
                scale: 0,
                opacity: 0,
                duration: 1,
                stagger: 0.3,
                ease: 'back.out(1.7)'
            });

            // Animate padel quote (full width)
            gsap.from('.padel-quote', {
                scrollTrigger: {
                    trigger: '.padel-quote',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                    markers: false
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            });

            // Animate padel tournaments section
            gsap.from('.padel-tournaments', {
                scrollTrigger: {
                    trigger: '.padel-tournaments',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                    markers: false
                },
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            });

            // Animate each timeline item with content appearing first, then number
            document.querySelectorAll('.timeline-item').forEach((item, index) => {
                const content = item.querySelector('.timeline-content');
                const number = item.querySelector('.timeline-number');

                gsap.from(content, {
                    scrollTrigger: {
                        trigger: '.timeline-items',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                        markers: false
                    },
                    x: 50,
                    opacity: 0,
                    duration: 0.8,
                    delay: index * 0.4,
                    ease: 'power2.out'
                });

                gsap.from(number, {
                    scrollTrigger: {
                        trigger: '.timeline-items',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                        markers: false
                    },
                    scale: 0,
                    rotation: 180,
                    opacity: 0,
                    duration: 0.6,
                    delay: (index * 0.4) + 0.4,
                    ease: 'back.out(1.7)'
                });
            });

            // Animate cryptocare tagline
            gsap.from('.cryptocare-tagline', {
                scrollTrigger: {
                    trigger: '.cryptocare-tagline',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                    markers: false
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            });

            // Animate exclusive events images
            gsap.from('.event-image-wrapper', {
                scrollTrigger: {
                    trigger: '.events-images',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                    markers: false
                },
                x: -50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out'
            });

            // Animate event cards
            gsap.from('.event-card', {
                scrollTrigger: {
                    trigger: '.events-cards-column',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                    markers: false
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out'
            });

            // Counter animation for vitality stats
            const counters = document.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                ScrollTrigger.create({
                    trigger: counter,
                    start: 'top 80%',
                    onEnter: () => {
                        const target = parseFloat(counter.getAttribute('data-target'));
                        const duration = 2;
                        const increment = target / (duration * 60);
                        let current = 0;
                        const isDecimal = target % 1 !== 0;

                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                counter.textContent = isDecimal ? target.toFixed(1) : Math.round(target);
                                clearInterval(timer);
                            } else {
                                counter.textContent = isDecimal ? current.toFixed(1) : Math.round(current);
                            }
                        }, 1000 / 60);
                    },
                    once: true
                });
            });
        });
    } else {
        // Fallback if GSAP is not loaded - make sure elements are visible
        const paradigmCards = document.querySelectorAll('.paradigm-card');
        const paradigmImage = document.querySelector('.paradigm-image');
        const connectionCards = document.querySelectorAll('.connection-card');
        const connectionImageTop = document.querySelector('.connection-image-top');
        const processSteps = document.querySelectorAll('.process-step');
        const wellnessImage = document.querySelector('.wellness-image');

        paradigmCards.forEach(card => {
            card.style.opacity = '1';
        });

        if (paradigmImage) {
            paradigmImage.style.opacity = '1';
        }

        connectionCards.forEach(card => {
            card.style.opacity = '1';
        });

        if (connectionImageTop) {
            connectionImageTop.style.opacity = '1';
        }

        processSteps.forEach(step => {
            step.style.opacity = '1';
        });

        if (wellnessImage) {
            wellnessImage.style.opacity = '1';
        }

        const statCircles = document.querySelectorAll('.stat-circle');
        const padelQuote = document.querySelector('.padel-quote');

        statCircles.forEach(circle => {
            circle.style.opacity = '1';
        });

        if (padelQuote) {
            padelQuote.style.opacity = '1';
        }
    }
});

// Helper function to create ripple effect
function createRipple(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Helper function to show notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    notification.style.position = 'fixed';
    notification.style.bottom = '30px';
    notification.style.right = '30px';
    notification.style.padding = '1rem 1.5rem';
    notification.style.background = type === 'success' ? '#8FD3FE' : '#0E1116';
    notification.style.color = type === 'success' ? '#0E1116' : '#FFFFFF';
    notification.style.borderRadius = '8px';
    notification.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    notification.style.zIndex = '10000';
    notification.style.fontWeight = '600';
    notification.style.animation = 'slideInUp 0.3s ease';

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    @keyframes slideInUp {
        from {
            transform: translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events if needed
const throttledScroll = throttle(() => {
    // Any heavy scroll operations can go here
}, 100);

window.addEventListener('scroll', throttledScroll);
