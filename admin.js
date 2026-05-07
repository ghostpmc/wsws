const projectForm = document.getElementById('add-project-form');
const adminProjectList = document.getElementById('admin-projects-list');
const imageInput = document.getElementById('proj-image');
const imageFile = document.getElementById('proj-image-file');

// Handle File Selection and Convert to Base64
imageFile?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            imageInput.value = event.target.result; // Set Base64 string to URL input
            alert('Изображение загружено локально!');
        };
        reader.readAsDataURL(file);
    }
});

// Render Projects in Admin Table
function renderAdminProjects() {
    const projects = JSON.parse(localStorage.getItem('portfolio-projects')) || [];
    adminProjectList.innerHTML = '';

    projects.forEach((project) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${project.title}</td>
            <td><span class="project-tag">${project.tag}</span></td>
            <td><i class="${project.icon}"></i></td>
            <td>
                <button class="btn-delete" onclick="deleteProject(${project.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        adminProjectList.appendChild(row);
    });
}

// Add New Project
projectForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('proj-title').value;
    const tag = document.getElementById('proj-tag').value;
    const desc = document.getElementById('proj-desc').value;
    const icon = document.getElementById('proj-icon').value;
    const image = document.getElementById('proj-image').value || 'photo_2026-02-17_23-05-18.jpg';
    const link = document.getElementById('proj-link').value;

    const newProject = {
        id: Date.now(),
        title,
        tag,
        desc,
        icon,
        image,
        link
    };

    const projects = JSON.parse(localStorage.getItem('portfolio-projects')) || [];
    projects.push(newProject);
    localStorage.setItem('portfolio-projects', JSON.stringify(projects));

    projectForm.reset();
    renderAdminProjects();
    alert('Проект успешно добавлен!');
});

// Delete Project
window.deleteProject = function(id) {
    if (!confirm('Вы уверены, что хотите удалить этот проект?')) return;

    let projects = JSON.parse(localStorage.getItem('portfolio-projects')) || [];
    projects = projects.filter(p => p.id !== id);
    localStorage.setItem('portfolio-projects', JSON.stringify(projects));
    
    renderAdminProjects();
};

// Simple AOS Logic for Admin
function triggerAOS() {
    const items = document.querySelectorAll('[data-aos]');
    items.forEach(item => item.classList.add('aos-animate'));
}

// Initialize Admin
document.addEventListener('DOMContentLoaded', () => {
    renderAdminProjects();
    triggerAOS();
});
