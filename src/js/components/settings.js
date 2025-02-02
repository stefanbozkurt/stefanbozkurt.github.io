document.addEventListener("DOMContentLoaded", async () => {
    const themeSwitch = document.querySelector('.toggle__checkbox');
    const body = document.body;
    const increaseFontButton = document.getElementById('increase-font');
    const decreaseFontButton = document.getElementById('decrease-font');
    const languageSelector = document.getElementById('language-selector');

    // 🌙 Dark-/Light-Mode-Handling
    function applyTheme() {
        const isDark = localStorage.getItem('theme') === 'dark';
        body.classList.toggle('dark-theme', isDark);
        if (themeSwitch) themeSwitch.checked = isDark;
    }

    if (themeSwitch) {
        themeSwitch.addEventListener('change', () => {
            localStorage.setItem('theme', themeSwitch.checked ? 'dark' : 'light');
            applyTheme();
        });
    }

    applyTheme(); // Direkt beim Laden anwenden

    // 🔠 Schriftgröße-Handling
    function setFontSize(size) {
        document.documentElement.style.fontSize = `${size}rem`;
        localStorage.setItem('font-size', size.toFixed(2));
    }

    let currentFontSize = parseFloat(localStorage.getItem('font-size')) || 1;
    setFontSize(currentFontSize);

    if (increaseFontButton) increaseFontButton.addEventListener('click', () => {
        if (currentFontSize < 1.75) setFontSize(currentFontSize += 0.25);
    });

    if (decreaseFontButton) decreaseFontButton.addEventListener('click', () => {
        if (currentFontSize > 0.75) setFontSize(currentFontSize -= 0.25);
    });

    // 🌍 Sprachhandling
    const currentUrl = new URL(window.location.href);
    const langParam = currentUrl.searchParams.get('lang') || 'de';

    async function loadTranslations(language) {
        try {
            const response = await fetch(`lang/${language}.json`);
            return response.ok ? await response.json() : {};
        } catch (error) {
            console.error(`Fehler beim Laden der Übersetzungen (${language}.json):`, error);
            return {};
        }
    }

    async function translateContent(language) {
        const translations = await loadTranslations(language);
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[key]) element.innerHTML = translations[key];
        });
    }

    function switchLanguage(newLang) {
        if (newLang !== langParam) {
            currentUrl.searchParams.set('lang', newLang === 'de' ? '' : newLang);
            window.location.href = currentUrl.toString();
        }
    }

    if (languageSelector) {
        languageSelector.value = langParam;
        languageSelector.addEventListener('change', event => switchLanguage(event.target.value));
    }

    if (langParam === 'en') {
        document.documentElement.lang = 'en';
        await translateContent('en');
    } else {
        document.documentElement.lang = 'de';
    }
});
