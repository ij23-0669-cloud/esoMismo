const track = document.getElementById("carouselTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

if (track && prevBtn && nextBtn) {
    const scrollAmount = 392; // 360px de tarjeta + 32px de gap

    nextBtn.addEventListener("click", () => {
        track.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    prevBtn.addEventListener("click", () => {
        track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
}

const accordionHeaders = document.querySelectorAll(".accordion-header");

accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
        const content = header.nextElementSibling;
        header.classList.toggle("active");

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});

function setupScrollAnimations() {
    const selectors = '.fade-up, .reveal, .reveal-left, .reveal-right, .reveal-scale';
    const elements = document.querySelectorAll(selectors);
    if (!elements.length) return;

    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                if (el.classList.contains('fade-up')) el.classList.add('show');
                if (
                    el.classList.contains('reveal') ||
                    el.classList.contains('reveal-left') ||
                    el.classList.contains('reveal-right') ||
                    el.classList.contains('reveal-scale')
                ) {
                    el.classList.add('active');
                }
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });

    elements.forEach(el => io.observe(el));
}

setupScrollAnimations();
