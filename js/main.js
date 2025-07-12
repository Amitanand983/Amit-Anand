// ===== MAIN PORTFOLIO JAVASCRIPT =====

// ===== UTILITIES =====
const utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// ===== SCROLL PROGRESS BAR =====
class ScrollProgress {
    constructor() {
        this.progressBar = document.getElementById('scroll-progress');
        this.init();
    }

    init() {
        window.addEventListener('scroll', utils.debounce(() => {
            this.updateProgress();
        }, 10));
    }

    updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        this.progressBar.style.width = percent + '%';
    }
}

// ===== MATRIX BACKGROUND EFFECT =====
class MatrixBackground {
    constructor() {
        this.canvas = document.getElementById('matrix-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.matrixInterval = null;
        this.init();
    }

    init() {
        this.resizeCanvas();
        this.startMatrix();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = document.getElementById('about').offsetHeight;
    }

    startMatrix() {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}".split('');
        const font_size = 12;
        const columns = this.canvas.width / font_size;
        const drops = Array(Math.floor(columns)).fill(1);

        const drawMatrix = () => {
            this.ctx.fillStyle = "rgba(15, 12, 41, 0.05)";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = "#0F0";
            this.ctx.font = font_size + "px arial";
            
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                this.ctx.fillText(text, i * font_size, drops[i] * font_size);
                if (drops[i] * font_size > this.canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        if (this.matrixInterval) clearInterval(this.matrixInterval);
        this.matrixInterval = setInterval(drawMatrix, 33);
    }
}

// ===== FLOATING PARTICLES BACKGROUND =====
class ParticlesBackground {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.init();
    }

    init() {
        this.resizeCanvas();
        this.createParticles();
        this.drawParticles();
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createParticles();
        });
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < 48; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                r: 2 + Math.random() * 3,
                dx: -0.3 + Math.random() * 0.6,
                dy: -0.3 + Math.random() * 0.6,
                color: `hsl(${200 + Math.random() * 120}, 80%, 70%)`
            });
        }
    }

    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let p of this.particles) {
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
            this.ctx.fillStyle = p.color;
            this.ctx.shadowColor = p.color;
            this.ctx.shadowBlur = 16;
            this.ctx.fill();
            
            p.x += p.dx;
            p.y += p.dy;
            
            if (p.x < 0 || p.x > this.canvas.width) p.dx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.dy *= -1;
        }
        
        requestAnimationFrame(() => this.drawParticles());
    }
}

// ===== NAVIGATION =====
class Navigation {
    constructor() {
        this.mobileMenuButton = document.getElementById('mobile-menu-button');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
    }

    setupMobileMenu() {
        this.mobileMenuButton.addEventListener('click', () => {
            this.mobileMenu.classList.toggle('hidden');
        });
    }

    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
                    if (!this.mobileMenu.classList.contains('hidden')) {
                        this.mobileMenu.classList.add('hidden');
                    }
                }
            });
        });
    }
}

// ===== MODAL SYSTEM =====
class ModalSystem {
    constructor() {
        this.openModalButtons = document.querySelectorAll('[data-modal-target]');
        this.modalOverlays = document.querySelectorAll('.modal-overlay');
        this.modalCloseButtons = document.querySelectorAll('.modal-close');
        this.init();
    }

    init() {
        this.setupModalTriggers();
        this.setupModalClosers();
        this.setupKeyboardNavigation();
    }

    setupModalTriggers() {
        this.openModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = document.getElementById(button.dataset.modalTarget);
                this.openModal(modal);
            });
        });
    }

    setupModalClosers() {
        this.modalOverlays.forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.closeModal(overlay);
                }
            });
        });

        this.modalCloseButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal-overlay');
                this.closeModal(modal);
            });
        });
    }

    setupKeyboardNavigation() {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal-overlay.active');
                this.closeModal(openModal);
            }
        });
    }

    openModal(modal) {
        if (modal == null) return;
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    }

    closeModal(modal) {
        if (modal == null) return;
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
}

