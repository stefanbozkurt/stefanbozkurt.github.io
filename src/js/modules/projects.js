export function setupProjects() {
    const toggleLinks = document.querySelectorAll('.toggle-projects');
    const containers = document.querySelectorAll('.projects-container');

    // Funktion zum Umschalten von Containern
    function toggleContainer(targetId, toggleLink) {
        containers.forEach(container => {
            const projects = container.querySelectorAll('.project');
            const tabProjectsContainer = container.querySelector('.tab-projects-container');
            const projectDetails = tabProjectsContainer?.querySelector('.project-details');
            const tagList = container.closest('.timeline-content').querySelector('.tag-list');
    
            if (container.id === targetId) {
                const isVisible = container.style.display === 'flex';
                container.style.display = isVisible ? 'none' : 'flex';
    
                // Ändere das Plus/Minus vor dem Titel
                const titleElement = toggleLink.querySelector('.timeline-title');
                if (titleElement) {
                    titleElement.textContent = `${isVisible ? '+' : '-'} ${titleElement.textContent.slice(2)}`;
                }
    
                if (isVisible) {
                    // Tab-Container und Tag-Liste ausblenden
                    if (tabProjectsContainer) {
                        tabProjectsContainer.style.display = 'none';
                        if (projectDetails) {
                            projectDetails.innerHTML = ''; // Inhalt leeren
                        }
                    }
                    if (tagList) {
                        tagList.style.display = 'none';
                        removeTagHighlights(tagList); // Highlights entfernen
                    }
    
                    // Entferne die aktive Klasse von allen Projekten
                    projects.forEach(project => project.classList.remove('active'));
                } else {
                    // Beim Öffnen sicherstellen, dass der Tab-Container leer ist
                    if (tabProjectsContainer) {
                        tabProjectsContainer.style.display = 'block';
                        if (projectDetails) {
                            projectDetails.innerHTML = ''; // Inhalt leeren
                        }
                    }
                    if (tagList) {
                        tagList.style.display = 'none';
                    }
                }
            } else {
                container.style.display = 'none';
                if (tabProjectsContainer) {
                    tabProjectsContainer.style.display = 'none';
                    if (projectDetails) {
                        projectDetails.innerHTML = ''; // Inhalt leeren
                    }
                }
                if (tagList) {
                    tagList.style.display = 'none';
                    removeTagHighlights(tagList);
                }
                projects.forEach(project => project.classList.remove('active'));

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
    
        // Zeige die Tag-Liste an, wenn ein Projekt ausgewählt wurde
        if (tagList) {
            tagList.style.display = 'block'; // Sichtbar machen
        }
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

        const content = project.getAttribute('data-tab'); // HTML-String extrahieren
        const description = project.getAttribute('data-description'); // Beschreibung extrahieren

        if (content && projectDetails) {
            projectDetails.innerHTML = '';

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = content;

            const imgElement = tempDiv.querySelector('img');
            const textElement = tempDiv.querySelector('p');

            if (imgElement) {
                projectDetails.appendChild(imgElement);
            }

            if (textElement) {
                projectDetails.appendChild(textElement);
            }

            if (description) {
                const descriptionElement = document.createElement('p');
                descriptionElement.classList.add('project-description');
                descriptionElement.textContent = description;
                projectDetails.appendChild(descriptionElement);
            }

            projectDetails.style.display = 'flex';
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
            project.setAttribute('tabindex', '0');
            project.setAttribute('role', 'button');

            if (window.innerWidth < 769) {
                const mobileDetails = project.nextElementSibling;
                if (!mobileDetails || !mobileDetails.classList.contains('project-details')) {
                    const newDetails = document.createElement('div');
                    newDetails.classList.add('project-details');
                    project.insertAdjacentElement('afterend', newDetails);
                }
            }

            project.addEventListener('click', function () {
                activateProject(project, projects, container, tagList);
            });

            project.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    activateProject(project, projects, container, tagList);
                }
            });
        });
    });

    // Initialisierung: Schließe alle Hauptcontainer und Tag-Listen
    containers.forEach(container => {
        container.style.display = 'none';
        const tagList = container.closest('.timeline-content').querySelector('.tag-list');
        if (tagList) tagList.style.display = 'none';
    });
}
