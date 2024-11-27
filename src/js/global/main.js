console.log('mainjs is loaded.');

document.addEventListener('DOMContentLoaded', () => {
    async function loadSection(filePath, targetElementId) {
        const targetElement = document.getElementById(targetElementId);
        if (!targetElement) {
            console.error(`Element mit ID "${targetElementId}" nicht gefunden.`);
            return;
        }

        try {
            const response = await fetch(filePath);
            if (response.ok) {
                const html = await response.text();
                targetElement.innerHTML += html;
            } else {
                console.error(`Fehler beim Laden von ${filePath}:`, response.statusText);
            }
        } catch (error) {
            console.error(`Netzwerkfehler beim Laden von ${filePath}:`, error.message);
        }
    }

    // Navigation laden
    loadSection('../modules/navigation.html', 'navigation');

    // Hero-Sektion laden
    loadSection('../modules/hero.html', 'content');

    // Kompetenz-Sektion laden
    loadSection('../modules/competence.html', 'content');

    // Experience-Sektion laden
    loadSection('../modules/experience.html', 'content');

});

