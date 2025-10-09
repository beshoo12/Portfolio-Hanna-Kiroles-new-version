// TypeScript version of index.js with type definitions

interface HTMLElementWithId extends HTMLElement {
  classList: DOMTokenList;
  scrollIntoView(options?: ScrollIntoViewOptions): void;
}

interface Window {
  open(url: string, target?: string): Window | null;
}

// ===== تحديث السنة تلقائيًا =====
const yearElement = document.getElementById('year') as HTMLElementWithId | null;
if (yearElement) yearElement.textContent = new Date().getFullYear().toString();

// ===== Lightbox للشهادات =====
const openLightbox = (src: string): void => {
  const box = document.getElementById('lightbox') as HTMLElementWithId | null;
  const lightImg = document.getElementById('lightImg') as HTMLImageElement | null;
  if (box && lightImg) {
    lightImg.src = src;
    box.classList.add('open');
  }
};

const closeLightbox = (): void => {
  const box = document.getElementById('lightbox') as HTMLElementWithId | null;
  if (box) box.classList.remove('open');
};

// ===== Form Submission باستخدام Fetch =====
const handleSubmit = (event: Event): void => {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  fetch(form.action, {
    method: form.method,
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  }).then(response => response.ok ? (alert('تم الإرسال بنجاح'), form.reset()) : alert('حدث خطأ'))
    .catch(error => (alert('حدث خطأ'), console.error(error)));
};

// ===== Scroll to Contact =====
const scrollToContact = (): void => {
  const contactSection = document.getElementById('contact') as HTMLElementWithId | null;
  if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
};

// ===== WhatsApp Link =====
const openWhatsApp = (): void => {
  window.open(`https://wa.me/96565851296`, '_blank');
  return; // لتجنب أي مشكلة في النوع
};

// ===== Accordion (دالة منفصلة) =====
const initAccordion = (): void => {
  const articlesSection = document.getElementById('articles') as HTMLElementWithId | null;
  if (!articlesSection) {
    console.warn('لم يتم العثور على قسم المقالات');
    return;
  }

  const accordionItems = articlesSection.querySelectorAll('.accordion-item') as NodeListOf<HTMLElementWithId>;
  accordionItems.forEach(item => {
    const button = item.querySelector('.accordion-button') as HTMLElementWithId | null;
    if (button) {
      button.addEventListener('click', () => {
        item.classList.toggle('active');
      });
    }
  });
};

// ===== Hamburger Menu Toggle =====
const hamburger = document.getElementById('hamburger') as HTMLElementWithId | null;
const navLinks = document.getElementById('nav-links') as HTMLElementWithId | null;

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    hamburger.classList.toggle('active');
  });
}

// ===== Initialize on Load =====
document.addEventListener('DOMContentLoaded', () => {
  initAccordion();
});