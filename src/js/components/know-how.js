const timelines = document.querySelectorAll(".timeline");

timelines.forEach(timeline => {
    timeline.addEventListener("click", function (e) {
        e.preventDefault();

        const description = this.querySelector(".description");
        const plusMinus = this.querySelector(".plus-minus");

        // Toggle der Anzeige der Beschreibung
        if (description.style.display === "none" || description.style.display === "") {
            // Alle anderen Beschreibungen schließen und Plus-Symbol setzen
            const allDescriptions = document.querySelectorAll(".description");
            const allPlusMinus = document.querySelectorAll(".plus-minus");

            allDescriptions.forEach(desc => (desc.style.display = "none"));
            allPlusMinus.forEach(pm => (pm.textContent = "+"));

            // Diese Beschreibung öffnen und Minus-Symbol setzen
            description.style.display = "block";
            plusMinus.textContent = "−";

            // Setze die 'active' Klasse für den grünen Hintergrund
            this.classList.add("active");
        } else {
            // Beschreibung schließen und Plus-Symbol setzen
            description.style.display = "none";
            plusMinus.textContent = "+";
            this.classList.remove("active"); // Entferne die 'active' Klasse, wenn sie geschlossen wird
        }

        // Schließt alle anderen Timeline-Elemente und entfernt die 'active' Klasse
        timelines.forEach(t => {
            if (t !== this) {
                t.querySelector(".description").style.display = "none"; // Alle anderen descriptions schließen
                t.querySelector(".plus-minus").textContent = "+"; // Setze das Plus-Symbol zurück
                t.classList.remove("active"); // Entferne die 'active' Klasse von anderen Timeline-Elementen
            }
        });
    });
});
