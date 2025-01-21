import { setupHeader } from './modules/navigation.js'; // Header-Funktionalität importieren
import { setupSettings } from './modules/settings.js'; // Settings-Funktionalität importieren
import { setupAccordion } from './modules/accordion.js'; // Accordion-Funktionalität importieren
import { setupProjects } from './modules/projects.js'; // Projekte-Funktionalität importieren

document.addEventListener('DOMContentLoaded', () => {
    async function loadSectionSequentially(sections) {
        for (const section of sections) {
            const { filePath, targetElementId } = section;
            const targetElement = document.getElementById(targetElementId);
            if (!targetElement) {
                console.error(`Element mit ID "${targetElementId}" nicht gefunden.`);
                continue;
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
    }

    async function loadAllSections() {
        const sections = [
            { filePath: '../modules/navigation.html', targetElementId: 'navigation' },
            { filePath: '../modules/hero.html', targetElementId: 'content' },
            { filePath: '../modules/competence.html', targetElementId: 'content' },
            { filePath: '../modules/experience.html', targetElementId: 'content' },
            { filePath: '../modules/know-how.html', targetElementId: 'content' },
            { filePath: '../modules/faq.html', targetElementId: 'content' },
            { filePath: '../modules/footer.html', targetElementId: 'content' }
        ];

        await loadSectionSequentially(sections);

        // Initialisierung von Funktionalitäten nach dem Laden aller Sektionen
        setupHeader();
        setupSettings();
        setupAccordion();
        setupProjects();
    }

    loadAllSections();
});
