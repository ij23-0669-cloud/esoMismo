document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Lógica del Formulario y Modal Dinámico
    // ==========================================
    const openModalBtn = document.getElementById('openStoryModal');
    const closeModalBtn = document.getElementById('closeStoryModal');
    const modalOverlay = document.getElementById('storyModal');
    const storyForm = document.getElementById('storyForm');

    const radioEgresado = document.getElementById('radioEgresado');
    const radioEstudiante = document.getElementById('radioEstudiante');
    const groupGraduationYear = document.getElementById('groupGraduationYear');
    const groupCurrentTerm = document.getElementById('groupCurrentTerm');
    const graduationYear = document.getElementById('graduationYear');
    const currentTerm = document.getElementById('currentTerm');

    function toggleDynamicFields() {
        if (radioEgresado.checked) {
            groupGraduationYear.classList.remove('hidden');
            graduationYear.required = true;
            
            groupCurrentTerm.classList.add('hidden');
            currentTerm.required = false;
            currentTerm.value = '';
        } else if (radioEstudiante.checked) {
            groupCurrentTerm.classList.remove('hidden');
            currentTerm.required = true;
            
            groupGraduationYear.classList.add('hidden');
            graduationYear.required = false;
            graduationYear.value = '';
        }
    }

    if (openModalBtn && modalOverlay) {
        if (radioEgresado) radioEgresado.addEventListener('change', toggleDynamicFields);
        if (radioEstudiante) radioEstudiante.addEventListener('change', toggleDynamicFields);

        openModalBtn.addEventListener('click', () => {
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        });

        const closeModal = () => {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
            storyForm.reset();
            if (groupGraduationYear) groupGraduationYear.classList.add('hidden');
            if (groupCurrentTerm) groupCurrentTerm.classList.add('hidden');
            if (graduationYear) graduationYear.required = false;
            if (currentTerm) currentTerm.required = false;
        };

        closeModalBtn.addEventListener('click', closeModal);

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });

        storyForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('storyName').value;
            const text = document.getElementById('storyText').value;
            
            let roleInfo = '';
            if (radioEgresado && radioEgresado.checked) {
                roleInfo = `Egresado - Año de graduación: ${graduationYear.value}`;
            } else if (radioEstudiante && radioEstudiante.checked) {
                roleInfo = `Estudiante Activo - Cuatrimestre: ${currentTerm.value}`;
            }

            console.log('Nueva historia recibida:', { nombre: name, rol: roleInfo, historia: text });
            alert(`¡Gracias ${name}! Tu historia ha sido guardada con éxito para el 60 aniversario.`);
            closeModal();
        });
    }

    // ==========================================
    // 2. Lógica del Acordeón (Agenda Conmemorativa)
    // ==========================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header && otherHeader.classList.contains('active')) {
                    otherHeader.classList.remove('active');
                    otherHeader.nextElementSibling.style.maxHeight = null;
                }
            });

            header.classList.toggle('active');

            if (header.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // ==========================================
    // 3. Lógica del Carrusel (Hall of Fame)
    // ==========================================
    const trackContainer = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (trackContainer && prevBtn && nextBtn) {
        const moveCarousel = (direction) => {
            const scrollAmount = 380 * direction; 
            
            trackContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        };

        nextBtn.addEventListener('click', () => moveCarousel(1));
        prevBtn.addEventListener('click', () => moveCarousel(-1));
    }

});