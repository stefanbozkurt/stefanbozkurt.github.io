// Akkordeon / Tabs Steuerung
const accordionButtons = document.querySelectorAll('.accordion-button');
const accordionContentDisplay = document.getElementById('accordion-content-display');

function updateAccordionDisplay() {
    if (window.innerWidth <= 768) {
        // Wechsel zu Mobile-Ansicht: Inhalte in die jeweiligen Accordion-Container zurücksetzen
        document.querySelectorAll('.accordion-tabs-content').forEach(content => {
            content.style.display = 'none'; // Alle Inhalte ausblenden
        });

        // Falls ein Inhalt in accordion-content-display ist, den richtigen Content wieder aktivieren
        const activeContent = accordionContentDisplay.innerHTML.trim();
        if (activeContent) {
            document.querySelectorAll('.accordion-tabs-content').forEach(content => {
                if (content.innerHTML.trim() === activeContent) {
                    content.style.display = 'block';
                }
            });
        }
    } else {
        // Wechsel zu Desktop-Ansicht: Alles verstecken, nur den Display-Container nutzen
        document.querySelectorAll('.accordion-tabs-content').forEach(content => {
            content.style.display = 'none';
        });

        // Falls ein aktiver Inhalt existiert, diesen in accordion-content-display anzeigen
        const activeContent = document.querySelector('.accordion-tabs-content.active');
        if (activeContent) {
            accordionContentDisplay.innerHTML = activeContent.innerHTML;
        }
    }
}

// Event-Listener für Buttons
accordionButtons.forEach(button => {
    button.addEventListener('click', function () {
        const targetId = this.getAttribute('data-target');
        const targetContent = document.getElementById(targetId);

        if (window.innerWidth <= 768) {
            // Mobile Ansicht: Nur ein aktives Element zurzeit
            document.querySelectorAll('.accordion-tabs-content').forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });

            // Aktuelles Element anzeigen
            targetContent.classList.add('active');
            targetContent.style.display = 'block';
        } else {
            // Desktop Ansicht: Inhalte in den Content-Bereich übertragen
            document.querySelectorAll('.accordion-tabs-content').forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });

            // Falls Zielinhalt existiert, in den Display-Container übertragen
            if (targetContent) {
                accordionContentDisplay.innerHTML = targetContent.innerHTML;
            }
        }
    });
});

// Event-Listener für Resize
window.addEventListener('resize', updateAccordionDisplay);   