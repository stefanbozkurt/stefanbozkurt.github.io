export function setupAccordion() {
  const buttons = document.querySelectorAll('.accordion-content-button');
  buttons.forEach(button => {
      button.addEventListener('click', () => {
          const collapse = button.parentElement.nextElementSibling;
          const icon = button.querySelector('.accordion-content-icon');
          const expanded = button.getAttribute('aria-expanded') === 'true';

          // Schließe alle anderen Akkordeons
          document.querySelectorAll('.accordion-content-collapse').forEach(otherCollapse => {
              if (otherCollapse !== collapse) {
                  otherCollapse.classList.remove('show');
                  otherCollapse.previousElementSibling.querySelector('.accordion-content-button').setAttribute('aria-expanded', 'false');
                  otherCollapse.previousElementSibling.querySelector('.accordion-content-icon').textContent = '+';
              }
          });

          // Öffne/Schließe das aktuelle Akkordeon
          if (expanded) {
              collapse.classList.remove('show');
              button.setAttribute('aria-expanded', 'false');
              icon.textContent = '+';
          } else {
              collapse.classList.add('show');
              button.setAttribute('aria-expanded', 'true');
              icon.textContent = '−';
          }
      });
  });
}