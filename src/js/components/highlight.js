
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navigation-bar a");
const navbar = document.querySelector(".navigation-bar");

function highlightNav() {
    let scrollPosition = window.scrollY + window.innerHeight / 3; // Zuvor war es /6, das kannst du je nach Bedarf anpassen

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute("id");

        // Überprüfe, ob der aktuelle Scroll-Bereich innerhalb der Sektion liegt
        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {
            navLinks.forEach((link) => {
                link.classList.remove("active"); // Alle Links zuerst zurücksetzen

                // Aktuellen Link basierend auf der ID der Sektion aktivieren
                if (link.getAttribute("href") === `#${sectionId}`) {
                    link.classList.add("active");
                }
            });
        }
    });
}

// Überprüfe beim Scrollen regelmäßig, ob das Highlighting aktualisiert werden muss
window.addEventListener("scroll", () => {
    requestAnimationFrame(highlightNav); // Damit das Highlighting effizient läuft
});

highlightNav(); // Direkt beim Laden ausführen

