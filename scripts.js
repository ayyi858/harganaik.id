/**
 * HargaNaik.ID - JavaScript Functionality
 * Author: Team HargaNaik.ID
 * Version: 1.0
 * Description: JavaScript functionality untuk website HargaNaik.ID
 */

// Tunggu DOM selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // DOM Elements
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const overlay = document.getElementById('overlay');
    const header = document.querySelector('.header');

    // Mobile Navigation Toggle
    if (menuToggle && mainNav && overlay) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('open');
            overlay.classList.toggle('active');
        });
        
        overlay.addEventListener('click', () => {
            mainNav.classList.remove('open');
            overlay.classList.remove('active');
        });
    }

    // Smooth Scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mainNav && overlay) {
                    mainNav.classList.remove('open');
                    overlay.classList.remove('active');
                }
                
                // Update active links
                document.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Header scroll effect
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Update active navigation links on scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Form validation for newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const emailValue = emailInput.value.trim();
            
            // Basic email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (emailValue === '' || !emailPattern.test(emailValue)) {
                // Show error (could be enhanced with proper error messages)
                emailInput.style.borderColor = 'var(--danger)';
                emailInput.focus();
                
                // Optional: Add shake animation
                emailInput.classList.add('shake');
                setTimeout(() => {
                    emailInput.classList.remove('shake');
                }, 500);
            } else {
                // Success - in a real application, you would submit to server
                emailInput.style.borderColor = 'var(--success)';
                emailInput.value = '';
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'newsletter-success';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Terima kasih telah berlangganan newsletter kami!';
                
                newsletterForm.appendChild(successMessage);
                
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            }
        });
    }

    // Screenshots lightbox/modal
    const screenshots = document.querySelectorAll('.screenshot');
    
    if (screenshots.length > 0) {
        // Create modal if it doesn't exist
        if (!document.querySelector('.screenshot-modal')) {
            const modal = document.createElement('div');
            modal.className = 'screenshot-modal';
            modal.innerHTML = `
                <div class="screenshot-modal-content">
                    <span class="screenshot-modal-close">&times;</span>
                    <img class="screenshot-modal-img" src="" alt="Screenshot Full View">
                </div>
            `;
            document.body.appendChild(modal);
            
            // Add modal styles if not already in CSS
            if (!document.querySelector('#screenshot-modal-styles')) {
                const style = document.createElement('style');
                style.id = 'screenshot-modal-styles';
                style.textContent = `
                    .screenshot-modal {
                        display: none;
                        position: fixed;
                        z-index: 9999;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        overflow: auto;
                        background-color: rgba(0,0,0,0.9);
                        padding: 2rem;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    }
                    .screenshot-modal.active {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        opacity: 1;
                    }
                    .screenshot-modal-content {
                        position: relative;
                        max-width: 90%;
                        max-height: 90%;
                    }
                    .screenshot-modal-img {
                        max-width: 100%;
                        max-height: 90vh;
                        display: block;
                        margin: 0 auto;
                        box-shadow: 0 5px 25px rgba(0,0,0,0.2);
                        border-radius: 5px;
                    }
                    .screenshot-modal-close {
                        position: absolute;
                        top: -30px;
                        right: -30px;
                        color: white;
                        font-size: 2rem;
                        font-weight: bold;
                        cursor: pointer;
                        width: 30px;
                        height: 30px;
                        line-height: 30px;
                        text-align: center;
                        transition: all 0.3s ease;
                    }
                    .screenshot-modal-close:hover {
                        transform: scale(1.2);
                    }
                `;
                document.head.appendChild(style);
            }
            
            // Get modal elements
            const screenshotModal = document.querySelector('.screenshot-modal');
            const modalImg = document.querySelector('.screenshot-modal-img');
            const modalClose = document.querySelector('.screenshot-modal-close');
            
            // Open modal on click
            screenshots.forEach(screenshot => {
                screenshot.addEventListener('click', function() {
                    const imgSrc = this.querySelector('img').getAttribute('src');
                    modalImg.setAttribute('src', imgSrc);
                    screenshotModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            });
            
            // Close modal
            modalClose.addEventListener('click', () => {
                screenshotModal.classList.remove('active');
                document.body.style.overflow = 'auto';
                
                // Clear src after transition
                setTimeout(() => {
                    modalImg.setAttribute('src', '');
                }, 300);
            });
            
            // Close on outside click
            screenshotModal.addEventListener('click', (e) => {
                if (e.target === screenshotModal) {
                    screenshotModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    
                    // Clear src after transition
                    setTimeout(() => {
                        modalImg.setAttribute('src', '');
                    }, 300);
                }
            });
            
            // Close on ESC key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && screenshotModal.classList.contains('active')) {
                    screenshotModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    
                    // Clear src after transition
                    setTimeout(() => {
                        modalImg.setAttribute('src', '');
                    }, 300);
                }
            });
        }
    }

    // Counter animation for statistics
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        const countUp = (counter, target) => {
            const count = +counter.innerText;
            const increment = target / 100;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(() => countUp(counter, target), 15);
            } else {
                counter.innerText = target;
            }
        };
        
        const startCounting = () => {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                counter.innerText = '0';
                countUp(counter, target);
            });
        };
        
        // Start counting when in viewport
        const counterSection = document.querySelector('.counter-section');
        if (counterSection) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    startCounting();
                    observer.unobserve(counterSection);
                }
            }, { threshold: 0.5 });
            
            observer.observe(counterSection);
        } else {
            // Fallback if counter section doesn't exist
            // Look for any parent section containing counters
            counters.forEach(counter => {
                const parentSection = counter.closest('section');
                if (parentSection) {
                    const observer = new IntersectionObserver((entries) => {
                        if (entries[0].isIntersecting) {
                            const target = +counter.getAttribute('data-target');
                            counter.innerText = '0';
                            countUp(counter, target);
                            observer.unobserve(parentSection);
                        }
                    }, { threshold: 0.5 });
                    
                    observer.observe(parentSection);
                }
            });
        }
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            question.addEventListener('click', () => {
                // Toggle current item
                item.classList.toggle('active');
                
                // Recalculate max-height to enable CSS transition
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    answer.style.maxHeight = '0';
                }
                
                // Close other items (optional - for single-open accordion)
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                    }
                });
            });
        });
    }

    // Pricing toggle (if pricing toggle exists)
    const pricingToggle = document.querySelector('.pricing-toggle');
    const monthlyPrices = document.querySelectorAll('.monthly-price');
    const yearlyPrices = document.querySelectorAll('.yearly-price');

    if (pricingToggle && monthlyPrices.length && yearlyPrices.length) {
        pricingToggle.addEventListener('change', function() {
            if (this.checked) {
                monthlyPrices.forEach(price => price.style.display = 'none');
                yearlyPrices.forEach(price => price.style.display = 'block');
            } else {
                monthlyPrices.forEach(price => price.style.display = 'block');
                yearlyPrices.forEach(price => price.style.display = 'none');
            }
        });
    }

    // Testimonial slider (if exists)
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    
    if (testimonialSlider && testimonialItems.length > 1) {
        // Create navigation dots if not exist
        if (!document.querySelector('.testimonial-dots')) {
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'testimonial-dots';
            
            testimonialItems.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.className = 'testimonial-dot';
                if (index === 0) dot.classList.add('active');
                dotsContainer.appendChild(dot);
            });
            
            testimonialSlider.appendChild(dotsContainer);
        }
        
        const testimonialDots = document.querySelectorAll('.testimonial-dot');
        let currentTestimonial = 0;
        let isAnimating = false;
        let autoplayInterval;
        
        function showTestimonial(index) {
            if (isAnimating) return;
            isAnimating = true;
            
            testimonialItems.forEach(item => item.classList.remove('active', 'next', 'prev'));
            testimonialDots.forEach(dot => dot.classList.remove('active'));
            
            testimonialItems[currentTestimonial].classList.add('prev');
            testimonialItems[index].classList.add('next');
            
            // Force reflow
            void testimonialSlider.offsetWidth;
            
            testimonialItems[index].classList.add('active');
            testimonialDots[index].classList.add('active');
            
            setTimeout(() => {
                testimonialItems[currentTestimonial].classList.remove('prev');
                testimonialItems[index].classList.remove('next');
                currentTestimonial = index;
                isAnimating = false;
            }, 600); // Match transition duration
        }
        
        function nextTestimonial() {
            const nextIndex = (currentTestimonial + 1) % testimonialItems.length;
            showTestimonial(nextIndex);
        }
        
        function prevTestimonial() {
            const prevIndex = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
            showTestimonial(prevIndex);
        }
        
        // Event listeners for dots
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (index !== currentTestimonial) {
                    showTestimonial(index);
                    
                    // Reset autoplay timer
                    if (autoplayInterval) {
                        clearInterval(autoplayInterval);
                        startAutoplay();
                    }
                }
            });
        });
        
        // Add navigation arrows if they don't exist
        if (!document.querySelector('.testimonial-nav')) {
            const navContainer = document.createElement('div');
            navContainer.className = 'testimonial-nav';
            
            const prevButton = document.createElement('button');
            prevButton.className = 'testimonial-prev';
            prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
            prevButton.addEventListener('click', () => {
                prevTestimonial();
                
                // Reset autoplay timer
                if (autoplayInterval) {
                    clearInterval(autoplayInterval);
                    startAutoplay();
                }
            });
            
            const nextButton = document.createElement('button');
            nextButton.className = 'testimonial-next';
            nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
            nextButton.addEventListener('click', () => {
                nextTestimonial();
                
                // Reset autoplay timer
                if (autoplayInterval) {
                    clearInterval(autoplayInterval);
                    startAutoplay();
                }
            });
            
            navContainer.appendChild(prevButton);
            navContainer.appendChild(nextButton);
            testimonialSlider.appendChild(navContainer);
        }
        
        // Add swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        testimonialSlider.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        testimonialSlider.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const threshold = 50; // Minimum swipe distance
            if (touchEndX < touchStartX - threshold) {
                // Swipe left, show next
                nextTestimonial();
            } else if (touchEndX > touchStartX + threshold) {
                // Swipe right, show previous
                prevTestimonial();
            }
            
            // Reset autoplay timer on swipe
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                startAutoplay();
            }
        }
        
        // Auto rotate testimonials
        function startAutoplay() {
            autoplayInterval = setInterval(() => {
                nextTestimonial();
            }, 5000);
        }
        
        // Start autoplay
        startAutoplay();
        
        // Pause autoplay on hover
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            startAutoplay();
        });
        
        // Add necessary CSS if not already in stylesheet
        if (!document.querySelector('#testimonial-styles')) {
            const style = document.createElement('style');
            style.id = 'testimonial-styles';
            style.textContent = `
                .testimonial-slider {
                    position: relative;
                    overflow: hidden;
                }
                .testimonial-item {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity 0.6s ease, transform 0.6s ease;
                    transform: translateX(50px);
                }
                .testimonial-item.active {
                    opacity: 1;
                    visibility: visible;
                    transform: translateX(0);
                    position: relative;
                }
                .testimonial-item.prev {
                    transform: translateX(-50px);
                }
                .testimonial-item.next {
                    transform: translateX(50px);
                }
                .testimonial-dots {
                    display: flex;
                    justify-content: center;
                    margin-top: 20px;
                }
                .testimonial-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background-color: rgba(15, 76, 130, 0.3);
                    margin: 0 5px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
                .testimonial-dot.active {
                    background-color: var(--primary);
                    transform: scale(1.2);
                }
                .testimonial-nav {
                    position: absolute;
                    width: 100%;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                    display: flex;
                    justify-content: space-between;
                    pointer-events: none;
                    z-index: 10;
                }
                .testimonial-prev, .testimonial-next {
                    background-color: white;
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
                    cursor: pointer;
                    pointer-events: auto;
                    transition: all 0.3s ease;
                    opacity: 0.7;
                }
                .testimonial-prev:hover, .testimonial-next:hover {
                    opacity: 1;
                    transform: scale(1.1);
                }
                @media (max-width: 768px) {
                    .testimonial-nav {
                        display: none;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Back to top button
    const createBackToTopButton = () => {
        if (!document.querySelector('.back-to-top')) {
            const backToTopBtn = document.createElement('button');
            backToTopBtn.className = 'back-to-top';
            backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            backToTopBtn.setAttribute('aria-label', 'Back to top');
            document.body.appendChild(backToTopBtn);
            
            // Add styles if not already in CSS
            const style = document.createElement('style');
            style.textContent = `
                .back-to-top {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: var(--primary);
                    color: white;
                    border: none;
                    box-shadow: 0 3px 10px rgba(0,0,0,0.2);
                    cursor: pointer;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                    z-index: 99;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                }
                .back-to-top.active {
                    opacity: 1;
                    visibility: visible;
                }
                .back-to-top:hover {
                    background-color: var(--primary-dark);
                    transform: translateY(-5px);
                }
                @media (max-width: 768px) {
                    .back-to-top {
                        width: 40px;
                        height: 40px;
                        bottom: 20px;
                        right: 20px;
                        font-size: 1rem;
                    }
                }
            `;
            document.head.appendChild(style);
            
            // Show button when scrolled down
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.add('active');
                } else {
                    backToTopBtn.classList.remove('active');
                }
            });
            
            // Scroll to top on click
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    };
    
    createBackToTopButton();

    // Initialize any custom functionality here
    console.log('HargaNaik.ID scripts initialized successfully');
});

// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('preloader-hidden');
        
        // Remove preloader from DOM after animation
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }
});

/**
 * HargaNaik.ID - JavaScript Functionality
 * Author: Team HargaNaik.ID
 * Version: 1.0
 * Description: JavaScript functionality untuk website HargaNaik.ID
 */

// Tunggu DOM selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // DOM Elements
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const overlay = document.getElementById('overlay');
    const header = document.querySelector('.header');

    // Mobile Navigation Toggle
    if (menuToggle && mainNav && overlay) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('open');
            overlay.classList.toggle('active');
        });
        
        overlay.addEventListener('click', () => {
            mainNav.classList.remove('open');
            overlay.classList.remove('active');
        });
    }

    // Smooth Scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mainNav && overlay) {
                    mainNav.classList.remove('open');
                    overlay.classList.remove('active');
                }
                
                // Update active links
                document.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Header scroll effect
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Update active navigation links on scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Counter animation for statistics
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        const countUp = (counter, target) => {
            const count = +counter.innerText;
            const increment = target / 100;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(() => countUp(counter, target), 15);
            } else {
                counter.innerText = target;
            }
        };
        
        const startCounting = () => {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                counter.innerText = '0';
                countUp(counter, target);
            });
        };
        
        // Use Intersection Observer to start counting when in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounting();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        // Observe the parent element
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            observer.observe(heroSection);
        }
    }

    // Interactive Flowchart
    const flowchartBoxes = document.querySelectorAll('.flowchart-box');
    const flowchartDetails = document.querySelectorAll('.flowchart-details-item');
    
    if (flowchartBoxes.length > 0 && flowchartDetails.length > 0) {
        flowchartBoxes.forEach((box, index) => {
            box.addEventListener('mouseenter', () => {
                // Highlight the corresponding details item
                flowchartDetails[index].classList.add('highlight');
            });
            
            box.addEventListener('mouseleave', () => {
                // Remove highlight
                flowchartDetails[index].classList.remove('highlight');
            });
            
            box.addEventListener('click', () => {
                // Scroll to the details item
                const headerHeight = document.querySelector('.header').offsetHeight;
                
                window.scrollTo({
                    top: flowchartDetails[index].offsetTop - headerHeight - 20,
                    behavior: 'smooth'
                });
                
                // Add animation
                flowchartDetails[index].classList.add('pulse');
                setTimeout(() => {
                    flowchartDetails[index].classList.remove('pulse');
                }, 1000);
            });
        });
    }

    // Data Flow Animation
       // Data Flow Animation
    const dataFlowItems = document.querySelectorAll('.data-flow-item');
    
    if (dataFlowItems.length > 0) {
        const dataFlowObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered animation
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, index * 200);
                    
                    dataFlowObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        dataFlowItems.forEach(item => {
            dataFlowObserver.observe(item);
            
            // Add animation class for CSS
            item.classList.add('data-flow-animate');
        });
    }
    
    // Flowchart step animation
    const flowchartSteps = document.querySelectorAll('.flowchart-step');
    
    if (flowchartSteps.length > 0) {
        const stepObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered animation
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, index * 300);
                    
                    stepObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        flowchartSteps.forEach(step => {
            stepObserver.observe(step);
        });
    }

    // Screenshots lightbox/modal
    const screenshots = document.querySelectorAll('.screenshot');
    
    if (screenshots.length > 0) {
        // Create modal if it doesn't exist
        if (!document.querySelector('.screenshot-modal')) {
            const modal = document.createElement('div');
            modal.className = 'screenshot-modal';
            modal.innerHTML = `
                <div class="screenshot-modal-content">
                    <span class="screenshot-modal-close">&times;</span>
                    <img class="screenshot-modal-img" src="" alt="Screenshot Full View">
                </div>
            `;
            document.body.appendChild(modal);
            
            // Add modal styles if not already in CSS
            if (!document.querySelector('#screenshot-modal-styles')) {
                const style = document.createElement('style');
                style.id = 'screenshot-modal-styles';
                style.textContent = `
                    .screenshot-modal {
                        display: none;
                        position: fixed;
                        z-index: 9999;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        overflow: auto;
                        background-color: rgba(0,0,0,0.9);
                        padding: 2rem;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    }
                    .screenshot-modal.active {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        opacity: 1;
                    }
                    .screenshot-modal-content {
                        position: relative;
                        max-width: 90%;
                        max-height: 90%;
                    }
                    .screenshot-modal-img {
                        max-width: 100%;
                        max-height: 90vh;
                        display: block;
                        margin: 0 auto;
                        box-shadow: 0 5px 25px rgba(0,0,0,0.2);
                        border-radius: 5px;
                    }
                    .screenshot-modal-close {
                        position: absolute;
                        top: -30px;
                        right: -30px;
                        color: white;
                        font-size: 2rem;
                        font-weight: bold;
                        cursor: pointer;
                        width: 30px;
                        height: 30px;
                        line-height: 30px;
                        text-align: center;
                        transition: all 0.3s ease;
                    }
                    .screenshot-modal-close:hover {
                        transform: scale(1.2);
                    }
                `;
                document.head.appendChild(style);
            }
            
            // Get modal elements
            const screenshotModal = document.querySelector('.screenshot-modal');
            const modalImg = document.querySelector('.screenshot-modal-img');
            const modalClose = document.querySelector('.screenshot-modal-close');
            
            // Open modal on click
            screenshots.forEach(screenshot => {
                screenshot.addEventListener('click', function() {
                    const imgSrc = this.querySelector('img').getAttribute('src');
                    modalImg.setAttribute('src', imgSrc);
                    screenshotModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            });
            
            // Close modal
            modalClose.addEventListener('click', () => {
                screenshotModal.classList.remove('active');
                document.body.style.overflow = 'auto';
                
                // Clear src after transition
                setTimeout(() => {
                    modalImg.setAttribute('src', '');
                }, 300);
            });
            
            // Close on outside click
            screenshotModal.addEventListener('click', (e) => {
                if (e.target === screenshotModal) {
                    screenshotModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    
                    // Clear src after transition
                    setTimeout(() => {
                        modalImg.setAttribute('src', '');
                    }, 300);
                }
            });
            
            // Close on ESC key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && screenshotModal.classList.contains('active')) {
                    screenshotModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    
                    // Clear src after transition
                    setTimeout(() => {
                        modalImg.setAttribute('src', '');
                    }, 300);
                }
            });
        }
    }

    // Form validation for newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const emailValue = emailInput.value.trim();
            
            // Basic email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (emailValue === '' || !emailPattern.test(emailValue)) {
                // Show error (could be enhanced with proper error messages)
                emailInput.style.borderColor = 'var(--danger)';
                emailInput.focus();
                
                // Optional: Add shake animation
                emailInput.classList.add('shake');
                setTimeout(() => {
                    emailInput.classList.remove('shake');
                }, 500);
            } else {
                // Success - in a real application, you would submit to server
                emailInput.style.borderColor = 'var(--success)';
                emailInput.value = '';
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'newsletter-success';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Terima kasih telah berlangganan newsletter kami!';
                
                newsletterForm.appendChild(successMessage);
                
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            }
        });
    }

    // Back to top button
    const createBackToTopButton = () => {
        if (!document.querySelector('.back-to-top')) {
            const backToTopBtn = document.createElement('button');
            backToTopBtn.className = 'back-to-top';
            backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            backToTopBtn.setAttribute('aria-label', 'Back to top');
            document.body.appendChild(backToTopBtn);
            
            // Show button when scrolled down
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.add('active');
                } else {
                    backToTopBtn.classList.remove('active');
                }
            });
            
            // Scroll to top on click
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    };
    
    createBackToTopButton();

    // Initialize any custom functionality here
    console.log('HargaNaik.ID scripts initialized successfully');
});

// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('preloader-hidden');
        
        // Remove preloader from DOM after animation
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }
});
