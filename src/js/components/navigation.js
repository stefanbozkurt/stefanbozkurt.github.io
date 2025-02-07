document.addEventListener("DOMContentLoaded", function () {
    const menuLink = document.querySelector("#main-menu"); // Stelle sicher, dass es "main-menu" ist

    if (!menuLink) {
        console.error("Burger-Menu-Element nicht gefunden!");
        return;
    }

    menuLink.addEventListener("click", function (e) {
        e.preventDefault();
        menuLink.classList.toggle("active"); // Toggle die Klasse "active" für das Menü
    });

    const brand = document.querySelector('.brand');
    const mainMenu = document.getElementById('main-menu');
    const navigationBar = document.querySelector('.navigation-bar');

    function adjustBrandPosition() {
        if (window.innerWidth <= 991) {
            // Verschiebe .brand vor das main-menu, wenn unter 991px
            if (!mainMenu.contains(brand)) {  // Verhindert doppelte Einfügungen
                navigationBar.insertBefore(brand, mainMenu);
            }
        } else {
            // Verschiebe .brand zurück in die Navbar, wenn über 991px
            const navbar = document.querySelector('.navbar');
            const menuItems = document.querySelector('.nav__items');
            if (!navbar.contains(brand)) {  // Verhindert doppelte Einfügungen
                navbar.insertBefore(brand, menuItems);
            }
        }
    }

    // Beim Laden der Seite die Position anpassen
    adjustBrandPosition();

    // Event Listener für Fenstergrößenänderungen
    window.addEventListener('resize', adjustBrandPosition);
});











function handleBrandVisibility() {
    const navBar = document.querySelector(".navigation-bar");
    const brand = document.querySelector(".brand");

    // Überprüfen, ob der Bildschirm unter 991px ist
    if (window.innerWidth <= 991) {
        // Unter 991px: Brand immer sichtbar machen
        brand.style.opacity = "1";
        brand.style.transition = "none"; // Kein Übergang, immer sichtbar
    } else {
        // Ab 991px: Scrollen beeinflusst die Sichtbarkeit
        if (navBar.getBoundingClientRect().top === 0) {
            // Einblenden bei top: 0
            brand.style.opacity = "1";
            brand.style.transition = "opacity 0.3s ease-in-out";
        } else {
            // Ausblenden bei Scrollen
            brand.style.opacity = "0";
        }
    }
}

// Scroll-Event
document.addEventListener("scroll", handleBrandVisibility);

// Resize-Event für die Fenstergröße
window.addEventListener("resize", handleBrandVisibility);

// Initialer Aufruf beim Laden der Seite
handleBrandVisibility();





