document.addEventListener("DOMContentLoaded", function () {
    const menuLink = document.querySelector("#main-menu"); // Burger-Menü Button
    const modal = document.querySelector(".menu-modal"); // Modal (Popup)
    const modalContent = document.querySelector(".modal-content");
    const mainNavigation = document.querySelector(".main-navigation"); // Hauptnavigation
    const brand = document.querySelector('.brand');
    const mainMenu = document.getElementById('main-menu');
    const navigationBar = document.querySelector('.navigation-bar');

    if (!menuLink || !modal || !mainNavigation || !brand || !mainMenu || !navigationBar) {
        console.error("Einige Elemente wurden nicht gefunden!");
        return;
    }

    // Toggle der Klasse "active" für das Burger-Menü
    menuLink.addEventListener("click", function (e) {
        e.preventDefault();
        menuLink.classList.toggle("active"); // Aktiviert/deaktiviert die "active"-Klasse für das Menü
        modal.classList.toggle("active"); // Zeigt das Modal an oder blendet es aus

        // Beim Öffnen des Modals: Verschiebe die Navigation ins Modal, falls sie noch nicht vorhanden ist
        if (modal.classList.contains("active")) {
            const modalNav = modal.querySelector(".main-navigation");
            if (!modalNav) {  // Nur einfügen, wenn die Navigation noch nicht im Modal ist
                const navClone = mainNavigation.cloneNode(true); // Kopiere die Navigation
                modal.querySelector(".modal-content").appendChild(navClone); // Füge sie ins Modal ein
            }
        } else {
            // Beim Schließen des Modals: Entferne die Navigation aus dem Modal
            const modalNav = modal.querySelector(".main-navigation");
            if (modalNav) {
                modalNav.remove(); // Entferne Navigation aus dem Modal
            }
        }
    });

    // Klick außerhalb des Modals: Modal schließen
    document.body.addEventListener("click", function (e) {
        // Wenn das Modal geöffnet ist und der Klick nicht innerhalb des Modals oder auf das Burger-Menü war
        if (modal.classList.contains("active") && !modalContent.contains(e.target) && !menuLink.contains(e.target)) {
            modal.classList.remove("active");
            menuLink.classList.remove("active"); // Burger-Menü-Icon zurücksetzen (z.B. zurück zum Burger)
        }
    });

    // Klick innerhalb des Modals (auf Links oder andere Elemente) zum Schließen
    modalContent.addEventListener("click", function (e) {
        // Wenn auf einen Link innerhalb des Modals geklickt wird, Modal schließen
        if (e.target.tagName.toLowerCase() === 'a') {
            modal.classList.remove("active");
            menuLink.classList.remove("active"); // Burger-Menü-Icon zurücksetzen
        }
    });

    // Funktion, um das Modal beim Fenster-Resize zu schließen
    window.addEventListener("resize", function () {
        if (modal.classList.contains("active")) {
            modal.classList.remove("active"); // Modal ausblenden
            menuLink.classList.remove("active"); // Burger-Menü zurücksetzen
        }
    });

    // Funktion, um die Brand-Position je nach Fenstergröße anzupassen
    function adjustBrandPosition() {
        if (window.innerWidth <= 991) {
            // Verschiebe .brand vor das main-menu, wenn unter 991px
            if (!mainMenu.contains(brand)) {  // Verhindert doppelte Einfügungen
                navigationBar.insertAdjacentElement('afterbegin', brand);
            }
        } else {
            // Verschiebe .brand zurück in die Navbar, wenn über 991px
            const navbar = document.querySelector('.navbar');
            const menuItems = document.querySelector('.nav__items');
            if (!navbar.contains(brand)) {  // Verhindert doppelte Einfügungen
                navbar.insertAdjacentElement('afterbegin', brand); // Wir nutzen insertAdjacentElement anstelle von insertBefore
            }
        }
    }

    // Beim Laden der Seite die Position anpassen
    adjustBrandPosition();

    // Event Listener für Fenstergrößenänderungen
    window.addEventListener('resize', adjustBrandPosition);

    // Funktion, um die Sichtbarkeit der Brand bei Scrollen zu steuern
    function handleBrandVisibility() {
        const navBar = document.querySelector(".navigation-bar");

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

    // Scroll-Event für die Sichtbarkeit der Brand
    document.addEventListener("scroll", handleBrandVisibility);

    // Resize-Event für die Fenstergröße
    window.addEventListener("resize", handleBrandVisibility);

    // Initialer Aufruf beim Laden der Seite
    handleBrandVisibility();
});


document.addEventListener("DOMContentLoaded", function () {
    const languageSelector = document.getElementById('language-selector');
    
    // Funktion, um die Optionstexte je nach Bildschirmgröße anzupassen
    function adjustLanguageOptions() {
        const options = languageSelector.querySelectorAll('option');

        // Wenn Bildschirm kleiner oder gleich 991px ist (für mobile Ansicht)
        if (window.innerWidth <= 600) {
            options[0].textContent = "DE"; // Text für Deutsch ändern
            options[1].textContent = "EN"; // Text für Englisch ändern
        } else {
            options[0].textContent = "Deutsch"; // Text zurücksetzen auf Deutsch
            options[1].textContent = "Englisch"; // Text zurücksetzen auf Englisch
        }
    }

    // Anpassung beim Laden der Seite
    adjustLanguageOptions();

    // Event Listener für Fenstergrößenänderungen
    window.addEventListener('resize', adjustLanguageOptions);
});