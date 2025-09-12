// Projects data
const projects = [
    {
        title: "AI Customer Feedback Analyser",
        description: "An end-to-end AI service that analyses customer reviews. Features a Python API (using Flask) to serve sentiment and topic models, with a live Power BI dashboard for monitoring.",
        tags: ["AI/ML", "Python", "API Development", "Power BI"],
        categories: ["ai-ml", "api", "analytics"],
        githubUrl: "https://github.com/Manhwilly/AI-Powered-Customer-Feedback-Analyser",
        metrics: "95% accuracy in sentiment classification"
    },
    {
        title: "Mobile Business Insights App",
        description: "A native mobile application built with Kotlin that connects to a live database, allowing users to view key performance indicators on the go.",
        tags: ["App Development", "Kotlin", "SQL", "Mobile"],
        categories: ["mobile", "analytics"],
        githubUrl: "#",
        metrics: "Real-time KPI tracking for business users"
    },
    {
        title: "Financial Analytics Tool (JPMorgan)",
        description: "Contributed to a financial analytics tool, using Python to process large datasets and Power BI to create insightful dashboards for traders.",
        tags: ["Data Analysis", "Python", "Power BI", "Finance"],
        categories: ["analytics", "ai-ml"],
        githubUrl: "#",
        metrics: "Processed 1M+ financial transactions daily"
    }
];

// DOM elements
let navbar, navToggle, navMenu, navLinks, projectsGrid, filterBtns;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements after DOM is loaded
    navbar = document.getElementById('navbar');
    navToggle = document.getElementById('nav-toggle');
    navMenu = document.getElementById('nav-menu');
    navLinks = document.querySelectorAll('.nav-link');
    projectsGrid = document.getElementById('projects-grid');
    filterBtns = document.querySelectorAll('.filter-btn');
    
    // Initialize all functionality
    initializeNavigation();
    initializeProjectFiltering();
    initializeScrollAnimations();
    initializeSkillBars();
    initializeCounterAnimations();
    generateProjects(); // Generate projects first
    
    // Add a small delay to ensure DOM is fully ready
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-section');
        heroElements.forEach(el => {
            el.classList.add('animated');
        });
    }, 100);
});

// Navigation functionality
function initializeNavigation() {
    if (!navToggle || !navMenu || !navLinks) return;
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active navigation link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Add scroll effect to navbar
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

function updateActiveNavLink() {
    if (!navLinks.length) return;
    
    const scrollPosition = window.scrollY + 100;
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

// Project filtering functionality
function initializeProjectFiltering() {
    if (!filterBtns.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('filter-btn--active'));
            btn.classList.add('filter-btn--active');
            
            // Filter projects
            filterProjects(filter);
        });
    });
}

function filterProjects(filter) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const categories = card.getAttribute('data-categories');
        
        if (filter === 'all' || (categories && categories.includes(filter))) {
            card.style.display = 'block';
            card.classList.add('fade-in');
        } else {
            card.style.display = 'none';
            card.classList.remove('fade-in');
        }
    });
}

// Generate project cards
function generateProjects() {
    if (!projectsGrid) {
        console.log('Projects grid not found, retrying...');
        setTimeout(generateProjects, 100);
        return;
    }
    
    console.log('Generating projects...', projects.length);
    projectsGrid.innerHTML = '';
    
    projects.forEach((project, index) => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
        
        // Add staggered animation delay
        projectCard.style.animationDelay = `${index * 100}ms`;
    });
    
    console.log('Projects generated:', projectsGrid.children.length);
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card animate-on-scroll';
    card.setAttribute('data-categories', project.categories.join(' '));
    
    const githubLink = project.githubUrl && project.githubUrl !== '#' ? 
        `<a href="${project.githubUrl}" target="_blank" class="project-link">
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
        </a>` : 
        `<span class="project-link project-link--disabled">
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
        </span>`;
    
    card.innerHTML = `
        <div class="project-header">
            <div class="project-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
            </div>
            <div class="project-links">
                ${githubLink}
            </div>
        </div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        ${project.metrics ? `<div class="project-metrics">✓ ${project.metrics}</div>` : ''}
        <div class="project-tags">
            ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
        </div>
    `;
    
    return card;
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    setTimeout(() => {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => observer.observe(el));
        
        // Add scroll classes to elements that should animate
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const cards = section.querySelectorAll('.dashboard-card, .skill-category, .project-card');
            cards.forEach(card => {
                if (!card.classList.contains('animate-on-scroll')) {
                    card.classList.add('animate-on-scroll');
                }
                observer.observe(card);
            });
        });
    }, 200);
}

// Skill bars animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                
                setTimeout(() => {
                    progressBar.style.width = `${width}%`;
                }, 200);
                
                skillObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => skillObserver.observe(bar));
}

// Counter animations
function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.dashboard-card-metric');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = counter.textContent.trim();
                
                // Only animate numeric values
                const numMatch = target.match(/\d+/);
                if (numMatch) {
                    const finalNumber = parseInt(numMatch[0]);
                    const suffix = target.replace(numMatch[0], '');
                    
                    animateCounter(counter, 0, finalNumber, suffix, 2000);
                }
                
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, start, end, suffix, duration) {
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(start + (end - start) * easeOut);
        
        element.textContent = currentValue + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = end + suffix;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add smooth scroll behavior to all anchor links
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
});

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize if open
    if (window.innerWidth > 768 && navMenu) {
        navMenu.classList.remove('active');
        if (navToggle) navToggle.classList.remove('active');
    }
}, 250));

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (navToggle) navToggle.classList.remove('active');
    }
});

// Performance optimization: Throttle scroll events
let isScrolling = false;

window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            updateActiveNavLink();
            isScrolling = false;
        });
        isScrolling = true;
    }
});

// Add loading states for better UX
function showLoading(element) {
    if (element) element.classList.add('loading');
}

function hideLoading(element) {
    if (element) element.classList.remove('loading');
}

// Error handling for failed loads
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// Add fade-in animation to page load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Ensure projects are generated if they weren't already
    if (projectsGrid && projectsGrid.children.length === 0) {
        generateProjects();
    }
    
    // Trigger initial animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-section .animate-on-scroll');
        heroElements.forEach(el => {
            el.classList.add('animated');
        });
    }, 100);
});

// Export functions for potential external use
window.portfolioApp = {
    scrollToTop,
    filterProjects,
    showLoading,
    hideLoading,
    generateProjects
};