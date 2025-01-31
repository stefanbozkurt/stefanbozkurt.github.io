import { setupHeader } from './modules/navigation.js'; // Header-Funktionalität importieren
import { setupSettings } from './modules/settings.js'; // Settings-Funktionalität importieren
import { setupAccordion } from './modules/accordion.js'; // Accordion-Funktionalität importieren
import { setupProjects } from './modules/projects.js'; // Projekte-Funktionalität importieren

document.addEventListener('DOMContentLoaded', () => {
    // Initialisierung von Funktionalitäten
    setupHeader();
    setupSettings();
    setupAccordion();
    setupProjects();
});
