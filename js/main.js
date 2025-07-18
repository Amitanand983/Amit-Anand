// ===== MINI MILITIA PORTFOLIO JAVASCRIPT =====

class MiniMilitiaPortfolio {
    constructor() {
        this.currentSection = 'base';
        this.audioEnabled = false;
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupAudio();
        this.setupAnimations();
        this.setupModals();
        this.setupScrollEffects();
        this.updateFooterYear();
        this.initializeWeaponAnimations();
    }

    // Navigation System
    setupNavigation() {
        const missionBtns = document.querySelectorAll('.mission-btn');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navMissions = document.querySelector('.nav-missions');

        // Mission button clicks
        missionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const mission = btn.dataset.mission;
                this.navigateToMission(mission);
                this.updateActiveMission(btn);
            });
        });

        // Mobile menu toggle
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                navMissions.classList.toggle('mobile-active');
            });
        }

        // Smooth scrolling for deploy buttons
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    navigateToMission(mission) {
        const target = document.getElementById(mission);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            this.currentSection = mission;
            this.playSound('navigate');
        }
    }

    updateActiveMission(activeBtn) {
        document.querySelectorAll('.mission-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }

    // Audio System
    setupAudio() {
        const audioToggle = document.getElementById('audio-toggle');
        
        audioToggle.addEventListener('click', () => {
            this.audioEnabled = !this.audioEnabled;
            const icon = audioToggle.querySelector('i');
            
            if (this.audioEnabled) {
                icon.className = 'fas fa-volume-up';
                this.playSound('activate');
            } else {
                icon.className = 'fas fa-volume-mute';
            }
        });

        // Add click sounds to interactive elements
        document.querySelectorAll('.deploy-btn, .action-btn, .contact-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.playSound('click');
            });
        });
    }

    playSound(type) {
        if (!this.audioEnabled) return;
        
        // Create audio context for sound effects
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        const sounds = {
            click: { frequency: 800, duration: 0.1 },
            navigate: { frequency: 600, duration: 0.2 },
            activate: { frequency: 1000, duration: 0.15 },
            hover: { frequency: 400, duration: 0.05 }
        };

        const sound = sounds[type];
        if (!sound) return;

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(sound.frequency, audioContext.currentTime);
        oscillator.type = 'square';

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + sound.duration);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + sound.duration);
    }

    // Animation System
    setupAnimations() {
        // GSAP animations
        if (typeof gsap !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            
            // Hero animations
            gsap.from('.dog-tag', {
                duration: 1.2,
                y: -100,
                opacity: 0,
                ease: 'bounce.out',
                delay: 0.3
            });

            gsap.from('.soldier-avatar', {
                duration: 1,
                scale: 0,
                opacity: 0,
                ease: 'back.out(1.7)',
                delay: 0.8
            });

            gsap.from('.mission-stats .stat-crate', {
                duration: 0.8,
                y: 50,
                opacity: 0,
                stagger: 0.2,
                ease: 'power2.out',
                delay: 1.2
            });

            gsap.from('.deploy-buttons .deploy-btn', {
                duration: 0.6,
                scale: 0,
                opacity: 0,
                stagger: 0.1,
                ease: 'back.out(1.7)',
                delay: 1.6
            });

            // Section animations
            this.animateOnScroll('.intel-crate', { y: 80, opacity: 0 });
            this.animateOnScroll('.weapon-crate', { y: 60, opacity: 0, stagger: 0.1 });
            this.animateOnScroll('.mission-briefing', { y: 80, opacity: 0, stagger: 0.2 });
            this.animateOnScroll('.medal-case', { y: 60, opacity: 0, stagger: 0.15 });
            this.animateOnScroll('.radio-equipment', { scale: 0.8, opacity: 0 });
        }

        // CSS animation classes
        this.setupIntersectionObserver();
    }

    animateOnScroll(selector, fromProps) {
        gsap.from(selector, {
            scrollTrigger: {
                trigger: selector,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            duration: 0.8,
            ease: 'power2.out',
            ...fromProps
        });
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }

    // Modal System
    setupModals() {
        const modal = document.getElementById('mission-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        const closeBtn = document.querySelector('.modal-close');

        // Mission details data
        const missionDetails = {
            summai: {
                title: 'OPERATION SUMMAI - DETAILED BRIEFING',
                content: `
                    <h4>Mission Objective:</h4>
                    <p>Develop a comprehensive multimodal AI platform capable of processing and summarizing text, audio, and video content with advanced Q&A capabilities.</p>
                    
                    <h4>Technical Specifications:</h4>
                    <ul>
                        <li><strong>Frontend:</strong> Streamlit for rapid prototyping and user interface</li>
                        <li><strong>Backend:</strong> Python with LangChain framework for AI orchestration</li>
                        <li><strong>AI Models:</strong> Groq API for fast inference, Whisper for audio processing</li>
                        <li><strong>Capabilities:</strong> Text summarization, audio transcription, video analysis</li>
                    </ul>
                    
                    <h4>Mission Status:</h4>
                    <p>Successfully deployed with full functionality. Platform demonstrates advanced multimodal processing capabilities with real-time summarization and intelligent Q&A features.</p>
                    
                    <h4>Strategic Impact:</h4>
                    <p>This platform showcases expertise in modern AI frameworks and demonstrates ability to integrate multiple AI services into a cohesive user experience.</p>
                `
            },
            amazon: {
                title: 'OPERATION AMAZON ML - INTELLIGENCE REPORT',
                content: `
                    <h4>Mission Objective:</h4>
                    <p>Develop a hybrid OCR and NLP solution for accurate text extraction from images using state-of-the-art language models.</p>
                    
                    <h4>Technical Arsenal:</h4>
                    <ul>
                        <li><strong>Core Model:</strong> Fine-tuned LLaMA 3.1 8B for enhanced text understanding</li>
                        <li><strong>OCR Systems:</strong> Tesseract and EasyOCR for robust text detection</li>
                        <li><strong>Framework:</strong> PyTorch for model training and inference</li>
                        <li><strong>Preprocessing:</strong> Advanced image enhancement techniques</li>
                    </ul>
                    
                    <h4>Mission Achievement:</h4>
                    <p><strong>RANK: TOP 200 / 75,000+ PARTICIPANTS</strong></p>
                    <p>Successfully achieved top-tier performance in Amazon's ML Challenge 2024, demonstrating exceptional problem-solving skills and technical expertise in computer vision and NLP.</p>
                    
                    <h4>Strategic Value:</h4>
                    <p>This mission showcased advanced model fine-tuning capabilities and hybrid AI system design, proving ability to compete at the highest levels of machine learning competitions.</p>
                `
            }
        };

        // Open modal buttons
        document.querySelectorAll('.view-intel').forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.dataset.target;
                const details = missionDetails[target];
                
                if (details) {
                    modalTitle.textContent = details.title;
                    modalBody.innerHTML = details.content;
                    modal.classList.add('active');
                    modal.style.display = 'flex';
                    this.playSound('activate');
                }
            });
        });

        // Close modal
        const closeModal = () => {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        };

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // Scroll Effects
    setupScrollEffects() {
        // Update active navigation based on scroll position
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            const scrollPos = window.scrollY + 100;

            sections.forEach(section => {
                const top = section.offsetTop;
                const bottom = top + section.offsetHeight;

                if (scrollPos >= top && scrollPos <= bottom) {
                    const id = section.getAttribute('id');
                    this.updateActiveNavigation(id);
                }
            });
        });

        // Parallax effects for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.hero-section');
            const speed = scrolled * 0.5;
            
            if (parallax) {
                parallax.style.transform = `translateY(${speed}px)`;
            }
        });
    }

    updateActiveNavigation(sectionId) {
        if (this.currentSection !== sectionId) {
            this.currentSection = sectionId;
            
            document.querySelectorAll('.mission-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.mission === sectionId) {
                    btn.classList.add('active');
                }
            });
        }
    }

    // Weapon Arsenal Animations
    initializeWeaponAnimations() {
        const weaponCrates = document.querySelectorAll('.weapon-crate');
        
        weaponCrates.forEach(crate => {
            crate.addEventListener('mouseenter', () => {
                this.playSound('hover');
                this.animateWeaponLevel(crate);
            });
        });
    }

    animateWeaponLevel(crate) {
        const levelFill = crate.querySelector('.level-fill');
        const currentWidth = levelFill.style.width;
        
        // Reset and animate
        levelFill.style.width = '0%';
        setTimeout(() => {
            levelFill.style.width = currentWidth;
        }, 100);
    }

    // Utility Functions
    updateFooterYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    // Mission Stats Counter Animation
    animateCounters() {
        const counters = document.querySelectorAll('.stat-value');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/\D/g, ''));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = counter.textContent.replace(/\d+/, target);
                    clearInterval(timer);
                } else {
                    counter.textContent = counter.textContent.replace(/\d+/, Math.floor(current));
                }
            }, 16);
        });
    }

    // Enhanced Hover Effects
    setupEnhancedHovers() {
        // Medal hover effects
        document.querySelectorAll('.medal-case').forEach(medal => {
            medal.addEventListener('mouseenter', () => {
                medal.style.transform = 'translateY(-10px) rotateY(5deg)';
                this.playSound('hover');
            });
            
            medal.addEventListener('mouseleave', () => {
                medal.style.transform = 'translateY(0) rotateY(0)';
            });
        });

        // Mission briefing hover effects
        document.querySelectorAll('.mission-briefing').forEach(mission => {
            mission.addEventListener('mouseenter', () => {
                mission.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            mission.addEventListener('mouseleave', () => {
                mission.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new MiniMilitiaPortfolio();
    
    // Start counter animations when stats section is visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                portfolio.animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    const statsSection = document.querySelector('.mission-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // Setup enhanced hover effects
    portfolio.setupEnhancedHovers();
});

// Additional utility functions
function createExplosionEffect(element) {
    const explosion = document.createElement('div');
    explosion.className = 'explosion-effect';
    explosion.style.position = 'absolute';
    explosion.style.top = '50%';
    explosion.style.left = '50%';
    explosion.style.transform = 'translate(-50%, -50%)';
    explosion.style.width = '100px';
    explosion.style.height = '100px';
    explosion.style.background = 'radial-gradient(circle, #ffa500, transparent)';
    explosion.style.borderRadius = '50%';
    explosion.style.opacity = '0';
    explosion.style.pointerEvents = 'none';
    explosion.style.zIndex = '1000';
    
    element.style.position = 'relative';
    element.appendChild(explosion);
    
    // Animate explosion
    explosion.animate([
        { opacity: 0, transform: 'translate(-50%, -50%) scale(0)' },
        { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        { opacity: 0, transform: 'translate(-50%, -50%) scale(2)' }
    ], {
        duration: 600,
        easing: 'ease-out'
    }).onfinish = () => {
        explosion.remove();
    };
}

// Add explosion effects to deploy buttons
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.deploy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            createExplosionEffect(btn);
        });
    });
});