document.addEventListener('DOMContentLoaded', function() {
    // Warte, bis das Menü aus der externen Datei geladen wurde
    const navigationContainer = document.querySelector('#navigation');

    // Lade das externe HTML-Dokument mit Fetch
    fetch('modules/navigation.html')
        .then(response => response.text())
        .then(html => {
            // Füge den geladenen HTML-Inhalt in den Container ein
            navigationContainer.innerHTML = html;

            // Jetzt sind die Menü-Elemente verfügbar, also initialisiere das Menü
            initializeMenu();
        })
        .catch(error => {
            console.error('Fehler beim Laden des Menüs:', error);
        });

    // Funktion zur Initialisierung des Menüs
    function initializeMenu() {
        const body = document.querySelector('body');
        const menuLink = document.querySelector('.menu-link');
        const menu = document.getElementById('menu');
        const bar1 = document.querySelector('.bar1');
        const bar2 = document.querySelector('.bar2');
        const bar3 = document.querySelector('.bar3');

        // Überprüfen, ob alle benötigten Elemente vorhanden sind
        if (!menuLink || !menu || !bar1 || !bar2 || !bar3) {
            console.error('Ein oder mehrere Menü-Elemente konnten nicht gefunden werden.');
            return;
        }

        // Funktion zum Ein- und Ausklappen des Menüs
        menuLink.addEventListener('click', (e) => {

            // Wenn das Menü geöffnet ist, blockiere das Scrollen
            if (menuLink.classList.contains('active')) {
                body.style.overflow = 'auto';  // Scrollen erlauben
            } else {
                body.style.overflow = 'hidden';  // Scrollen blockieren
            }


            e.preventDefault(); // Verhindern der Standardaktion (z.B. Scrollen)

            // Toggle "active" Klasse zum Menü und Hamburger-Button
            menu.classList.toggle('active');
            menuLink.classList.toggle('active');

            // Wenn Menü "active" ist, dann sichtbar machen
            if (menu.classList.contains('active')) {
                menu.style.display = 'block';  // Menü sichtbar
                bar1.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bar2.style.opacity = '0';  // Balken in der Mitte unsichtbar machen
                bar3.style.transform = 'rotate(45deg) translate(-8px, -9px)';
            } else {
                menu.style.display = 'none';  // Menü unsichtbar
                bar1.style.transform = 'rotate(0deg) translate(0, 0)';
                bar2.style.opacity = '1';
                bar3.style.transform = 'rotate(0deg) translate(0, 0)';
            }
        });

        // Funktion zur Anpassung der Menü-Visibility auf Basis der Bildschirmgröße
        const adjustMenuVisibility = () => {
            if (window.matchMedia("(max-width: 1024px)").matches) {
                // Menü unsichtbar bei kleinen Geräten
                menu.style.display = 'none';
                menu.classList.remove('active');  // Stelle sicher, dass es nicht aktiv ist
                menuLink.classList.remove('active'); // Setze die Hamburger-Animation zurück
                bar1.style.transform = 'rotate(0deg) translate(0, 0)';
                bar2.style.opacity = '1';
                bar3.style.transform = 'rotate(0deg) translate(0, 0)';
            } else {
                // Menü sichtbar bei großen Geräten
                menu.style.display = 'block';
                menu.classList.add('active');
                menuLink.classList.remove('active'); // Entferne die Hamburger-Animation
                bar1.style.transform = 'rotate(0deg) translate(0, 0)';
                bar2.style.opacity = '1';
                bar3.style.transform = 'rotate(0deg) translate(0, 0)';
            }
        };

        // Beim Laden der Seite und bei jeder Größenänderung den Status des Menüs anpassen
        window.addEventListener('load', adjustMenuVisibility);
        window.addEventListener('resize', adjustMenuVisibility);

        // Header ein- und ausblenden beim Scrollen
        let lastScrollTop = 0;
        const headerNav = document.getElementById('header-nav');

        if (headerNav) {
            window.addEventListener('scroll', () => {
                const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

                if (currentScrollTop > lastScrollTop) {
                    // Scrollt nach unten, Header ausblenden
                    headerNav.classList.add('hide-nav-bar');
                } else {
                    // Scrollt nach oben, Header wieder einblenden
                    headerNav.classList.remove('hide-nav-bar');
                }
                lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // Prevent negative values
            });
        }
    }
});
