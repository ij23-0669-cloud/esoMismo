document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. CONTROL DEL MODAL (Sincronizado con CSS .active)
    // ==========================================
    const modal = document.getElementById("storyModal");
    const openModalBtn = document.getElementById("openStoryModal");
    const closeModalBtn = document.getElementById("closeStoryModal");

    if (openModalBtn && modal && closeModalBtn) {
        // Abrir modal añadiendo la clase que activa la opacidad en tu CSS
        openModalBtn.addEventListener("click", () => {
            modal.classList.add("active"); 
        });

        // Cerrar modal quitando la clase
        closeModalBtn.addEventListener("click", () => {
            modal.classList.remove("active");
        });

        // Cerrar haciendo clic en el fondo oscuro
        window.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("active");
            }
        });
    }

    // ==========================================
    // 2. FORMULARIO DINÁMICO (Funciona perfecto con tu .hidden)
    // ==========================================
    const radioEgresado = document.getElementById("radioEgresado");
    const radioEstudiante = document.getElementById("radioEstudiante");
    const groupGraduationYear = document.getElementById("groupGraduationYear");
    const groupCurrentTerm = document.getElementById("groupCurrentTerm");

    function toggleFormFields() {
        if (radioEgresado && radioEgresado.checked) {
            groupGraduationYear.classList.remove("hidden");
            groupCurrentTerm.classList.add("hidden");
        } else if (radioEstudiante && radioEstudiante.checked) {
            groupGraduationYear.classList.add("hidden");
            groupCurrentTerm.classList.remove("hidden");
        }
    }

    if (radioEgresado && radioEstudiante) {
        radioEgresado.addEventListener("change", toggleFormFields);
        radioEstudiante.addEventListener("change", toggleFormFields);
    }

    // ==========================================
    // 3. CARRUSEL DE HALL OF FAME
    // ==========================================
    const track = document.getElementById("carouselTrack");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (track && prevBtn && nextBtn) {
        const scrollAmount = 392; // 360px de tarjeta + 32px de gap (según tu CSS)

        nextBtn.addEventListener("click", () => {
            track.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });

        prevBtn.addEventListener("click", () => {
            track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        });
    }

    // ==========================================
    // 4. ACORDEÓN DE LA AGENDA (Sincronizado con CSS .active)
    // ==========================================
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const content = header.nextElementSibling;
            
            // Alterna la clase .active para que tu CSS cambie los colores y gire el ícono
            header.classList.toggle("active");
            
            // Controla la altura máxima para que funcione la animación del CSS
            if (content.style.maxHeight) {
                content.style.maxHeight = null; // Lo cierra
            } else {
                content.style.maxHeight = content.scrollHeight + "px"; // Lo abre
            }
        });
    });

    // ==========================================
    // 5. ANIMACIONES AL DESPLAZAR (IntersectionObserver unificado)
    // ==========================================
    (function setupScrollAnimations() {
        const selectors = '.fade-up, .reveal, .reveal-left, .reveal-right, .reveal-scale';
        const elements = document.querySelectorAll(selectors);
        if (!elements.length) return;

        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    // .fade-up usa la clase .show en tu CSS
                    if (el.classList.contains('fade-up')) el.classList.add('show');
                    // Las variantes .reveal usan .active
                    if (
                        el.classList.contains('reveal') ||
                        el.classList.contains('reveal-left') ||
                        el.classList.contains('reveal-right') ||
                        el.classList.contains('reveal-scale')
                    ) {
                        el.classList.add('active');
                    }
                    // Dejar de observar una vez animado para mejorar rendimiento
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });

        elements.forEach(el => io.observe(el));
    })();
});
