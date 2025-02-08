document.addEventListener("DOMContentLoaded", function () {
    const cols = document.querySelectorAll(".comp-list");
    const descriptionContainer = document.querySelector(".description-container");
    const descriptionWrapper = document.querySelector(".description-wrapper");
    let activeCol = null;

    function checkDescriptionVisibility() {
        const allPlus = Array.from(cols).every(col => col.querySelector(".chevron").textContent === "+");
        descriptionContainer.style.display = allPlus ? "none" : "block";
    }

    function isMobileView() {
        return window.innerWidth <= 991;
    }

    function toggleDescription(col) {
        const descriptionText = col.getAttribute("data-description");
        const chevron = col.querySelector(".chevron");

        if (activeCol === col) {
            // Falls gleiche Spalte geklickt oder aktiviert wurde: Alles schließen
            descriptionContainer.innerHTML = "";
            chevron.textContent = "+";
            col.setAttribute("aria-expanded", "false");
            col.classList.remove("active-col");

            if (isMobileView()) {
                descriptionContainer.remove();
            }

            activeCol = null;
        } else {
            // Entferne aktive Klasse von allen anderen Spalten
            cols.forEach(c => {
                c.classList.remove("active-col");
                c.querySelector(".chevron").textContent = "+";
                c.setAttribute("aria-expanded", "false");
            });

            // Setze aktive Klasse auf aktuelle Spalte
            col.classList.add("active-col");
            chevron.textContent = "−";
            col.setAttribute("aria-expanded", "true");

            descriptionContainer.innerHTML = `<p>${descriptionText}</p>`;

            if (isMobileView()) {
                col.insertAdjacentElement("afterend", descriptionContainer);
            } else {
                descriptionWrapper.appendChild(descriptionContainer);
            }

            activeCol = col;
        }

        checkDescriptionVisibility();
    }

    // Klick- und Tastatur-Eventlistener für jede Spalte hinzufügen
    cols.forEach(col => {
        col.addEventListener("click", function () {
            toggleDescription(col);
        });

        col.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault(); // Verhindert Scrollen durch Leertaste
                toggleDescription(col);
            }
        });
    });

    checkDescriptionVisibility();

    // Falls das Fenster in der Größe verändert wird, prüfen, ob das `.description-container` richtig positioniert ist
    window.addEventListener("resize", function () {
        if (activeCol) {
            if (isMobileView()) {
                activeCol.insertAdjacentElement("afterend", descriptionContainer);
            } else {
                descriptionWrapper.appendChild(descriptionContainer);
            }
        } else {
            descriptionWrapper.appendChild(descriptionContainer);
        }
    });
});



document.addEventListener("DOMContentLoaded", async function () {
    const cols = document.querySelectorAll(".comp-list");
    const descriptionContainer = document.querySelector(".description-container");

    // Sprachparameter aus der URL (Standardwert ist 'de')
    const currentUrl = new URL(window.location.href);
    const langParam = currentUrl.searchParams.get('lang') || 'de';

    // Funktion zum Laden der Übersetzungen
    async function loadTranslations(language) {
        if (language === 'de') {
            return {}; // Deutsch benötigt keine Übersetzungen, daher ein leeres Objekt zurückgeben
        }

        try {
            const response = await fetch(`lang/${language}.json`);
            if (!response.ok) throw new Error(`Fehler beim Laden der Datei für ${language}`);
            const data = await response.json();
            console.log('Geladene Übersetzungen:', data); // Debugging: Gebe die geladenen Übersetzungen aus
            return data;
        } catch (error) {
            console.error(error);
            return {}; // Leeres Objekt zurückgeben, falls ein Fehler auftritt
        }
    }

    // Funktion zum Generieren der HTML-Liste mit übersetzten Items
    async function generateDescription(col, translations) {
        const title = col.querySelector("[data-i18n]")?.textContent || "";
        const items = JSON.parse(col.getAttribute("data-items")) || [];

        let htmlContent = `<h4>${title}</h4><ul>`;
        items.forEach(item => {
            // Debugging: Logge jedes Listenelement
            console.log(`Originales Listenelement: ${item}`);

            // Übersetze jedes Listenelement, falls eine Übersetzung vorhanden ist
            const translatedItem = translations[item] || item;  // Falls keine Übersetzung vorhanden ist, den Originaltext verwenden

            // Debugging: Zeige das übersetzte Element an
            console.log(`Übersetztes Listenelement: ${translatedItem}`);

            htmlContent += `<li>${translatedItem}</li>`;
        });
        htmlContent += `</ul>`;

        return htmlContent;
    }

    // Beim Klicken auf eine Spalte wird die Beschreibung generiert und angezeigt
    cols.forEach(col => {
        col.addEventListener("click", async function () {
            const translations = await loadTranslations(langParam);  // Lade die Übersetzungen für die gewählte Sprache
            console.log('Verwendete Übersetzungen:', translations);  // Debugging: Gebe die verwendeten Übersetzungen aus
            descriptionContainer.innerHTML = await generateDescription(col, translations);  // Erzeuge die Beschreibung mit Übersetzung
        });
    });
});

