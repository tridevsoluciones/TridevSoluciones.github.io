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
// 4. VISOR DE IMÁGENES (LIGHTBOX) SEPARADO POR GALERÍAS
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox-close');
const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');

if (lightbox && lightboxImg) {
    const allGalleryImages = Array.from(document.querySelectorAll('.gallery-img'));
    let currentGallery = [];
    let currentIndex = 0;

    allGalleryImages.forEach((img) => {
        img.addEventListener('click', () => {
            // 1. Miramos a qué galería pertenece la foto clicada
            const galleryName = img.getAttribute('data-gallery');

            // 2. Filtramos solo las imágenes que tengan ese mismo nombre
            if (galleryName) {
                currentGallery = allGalleryImages.filter(i => i.getAttribute('data-gallery') === galleryName);
            } else {
                currentGallery = [img]; // Por si alguna foto no tiene grupo
            }

            // 3. Buscamos en qué posición está la foto clicada dentro de su grupo
            currentIndex = currentGallery.indexOf(img);

            // 4. Mostramos el visor
            lightbox.style.display = 'block';
            lightboxImg.src = img.src;
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
        if (currentGallery.length === 0) return;
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : currentGallery.length - 1;
        lightboxImg.src = currentGallery[currentIndex].src;
    });

    // Flecha Derecha
    nextBtn.addEventListener('click', () => {
        if (currentGallery.length === 0) return;
        currentIndex = (currentIndex < currentGallery.length - 1) ? currentIndex + 1 : 0;
        lightboxImg.src = currentGallery[currentIndex].src;
    });
}
// 5. LÓGICA DE LOS CARRUSELES INTEGADOS (Flechas y Pausa automática)
document.querySelectorAll('.inline-carousel').forEach(carousel => {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');
    const dots = carousel.querySelectorAll('.dot');
    let currentSlide = 0;

    function showSlide(index) {
        // Pausar el vídeo automáticamente si pasamos a otra diapositiva
        const activeVideo = slides[currentSlide].querySelector('video');
        if (activeVideo) activeVideo.pause();

        // Ocultar slide actual
        slides[currentSlide].classList.remove('active');
        if (dots.length > 0) dots[currentSlide].classList.remove('active');

        // Actualizar índice
        currentSlide = index;

        // Mostrar nuevo slide
        slides[currentSlide].classList.add('active');
        if (dots.length > 0) dots[currentSlide].classList.add('active');
    }

    // Flecha izquierda
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            let index = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
            showSlide(index);
        });
    }

    // Flecha derecha
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            let index = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
            showSlide(index);
        });
    }

    // Clic en los puntitos inferiores
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
});