// ===== INTERACTIVE RESUME =====
class InteractiveResume {
    constructor() {
        this.resumeData = [
            {
                title: 'Education',
                icon: '<i class="fas fa-graduation-cap text-indigo-400"></i>',
                content: `<div class='text-lg mb-2 font-semibold'>Rajiv Gandhi Institute of Petroleum Technology (RGIPT)</div>
                    <div class='text-indigo-300 mb-1'>B.Tech, Computer Science & Engineering</div>
                    <div class='text-indigo-200 mb-2'>2021 - 2025</div>
                    <ul class='list-disc list-inside text-indigo-100 text-base space-y-1'>
                        <li>CGPA: 8.1/10</li>
                        <li>Relevant Coursework: AI, ML, Data Structures, Networks</li>
                    </ul>`
            },
            {
                title: 'Experience',
                icon: '<i class="fas fa-briefcase text-pink-400"></i>',
                content: `<div class='text-lg mb-2 font-semibold'>Technical Intern, Siemens</div>
                    <div class='text-indigo-300 mb-1'>May 2025 - Present | Bengaluru</div>
                    <ul class='list-disc list-inside text-indigo-100 text-base space-y-1'>
                        <li>Automated performance and power profiling of AI workflows for the COSEE project.</li>
                    </ul>
                    <div class='text-lg mt-4 mb-2 font-semibold'>UG Tutor, RGIPT</div>
                    <div class='text-indigo-300 mb-1'>Jan 2024 - May 2024</div>
                    <ul class='list-disc list-inside text-indigo-100 text-base space-y-1'>
                        <li>Provided tutoring to second-year undergraduate students.</li>
                    </ul>`
            },
            {
                title: 'Projects',
                icon: '<i class="fas fa-project-diagram text-yellow-400"></i>',
                content: `<div class='text-lg mb-2 font-semibold'>SummAI</div>
                    <div class='text-indigo-300 mb-1'>Multimodal Summarization & Q&A</div>
                    <div class='text-indigo-200 mb-2'>AI-driven platform to process text, audio, and video.</div>
                    <div class='text-lg mt-4 mb-2 font-semibold'>Amazon ML Challenge 2024</div>
                    <div class='text-indigo-300 mb-1'>Text Extraction from Images</div>
                    <div class='text-indigo-200 mb-2'>Hybrid OCR and NLP approach with a fine-tuned LLaMA 3.1 8B model.</div>`
            },
            {
                title: 'Skills',
                icon: '<i class="fas fa-tools text-sky-400"></i>',
                content: `<div class='flex flex-wrap gap-3 justify-center text-lg'>
                    <span class='bg-indigo-700/60 px-3 py-1 rounded-full neon-border'>Python</span>
                    <span class='bg-indigo-700/60 px-3 py-1 rounded-full neon-border'>JavaScript</span>
                    <span class='bg-indigo-700/60 px-3 py-1 rounded-full neon-border'>C/C++</span>
                    <span class='bg-indigo-700/60 px-3 py-1 rounded-full neon-border'>SQL</span>
                    <span class='bg-indigo-700/60 px-3 py-1 rounded-full neon-border'>PyTorch</span>
                    <span class='bg-indigo-700/60 px-3 py-1 rounded-full neon-border'>TensorFlow</span>
                    <span class='bg-indigo-700/60 px-3 py-1 rounded-full neon-border'>LangChain</span>
                    <span class='bg-indigo-700/60 px-3 py-1 rounded-full neon-border'>Docker</span>
                </div>`
            },
            {
                title: 'Publications',
                icon: '<i class="fas fa-book text-purple-400"></i>',
                content: `<div class='text-lg mb-2 font-semibold'>Sleep Posture Recognition (EAI BODYNETS 2024)</div>
                    <div class='text-indigo-300 mb-1'>Best Paper Award</div>
                    <div class='text-indigo-200 mb-2'>A Low-Overhead CNN-Based Approach For Sleep Posture Recognition With Device-Free Monitoring System using UWB Radar</div>
                    <div class='text-lg mt-4 mb-2 font-semibold'>Wireless Gesture Sensing (IEEE Network Magazine 2025)</div>
                    <div class='text-indigo-200 mb-2'>Knowledge Distillation-Based AIoT Framework for Efficient Wireless Gesture Sensing in B5G/6G Networks</div>`
            },
            {
                title: 'Achievements',
                icon: '<i class="fas fa-trophy text-yellow-400"></i>',
                content: `<div class='text-lg mb-2 font-semibold'>Academic Excellence</div>
                    <div class='text-indigo-300 mb-1'>CGPA: 8.1/10 | Dean's List All Semesters</div>
                    <div class='text-lg mt-4 mb-2 font-semibold'>Competition Success</div>
                    <div class='text-indigo-300 mb-1'>Amazon ML Challenge 2024 - Top 200/75,000+</div>
                    <div class='text-lg mt-4 mb-2 font-semibold'>Research Recognition</div>
                    <div class='text-indigo-300 mb-1'>Best Paper Award - EAI BODYNETS 2024</div>`
            }
        ];
        
        this.resumeIndex = 0;
        this.resumeFloatBtn = document.getElementById('resume-float-btn');
        this.resumeCloseBtn = document.getElementById('resume-close-btn');
        this.resumePrevBtn = document.getElementById('resume-prev');
        this.resumeNextBtn = document.getElementById('resume-next');
        this.resumeOverlay = document.getElementById('resume-overlay');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupKeyboardNavigation();
    }

