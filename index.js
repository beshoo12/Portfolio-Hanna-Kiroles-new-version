document.getElementById('year').textContent = new Date().getFullYear();

// Dark Mode Toggle
const darkToggle = document.getElementById('darkToggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  darkToggle.textContent = document.body.classList.contains('dark') ? '☀' : '🌙';
});

// Lightbox for Certificates
function openLightbox(src) {
  const box = document.getElementById('lightbox');
  document.getElementById('lightImg').src = src;
  box.classList.add('open');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

// Form Submission (Fake)
function handleSubmit(e) {
  e.preventDefault();
  alert('Your message has been received — I will contact you soon.');
  e.target.reset();
}

// Scroll to Contact
function scrollToContact() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// WhatsApp Link
function openWhatsApp() {
    window.open("https://wa.me/96565851296", "_blank");
  }

// Animation on Load
window.addEventListener('load', () => {
  document.querySelectorAll('[data-anim]').forEach(el => {
    const delay = el.getAttribute('data-anim');
    if (delay && delay.includes('delay')) {
      el.style.animationDelay = (parseFloat(delay.split('-')[1]) * 0.15) + 's';
    }
    el.style.opacity = 1;
  });
});
// Lightbox Close on Click Outside Image
document.getElementById('lightbox').addEventListener('click', (e) => {
  if (e.target.id === 'lightbox') { closeLightbox(); }
});