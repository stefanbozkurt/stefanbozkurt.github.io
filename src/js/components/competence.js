document.addEventListener("DOMContentLoaded", async function () {
    const cols = document.querySelectorAll(".comp-list");
    const descriptionContainer = document.querySelector(".description-container");
    const descriptionWrapper = document.querySelector(".description-wrapper");

    // Sprachparameter aus der URL (Standardwert ist 'de')
    const currentUrl = new URL(window.location.href);
    const langParam = currentUrl.searchParams.get('lang') || 'de';

    // Keine eigene loadTranslations-Funktion mehr, stattdessen aus translate.js verwenden
    const translations = await loadTranslations(langParam);

    // Funktion zum Generieren der HTML-Liste mit übersetzten Items
    async function generateDescription(col, translations) {
        const title = col.querySelector("[data-i18n]")?.textContent || "";
        const items = JSON.parse(col.getAttribute("data-items")) || [];

        let htmlContent = `<h4>${title}</h4><ul>`;
        items.forEach(item => {
            // Übersetze jedes Listenelement, falls eine Übersetzung vorhanden ist
            const translatedItem = translations[item] || item;  // Falls keine Übersetzung vorhanden ist, den Originaltext verwenden
            htmlContent += `<li>${translatedItem}</li>`;
        });
        htmlContent += `</ul>`;

        return htmlContent;
    }

    function checkDescriptionVisibility() {
        const allPlus = Array.from(cols).every(col => col.querySelector(".plus-minus").textContent === "+");
        descriptionContainer.style.display = allPlus ? "none" : "block";
    }

    async function toggleDescription(col) {
        const plusMinus = col.querySelector(".plus-minus");

        if (col.classList.contains("active-col")) {
            // Falls die Spalte bereits aktiv ist, schließe sie
            descriptionContainer.innerHTML = ""; // Leere Beschreibung
            plusMinus.textContent = "+";
            col.setAttribute("aria-expanded", "false");
            col.classList.remove("active-col");
            checkDescriptionVisibility(); // Überprüfen, ob der Container noch angezeigt werden soll
        } else {
            // Andernfalls öffne die Beschreibung
            cols.forEach(c => {
                c.classList.remove("active-col");
                c.querySelector(".plus-minus").textContent = "+";
                c.setAttribute("aria-expanded", "false");
            });

            col.classList.add("active-col");
            plusMinus.textContent = "−";
            col.setAttribute("aria-expanded", "true");

            // Übersetzungen laden und Beschreibung generieren
            const translations = await loadTranslations(langParam);
            descriptionContainer.innerHTML = await generateDescription(col, translations);

            checkDescriptionVisibility(); // Überprüfen, ob der Container noch angezeigt werden soll

            // In der mobilen Ansicht: Die Beschreibung direkt unter der aktiven Spalte einfügen
            if (isMobileView()) {
                col.insertAdjacentElement("afterend", descriptionContainer);
            } else {
                // In der Desktop-Ansicht: Die Beschreibung im descriptionWrapper einfügen
                descriptionWrapper.appendChild(descriptionContainer);
            }
        }
    }

    function isMobileView() {
        return window.innerWidth <= 991;
    }

    // Eventlistener für Spalten hinzufügen
    cols.forEach(col => {
        col.addEventListener("click", async function () {
            toggleDescription(col); // Beschreibung ein-/ausblenden bei Klick
        });

        col.addEventListener("keydown", async function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault(); // Verhindert Scrollen durch Leertaste
                toggleDescription(col); // Beschreibung ein-/ausblenden bei Enter oder Space
            }
        });
    });

    // Wenn das Fenster in der Größe verändert wird, prüfe, ob die Beschreibung richtig angezeigt wird
    // Wenn das Fenster in der Größe verändert wird, prüfe, ob die Beschreibung richtig angezeigt wird
    window.addEventListener("resize", function () {
        checkDescriptionVisibility();

        // Falls das Fenster in der Größe verändert wird, sicherstellen, dass die Beschreibung an der richtigen Stelle erscheint
        if (isMobileView()) {
            // In der mobilen Ansicht: Die Beschreibung direkt unter der aktiven Spalte einfügen
            if (document.querySelector(".active-col")) {
                document.querySelector(".active-col").insertAdjacentElement("afterend", descriptionContainer);
            }
        } else {
            // In der Desktop-Ansicht: Die Beschreibung im descriptionWrapper einfügen
            descriptionWrapper.appendChild(descriptionContainer);
        }
    });


    // Initiale Sichtbarkeit des Beschreibung-Containers prüfen
    checkDescriptionVisibility();
});
