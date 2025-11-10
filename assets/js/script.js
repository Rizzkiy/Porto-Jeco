// ========================================
// FUTURISTIC PKL WEBSITE - JAVASCRIPT
// ========================================

// Initialize Lucide Icons
lucide.createIcons();

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1200,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
    delay: 100
});

// ========================================
// PARTICLE SYSTEM
// ========================================
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    document.body.appendChild(particleContainer);

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: var(--neon-cyan);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.2};
            animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
            box-shadow: 0 0 10px var(--neon-cyan);
        `;
        particleContainer.appendChild(particle);
    }
}

// Add particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(0) translateX(0);
        }
        50% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
        }
        100% {
            transform: translateY(-200vh) translateX(0);
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particles
createParticles();

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
const navbar = document.getElementById('mainNav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 240, 255, 0.2)';
    } else {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    }
    
    lastScroll = currentScroll;
});

// ========================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
    });
});

// ========================================
// ACTIVE NAVIGATION LINK ON SCROLL
// ========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

function updateActiveNavLink() {
    const scrollPosition = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ========================================
// CONTACT FORM HANDLING
// ========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    // Set the redirect URL dynamically based on current location
    const formRedirect = document.getElementById('formRedirect');
    if (formRedirect) {
        const currentUrl = window.location.href;
        const baseUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/') + 1);
        formRedirect.value = baseUrl + 'thank-you.html';
    }
    
    contactForm.addEventListener('submit', function(e) {
        // Don't prevent default - let FormSubmit handle it
        // But show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i data-lucide="loader" class="icon-sm me-2"></i> Mengirim...';
        lucide.createIcons();
        
        // Add glow effect to form
        const formCard = contactForm.closest('.glass-card');
        formCard.style.boxShadow = '0 0 40px rgba(0, 240, 255, 0.6)';
        
        // Note: FormSubmit will handle the actual submission and redirect
        // If you want to handle it with AJAX instead, uncomment below:
        /*
        e.preventDefault();
        
        const formData = new FormData(this);
        
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showNotification('success', 'Pesan Terkirim!', 'Terima kasih, pesan Anda telah diterima.');
                contactForm.reset();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            showNotification('error', 'Gagal Mengirim', 'Terjadi kesalahan. Silakan coba lagi atau hubungi via WhatsApp.');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            lucide.createIcons();
            formCard.style.boxShadow = '';
        });
        */
    });
    
    // Form validation feedback
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('invalid', function(e) {
            e.preventDefault();
            this.classList.add('is-invalid');
            showNotification('error', 'Form Tidak Lengkap', 'Mohon lengkapi semua field yang diperlukan.');
        });
        
        input.addEventListener('input', function() {
            this.classList.remove('is-invalid');
        });
    });
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================
function showNotification(type, title, message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}"></i>
            </div>
            <div class="notification-text">
                <strong>${title}</strong>
                <p>${message}</p>
            </div>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(10, 22, 40, 0.95);
        backdrop-filter: blur(15px);
        border: 1px solid ${type === 'success' ? 'rgba(0, 240, 255, 0.5)' : 'rgba(255, 100, 100, 0.5)'};
        border-radius: 10px;
        padding: 20px;
        min-width: 300px;
        box-shadow: 0 0 30px ${type === 'success' ? 'rgba(0, 240, 255, 0.3)' : 'rgba(255, 100, 100, 0.3)'};
        z-index: 9999;
        animation: slideInRight 0.5s ease-out;
    `;
    
    // Append to body
    document.body.appendChild(notification);
    
    // Initialize icons
    lucide.createIcons();
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        gap: 15px;
        align-items: start;
    }
    
    .notification-icon {
        color: var(--neon-cyan);
        flex-shrink: 0;
    }
    
    .notification-text strong {
        color: var(--neon-cyan);
        display: block;
        margin-bottom: 5px;
        font-family: 'Orbitron', sans-serif;
    }
    
    .notification-text p {
        color: #fff;
        margin: 0;
        font-size: 0.9rem;
    }
