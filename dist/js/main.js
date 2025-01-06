export function setupTabs() {
    document.querySelectorAll('.tab-list a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Alle Tab-Inhalte verstecken
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });

            // Alle Tab-Links von der aktiven Klasse befreien
            document.querySelectorAll('.tab-list a').forEach(tab => {
                tab.classList.remove('active');
            });

            // Den Inhalt des angeklickten Tabs anzeigen
            const targetTab = document.getElementById(this.dataset.tab);
            if (targetTab) {
                targetTab.classList.add('active');
            }

            // Den angeklickten Link als aktiv markieren
            this.classList.add('active');
        });
    });

    // Ersten Tab standardmäßig aktivieren
    const firstTab = document.querySelector('.tab-list a');
    if (firstTab) {
        firstTab.click();
    }
}

export function setupAccordion() {
  const buttons = document.querySelectorAll('.accordion-button');
  buttons.forEach(button => {
      button.addEventListener('click', () => {
          const collapse = button.parentElement.nextElementSibling;
          const icon = button.querySelector('.accordion-icon');
          const expanded = button.getAttribute('aria-expanded') === 'true';

          // Schließe alle anderen Akkordeons
          document.querySelectorAll('.accordion-collapse').forEach(otherCollapse => {
              if (otherCollapse !== collapse) {
                  otherCollapse.classList.remove('show');
                  otherCollapse.previousElementSibling.querySelector('.accordion-button').setAttribute('aria-expanded', 'false');
                  otherCollapse.previousElementSibling.querySelector('.accordion-icon').textContent = '+';
              }
          });

          // Öffne/Schließe das aktuelle Akkordeon
          if (expanded) {
              collapse.classList.remove('show');
              button.setAttribute('aria-expanded', 'false');
              icon.textContent = '+';
          } else {
              collapse.classList.add('show');
              button.setAttribute('aria-expanded', 'true');
              icon.textContent = '−';
          }
      });
  });
}

console.log('mainjs is loaded.');

import { setupTabs } from './modules/tab-list.js'; // Tab-Funktionalität importieren
import { setupAccordion } from './modules/accordion.js'; // Accordion-Funktionalität importieren

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
            loadSection('../modules/know-how.html', 'content')
        ]);

        // Tab-Funktionalität nach dem Laden aller Sektionen aktivieren
        setupTabs();
        
        // Accordion-Funktionalität nach dem Laden aller Sektionen aktivieren
        setupAccordion();
    }

    // Alle Sektionen laden und dann Tabs und Akkordeons aktivieren
    loadAllSections();
});


