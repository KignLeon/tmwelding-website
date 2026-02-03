/**
 * T & M Welding - Main JavaScript
 * Mobile menu, modal, form handling, and scroll behaviors
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Mobile Menu
    // ========================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('open');
            
            // Toggle icon
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // ========================================
    // Modal Handling
    // ========================================
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTriggers = document.querySelectorAll('[data-trigger="modal"]');
    const modalCloseButtons = document.querySelectorAll('[data-close="modal"]');
    const fabCta = document.getElementById('fab-cta');

    function openModal() {
        if (modalOverlay) {
            modalOverlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (modalOverlay) {
            modalOverlay.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }

    // Open modal triggers
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', openModal);
    });

    // FAB opens modal
    if (fabCta) {
        fabCta.addEventListener('click', openModal);
    }

    // Close modal triggers
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    // Close on overlay click
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // ========================================
    // Form Handling
    // ========================================
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Basic validation
            if (!data.name || !data.phone) {
                alert('Please fill in your name and phone number.');
                return;
            }

            // Simulate submission
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
            submitButton.disabled = true;

            // Simulate API call
            setTimeout(() => {
                // Show success message
                submitButton.innerHTML = '<i class="fas fa-check mr-2"></i> Sent!';
                submitButton.classList.remove('bg-action');
                submitButton.classList.add('bg-trust');

                // Reset form
                form.reset();

                // Close modal if in modal
                setTimeout(() => {
                    closeModal();
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    submitButton.classList.remove('bg-trust');
                    submitButton.classList.add('bg-action');
                }, 2000);

            }, 1500);
        });
    });

    // ========================================
    // Phone Number Formatting
    // ========================================
    const phoneInputs = document.querySelectorAll('input[type="tel"]');

    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length >= 6) {
                value = '(' + value.substring(0, 3) + ') ' + value.substring(3, 6) + '-' + value.substring(6, 10);
            } else if (value.length >= 3) {
                value = '(' + value.substring(0, 3) + ') ' + value.substring(3);
            } else if (value.length > 0) {
                value = '(' + value;
            }
            
            e.target.value = value;
        });
    });

    // ========================================
    // Scroll Reveal Animation
    // ========================================
    const revealElements = document.querySelectorAll('.reveal');

    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('visible');
            }
        });
    }

    if (revealElements.length > 0) {
        window.addEventListener('scroll', checkReveal);
        checkReveal(); // Initial check
    }

    // ========================================
    // Navbar Scroll Effect
    // ========================================
    const navbar = document.querySelector('nav');

    if (navbar) {
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            // Add shadow on scroll
            if (currentScroll > 10) {
                navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = 'none';
            }

            lastScroll = currentScroll;
        });
    }

    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ========================================
    // FAB Visibility on Scroll
    // ========================================
    if (fabCta) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 400) {
                fabCta.classList.remove('hidden');
                fabCta.classList.add('flex');
            } else {
                fabCta.classList.add('hidden');
                fabCta.classList.remove('flex');
            }
        });
    }

    // ========================================
    // Mobile Sticky CTA Visibility
    // ========================================
    const mobileStickyWrapper = document.getElementById('mobile-sticky-cta');

    if (mobileStickyWrapper) {
        let lastScrollY = 0;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Hide when scrolling up, show when scrolling down
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                mobileStickyWrapper.style.transform = 'translateY(0)';
            } else if (currentScrollY < lastScrollY) {
                // Keep visible while user might want to call
            }
            
            lastScrollY = currentScrollY;
        });
    }

    // ========================================
    // Console Log
    // ========================================
    console.log('🔥 T & M Welding - Site loaded successfully');
    console.log('📞 Call (619) 405-7892 for welding services');

});
