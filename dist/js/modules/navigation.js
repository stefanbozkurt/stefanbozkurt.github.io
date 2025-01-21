export function setupHeader() {
    const menuLink = document.querySelector('.menu-link');
    const menu = document.getElementById('menu');
    const bar1 = document.querySelector('.bar1');
    const bar2 = document.querySelector('.bar2');
    const bar3 = document.querySelector('.bar3');

    // Elemente für Settings-Button und -Menü
    const settingsToggle = document.getElementById('settings-toggle');
    const settings = document.getElementById('settings');

    if (!menu || !menuLink || !settingsToggle || !settings) {
        console.error('Ein oder mehrere erforderliche Elemente wurden nicht gefunden!');
        return;
    }

    // Funktion zum Ein- und Ausklappen des Navigationsmenüs
    menuLink.addEventListener('click', (e) => {
        e.preventDefault();

        // Schließen des Settings-Menüs, falls es geöffnet ist
        if (settings.classList.contains('active')) {
            settings.classList.remove('active');
            settings.style.display = 'none';
            settingsToggle.classList.toggle('flipped'); // Flip-Klasse hinzufügen oder entfernen
        }

        // Umschalten des Navigationsmenüs
        menu.classList.toggle('active');
        menuLink.classList.toggle('active');

        if (menu.classList.contains('active')) {
            menu.style.display = 'block';
            bar1.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bar2.style.opacity = '0';
            bar3.style.transform = 'rotate(45deg) translate(-8px, -9px)';
        } else {
            menu.style.display = 'none';
            bar1.style.transform = 'rotate(0deg) translate(0, 0)';
            bar2.style.opacity = '1';
            bar3.style.transform = 'rotate(0deg) translate(0, 0)';
        }
    });

    // Funktion zum Ein- und Ausklappen des Settings-Menüs
    settingsToggle.addEventListener('click', (e) => {
        e.preventDefault();

        // Schließen des Navigationsmenüs, falls es geöffnet ist
        if (menu.classList.contains('active')) {
            menu.classList.remove('active');
            menuLink.classList.remove('active');
            menu.style.display = 'none';
            bar1.style.transform = 'rotate(0deg) translate(0, 0)';
            bar2.style.opacity = '1';
            bar3.style.transform = 'rotate(0deg) translate(0, 0)';
        }

        // Umschalten des Settings-Menüs
        settings.classList.toggle('active');
        settingsToggle.classList.toggle('flipped');
        if (settings.classList.contains('active')) {
            settings.style.display = 'block';
        } else {
            settings.style.display = 'none';
        }
    });

    // Funktion zum Schließen der Menüs, wenn außerhalb geklickt wird
    document.addEventListener('click', (e) => {
        const clickedElement = e.target;

        // Überprüfen, ob der Klick außerhalb der Menüs erfolgte
        if (!menu.contains(clickedElement) && !menuLink.contains(clickedElement)) {
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
                menu.style.display = 'none';
                menuLink.classList.remove('active');
                bar1.style.transform = 'rotate(0deg) translate(0, 0)';
                bar2.style.opacity = '1';
                bar3.style.transform = 'rotate(0deg) translate(0, 0)';
            }
        }

        if (!settings.contains(clickedElement) && !settingsToggle.contains(clickedElement)) {
            if (settings.classList.contains('active')) {
                settings.classList.remove('active');
                settings.style.display = 'none';
                settingsToggle.classList.toggle('flipped'); // Flip-Klasse hinzufügen oder entfernen
            }
        }
    });

}
