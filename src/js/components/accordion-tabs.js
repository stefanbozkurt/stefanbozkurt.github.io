// Akkordeon / Tabs Steuerung für mehrere Container
document.querySelectorAll('.projects-container').forEach(container => {
    const accordionButtons = container.querySelectorAll('.accordion-button');
    const accordionContentDisplay = container.querySelector('.accordion-content-display'); // Nur für den jeweiligen Container

    function updateAccordionDisplay() {
        if (window.innerWidth <= 768) {
            // Mobile-Ansicht: Inhalte in die jeweiligen Container zurücksetzen
            container.querySelectorAll('.accordion-tabs-content').forEach(content => {
                content.style.display = 'none'; // Alle Inhalte ausblenden
            });

            // Falls ein Inhalt im Display-Container ist, den richtigen Content wieder aktivieren
            const activeContent = accordionContentDisplay.innerHTML.trim();
            if (activeContent) {
                container.querySelectorAll('.accordion-tabs-content').forEach(content => {
                    if (content.innerHTML.trim() === activeContent) {
                        content.style.display = 'block';
                    }
                });
            }
        } else {
            // Desktop-Ansicht: Alles verstecken, nur den Display-Container nutzen
            container.querySelectorAll('.accordion-tabs-content').forEach(content => {
                content.style.display = 'none';
            });

            // Falls ein aktiver Inhalt existiert, diesen im Display-Container anzeigen
            const activeContent = container.querySelector('.accordion-tabs-content.active');
            if (activeContent) {
                accordionContentDisplay.innerHTML = activeContent.innerHTML;
            }
        }
    }

    // Event-Listener für Buttons innerhalb des Containers
    accordionButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const targetContent = container.querySelector(`#${targetId}`);

            // Entferne die 'active' Klasse von allen Buttons im Container
            accordionButtons.forEach(btn => btn.classList.remove('active'));

            // Setze die 'active' Klasse auf den aktuellen Button
            this.classList.add('active');

            if (window.innerWidth <= 768) {
                // Mobile Ansicht: Nur ein aktives Element zurzeit
                container.querySelectorAll('.accordion-tabs-content').forEach(content => {
                    content.classList.remove('active');
                    content.style.display = 'none';
                });

                // Aktuelles Element anzeigen
                targetContent.classList.add('active');
                targetContent.style.display = 'block';
            } else {
                // Desktop Ansicht: Inhalte in den jeweiligen Display-Container übertragen
                container.querySelectorAll('.accordion-tabs-content').forEach(content => {
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
});

// Plus-Minus-Icon Steuerung & `accordion-content-display` schließen
document.querySelectorAll('.toggle-projects').forEach(toggle => {
    toggle.addEventListener('click', function (event) {
        event.preventDefault();
        const targetContainer = document.getElementById(this.getAttribute('data-target'));
        const plusMinusIcon = this.querySelector('.plus-minus');
        const accordionContentDisplay = targetContainer.querySelector('.accordion-content-display'); // Sucht den richtigen Display-Container
        const allToggleButtons = document.querySelectorAll('.toggle-projects'); // Alle toggle-projects-Elemente

        // Zuerst alle anderen "projects-container" schließen und Plus-Minus-Icons zurücksetzen
        allToggleButtons.forEach(button => {
            const otherTargetContainer = document.getElementById(button.getAttribute('data-target'));
            const otherPlusMinusIcon = button.querySelector('.plus-minus');

            if (otherTargetContainer !== targetContainer) {
                // Schließt alle anderen Container und setzt das Plus-Icon zurück
                otherTargetContainer.classList.remove('open');
                otherPlusMinusIcon.textContent = '+'; // Setzt das Plus-Symbol zurück
            }
        });

        // Toggle die Klasse "open" für den Container
        targetContainer.classList.toggle('open');

        // Plus-Minus-Icon ändern
        if (targetContainer.classList.contains('open')) {
            plusMinusIcon.textContent = '−'; // Minus-Symbol, wenn geöffnet
        } else {
            plusMinusIcon.textContent = '+'; // Plus-Symbol, wenn geschlossen
        }

        // Entferne die 'active' Klasse von allen Accordion-Buttons im Container
        const accordionButtons = targetContainer.querySelectorAll('.accordion-button');
        accordionButtons.forEach(btn => btn.classList.remove('active'));

        // Schließt den `accordion-content-display`, wenn der Container geöffnet oder geschlossen wird
        if (accordionContentDisplay) {
            accordionContentDisplay.innerHTML = ''; // Löscht den Inhalt
        }
    });
});
