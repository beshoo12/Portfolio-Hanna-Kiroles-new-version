const yearElement: HTMLElement | null = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear().toString();
}

// Dark Mode Toggle
const darkToggle: HTMLElement | null = document.getElementById('darkToggle');
if (darkToggle) {
  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    darkToggle.textContent = document.body.classList.contains('dark') ? '☀' : '🌙';
  });
}

// Lightbox for Certificates
const openLightbox = (src: string): void => {
  const box: HTMLElement | null = document.getElementById('lightbox');
  const lightImg: HTMLImageElement | null = document.getElementById('lightImg') as HTMLImageElement;
  if (box && lightImg) {
    lightImg.src = src;
    box.classList.add('open');
  }
};

const closeLightbox = (): void => {
  const box: HTMLElement | null = document.getElementById('lightbox');
  if (box) {
    box.classList.remove('open');
  }
};

// Form Submission (Fake)
const handleSubmit = (e: Event): void => {
  e.preventDefault();
  alert('Your message has been received — I will contact you soon.');
  const form = e.target as HTMLFormElement;
  form.reset();
};

// Scroll to Contact
const scrollToContact = (): void => {
  const contactSection: HTMLElement | null = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
};

// WhatsApp Link
const openWhatsApp = (): void => {
  const phone: string = '+96550123456';
  window.open(`https://wa.me/${phone}`, '_blank');
};

// Animation on Load
window.addEventListener('load', () => {
  document.querySelectorAll('[data-anim]').forEach((el: Element) => {
    const htmlEl = el as HTMLElement;
    const delay: string | null = htmlEl.getAttribute('data-anim');
    if (delay && delay.includes('delay')) {
      htmlEl.style.animationDelay = `${parseFloat(delay.split('-')[1]) * 0.15}s`;
    }
    htmlEl.style.opacity = '1';
  });
});