`;
document.head.appendChild(style);

// ========================================
// CHAPTER CARD INTERACTIONS
// ========================================
const chapterCards = document.querySelectorAll('.chapter-card');

chapterCards.forEach(card => {
    const button = card.querySelector('.btn-neon');
    
    if (button) {
        button.addEventListener('click', function() {
            const chapterTitle = card.querySelector('h3').textContent;
            showNotification('success', 'Membuka Chapter', `Anda akan melihat detail ${chapterTitle}`);
        });
    }
    
    // Add hover sound effect (optional - can be enabled)
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ========================================
// PARALLAX EFFECT FOR GLOW ORBS
// ========================================
const glowOrbs = document.querySelectorAll('.glow-orb');

window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    glowOrbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ========================================
// TYPING EFFECT FOR HERO SUBTITLE
// ========================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Apply typing effect on page load
window.addEventListener('load', () => {
    const subtitle = document.querySelector('.hero-section .lead');
    if (subtitle) {
        const originalText = subtitle.textContent;
        setTimeout(() => {
            typeWriter(subtitle, originalText, 80);
        }, 500);
    }
});

// ========================================
// FORM INPUT GLOW EFFECT
// ========================================
const formInputs = document.querySelectorAll('.form-control-neon');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.boxShadow = '0 0 25px rgba(0, 240, 255, 0.4)';
    });
    
    input.addEventListener('blur', function() {
        this.style.boxShadow = '';
    });
});

// ========================================
// SCROLL TO TOP BUTTON
// ========================================
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i data-lucide="arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--neon-cyan), var(--neon-blue));
    border: none;
    color: #000;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

// Scroll to top on click
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Initialize icons for scroll button
lucide.createIcons();

// ========================================
// CONSOLE EASTER EGG
// ========================================
console.log('%c🚀 FUTURISTIC PKL WEBSITE', 'color: #00f0ff; font-size: 20px; font-weight: bold; font-family: Orbitron;');
console.log('%cDeveloped with ❤ and cutting-edge technology', 'color: #0080ff; font-size: 14px;');
console.log('%cInterested in the code? Check out the repository!', 'color: #00f0ff; font-size: 12px;');

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// CURSOR TRAIL EFFECT
// ========================================
let cursorTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: var(--neon-cyan);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        opacity: 0.6;
        box-shadow: 0 0 10px var(--neon-cyan);
        animation: fade-trail 0.5s ease-out forwards;
    `;
    
    document.body.appendChild(trail);
    cursorTrail.push(trail);
    
    if (cursorTrail.length > maxTrailLength) {
        const oldTrail = cursorTrail.shift();
        oldTrail.remove();
    }
    
    setTimeout(() => {
        trail.remove();
    }, 500);
});

// Add cursor trail animation
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    @keyframes fade-trail {
        to {
            opacity: 0;
            transform: scale(0.5);
        }
    }
    
    body {
        cursor: none;
    }
    
    a, button, input, textarea {
        cursor: pointer;
    }
    
    .custom-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--neon-cyan);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.15s ease;
        box-shadow: 0 0 15px rgba(0, 240, 255, 0.5);
    }
    
    .custom-cursor.active {
        transform: scale(1.5);
        background: rgba(0, 240, 255, 0.2);
    }
`;
document.head.appendChild(cursorStyle);

// Create custom cursor
const customCursor = document.createElement('div');
customCursor.className = 'custom-cursor';
document.body.appendChild(customCursor);

document.addEventListener('mousemove', (e) => {
    customCursor.style.left = e.clientX - 10 + 'px';
    customCursor.style.top = e.clientY - 10 + 'px';
});

document.addEventListener('mousedown', () => {
    customCursor.classList.add('active');
});

document.addEventListener('mouseup', () => {
    customCursor.classList.remove('active');
});

// ========================================
// SMOOTH REVEAL ON SCROLL
// ========================================
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

// Observe all glass cards
document.querySelectorAll('.glass-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(card);
});

// ========================================
// ENHANCED BUTTON RIPPLE EFFECT
// ========================================
document.querySelectorAll('.btn-neon, .btn-outline-neon').forEach(button => {
    button.addEventListener('click', function(e) {
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
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-effect 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple-effect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ========================================
// MOUSE TRACKING FOR GLASS CARDS
// ========================================
document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
    });
});

// ========================================
// LOADING SCREEN
// ========================================
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Remove from DOM after transition
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 1000);
});

// ========================================
// READY STATE
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Website loaded successfully');
    
    // Add loaded class to body
    document.body.classList.add('loaded');
    
    // Refresh icons
    lucide.createIcons();
    
    // Add entrance animation to hero
    setTimeout(() => {
        document.querySelector('.hero-content')?.classList.add('visible');
    }, 100);
    
    // Animate section headers on scroll
    const headers = document.querySelectorAll('.section-header');
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    }, { threshold: 0.5 });
    
    headers.forEach(header => headerObserver.observe(header));
});
