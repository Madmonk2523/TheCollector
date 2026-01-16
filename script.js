// Advanced Background Animation
const backgroundAnimation = document.querySelector('.background-animation');

// Dynamic background particle generation
const createBackgroundParticles = () => {
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'background-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 300 + 50}px;
            height: ${Math.random() * 300 + 50}px;
            background: linear-gradient(${Math.random() * 360}deg, rgba(255, 215, 0, ${Math.random() * 0.1}), rgba(29, 53, 87, ${Math.random() * 0.05}));
            border-radius: 50%;
            filter: blur(${Math.random() * 50 + 30}px);
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: floatingParticle ${Math.random() * 30 + 15}s ease-in-out infinite;
            pointer-events: none;
            z-index: -1;
        `;
        backgroundAnimation.appendChild(particle);
    }
};

createBackgroundParticles();

// Add CSS animation for particles
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes floatingParticle {
        0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
        }
        25% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(${Math.random() * 0.5 + 0.8}) rotate(90deg);
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(${Math.random() * 0.5 + 1}) rotate(180deg);
        }
        75% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(${Math.random() * 0.5 + 0.9}) rotate(270deg);
        }
        100% {
            transform: translate(0, 0) scale(1) rotate(360deg);
        }
    }
`;
document.head.appendChild(particleStyle);

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Advanced Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }, index * 100);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.hours-card, .product-card, .review-card').forEach(el => {
    observer.observe(el);
});

// Parallax effect on mouse move
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.product-card, .hours-card, .review-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = (x / rect.width - 0.5) * 5;
        const yPercent = (y / rect.height - 0.5) * 5;
        
        card.style.transform = `perspective(1000px) rotateY(${xPercent}deg) rotateX(${-yPercent}deg)`;
    });
});

// Reset transform on mouse leave
document.addEventListener('mouseleave', () => {
    const cards = document.querySelectorAll('.product-card, .hours-card, .review-card');
    cards.forEach(card => {
        card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
    });
});

// Smooth hover effect for cards
const cards = document.querySelectorAll('.hours-card, .product-card, .review-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
});

// Add parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    document.querySelectorAll('section').forEach((section, index) => {
        const offset = scrolled * (0.5 - index * 0.1);
        section.style.backgroundPosition = `center ${offset}px`;
    });

    // Animate background elements on scroll
    const bgAnimation = document.querySelector('.background-animation');
    if (bgAnimation) {
        bgAnimation.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Animated counter for stats (if needed)
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
};

// Intersection Observer for initial page load animations
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            sectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0.9';
    sectionObserver.observe(section);
});

// Add ripple effect on button clicks
const buttons = document.querySelectorAll('.social-btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add scroll progress indicator
window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    document.body.style.setProperty('--scroll', scrolled + '%');
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Performance optimization: debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Any scroll-dependent updates
    }, 250);
}, { passive: true });

// Add CSS animation for ripple
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Mouse-tracking background effect
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    const blobs = document.querySelectorAll('.blob, .gradient-orb');
    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 0.01;
        blob.style.transform = `translate(${x * 100 * speed}px, ${y * 100 * speed}px)`;
    });
});
