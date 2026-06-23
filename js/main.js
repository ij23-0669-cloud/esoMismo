document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("storyModal");
    const openModalBtn = document.getElementById("openStoryModal");
    const closeModalBtn = document.getElementById("closeStoryModal");
    const storyForm = document.getElementById("storyForm");
    const submitButton = storyForm ? storyForm.querySelector("button[type='submit']") : null;

    function openModal() {
        if (modal) {
            modal.classList.add("active");
        }
    }

    function closeModal() {
        if (modal) {
            modal.classList.remove("active");
        }
    }

    if (openModalBtn) {
        openModalBtn.addEventListener("click", openModal);
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", closeModal);
    }

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

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
        toggleFormFields();
    }

    if (storyForm) {
        storyForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(storyForm);
            const data = {};

            formData.forEach((value, key) => {
                data[key] = value;
            });

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = "Enviando...";
            }

            setTimeout(() => {
                alert("Gracias por enviar tu historia. Nos pondremos en contacto contigo pronto.");
                storyForm.reset();
                toggleFormFields();
                closeModal();

                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = "Enviar mi historia";
                }
            }, 800);
        });
    }
});
