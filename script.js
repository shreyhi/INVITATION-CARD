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
    { section: '#hero', duration: 11590, audioId: 'audio-hero' },
    { section: '#welcome', duration: 18500, audioId: 'audio-welcome' },
    { section: '#invitation', duration: 25000, audioId: 'audio-invitation' },
    { section: '#location', duration: 25000, audioId: 'audio-location' }
];

let currentStep = 0;
let currentAudio = null;

function runPresentation() {
    const step = presentationFlow[currentStep];
    const target = document.querySelector(step.section);

    // Stop previous audio
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    // Scroll (instant when looping)
    if (target) {
        target.scrollIntoView({
            behavior: currentStep === 0 ? 'auto' : 'smooth'
        });
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

    setTimeout(runPresentation, step.duration);
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

    document.getElementById("days").innerText =
        Math.floor(diff / (1000 * 60 * 60 * 24));

    document.getElementById("hours").innerText =
        Math.floor((diff / (1000 * 60 * 60)) % 24);

    document.getElementById("minutes").innerText =
        Math.floor((diff / (1000 * 60)) % 60);

    document.getElementById("seconds").innerText =
        Math.floor((diff / 1000) % 60);
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