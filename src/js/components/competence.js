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
    });

    // Wenn vorher nicht aktiv, dann aktivieren
    if (!isActive) {
        this.classList.add("active-col");
        this.querySelector(".plus-minus").textContent = "−";

        const description = this.querySelector(".description");

        // **Fix:** Immer die `.description-container` nutzen, unabhängig von der Bildschirmgröße
        descriptionContainer.innerHTML = description.innerHTML;
        descriptionContainer.style.display = "block";
    } else {
        // Wenn es schon aktiv war, schließen
        descriptionContainer.style.display = "none";
        descriptionContainer.innerHTML = "";
    }
}
    
