const columns = document.querySelectorAll(".col.comp-list");
const descriptionContainer = document.querySelector(".description-container");

// 🛠️ Alle Descriptions beim Laden verstecken
document.querySelectorAll(".description").forEach(desc => desc.style.display = "none");
descriptionContainer.style.display = "none";

columns.forEach(col => {
    col.setAttribute("tabindex", "0"); // Macht das Element mit der Tastatur fokussierbar

    // 🖱️ Click-Event
    col.addEventListener("click", toggleDescription);

    // 🎹 Keyboard-Support: Enter & Space
    col.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault(); // Verhindert, dass die Seite scrollt (bei Space)
            toggleDescription.call(this); // Funktion ausführen
        }
    });
});

// 🌟 Funktion zur Anzeige/Ausblendung der Beschreibung
function toggleDescription() {
    const isActive = this.classList.contains("active-col");

    // Alle Spalten zurücksetzen
    columns.forEach(c => {
        c.classList.remove("active-col");
        c.querySelector(".plus-minus").textContent = "+";
        c.querySelector(".description").style.display = "none"; // Mobile Descriptions verstecken
    });

    // Wenn vorher nicht aktiv, dann aktivieren
    if (!isActive) {
        this.classList.add("active-col");
        this.querySelector(".plus-minus").textContent = "−";

        const description = this.querySelector(".description");

        if (window.innerWidth > 991) {
            // 🖥️ Desktop: Description in descriptionContainer verschieben
            descriptionContainer.innerHTML = ""; // Alte Description entfernen
            const clonedDescription = description.cloneNode(true);
            clonedDescription.style.display = "block"; // Sichtbar machen!
            descriptionContainer.appendChild(clonedDescription);
            descriptionContainer.style.display = "block"; // Container anzeigen
        } else {
            // 📱 Mobile: Description direkt unter der aktiven Spalte anzeigen
            description.style.display = "block";
            this.appendChild(description);
            descriptionContainer.style.display = "none"; // Desktop-Container verstecken
        }
    } else {
        // Wenn es schon aktiv war, schließen
        descriptionContainer.style.display = "none";
        descriptionContainer.innerHTML = "";
        this.querySelector(".description").style.display = "none";
    }
}

// Fenstergröße überwachen & Darstellung anpassen
window.addEventListener("resize", function () {
    if (window.innerWidth > 991) {
        // Wechsel zu Desktop: Mobile Descriptions verstecken
        document.querySelectorAll(".description").forEach(desc => desc.style.display = "none");
        descriptionContainer.style.display = "none"; // Falls keine aktive Spalte
    } else {
        // Wechsel zu Mobile: Description-Container leeren & verstecken
        descriptionContainer.style.display = "none";
        descriptionContainer.innerHTML = "";
    }
});
