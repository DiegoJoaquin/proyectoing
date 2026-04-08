document.addEventListener('DOMContentLoaded', () => {
    
    // Header Scroll Effect
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Reveal Animations (IntersectionObserver)
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Optional: stop observing once shown
                // observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => revealObserver.observe(el));

    // Modal Logic
    const modal = document.getElementById('videoModal');
    const closeModal = document.querySelector('.close-modal');
    const iframe = modal.querySelector('iframe');

    window.openModal = function(title) {
        // In a real project, we would map the title/ID to a specific video URL
        // Using a high-quality placeholder engineering video for demo
        const demoVideo = "https://player.vimeo.com/video/371433846?autoplay=1"; 
        
        iframe.src = demoVideo;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock scroll

        // User requested "Both" (Modal + Scroll)
        // Ensure the projects section is centered when opening
        const projectsSec = document.getElementById('proyectos');
        projectsSec.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        iframe.src = ""; // Stop video
        document.body.style.overflow = 'auto'; // Unlock scroll
    });

    // Close modal on click outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            iframe.src = "";
            document.body.style.overflow = 'auto';
        }
    });

    // Form Handling (Visual Only)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = 'Enviando...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = 'Mensaje Enviado';
                btn.style.background = '#10B981';
                btn.style.opacity = '1';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // Smooth Scroll for Navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSec = document.querySelector(targetId);
            if (targetSec) {
                window.scrollTo({
                    top: targetSec.offsetTop - 70, // Header offset
                    behavior: 'smooth'
                });
            }
        });
    });
});
