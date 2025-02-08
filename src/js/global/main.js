document.addEventListener("DOMContentLoaded", async () => {
    // Die loadTranslations-Funktion definieren
    window.loadTranslations = async function(language) {
        if (language === 'de') return {};  // Keine Übersetzungen laden, wenn Deutsch (Standard)

        try {
            const response = await fetch(`lang/${language}.json`);
            if (!response.ok) {
                throw new Error(`Fehler beim Laden der Übersetzungsdatei für ${language}`);
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            return {};  // Leere Übersetzungen, falls Fehler
        }
    };
});