    setupEventListeners() {
        this.resumeFloatBtn.addEventListener('click', () => this.showResumeOverlay(true));
        this.resumeCloseBtn.addEventListener('click', () => this.showResumeOverlay(false));
        this.resumePrevBtn.addEventListener('click', () => this.navigateResume(-1));
        this.resumeNextBtn.addEventListener('click', () => this.navigateResume(1));
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (document.body.classList.contains('modal-open')) {
                if (e.key === 'ArrowLeft') this.navigateResume(-1);
                if (e.key === 'ArrowRight') this.navigateResume(1);
                if (e.key === 'Escape') this.showResumeOverlay(false);
            }
        });
    }

    renderResumeCard(idx) {
        const data = this.resumeData[idx];
        document.getElementById('resume-cards').innerHTML = `
            <div class='rounded-2xl p-8 bg-gradient-to-br from-indigo-900/80 to-pink-900/70 neon-border shadow-2xl text-center animate__animated animate__fadeIn flex flex-col items-center' style='min-height:340px;'>
                <div class='text-5xl mb-4'>${data.icon}</div>
                <div class='text-2xl font-bold mb-2 text-indigo-200' style='letter-spacing:0.02em;'>${data.title}</div>
                <div class='text-base md:text-lg text-indigo-100'>${data.content}</div>
            </div>
        `;
    }

    showResumeOverlay(show) {
        if (show) {
            this.resumeOverlay.classList.remove('opacity-0', 'pointer-events-none');
            this.resumeOverlay.classList.add('opacity-100');
            document.body.classList.add('modal-open');
            this.renderResumeCard(this.resumeIndex);
        } else {
            this.resumeOverlay.classList.add('opacity-0', 'pointer-events-none');
            this.resumeOverlay.classList.remove('opacity-100');
            document.body.classList.remove('modal-open');
        }
    }

    navigateResume(direction) {
        this.resumeIndex = (this.resumeIndex + direction + this.resumeData.length) % this.resumeData.length;
        this.renderResumeCard(this.resumeIndex);
    }
}

// ===== ANIMATIONS =====
class Animations {
    constructor() {
        this.init();
    }

    init() {
        this.setupGSAPAnimations();
        this.setupCardTiltEffects();
        this.setupTypedJS();
    }

