console.log('الـ Script تحمّل بنجاح');
console.log("السكربت بدأ التنفيذ");

// ===== تحديث السنة تلقائيًا =====
const yearElement = document.getElementById('year');
if (yearElement) yearElement.textContent = new Date().getFullYear().toString();

// ===== Lightbox للشهادات =====
const openLightbox = (src) => {
  const box = document.getElementById('lightbox');
  const lightImg = document.getElementById('lightImg');
  if (box && lightImg) {
    lightImg.src = src;
    box.classList.add('open');
  }
};

const closeLightbox = () => {
  const box = document.getElementById('lightbox');
  if (box) box.classList.remove('open');
};

// ===== Form Submission باستخدام Fetch =====
const handleSubmit = (event) => {
  event.preventDefault();
  const form = event.target;
  fetch(form.action, {
    method: form.method,
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  }).then(response => response.ok ? (alert('تم الإرسال بنجاح'), form.reset()) : alert('حدث خطأ'))
    .catch(error => (alert('حدث خطأ'), console.error(error)));
};

// ===== Scroll to Contact =====
const scrollToContact = () => {
  const contactSection = document.getElementById('contact');
  if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
};

// ===== WhatsApp Link =====
const openWhatsApp = () => window.open(`https://wa.me/96565851296`, '_blank');

// ===== Accordion (دالة منفصلة) =====
const initAccordion = () => {
  const articlesSection = document.getElementById('articles');
  if (!articlesSection) {
    console.warn('لم يتم العثور على قسم المقالات');
    return;
  }

  const accordionItems = articlesSection.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const button = item.querySelector('.accordion-button');
    button.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  });
};

// ===== Hamburger Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

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