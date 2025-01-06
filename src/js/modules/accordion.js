export function setupAccordion() {
  const buttons = document.querySelectorAll('.accordion-button');
  buttons.forEach(button => {
      button.addEventListener('click', () => {
          const collapse = button.parentElement.nextElementSibling;
          const icon = button.querySelector('.accordion-icon');
          const expanded = button.getAttribute('aria-expanded') === 'true';

          // Schließe alle anderen Akkordeons
          document.querySelectorAll('.accordion-collapse').forEach(otherCollapse => {
              if (otherCollapse !== collapse) {
                  otherCollapse.classList.remove('show');
                  otherCollapse.previousElementSibling.querySelector('.accordion-button').setAttribute('aria-expanded', 'false');
                  otherCollapse.previousElementSibling.querySelector('.accordion-icon').textContent = '+';
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