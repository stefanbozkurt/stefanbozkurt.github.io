document.addEventListener("scroll", function () {
    const navBar = document.querySelector(".navigation-bar");
    const brand = document.querySelector(".brand");

    if (navBar.getBoundingClientRect().top === 0) {
        brand.style.opacity = "1"; // Einblenden
        brand.style.transition = "opacity 0.3s ease-in-out";
    } else {
        brand.style.opacity = "0"; // Ausblenden
    }
});

