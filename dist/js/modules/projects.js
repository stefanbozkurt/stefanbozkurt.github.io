export function setupProjects() {
    const toggleLinks = document.querySelectorAll('.toggle-projects');
    const containers = document.querySelectorAll('.projects-container');

    // Funktion zum Umschalten von Containern
    function toggleContainer(targetId, toggleLink) {
        containers.forEach(container => {
            const projectsList = container.querySelector('.projects-list');
            const tabProjectsContainer = container.querySelector('.tab-projects-container');
            const tagList = container.closest('.timeline-content').querySelector('.tag-list');

            if (container.id === targetId) {
                const isVisible = container.style.display === 'flex';
                container.style.display = isVisible ? 'none' : 'flex';

                // Ändere das Plus/Minus vor dem Titel
                const titleElement = toggleLink.querySelector('.timeline-title');
                if (titleElement) {
                    titleElement.textContent = `${isVisible ? '+' : '-'} ${titleElement.textContent.slice(2)}`;
                }

                if (!isVisible) {
                    // Zeige Projekte-Liste und Tag-Liste
                    if (projectsList) projectsList.style.display = 'block';
                    if (tabProjectsContainer) tabProjectsContainer.style.display = 'block';
                    if (tagList) tagList.style.display = 'block';

                    // Wähle das erste Projekt aus
                    const firstProject = container.querySelector('.project.active') || container.querySelector('.project');
                    if (firstProject) {
                        firstProject.classList.add('active'); // Sicherstellen, dass es aktiv ist
                        loadProjectContent(firstProject, container, tagList, true); // Tags initialisieren
                    }
                } else {
                    // Projekte- und Tag-Liste ausblenden, wenn geschlossen
                    if (projectsList) projectsList.style.display = 'none';
                    if (tabProjectsContainer) tabProjectsContainer.style.display = 'none';
                    if (tagList) tagList.style.display = 'none';
                    removeTagHighlights(tagList);
                }
            } else {
                container.style.display = 'none';

                // Zurücksetzen der Projekte-Listen und Tag-Listen
                if (projectsList) projectsList.style.display = 'none';
                if (tabProjectsContainer) tabProjectsContainer.style.display = 'none';
                if (tagList) tagList.style.display = 'none';
                removeTagHighlights(tagList);

                // Setze das Pluszeichen für andere Links zurück
                const otherLink = document.querySelector(`a[data-target="${container.id}"]`);
                if (otherLink) {
                    const otherTitle = otherLink.querySelector('.timeline-title');
                    if (otherTitle) {
                        otherTitle.textContent = `+ ${otherTitle.textContent.slice(2)}`;
                    }
                }
            }
        });
    }

    // Funktion zum Entfernen aller Tag-Highlights
    function removeTagHighlights(tagList) {
        if (!tagList) return;

        const tagItems = tagList.querySelectorAll('li');
        tagItems.forEach(tag => tag.classList.remove('active-tag'));
    }

    // Funktion zum Laden des Inhalts eines Projekts
    function loadProjectContent(project, container, tagList, updateTagsActive = true) {
        const projectDetails =
            window.innerWidth >= 769
                ? container.querySelector('.tab-projects-container .project-details') // Desktop
                : project.nextElementSibling; // Mobile

        const content = project.getAttribute('data-tab');
        const description = project.getAttribute('data-description'); // Beschreibung extrahieren

        if (content && projectDetails) {
            // Zeige den Preloader
            projectDetails.innerHTML = '<div class="preloader"></div>';

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = content;
            const imgElement = tempDiv.querySelector('img');

            if (imgElement) {
                const img = new Image();
                img.src = imgElement.src;

                img.onload = () => {
                    projectDetails.innerHTML = content;

                    // Hier wird der Beschreibungstext hinzugefügt, wenn vorhanden
                    if (description) {
                        const descriptionElement = document.createElement('p');
                        descriptionElement.classList.add('project-description');
                        descriptionElement.textContent = description;
                        projectDetails.appendChild(descriptionElement);
                    }
                };
            } else {
                projectDetails.innerHTML = content;

                // Hier wird der Beschreibungstext hinzugefügt, wenn vorhanden
                if (description) {
                    const descriptionElement = document.createElement('p');
                    descriptionElement.classList.add('project-description');
                    descriptionElement.textContent = description;
                    projectDetails.appendChild(descriptionElement);
                }
            }
        }

        // Aktualisiere die Tags nur, wenn erforderlich
        if (updateTagsActive) {
            const tagAttribute = project.getAttribute('data-tags');
            if (tagAttribute) {
                const tags = tagAttribute.split(',').map(tag => tag.trim());
                updateTags(tags, tagList);
            } else {
                updateTags([], tagList);
            }
        }
    }


    // Funktion zur Aktualisierung der Tags in der jeweiligen Liste
    function updateTags(tags, tagList) {
        if (!tagList) return;

        const tagItems = tagList.querySelectorAll('li');
        tagItems.forEach(tag => tag.classList.remove('active-tag'));

        tags.forEach(tagName => {
            const tagElement = Array.from(tagItems).find(tag => tag.textContent.trim() === tagName.trim());
            if (tagElement) {
                tagElement.classList.add('active-tag');
            }
        });
    }

    // Toggle Links initialisieren
    toggleLinks.forEach(link => {
        link.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            toggleContainer(targetId, this);
        });
    });

    // Funktion zur Aktivierung von Projekten (inkl. Tastatur)
    containers.forEach(container => {
        const projects = container.querySelectorAll('.project');
        const tagList = container.closest('.timeline-content').querySelector('.tag-list');

        projects.forEach(project => {
            // Tastaturunterstützung
            project.setAttribute('tabindex', '0'); // Macht das Projekt fokussierbar
            project.setAttribute('role', 'button'); // Barrierefreiheit

            // Mobile: Erstelle einen ".project-details"-Container, falls er nicht existiert
            let mobileDetails = project.nextElementSibling;
            if (!mobileDetails || !mobileDetails.classList.contains('project-details')) {
                mobileDetails = document.createElement('div');
                mobileDetails.classList.add('project-details');
                project.insertAdjacentElement('afterend', mobileDetails);
            }

            // Klick-Event
            project.addEventListener('click', function () {
                activateProject(project, projects, container, tagList);
            });

            // Tastatur-Event
            project.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    activateProject(project, projects, container, tagList);
                }
            });
        });
    });

    // Funktion zum Aktivieren eines Projekts
    function activateProject(project, projects, container, tagList) {
        // Entferne aktive Klassen von allen Projekten
        projects.forEach(p => {
            p.classList.remove('active');
            const details = p.nextElementSibling;
            if (details && details.classList.contains('project-details')) {
                details.style.display = 'none'; // Mobile Inhalte ausblenden
            }
        });

        // Aktiviere das aktuelle Projekt
        project.classList.add('active');

        // Lade den Inhalt des Projekts
        loadProjectContent(project, container, tagList);
    }

    // Resize-Verhalten
    window.addEventListener('resize', function () {
        containers.forEach(container => {
            const projectsList = container.querySelector('.projects-list');
            const tabProjectsContainer = container.querySelector('.tab-projects-container');
            const tagList = container.closest('.timeline-content').querySelector('.tag-list');

            // Setze Projekte-Listen und Inhalte zurück
            container.style.display = 'none';
            if (projectsList) projectsList.style.display = 'none';
            if (tabProjectsContainer) tabProjectsContainer.style.display = 'none';

            // Tag-Liste ausblenden
            if (tagList) tagList.style.display = 'none';

            // Entferne Tag-Highlights
            removeTagHighlights(tagList);
        });
    });

    // Initialisierung: Schließe alle Hauptcontainer und Tag-Listen
    containers.forEach(container => {
        container.style.display = 'none';
        const tagList = container.closest('.timeline-content').querySelector('.tag-list');
        if (tagList) tagList.style.display = 'none';
    });
}
