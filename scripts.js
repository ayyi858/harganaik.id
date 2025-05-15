/**
 * HargaNaik.ID - Premium JavaScript Functionality
 * Author: Team HargaNaik.ID
 * Version: 2.0
 * Description: Enhanced JavaScript for HargaNaik.ID website
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 50
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
            document.body.classList.toggle('menu-open');
        });
        
        overlay.addEventListener('click', () => {
            mainNav.classList.remove('open');
            overlay.classList.remove('active');
            document.body.classList.remove('menu-open');
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
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mainNav && mainNav.classList.contains('open')) {
                    mainNav.classList.remove('open');
                    overlay.classList.remove('active');
                    document.body.classList.remove('menu-open');
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
        const headerScrollEffect = () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        
        // Initial check on page load
        headerScrollEffect();
        
        // Check on scroll
        window.addEventListener('scroll', headerScrollEffect);
    }

    // Update active navigation links on scroll
    const updateActiveNavLinks = () => {
        const scrollPosition = window.scrollY;
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 150;
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
    };
    
    // Initial check on page load
    updateActiveNavLinks();
    
    // Check on scroll
    window.addEventListener('scroll', updateActiveNavLinks);

    // Counter animation
    const animateCounters = () => {
        const counters = document.querySelectorAll('.counter');
        const speed = 200;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target') || +counter.innerText;
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(() => animateCounters(), 1);
            } else {
                counter.innerText = target;
            }
        });
    };
    
    // Initial counter animation
    animateCounters();

    // Interactive Flowchart
    const flowchartBoxes = document.querySelectorAll('.flowchart-box');
    const flowchartDetails = document.querySelectorAll('.flowchart-details-item');
    
    if (flowchartBoxes.length > 0 && flowchartDetails.length > 0) {
        flowchartBoxes.forEach((box, index) => {
            if (index < flowchartDetails.length) {
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
                    const targetPosition = flowchartDetails[index].getBoundingClientRect().top + window.pageYOffset;
                    
                    window.scrollTo({
                        top: targetPosition - headerHeight - 20,
                        behavior: 'smooth'
                    });
                    
                    // Add pulse animation
                    flowchartDetails[index].classList.add('pulse');
                    setTimeout(() => {
                        flowchartDetails[index].classList.remove('pulse');
                    }, 1000);
                });
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
                // Show error
                emailInput.style.borderColor = 'var(--danger)';
                emailInput.focus();
                
                // Add shake animation
                emailInput.classList.add('shake');
                setTimeout(() => {
                    emailInput.classList.remove('shake');
                }, 500);
                
                // Show error message if it doesn't exist
                if (!this.querySelector('.newsletter-error')) {
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'newsletter-error';
                    errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Silakan masukkan alamat email yang valid.';
                    errorMessage.style.color = 'var(--danger)';
                    errorMessage.style.fontSize = '0.85rem';
                    errorMessage.style.marginTop = '0.5rem';
                    
                    this.appendChild(errorMessage);
                    
                    setTimeout(() => {
                        errorMessage.remove();
                    }, 3000);
                }
            } else {
                // Success - in a real application, you would submit to server
                emailInput.style.borderColor = 'var(--success)';
                emailInput.value = '';
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'newsletter-success';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Terima kasih telah berlangganan newsletter kami!';
                successMessage.style.color = 'var(--success)';
                successMessage.style.fontSize = '0.85rem';
                successMessage.style.marginTop = '0.5rem';
                
                this.appendChild(successMessage);
                
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            }
        });
    }

    // Animate data flow items on scroll
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

    // Back to top button
    const createBackToTopButton = () => {
        const backToTopBtn = document.querySelector('.back-to-top');
        
        if (backToTopBtn) {
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

    // Pricing table hover effect
    const pricingTables = document.querySelectorAll('.pricing-table');
    
    if (pricingTables.length > 0) {
        pricingTables.forEach(table => {
            table.addEventListener('mouseenter', () => {
                if (!table.classList.contains('featured')) {
                    pricingTables.forEach(otherTable => {
                        if (otherTable !== table && !otherTable.classList.contains('featured')) {
                            otherTable.style.transform = 'scale(0.95)';
                            otherTable.style.opacity = '0.8';
                        }
                    });
                }
            });
            
            table.addEventListener('mouseleave', () => {
                pricingTables.forEach(otherTable => {
                    if (!otherTable.classList.contains('featured')) {
                        otherTable.style.transform = '';
                        otherTable.style.opacity = '';
                    }
                });
            });
        });
    }

    // Animate elements on scroll (fallback for browsers that don't support IntersectionObserver)
    if (!('IntersectionObserver' in window)) {
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.feature, .problem-card, .team-member, .pricing-table, .screenshot, .flowchart-box, .flowchart-details-item, .data-flow-item');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight * 0.8) {
                    element.classList.add('animate');
                }
            });
        };
        
        // Initial check on page load
        animateOnScroll();
        
        // Check on scroll
        window.addEventListener('scroll', animateOnScroll);
    }

    // Add shake animation to newsletter form
    const addShakeAnimation = () => {
        if (!document.getElementById('shake-animation')) {
            const style = document.createElement('style');
            style.id = 'shake-animation';
            style.textContent = `
                @keyframes shake {
                    0%, 100% {transform: translateX(0);}
                    10%, 30%, 50%, 70%, 90% {transform: translateX(-5px);}
                    20%, 40%, 60%, 80% {transform: translateX(5px);}
                }
                
                .shake {
                    animation: shake 0.5s ease;
                }
            `;
            document.head.appendChild(style);
        }
    };
    
    addShakeAnimation();

    // Initialize any custom functionality here
    console.log('HargaNaik.ID Premium scripts initialized successfully');
});