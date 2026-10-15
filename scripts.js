// Menú responsive para móviles
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Cerrar el menú móvil al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Gestión del formulario de contacto (Redirección mailto para GitHub Pages)
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;

    const subject = encodeURIComponent(`Nuevo contacto web de: ${nombre}`);
    const body = encodeURIComponent(`Nombre/Empresa: ${nombre}\nCorreo: ${email}\n\nDetalles del proyecto:\n${mensaje}`);

    // Abre el gestor de correo del usuario listo para enviar a tridevsoluciones@gmail.com
    window.location.href = `mailto:tridevsoluciones@gmail.com?subject=${subject}&body=${body}`;

    alert('¡Gracias por contactar con TridevSoluciones! Se abrirá tu aplicación de correo para completar el envío.');
    contactForm.reset();
});