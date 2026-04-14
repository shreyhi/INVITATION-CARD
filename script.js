// ================= DISABLE MANUAL SCROLLING =================
// Prevents user from scrolling manually while keeping auto-scroll working

let isAutoScrolling = false;
let scrollTimeout = null;

// Disable wheel/trackpad scrolling
window.addEventListener('wheel', (e) => {
    e.preventDefault();
}, { passive: false });

// Disable touch scrolling on mobile
window.addEventListener('touchmove', (e) => {
    e.preventDefault();
}, { passive: false });

// Disable keyboard arrow keys scrolling
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || 
        e.key === 'PageUp' || e.key === 'PageDown' ||
        e.key === 'Home' || e.key === 'End') {
        e.preventDefault();
    }
});

// Re-enable scroll temporarily for auto-scroll function
function enableScrollForAutoScroll() {
    isAutoScrolling = true;
    
    // Temporarily remove preventDefault listeners
    const wheelHandler = (e) => {
        if (!isAutoScrolling) e.preventDefault();
    };
    
    const touchHandler = (e) => {
        if (!isAutoScrolling) e.preventDefault();
    };
    
    // Allow auto-scroll to work
    setTimeout(() => {
        isAutoScrolling = false;
    }, 100);
}

// Override scrollIntoView to work with our lock
const originalScrollIntoView = HTMLElement.prototype.scrollIntoView;
HTMLElement.prototype.scrollIntoView = function(options) {
    isAutoScrolling = true;
    originalScrollIntoView.call(this, options);
    setTimeout(() => {
        isAutoScrolling = false;
    }, 500);
};

// ================= PARTICLES =================
function createParticle() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const particle = document.createElement('i');
    const icons = ['fas fa-heart', 'fas fa-star', 'fas fa-gem'];

    particle.className = `particle ${icons[Math.floor(Math.random() * icons.length)]}`;
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animationDuration = (Math.random() * 8 + 10) + 's';
    particle.style.fontSize = (Math.random() * 10 + 12) + 'px';

    container.appendChild(particle);
    setTimeout(() => particle.remove(), 20000);
}
setInterval(createParticle, 900);

// ================= PRESENTATION =================
const presentationFlow = [
    { section: '#hero', duration: 12090, audioId: 'audio-hero' },
    { section: '#welcome', duration: 18500, audioId: 'audio-welcome' },
    { section: '#invitation', duration: 25000, audioId: 'audio-invitation' },
    { section: '#location', duration: 25000, audioId: 'audio-location' }
];

let currentStep = 0;
let currentAudio = null;
let presentationInterval = null;

function runPresentation() {
    const step = presentationFlow[currentStep];
    const target = document.querySelector(step.section);

    // Stop previous audio
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    // Auto scroll (enabled)
    if (target) {
        isAutoScrolling = true;
        target.scrollIntoView({
            behavior: currentStep === 0 ? 'auto' : 'smooth'
        });
        setTimeout(() => {
            isAutoScrolling = false;
        }, 500);
    }

    // Play new audio
    currentAudio = document.getElementById(step.audioId);
    if (currentAudio) {
        currentAudio.play().catch(() => {});
    }

    // Next step
    currentStep++;
    if (currentStep >= presentationFlow.length) {
        currentStep = 0;
    }

    // Schedule next
    if (presentationInterval) {
        clearTimeout(presentationInterval);
    }
    presentationInterval = setTimeout(runPresentation, step.duration);
}

// ================= START SCREEN =================
document.addEventListener("DOMContentLoaded", () => {
    const start = document.getElementById("presentation-start");

    if (start) {
        start.addEventListener("click", () => {
            start.style.display = "none";
            runPresentation();
        });
    }
});

// ================= SCROLL ANIMATION =================
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.slide-up, .fade-in').forEach(el => {
    observer.observe(el);
});

// ================= COUNTDOWN =================
const countDownDate = new Date("April 16, 2026 12:30:00").getTime();

setInterval(() => {
    const now = new Date().getTime();
    const diff = countDownDate - now;

    if (diff < 0) return;

    const daysElem = document.getElementById("days");
    const hoursElem = document.getElementById("hours");
    const minutesElem = document.getElementById("minutes");
    const secondsElem = document.getElementById("seconds");

    if (daysElem) daysElem.innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (hoursElem) hoursElem.innerText = Math.floor((diff / (1000 * 60 * 60)) % 24);
    if (minutesElem) minutesElem.innerText = Math.floor((diff / (1000 * 60)) % 60);
    if (secondsElem) secondsElem.innerText = Math.floor((diff / 1000) % 60);
}, 1000);

// ================= DECORATIONS =================

// Hearts + butterflies (welcome only)
function createFloatingItem() {
    const container = document.querySelector('#welcome .floating-objects');
    if (!container) return;

    const item = document.createElement('div');
    item.classList.add('float-item');

    const icons = ['❤️', '💖', '🦋', '💕'];
    item.innerHTML = icons[Math.floor(Math.random() * icons.length)];

    item.style.left = Math.random() * 100 + 'vw';
    item.style.animationDuration = (Math.random() * 5 + 8) + 's';
    item.style.fontSize = (Math.random() * 10 + 14) + 'px';

    container.appendChild(item);
    setTimeout(() => item.remove(), 12000);
}
setInterval(createFloatingItem, 1000);

// Golden particles
function createGoldParticle() {
    const p = document.createElement("div");
    p.className = "golden-particle";
    p.style.left = Math.random() * 100 + "vw";
    p.style.animationDuration = (Math.random() * 5 + 8) + "s";
    document.body.appendChild(p);

    setTimeout(() => p.remove(), 12000);
}
setInterval(createGoldParticle, 1200);

// Petals
function createPetal() {
    const petal = document.createElement("div");
    petal.innerHTML = "🌸";
    petal.style.position = "fixed";
    petal.style.top = "-20px";
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.fontSize = "20px";
    petal.style.animation = "fallPetal 10s linear";

    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), 10000);
}
setInterval(createPetal, 1800);

// ================= PREVENT URL HASH SCROLLING =================
// Prevents page from jumping to #section on load
if (window.location.hash) {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 1);
}

// ================= TOUCH SCROLL LOCK FOR MOBILE =================
// Additional lock for mobile browsers
document.body.style.overflow = 'hidden';
document.documentElement.style.overflow = 'hidden';

// But allow auto-scroll to work by temporarily removing the style
const originalSetTimeout = window.setTimeout;
window.setTimeout = function(fn, delay) {
    if (fn.toString().includes('scrollIntoView')) {
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
        const result = originalSetTimeout(fn, delay);
        setTimeout(() => {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        }, delay + 500);
        return result;
    }
    return originalSetTimeout(fn, delay);
};