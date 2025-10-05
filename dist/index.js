"use strict";
// ===== تحديث السنة تلقائيًا =====
var yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear().toString();
}
// ===== Dark Mode Toggle =====
var darkToggle = document.getElementById('darkToggle');
if (darkToggle) {
    darkToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark');
        darkToggle.textContent = document.body.classList.contains('dark') ? '☀' : '🌙';
    });
}
// ===== Lightbox للشهادات =====
var openLightbox = function (src) {
    var box = document.getElementById('lightbox');
    var lightImg = document.getElementById('lightImg');
    if (box && lightImg) {
        lightImg.src = src;
        box.classList.add('open');
    }
};
var closeLightbox = function () {
    var box = document.getElementById('lightbox');
    if (box) {
        box.classList.remove('open');
    }
};
// ===== Form Submission باستخدام Fetch =====
var handleSubmit = function (event) {
    event.preventDefault();
    var form = event.target;
    fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    }).then(function (response) {
        if (response.ok) {
            alert('تم إرسال رسالتك بنجاح! سأرد عليك قريبًا.');
            form.reset();
        }
        else {
            alert('حدث خطأ أثناء الإرسال، حاول مرة أخرى.');
        }
    }).catch(function (error) {
        alert('حدث خطأ أثناء الإرسال، حاول مرة أخرى.');
        console.error(error);
    });
};
// ===== Scroll to Contact =====
var scrollToContact = function () {
    var contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
};
// ===== WhatsApp Link =====
var openWhatsApp = function () {
    var phone = '96565851296'; // الرقم الصحيح
    window.open("https://wa.me/".concat(phone), '_blank');
};
// ===== Animation on Load =====
window.addEventListener('load', function () {
    document.querySelectorAll('[data-anim]').forEach(function (el) {
        var htmlEl = el;
        var delay = htmlEl.getAttribute('data-anim');
        if (delay && delay.includes('delay')) {
            htmlEl.style.animationDelay = "".concat(parseFloat(delay.split('-')[1]) * 0.15, "s");
        }
        htmlEl.style.opacity = '1';
    });
});
// ===== Navbar Hamburger Toggle =====
var hamburger = document.getElementById('hamburger');
var navLinks = document.getElementById('nav-links');
if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
        navLinks.classList.toggle('show');
    });
    var links = navLinks.querySelectorAll('a');
    links.forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('show');
        });
    });
}