    setupGSAPAnimations() {
        if (typeof gsap !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            
            // Hero animations
            gsap.from(".animate-profile", { duration: 1, y: -50, opacity: 0, ease: "power2.out", delay: 0.2 });
            gsap.from(".animate-title", { duration: 1, y: -30, opacity: 0, ease: "power2.out", delay: 0.4 });
            gsap.from(".animate-subtitle", { duration: 1, opacity: 0, ease: "power2.out", delay: 0.6 });
            gsap.from(".animate-description", { duration: 1, opacity: 0, delay: 0.8 });
            gsap.from(".animate-buttons", { duration: 1, y: 30, opacity: 0, ease: "power2.out", delay: 1 });

            // Section animations
            gsap.utils.toArray("h2").forEach(h => {
                gsap.from(h, {
                    scrollTrigger: { trigger: h, start: "top 80%", toggleActions: "play none none none" },
                    opacity: 0, y: 50, duration: 0.8, ease: "power3.out"
                });
            });

            // Timeline animations
            gsap.from(".timeline::before", {
                scrollTrigger: { trigger: ".timeline", start: "top 70%", end: "bottom 80%", scrub: 1 },
                scaleY: 0, ease: "none"
            });

            gsap.utils.toArray(".timeline-container").forEach((c, i) => {
                gsap.from(c, {
                    scrollTrigger: { trigger: c, start: "top 90%", toggleActions: "play none none none" },
                    opacity: 0, x: c.classList.contains('left') ? -100 : 100, duration: 1, ease: "power3.out"
                });
            });

            // Card animations
            gsap.from(".project-card", {
                scrollTrigger: { trigger: "#projects", start: "top 70%", toggleActions: "play none none none" },
                opacity: 0, y: 50, duration: 0.8, stagger: 0.2, ease: "power3.out"
            });

            gsap.from(".achievement-card", {
                scrollTrigger: { trigger: "#achievements", start: "top 80%", toggleActions: "play none none none" },
                opacity: 0, y: 60, duration: 0.8, stagger: 0.15, ease: "power3.out"
            });

            gsap.from(".skill-card", {
                scrollTrigger: { trigger: "#skills", start: "top 80%", toggleActions: "play none none none" },
                opacity: 0, y: 50, duration: 0.5, stagger: 0.1, ease: "power3.out"
            });

            // Section fade-in effect
            gsap.utils.toArray('section').forEach(section => {
                gsap.from(section, {
                    scrollTrigger: { trigger: section, start: "top 85%", toggleActions: "play none none none" },
                    opacity: 0, y: 60, duration: 1, ease: "power2.out"
                });
            });

            // Parallax effects
            document.querySelectorAll('.parallax-on-scroll').forEach(el => {
                gsap.to(el, {
                    y: () => window.innerWidth < 900 ? 0 : 80,
                    ease: "none",
                    scrollTrigger: {
                        trigger: el,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });
        }
    }

    setupCardTiltEffects() {
        if (typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(document.querySelectorAll('.project-card, .publication-card'), {
                max: 10,
                speed: 400,
                glare: true,
                'max-glare': 0.15,
                scale: 1.03
            });
        }
    }

    setupTypedJS() {
        if (typeof Typed !== 'undefined') {
            new Typed('#typed-subtitle', {
                strings: ['AI/ML Enthusiast', 'Software Developer', 'Innovator', 'Problem Solver'],
                typeSpeed: 50,
                backSpeed: 30,
                loop: true,
                startDelay: 1200
            });
        }
    }
}

// ===== BACK TO TOP =====
class BackToTop {
    constructor() {
        this.button = document.getElementById('to-top-button');
        this.init();
    }

    init() {
        window.addEventListener('scroll', utils.debounce(() => {
            this.toggleVisibility();
        }, 100));

        this.button.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    toggleVisibility() {
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        this.button.style.display = scrollTop > 200 ? "block" : "none";
    }
}

// ===== PARALLAX EFFECTS =====
class ParallaxEffects {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('scroll', utils.debounce(() => {
            this.updateParallax();
        }, 10));
    }

    updateParallax() {
        const scrolled = window.scrollY;
        const parallax = document.querySelector('.parallax-bg');
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.25}px)`;
        }
    }
}

// ===== ACHIEVEMENTS SECTION FIX =====
class AchievementsFix {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            const achievementsSection = document.getElementById('achievements');
            if (achievementsSection) {
                achievementsSection.style.display = 'block';
                achievementsSection.style.visibility = 'visible';
                achievementsSection.style.opacity = '1';
                console.log('Achievements section found and made visible');
            } else {
                console.error('Achievements section not found!');
            }
        });
    }
}

// ===== FOOTER =====
class Footer {
    constructor() {
        this.yearElement = document.getElementById('year');
        this.init();
    }

    init() {
        this.updateYear();
    }

    updateYear() {
        this.yearElement.textContent = new Date().getFullYear();
    }
}

// ===== MAIN INITIALIZATION =====
class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        // Initialize all components
        new ScrollProgress();
        new MatrixBackground();
        new ParticlesBackground();
        new Navigation();
        new ModalSystem();
        new InteractiveResume();
        new Animations();
        new BackToTop();
        new ParallaxEffects();
        new AchievementsFix();
        new Footer();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
}); 