document.addEventListener("DOMContentLoaded", async () => {
    const languageSelector = document.getElementById('language-selector');
    
    // Sprachhandling
    const currentUrl = new URL(window.location.href);
    const langParam = currentUrl.searchParams.get('lang') || 'de';  // Standard ist Deutsch

    // Übersetzung des Inhalts
    async function translateContent(language) {
        const translations = await loadTranslations(language);
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[key]) {
                element.innerHTML = translations[key];
            } else {
                console.warn(`Übersetzung fehlt für den Schlüssel: ${key}`);
            }
        });
    }

    // Sprachwechsel
    function switchLanguage(newLang) {
        if (newLang !== langParam) {
            currentUrl.searchParams.set('lang', newLang === 'de' ? '' : newLang);
            window.location.href = currentUrl.toString();
        }
    }

    // Wenn ein Sprachselector vorhanden ist, Sprachwechsel-Event hinzufügen
    if (languageSelector) {
        languageSelector.value = langParam;
        languageSelector.addEventListener('change', event => switchLanguage(event.target.value));
    }

    // Wenn die Sprache Englisch ist, lade Übersetzungen
    if (langParam === 'en') {
        document.documentElement.lang = 'en';
        await translateContent('en');
    } else {
        document.documentElement.lang = 'de';  // Deutsch ist die Standard-Sprache, keine Übersetzung nötig
    }
});
