// Initial Projects Data
const defaultProjects = [
    {
        id: 1,
        title: "Modern Dashboard",
        tag: "UI/UX Design",
        desc: "Professional analytics dashboard with dark mode and sleek charts.",
        icon: "fas fa-chart-line",
        image: "photo_2026-02-17_23-05-18.jpg",
        link: "#"
    },
    {
        id: 2,
        title: "E-Commerce App",
        tag: "Web Development",
        desc: "Full-featured online store with cart and payment integration.",
        icon: "fas fa-shopping-bag",
        image: "photo_2026-02-17_23-05-18.jpg",
        link: "#"
    },
    {
        id: 3,
        title: "Crypto Tracker",
        tag: "API Integration",
        desc: "Real-time cryptocurrency tracking application with live data.",
        icon: "fab fa-bitcoin",
        image: "photo_2026-02-17_23-05-18.jpg",
        link: "#"
    }
];

const defaultDesign = [
    { title: "Gaming Party Poster", cat: "Graphic Design", src: "Instagram story - 3.png" },
    { title: "Apple Vision Pro 2", cat: "UI/UX Design", src: "Slide 16_9 - 4@2x.png" },
    { title: "Vision Concept", cat: "Interface Design", src: "Slide 16_9 - 5@2x.png" },
    { title: "Future Interface", cat: "Web Design", src: "Slide 16_9 - 6@2x.png" },
    { title: "Glassmorphism UI", cat: "Product Design", src: "Slide 16_9 - 7@2x.png" },
    { title: "Mobile App Concept", cat: "App Design", src: "photo_1_2026-05-07_19-57-27.jpg" },
    { title: "Dashboard Design", cat: "Admin UI", src: "photo_2_2026-05-07_19-57-27.jpg" },
    { title: "Modern Brand", cat: "Branding", src: "photo_3_2026-05-07_19-57-27.jpg" },
    { title: "Cyberpunk Layout", cat: "Art Design", src: "photo_2026-05-07_19-58-11.jpg" }
];

// Initialize LocalStorage if empty
if (!localStorage.getItem('portfolio-projects')) {
    localStorage.setItem('portfolio-projects', JSON.stringify(defaultProjects));
}

// Function to render projects on index.html
function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    const projects = JSON.parse(localStorage.getItem('portfolio-projects'));
    container.innerHTML = '';

    projects.forEach((project, index) => {
        const item = document.createElement('div');
        item.className = 'project-card';
        item.setAttribute('data-aos', '');
        item.style.transitionDelay = `${index * 100}ms`;

        item.innerHTML = `
            <div class="project-card-image">
                <img src="${project.image || 'photo_2026-02-17_23-05-18.jpg'}" alt="${project.title}">
            </div>
            <div class="project-card-content">
                <span>${project.tag}</span>
                <h3>${project.title}</h3>
                <p>${project.desc}</p>
                <div class="project-card-footer">
                    <a href="${project.link}" target="_blank" class="project-link">
                        <i class="fab fa-github"></i> View on GitHub
                    </a>
                </div>
            </div>
        `;
        container.appendChild(item);
    });

    // Re-trigger AOS-like animation
    setTimeout(triggerAOS, 100);
}

// Function to render design items
function renderDesign() {
    const container = document.getElementById('design-container');
    if (!container) return;

    container.innerHTML = '';
    defaultDesign.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'project-item';
        div.setAttribute('data-aos', '');
        div.style.transitionDelay = `${index * 50}ms`;

        div.innerHTML = `
            <img src="${item.src}" alt="${item.title}">
            <div class="project-overlay">
                <span>${item.cat}</span>
                <h3>${item.title}</h3>
            </div>
        `;
        container.appendChild(div);
    });
}

// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links a');

menuToggle?.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    const menuIcon = menuToggle.querySelector('i');
    if (menuIcon) {
        menuIcon.className = navLinksContainer.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
    }
});

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        const menuIcon = menuToggle?.querySelector('i');
        if (menuIcon) menuIcon.className = 'fas fa-bars';
    });
});

// Simple AOS Logic
function triggerAOS() {
    const items = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, { threshold: 0.1 });

    items.forEach(item => observer.observe(item));
}

// Active Nav Link on Scroll
window.addEventListener('scroll', () => {
    let current = "";
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    renderDesign();
    triggerAOS();
});
