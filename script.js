// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

// Service Modal Functions
function openServiceModal(serviceName) {
    const modal = document.getElementById('serviceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalService = document.getElementById('modalService');
    
    modalTitle.textContent = `Request ${serviceName}`;
    modalService.value = serviceName;
    modal.style.display = 'block';
}

function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    modal.style.display = 'none';
}

// Modal Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('serviceModal');
    const closeBtn = document.querySelector('.close');
    
    // Close modal when clicking the X
    if (closeBtn) {
        closeBtn.addEventListener('click', closeServiceModal);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeServiceModal();
        }
    });
    
    // Handle service form submission
    const serviceForm = document.getElementById('serviceForm');
    if (serviceForm) {
        serviceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleServiceFormSubmission(this);
        });
    }
    
    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactFormSubmission(this);
        });
    }
});

// Form Submission Handlers
function handleServiceFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Create email content
    const subject = `Service Request: ${data.service}`;
    const body = `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Service Requested: ${data.service}
Message: ${data.message || 'No additional message'}

This request was submitted through the KCS website.
    `;
    
    // Open email client
    const emailLink = `mailto:kothamahesh99129@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = emailLink;
    
    // Create WhatsApp message
    const whatsappMessage = `Hello! I would like to request *${data.service}* service.

*Name:* ${data.name}
*Email:* ${data.email}
*Phone:* ${data.phone}
${data.message ? `*Message:* ${data.message}` : ''}

Please provide more information about this service.`;
    
    const whatsappLink = `https://wa.me/919912914252?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Show success message and options
    showSuccessMessage('Service request submitted!', whatsappLink);
    
    // Close modal and reset form
    closeServiceModal();
    form.reset();
}

function handleContactFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Create email content
    const subject = `Contact Form Submission from ${data.name}`;
    const body = `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Service Required: ${data.service}
Message: ${data.message}

This message was submitted through the KCS website contact form.
    `;
    
    // Open email client
    const emailLink = `mailto:kothamahesh99129@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = emailLink;
    
    // Create WhatsApp message
    const whatsappMessage = `Hello! I'm contacting you through your website.

*Name:* ${data.name}
*Email:* ${data.email}
*Phone:* ${data.phone}
*Service Required:* ${data.service}
*Message:* ${data.message}

Looking forward to hearing from you!`;
    
    const whatsappLink = `https://wa.me/919912914252?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Show success message and options
    showSuccessMessage('Message sent successfully!', whatsappLink);
    
    // Reset form
    form.reset();
}

function showSuccessMessage(message, whatsappLink) {
    // Create success popup
    const popup = document.createElement('div');
    popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        text-align: center;
        z-index: 3000;
        max-width: 400px;
        width: 90%;
    `;
    
    popup.innerHTML = `
        <div style="color: #28a745; font-size: 3rem; margin-bottom: 1rem;">
            <i class="fas fa-check-circle"></i>
        </div>
        <h3 style="color: #2c5aa0; margin-bottom: 1rem;">${message}</h3>
        <p style="margin-bottom: 1.5rem; color: #6c757d;">
            We'll get back to you soon! You can also contact us directly via WhatsApp.
        </p>
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <a href="${whatsappLink}" target="_blank" style="
                background: #25d366;
                color: white;
                padding: 0.75rem 1.5rem;
                text-decoration: none;
                border-radius: 5px;
                font-weight: 600;
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
            ">
                <i class="fab fa-whatsapp"></i> WhatsApp
            </a>
            <button onclick="this.parentElement.parentElement.parentElement.remove()" style="
                background: #6c757d;
                color: white;
                padding: 0.75rem 1.5rem;
                border: none;
                border-radius: 5px;
                font-weight: 600;
                cursor: pointer;
            ">Close</button>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (popup.parentElement) {
            popup.remove();
        }
    }, 10000);
}

// Intersection Observer for animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-item, .feature, .contact-item-large, .service-category');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Service category hover effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceCategories = document.querySelectorAll('.service-category');
    
    serviceCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 35px rgba(44, 90, 160, 0.15)';
        });
        
        category.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 20px rgba(44, 90, 160, 0.1)';
        });
    });
});

// Form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#dc3545';
            isValid = false;
        } else {
            field.style.borderColor = '#e9ecef';
        }
    });
    
    // Email validation
    const emailFields = form.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (field.value && !emailRegex.test(field.value)) {
            field.style.borderColor = '#dc3545';
            isValid = false;
        }
    });
    
    // Phone validation
    const phoneFields = form.querySelectorAll('input[type="tel"]');
    phoneFields.forEach(field => {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (field.value && !phoneRegex.test(field.value.replace(/\s/g, ''))) {
            field.style.borderColor = '#dc3545';
            isValid = false;
        }
    });
    
    return isValid;
}

// Add real-time validation
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateForm(form);
            });
            
            input.addEventListener('input', function() {
                if (this.style.borderColor === 'rgb(220, 53, 69)') {
                    this.style.borderColor = '#e9ecef';
                }
            });
        });
    });
});

// Add loading state to buttons
function addLoadingState(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 3000);
}

// Performance optimization - lazy loading
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

// Analytics and tracking (placeholder)
function trackEvent(eventName, eventData) {
    // This is where you would integrate with Google Analytics, Facebook Pixel, etc.
    console.log('Event tracked:', eventName, eventData);
}

// Track form submissions
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const formType = this.id === 'contactForm' ? 'Contact Form' : 'Service Request';
            trackEvent('Form Submission', { formType: formType });
        });
    });
    
    // Track button clicks
    const ctaButtons = document.querySelectorAll('.btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            trackEvent('Button Click', { buttonText: buttonText });
        });
    });
});