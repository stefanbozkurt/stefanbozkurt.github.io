
// Funktion zur Aktivierung des Übersetzungsvorgangs beim Klick
export async function setupSettings() {

    const themeSwitch = document.querySelector('.toggle__checkbox');
    const body = document.body;

    // Funktion zum Anwenden des Themes basierend auf dem Wert von localStorage oder der Checkbox
    function applyTheme(isInitialLoad = false) {
        const isDark = isInitialLoad ? localStorage.getItem('theme') === 'dark' : themeSwitch.checked;

        if (isDark) {
            body.classList.add('dark-theme');
            themeSwitch.checked = true; // Sync the checkbox with dark mode
        } else {
            body.classList.remove('dark-theme');
            themeSwitch.checked = false; // Sync the checkbox with light mode
        }
    }

    // Setze das Theme beim Laden der Seite basierend auf localStorage
    applyTheme(true);

    // Wenn der Benutzer den Switch verändert, speichere die Auswahl im localStorage
    themeSwitch.addEventListener('change', () => {
        const theme = themeSwitch.checked ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        applyTheme();
    });

    // Schriftgröße Einstellungen
    const increaseFontButton = document.getElementById('increase-font');
    const decreaseFontButton = document.getElementById('decrease-font');

    if (!increaseFontButton || !decreaseFontButton) {
        console.error('Ein oder mehrere erforderliche Elemente für die Schriftgröße wurden nicht gefunden!');
        return;
    }

    const minFontSize = 0.75;
    const maxFontSize = 1.75;

    let currentFontSize = parseFloat(localStorage.getItem('font-size')) || 1;
    document.documentElement.style.fontSize = `${currentFontSize}rem`;

    increaseFontButton.addEventListener('click', () => {
        if (currentFontSize < maxFontSize) {
            currentFontSize += 0.25;
            currentFontSize = Math.min(currentFontSize, maxFontSize);
            document.documentElement.style.fontSize = `${currentFontSize}rem`;
            localStorage.setItem('font-size', currentFontSize.toFixed(2));
        }
    });

    decreaseFontButton.addEventListener('click', () => {
        if (currentFontSize > minFontSize) {
            currentFontSize -= 0.25;
            currentFontSize = Math.max(currentFontSize, minFontSize);
            document.documentElement.style.fontSize = `${currentFontSize}rem`;
            localStorage.setItem('font-size', currentFontSize.toFixed(2));
        }
    });

    // Spracheinstellungen
    const currentUrl = new URL(window.location.href);
    const langParam = currentUrl.searchParams.get('lang') || 'de';  // Standard: 'de' (Deutsch)

    // Funktion zum Laden der Übersetzungen
    async function loadTranslations(language) {
        try {
            // Den Pfad zur JSON-Datei entsprechend anpassen
            const response = await fetch(`lang/${language}.json`);
            return await response.json();
        } catch (error) {
            console.error(`Fehler beim Laden der Übersetzungsdatei (${language}.json):`, error);
            return {}; // Rückgabe eines leeren Objekts bei Fehler
        }
    }

    // Funktion zum Übersetzen des Inhalts
    async function translateContent(language) {
        const translations = await loadTranslations(language); // Lade die entsprechende JSON-Datei

        // Gehe alle Elemente durch, die mit "data-i18n" markiert sind, und setze den übersetzten Text
        document.querySelectorAll('[data-i18n]').forEach((element) => {
            const key = element.getAttribute('data-i18n');
            if (translations[key]) {
                element.innerHTML = translations[key]; // Übersetze den Inhalt
            }
        });
    }

    // Funktion zum Wechseln der Sprache
    function switchLanguage(newLang) {
        // Wenn die Sprache 'en' ist, dann fügen wir den URL-Parameter hinzu, für 'de' bleibt die URL gleich
        if (newLang === 'en' && langParam !== 'en') {
            currentUrl.searchParams.set('lang', 'en');
            window.location.href = currentUrl.toString(); // Seite neu laden mit der neuen Sprache
        } else if (newLang === 'de') {
            // Für Deutsch setzen wir den URL-Parameter zurück und laden die Seite neu, wenn der Benutzer Deutsch auswählt
            currentUrl.searchParams.delete('lang');
            window.location.href = currentUrl.toString(); // Seite neu laden für Deutsch
        }
    }

    // Sprachumschalter (Select)
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.addEventListener('change', (event) => {
            const selectedLang = event.target.value;
            switchLanguage(selectedLang); // Seite mit der neuen Sprache neu laden
        });

        // Setze den aktuellen Wert des Selects basierend auf der URL
        languageSelector.value = langParam;
    }

    // Initiale Übersetzung basierend auf der URL
    if (langParam === 'de') {
        // Deutsch muss nicht übersetzt werden, da es der Standard ist
        document.documentElement.lang = 'de'; // Optionale Änderung der HTML-Sprache
    } else if (langParam === 'en') {
        // Englisch wird nachgeladen
        await translateContent('en');
        document.documentElement.lang = 'en'; // Optional: Sprache für SEO ändern
    }
    
}
