// Menú responsive para móviles
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

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
// 4. VISOR DE IMÁGENES (LIGHTBOX) PANTALLA COMPLETA
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox-close');
const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');

if (lightbox && lightboxImg) {
    // Recoge todas las imágenes que tengan la clase gallery-img
    const galleryImages = Array.from(document.querySelectorAll('.gallery-img'));
    let currentIndex = 0;

    // Al hacer clic en una foto, se abre el visor
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'block';
            lightboxImg.src = img.src;
            currentIndex = index;
        });
    });

    // Cerrar con la X
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Cerrar pinchando fuera de la foto
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    // Flecha Izquierda
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : galleryImages.length - 1;
        lightboxImg.src = galleryImages[currentIndex].src;
    });

    // Flecha Derecha
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < galleryImages.length - 1) ? currentIndex + 1 : 0;
        lightboxImg.src = galleryImages[currentIndex].src;
    });
}