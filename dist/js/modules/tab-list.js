export function setupTabs() {
    const tabs = document.querySelectorAll('.tab-item');
    const panes = document.querySelectorAll('.tab-pane');

    const firstTab = tabs[0];
    const firstTabImage = firstTab.querySelector('img'); // Bild des ersten Tabs
    const firstTabActiveSrc = firstTabImage ? firstTabImage.dataset.activeSrc : null;

    // Verzögertes Setzen des aktiven Tabs, um sicherzustellen, dass das Accordion geöffnet ist
    setTimeout(() => {
        if (firstTab && !firstTab.classList.contains('active')) {
            firstTab.classList.add('active');
            if (firstTabImage && firstTabActiveSrc) {
                firstTabImage.src = firstTabActiveSrc; // Setze das Bild des ersten Tabs auf die aktive Version
            }
        }
    }, 100); // Die Verzögerung von 100ms gibt dem Accordion genügend Zeit, um aufklappen


    tabs.forEach(tab => {
        const img = tab.querySelector('img');
        const originalSrc = img.src;
        const activeSrc = img.dataset.activeSrc;

        tab.addEventListener('mouseover', () => {
            if (activeSrc) {
                img.src = activeSrc;
            }
        });

        tab.addEventListener('mouseout', () => {
            if (!tab.classList.contains('active')) {
                img.src = originalSrc;
            }
        });

        tab.addEventListener('click', (event) => {
            event.preventDefault();

            tabs.forEach(t => {
                t.classList.remove('active');
                const tabImg = t.querySelector('img');
                if (tabImg && tabImg.dataset.activeSrc) {
                    tabImg.src = tabImg.src.replace('-active.svg', '.svg');
                }
            });

            tab.classList.add('active');
            if (img && img.dataset.activeSrc) {
                img.src = img.dataset.activeSrc;
            }

            panes.forEach(pane => pane.classList.remove('active'));

            const targetPane = document.getElementById(tab.dataset.tab);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
}
