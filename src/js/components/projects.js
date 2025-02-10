document.querySelectorAll('.toggle-projects').forEach(function(link) {
    link.addEventListener('click', function(event) {
        // Verhindern des Standard-Verhaltens des Links (z. B. scrollen)
        // event.preventDefault();

        // Ziel-Container aus dem 'data-target' Attribut holen
        const targetId = this.getAttribute('data-target');
        const targetContainer = document.getElementById(targetId);

        // Wenn der Container existiert
        if (targetContainer) {
            // Alle anderen offenen Container schließen
            document.querySelectorAll('.projects-container').forEach(function(container) {
                if (container !== targetContainer) {
                    container.style.display = 'none';
                }
            });

            // Toggle der Sichtbarkeit des angeklickten Containers
            if (targetContainer.style.display === 'block') {
                targetContainer.style.display = 'none';
            } else {
                targetContainer.style.display = 'block';
            }
        }
    });
});
