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

// Gestión REAL del formulario de contacto (Envío directo a Gmail sin backend)
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Cambiamos el texto del botón mientras se envía
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando mensaje...';
    formStatus.style.display = 'none';

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value.trim() || 'No especificado';
    const mensaje = document.getElementById('mensaje').value;

    // Enviamos los datos por AJAX al servicio FormSubmit conectado a vuestro Gmail
    fetch("https://formsubmit.co/ajax/tridevsoluciones@gmail.com", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            _subject: `🚀 Nuevo cliente desde la web: ${nombre}`,
            Nombre_Empresa: nombre,
            Correo_Contacto: email,
            Telefono_Contacto: telefono,
            Detalles_Proyecto: mensaje,
            _template: "table" // Envía el correo con una tabla limpia y ordenada
        })
    })
        .then(response => response.json())
        .then(data => {
            formStatus.style.display = 'block';
            formStatus.style.color = '#16a34a'; // Verde éxito
            formStatus.textContent = '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo muy pronto.';
            contactForm.reset();
        })
        .catch(error => {
            formStatus.style.display = 'block';
            formStatus.style.color = '#dc2626'; // Rojo error
            formStatus.textContent = 'Hubo un problema al enviar. Por favor, escríbenos directamente a tridevsoluciones@gmail.com';
            console.error('Error:', error);
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar Mensaje';
        });
});