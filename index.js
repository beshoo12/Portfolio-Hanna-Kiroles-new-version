// ===== تحديث السنة تلقائيًا =====
var yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear().toString();
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
