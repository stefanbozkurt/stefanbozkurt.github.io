document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navigation-bar a");
    const navbar = document.querySelector(".navigation-bar");

    function highlightNav() {
        if (navbar.getBoundingClientRect().top > 0) {
            navLinks.forEach(link => link.classList.remove("active"));
            return;
        }

        let scrollPosition = window.scrollY + window.innerHeight / 6; // Verzögertes Highlighting

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute("id");

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", () => {
        requestAnimationFrame(highlightNav);
    });

    highlightNav(); // Direkt beim Laden ausführen
});
