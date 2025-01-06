import { setupHeader } from './modules/header.js'; // Header-Funktionalität importieren
import { setupAccordion } from './modules/accordion.js'; // Accordion-Funktionalität importieren
import { setupProjects } from './modules/projects.js'; // Projekte-Funktionalität importieren

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

    // Alle Sektionen laden
    async function loadAllSections() {
        await Promise.all([
            loadSection('../modules/navigation.html', 'navigation'),
            loadSection('../modules/hero.html', 'content'),
            loadSection('../modules/competence.html', 'content'),
            loadSection('../modules/experience.html', 'content'),
            loadSection('../modules/know-how.html', 'content'),
            loadSection('../modules/faq.html', 'content')
        ]);

        // Accordion-Funktionalität nach dem Laden aller Sektionen aktivieren
        setupHeader();
        
        // Accordion-Funktionalität nach dem Laden aller Sektionen aktivieren
        setupAccordion();

        // Projekte Funktionalität nach dem Laden aller Sektionen aktivieren
        setupProjects();
    }

    // Alle Sektionen laden und dann Tabs und Akkordeons aktivieren
    loadAllSections();
});
