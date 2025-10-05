// ===== تحديث السنة تلقائيًا =====
const yearElement: HTMLElement | null = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear().toString();
}

// ===== Dark Mode Toggle =====
const darkToggle: HTMLElement | null = document.getElementById('darkToggle');
if (darkToggle) {
  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    darkToggle.textContent = document.body.classList.contains('dark') ? '☀' : '🌙';
  });
}

// ===== Lightbox للشهادات =====
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

// ===== Form Submission باستخدام Fetch =====
const handleSubmit = (event: Event): void => {
  event.preventDefault();
  const form = event.target as HTMLFormElement;

  fetch(form.action, {
    method: form.method,
    body: new FormData(form),
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      alert('تم إرسال رسالتك بنجاح! سأرد عليك قريبًا.');
      form.reset();
    } else {
      alert('حدث خطأ أثناء الإرسال، حاول مرة أخرى.');
    }
  }).catch(error => {
    alert('حدث خطأ أثناء الإرسال، حاول مرة أخرى.');
    console.error(error);
  });
};

// ===== Scroll to Contact =====
const scrollToContact = (): void => {
  const contactSection: HTMLElement | null = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
};

// ===== WhatsApp Link =====
const openWhatsApp = () => {
    const phone = '96565851296'; // الرقم الصحيح
    window.open(`https://wa.me/${phone}`, '_blank');
};


// ===== Animation on Load =====
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

// ===== Navbar Hamburger Toggle =====
const hamburger: HTMLElement | null = document.getElementById('hamburger');
const navLinks: HTMLElement | null = document.getElementById('nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

  const links: NodeListOf<HTMLAnchorElement> = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
    });
  });
}
