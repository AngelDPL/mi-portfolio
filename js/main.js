// ═══════════════════════════════════════
// INTRO SCREEN
// ═══════════════════════════════════════

const introScreen = document.getElementById('intro-screen');

function dismissIntro() {
    introScreen.classList.add('intro-exit');
    setTimeout(() => {
        introScreen.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 600);
}

document.body.style.overflow = 'hidden';

introScreen.addEventListener('click', dismissIntro);
document.addEventListener('keydown', dismissIntro);


// ═══════════════════════════════════════
// LANGUAGE TOGGLE
// ═══════════════════════════════════════

let currentLang = 'es';

const langToggle = document.getElementById('langToggle');

function setLanguage(lang) {
    currentLang = lang;

    document.querySelectorAll('[data-es]').forEach(el => {
        el.textContent = el.dataset[lang];
    });

    langToggle.textContent = lang === 'es' ? 'EN' : 'ES';
}

langToggle.addEventListener('click', () => {
    const newLang = currentLang === 'es' ? 'en' : 'es';
    setLanguage(newLang);
});


// ═══════════════════════════════════════
// ANIMACIÓN AL HACER SCROLL
// ═══════════════════════════════════════

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.stat-card, .skill-card, .proyecto-card, .xp-item, .contacto-item').forEach(el => {
    el.classList.add('hidden');
    observer.observe(el);
});


// ═══════════════════════════════════════
// TYPING EFFECT — HERO SUB
// ═══════════════════════════════════════

const heroSubEl = document.querySelector('.hero-sub');
const heroSubText = heroSubEl.textContent;
heroSubEl.textContent = '';

let i = 0;
function typeWriter() {
    if (i < heroSubText.length) {
        heroSubEl.textContent += heroSubText.charAt(i);
        i++;
        setTimeout(typeWriter, 60);
    }
}

setTimeout(typeWriter, 800);

// ═══════════════════════════════════════
// CURSOR PERSONALIZADO
// ═══════════════════════════════════════

const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursor-trail');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    setTimeout(() => {
        cursorTrail.style.left = e.clientX + 'px';
        cursorTrail.style.top = e.clientY + 'px';
    }, 80);
});

document.querySelectorAll('a, button, .skill-card, .proyecto-card, .contacto-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2)';
        cursor.style.background = 'var(--cyan)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.background = 'var(--yellow)';
    });
});

// ═══════════════════════════════════════
// NAVBAR SCROLL
// ═══════════════════════════════════════

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// ═══════════════════════════════════════
// PARTÍCULAS PIXEL
// ═══════════════════════════════════════

const canvas = document.getElementById('pixel-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ['#f7d716', '#00f5d4', '#ff006e', '#ff6b35'];
const particles = [];

for (let i = 0; i < 60; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.floor(Math.random() * 4 + 2) * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 0.8 + 0.2,
        opacity: Math.random() * 0.5 + 0.1
    });
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        p.y += p.speed;
        if (p.y > canvas.height) {
            p.y = -p.size;
            p.x = Math.random() * canvas.width;
        }
    });
    requestAnimationFrame(drawParticles);
}

drawParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


// ═══════════════════════════════════════
// SONIDO 8-BIT
// ═══════════════════════════════════════

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playPixelSound(freq = 440, duration = 0.08) {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + duration);
}

document.querySelectorAll('a, button, .skill-card, .hero-tag').forEach(el => {
    el.addEventListener('mouseenter', () => playPixelSound(880, 0.06));
});

document.querySelectorAll('.btn').forEach(el => {
    el.addEventListener('click', () => playPixelSound(440, 0.15));
});


// ═══════════════════════════════════════
// KONAMI CODE EASTER EGG
// ═══════════════════════════════════════

const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
];

let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateKonami();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateKonami() {
    document.body.style.animation = 'konamiFlash 0.5s ease 3';

    const msg = document.createElement('div');
    msg.id = 'konami-msg';
    msg.textContent = '🎮 +30 VIDAS EXTRA';
    document.body.appendChild(msg);

    setTimeout(() => msg.remove(), 5000);
}