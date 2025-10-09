document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', () => {
      const accordionItem = button.parentElement;
      accordionItem.classList.toggle('active');
      console.log('تم الضغط على:', button.textContent);
    });
  });
});