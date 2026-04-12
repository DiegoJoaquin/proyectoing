document.addEventListener('DOMContentLoaded', () => {

    /* HEADER SCROLL */
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* SCROLL REVEAL ANIMATIONS */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // observer.unobserve(entry.target); // Optional: keep animating or not
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(el => revealObserver.observe(el));

    /* SMOOTH SCROLL */
    document.querySelectorAll('nav a, .btn-primary').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetSec = document.querySelector(targetId);
            if (targetSec) {
                window.scrollTo({
                    top: targetSec.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* DYNAMIC HERO PARTICLES (2026 EFFECT) */
    const canvas = document.getElementById('hero-particles');
    const ctx = canvas.getContext('2d');
    let width, height, particles;
    let mouseObj = { x: null, y: null, radius: 120 }; // Radius of interaction repel

    // Ensure pointer events allowed on canvas to track mouse/touch over hero section
    const heroSection = document.getElementById('hero');

    heroSection.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseObj.x = e.clientX - rect.left;
        mouseObj.y = e.clientY - rect.top;
    });
    
    // Add touch support for mobile interaction
    heroSection.addEventListener('touchmove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseObj.x = e.touches[0].clientX - rect.left;
        mouseObj.y = e.touches[0].clientY - rect.top;
    });
    
    heroSection.addEventListener('mouseleave', () => { mouseObj.x = null; mouseObj.y = null; });
    heroSection.addEventListener('touchend', () => { mouseObj.x = null; mouseObj.y = null; });

    function initParticles() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = document.getElementById('hero').offsetHeight;
        particles = [];
        
        const numParticles = window.innerWidth < 768 ? 50 : 120;
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 2 + 1.5,
                vx: (Math.random() - 0.5) * 1.5, // Float dynamically in all directions
                vy: (Math.random() - 0.5) * 1.5,
                alpha: Math.random() * 0.5 + 0.2
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            // Interactive Repel Force (repels dots from mouse/finger)
            if (mouseObj.x != null && mouseObj.y != null) {
                let dx = mouseObj.x - p.x;
                let dy = mouseObj.y - p.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouseObj.radius) {
                    const force = (mouseObj.radius - distance) / mouseObj.radius;
                    p.x -= (dx / distance) * force * 5; // push horizontally
                    p.y -= (dy / distance) * force * 5; // push vertically
                }
            }

            p.x += p.vx;
            p.y += p.vy;
            
            // Wall bounce so points stay circulating
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(29, 204, 150, ${p.alpha})`; // Accent color
            ctx.fill();
        });
        
        requestAnimationFrame(drawParticles);
    }

    initParticles();
    drawParticles();

    window.addEventListener('resize', initParticles);

    /* FORM GLITCH / SUBMISSION MOCK */
    const form = document.querySelector('.contact-form-premium');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.btn-submit');
            const originalText = btn.textContent;
            btn.textContent = 'PROCESANDO...';
            btn.style.opacity = '0.8';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = '¡EXITO!';
                btn.style.background = '#FFFFFF';
                btn.style.color = '#159C75';
                form.reset();
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.style.color = '';
                    btn.disabled = false;
                }, 3000);
            }, 1000);
        });
    }

    /* REEL VIDEO HOVER */
    const reelVideos = document.querySelectorAll('.reel-video');
    reelVideos.forEach(vid => {
        vid.addEventListener('mouseenter', () => {
            vid.play();
        });
        vid.addEventListener('mouseleave', () => {
            vid.pause();
        });
    });

    /* EFFECTO PRO 2026: MOUSE GLOW AURA */
    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    }

    /* 3D MAGNETIC TILT EN TARJETAS */
    const tiltCards = document.querySelectorAll('.service-card, .area-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Rotacion leve en base a la posición del mouse (Max 8 grados)
                const rotateX = ((y - centerY) / centerY) * -8; 
                const rotateY = ((x - centerX) / centerX) * 8;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
        });
        
        card.addEventListener('mouseleave', () => {
            requestAnimationFrame(() => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    });
});
