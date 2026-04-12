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

    function initParticles() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = document.getElementById('hero').offsetHeight;
        particles = [];
        
        // Create particles simulating water bubbles/tech data points
        const numParticles = window.innerWidth < 768 ? 40 : 100;
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 2 + 1,
                vx: Math.random() * 0.5 - 0.25,
                vy: Math.random() * -1 - 0.5, // Move upwards like water bubbles
                alpha: Math.random() * 0.5 + 0.1
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            
            // Reset if out of bounds
            if (p.y < 0) {
                p.y = height;
                p.x = Math.random() * width;
            }
            if (p.x < 0 || p.x > width) p.vx *= -1;

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
});
