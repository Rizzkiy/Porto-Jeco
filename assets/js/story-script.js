// ========================================
// STORY PAGE - JAVASCRIPT
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
// CUSTOM CURSOR
// ========================================
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

const cursorTrail = document.createElement('div');
cursorTrail.className = 'cursor-trail';
document.body.appendChild(cursorTrail);

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    // Smooth cursor movement
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    // Trail follows with more delay
    trailX += (mouseX - trailX) * 0.1;
    trailY += (mouseY - trailY) * 0.1;
    
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top = trailY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor interactions
document.querySelectorAll('a, button, .chapter-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorTrail.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorTrail.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// ========================================
// BUTTON RIPPLE EFFECT
// ========================================
document.querySelectorAll('.btn').forEach(button => {
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
            border-radius: 50%;
            background: rgba(0, 240, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
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
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ========================================
// GLASS CARD MOUSE TRACKING
// ========================================
document.querySelectorAll('.glass-card, .chapter-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
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

document.querySelectorAll('.glass-card, .chapter-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// SECTION HEADER ANIMATION
// ========================================
const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.section-header').forEach(header => {
    headerObserver.observe(header);
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
// SMOOTH SCROLL TO TOP & PARALLAX
// ========================================
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero-section');
    if (hero) {
        hero.style.transform = `translateY(${scrollTop * 0.5}px)`;
    }
    
    // Parallax effect on glow orbs
    document.querySelectorAll('.glow-orb').forEach((orb, index) => {
        const speed = 0.1 + (index * 0.05);
        orb.style.transform = `translate(-50%, -50%) translateY(${scrollTop * speed}px)`;
    });
});

// ========================================
// ENHANCED CARD HOVER EFFECTS
// ========================================
document.querySelectorAll('.chapter-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
        
        // Add glow effect
        const img = this.querySelector('.chapter-image img');
        if (img) {
            img.style.transform = 'scale(1.1) rotate(2deg)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        
        const img = this.querySelector('.chapter-image img');
        if (img) {
            img.style.transform = 'scale(1) rotate(0deg)';
        }
    });
    
    // 3D tilt effect
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
    });
});

// ========================================
// FLOATING ANIMATION FOR GLASS CARDS
// ========================================
document.querySelectorAll('.glass-card').forEach((card, index) => {
    const delay = index * 0.1;
    const duration = 3 + (index % 3);
    
    card.style.animation = `float-card ${duration}s ease-in-out ${delay}s infinite`;
});

// Add floating keyframes
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes float-card {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(floatStyle);

// ========================================
// TEXT REVEAL ANIMATION
// ========================================
function revealText() {
    const textElements = document.querySelectorAll('.glass-card p, .glass-card h4, .info-item');
    
    textElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100);
    });
}

// Trigger text reveal on scroll
const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const textElements = entry.target.querySelectorAll('p, h4, .info-item');
            textElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 50);
            });
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.glass-card').forEach(card => {
    textObserver.observe(card);
});

// ========================================
// GRADIENT BORDER ANIMATION
// ========================================
document.querySelectorAll('.glass-card, .chapter-card').forEach(card => {
    card.style.position = 'relative';
    
    const gradientBorder = document.createElement('div');
    gradientBorder.className = 'gradient-border';
    gradientBorder.style.cssText = `
        position: absolute;
        inset: -2px;
        border-radius: inherit;
        padding: 2px;
        background: linear-gradient(45deg, 
            var(--neon-cyan), 
            var(--neon-blue), 
            var(--neon-cyan)
        );
        background-size: 200% 200%;
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        opacity: 0;
        transition: opacity 0.3s ease;
        animation: gradient-rotate 3s linear infinite;
        pointer-events: none;
        z-index: -1;
    `;
    
    card.appendChild(gradientBorder);
    
    card.addEventListener('mouseenter', () => {
        gradientBorder.style.opacity = '0.6';
    });
    
    card.addEventListener('mouseleave', () => {
        gradientBorder.style.opacity = '0';
    });
});

// Add gradient rotation animation
const gradientStyle = document.createElement('style');
gradientStyle.textContent = `
    @keyframes gradient-rotate {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
`;
document.head.appendChild(gradientStyle);

// ========================================
// BACK BUTTON HOVER EFFECT
// ========================================
const backButton = document.querySelector('.btn-outline-neon');
if (backButton) {
    backButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(-5px) scale(1.05)';
        this.style.boxShadow = '0 0 20px var(--neon-cyan)';
    });
    
    backButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0) scale(1)';
        this.style.boxShadow = 'none';
    });
}

// ========================================
// SCROLL PROGRESS INDICATOR
// ========================================
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--neon-cyan), var(--neon-blue));
    width: 0%;
    z-index: 9999;
    transition: width 0.1s ease;
    box-shadow: 0 0 10px var(--neon-cyan);
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// ========================================
// STAGGER ANIMATION FOR GALLERY
// ========================================
const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const galleryItems = entry.target.querySelectorAll('.chapter-card');
            galleryItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            });
        }
    });
}, { threshold: 0.1 });

const gallerySection = document.querySelector('.row.g-4');
if (gallerySection) {
    const galleryItems = gallerySection.querySelectorAll('.chapter-card');
    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) scale(0.9)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    galleryObserver.observe(gallerySection);
}

// ========================================
// HERO TITLE GLITCH EFFECT
// ========================================
const heroTitle = document.querySelector('.hero-section h1');
if (heroTitle) {
    setInterval(() => {
        heroTitle.style.textShadow = `
            ${Math.random() * 2 - 1}px ${Math.random() * 2 - 1}px 0 var(--neon-cyan),
            ${Math.random() * 2 - 1}px ${Math.random() * 2 - 1}px 0 var(--neon-blue)
        `;
        
        setTimeout(() => {
            heroTitle.style.textShadow = `
                0 0 20px var(--neon-cyan),
                0 0 40px var(--neon-cyan),
                0 0 60px var(--neon-blue)
            `;
        }, 50);
    }, 3000);
}

// ========================================
// INFO ITEM PULSE EFFECT
// ========================================
document.querySelectorAll('.info-item').forEach((item, index) => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px)';
        this.style.borderLeftColor = 'var(--neon-cyan)';
        
        const label = this.querySelector('label');
        if (label) {
            label.style.transform = 'scale(1.1)';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
        
        const label = this.querySelector('label');
        if (label) {
            label.style.transform = 'scale(1)';
        }
    });
});
