// script.js - معهد درة الأقصى للتدريب الأهلي | النسخة الكاملة الموحدة
(function() {
    'use strict';

    // ===== الإعدادات الثابتة =====
    const TELEGRAM_TOKEN = '8893266029:AAE2snn_5sxd11TIWfEbIv72zFvClNgMpeU';
    const TELEGRAM_CHAT_ID = '920379579';
    
    const INSTITUTE_PHONES = {
        primary: '96565523027',
        secondary: '96522639358',
        tertiary: '96565937086'
    };
    
    const WHATSAPP_PHONE = INSTITUTE_PHONES.primary;
    const INSTITUTE_NAME = 'معهد درة الأقصى للتدريب الأهلي';
    const INSTAGRAM_URL = 'https://www.instagram.com/dorratalaqsa_kw';

    // ===== عناصر الصفحة الأساسية =====
    const yearElement = document.getElementById('year');
    const mobileToggle = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollBtn = document.getElementById('scrollTopBtn');
    const mainHeader = document.getElementById('mainHeader');
    const floatWhatsapp = document.querySelector('.float-whatsapp');

    // ===== تحديث السنة تلقائياً =====
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // ===== تحديث زر الواتساب العائم =====
    if (floatWhatsapp) {
        floatWhatsapp.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('السلام عليكم، أريد الاستفسار عن خدمات معهد درة الأقصى')}`;
    }

    // ===== تحديث جميع أرقام التواصل تلقائياً =====
    function updateAllContactLinks() {
        // تحديث كل روابط التليفون
        document.querySelectorAll('a[href*="tel:"]').forEach(link => {
            link.href = `tel:${INSTITUTE_PHONES.primary}`;
        });
        
        // تحديث كل روابط الواتساب
        document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
            const url = new URL(link.href);
            const textParam = url.searchParams.get('text') || 'السلام عليكم، أريد الاستفسار عن خدمات معهد درة الأقصى';
            link.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(textParam)}`;
        });
    }
    updateAllContactLinks();

    // ===== القائمة الجانبية للجوال (Hamburger Menu) =====
    function initMobileMenu() {
        if (!mobileToggle || !mainNav) return;

        function openMenu() {
            mainNav.classList.add('active');
            mobileToggle.classList.add('active');
            const spans = mobileToggle.querySelectorAll('span');
            if (spans.length >= 3) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
            }
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            mainNav.classList.remove('active');
            mobileToggle.classList.remove('active');
            const spans = mobileToggle.querySelectorAll('span');
            if (spans.length >= 3) {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
            document.body.style.overflow = '';
        }

        // فتح/إغلاق القائمة عند الضغط على زر الهامبرجر
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (mainNav.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // إغلاق القائمة عند الضغط على أي رابط
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        // إغلاق القائمة عند الضغط خارجها
        document.addEventListener('click', (e) => {
            if (mainNav.classList.contains('active') && 
                !mainNav.contains(e.target) && 
                !mobileToggle.contains(e.target)) {
                closeMenu();
            }
        });

        // إغلاق القائمة عند الضغط على Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mainNav.classList.contains('active')) {
                closeMenu();
            }
        });

        // إغلاق القائمة عند تغيير حجم الشاشة للديسكتوب
        window.addEventListener('resize', () => {
            if (window.innerWidth > 992 && mainNav.classList.contains('active')) {
                closeMenu();
            }
        });
    }
    initMobileMenu();

    // ===== تفعيل الرابط الحالي في النافبار حسب القسم المرئي =====
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + 150;

        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
            // تفعيل رابط المقالات إذا كنا في صفحة المقالات
            if (href === 'articles.html' && window.location.pathname.includes('articles')) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', setActiveNavLink, { passive: true });
    window.addEventListener('load', setActiveNavLink);

    // ===== دالة إرسال إشعار للتليجرام =====
    async function sendToTelegram(name, phone, message, trackCode, source) {
        const text = `🔔 <b>طلب جديد من ${INSTITUTE_NAME}</b>
━━━━━━━━━━━━━━━━━━━━━━
🏫 <b>المعهد:</b> ${INSTITUTE_NAME}
📄 <b>المصدر:</b> ${source}
━━━━━━━━━━━━━━━━━━━━━━
👤 <b>الاسم:</b> ${name}
📱 <b>الهاتف:</b> ${phone || 'غير محدد'}
📝 <b>الاستفسار:</b> ${message}
🆔 <b>كود المتابعة:</b> <code>${trackCode}</code>
━━━━━━━━━━━━━━━━━━━━━━
⏰ <b>الوقت:</b> ${new Date().toLocaleString('ar-EG', { timeZone: 'Asia/Kuwait' })}
📍 <b>الموقع:</b> الكويت - حولي`;

        try {
            const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: text,
                    parse_mode: 'HTML'
                })
            });
            
            const result = await response.json();
            console.log('Telegram Response:', result);
            return result.ok;
        } catch (err) {
            console.error('Telegram Error:', err);
            return false;
        }
    }

    // ===== دالة إنشاء رسالة واتساب ترحيبية احترافية =====
    function createWhatsAppMessage(name, message, trackCode) {
        const hour = new Date().getHours();
        let greeting;
        
        if (hour >= 5 && hour < 12) {
            greeting = 'صباح الخير';
        } else if (hour >= 12 && hour < 17) {
            greeting = 'مساء الخير';
        } else if (hour >= 17 && hour < 22) {
            greeting = 'مساء الورد';
        } else {
            greeting = 'السلام عليكم ورحمة الله';
        }

        return `${greeting} 🌟

أنا ${name}، تواصلت مع ${INSTITUTE_NAME} من خلال الموقع الإلكتروني.

📝 بخصوص: ${message}

🆔 كود المتابعة: ${trackCode}

في انتظار ردكم الكريم. شكراً جزيلاً 🙏`;
    }

    // ===== معالج التواصل عبر الواتساب (للأزرار المباشرة) =====
    window.redirectToWhatsApp = function(name, message) {
        const trackCode = 'DORRA-' + Math.random().toString(36).substring(2, 8).toUpperCase();
        const cleanName = name || 'طالب جديد';
        const cleanMessage = message || 'استفسار عن الدورات';
        
        // إرسال إشعار للتليجرام في الخلفية
        sendToTelegram(cleanName, '', cleanMessage, trackCode, 'زر واتساب مباشر');
        
        const whatsappMsg = createWhatsAppMessage(cleanName, cleanMessage, trackCode);
        window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(whatsappMsg)}`, '_blank');
    };

    // ===== معالج إرسال النموذج (لو فيه فورم في المستقبل) =====
    window.handleSubmit = async function(event) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');

        const name = formData.get('name')?.trim() || 'غير محدد';
        const phone = formData.get('phone')?.trim() || '';
        const message = formData.get('message')?.trim() || 'طلب استفسار عن الدورات';
        const trackCode = 'DORRA-' + Math.random().toString(36).substring(2, 8).toUpperCase();

        // تعطيل الزر مؤقتاً
        if (submitBtn) {
            submitBtn.disabled = true;
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري الإرسال...';
            
            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
            }, 10000);
        }

        try {
            // إرسال إشعار للتليجرام
            const telegramSent = await sendToTelegram(name, phone, message, trackCode, 'نموذج الاتصال');
            
            // محاولة إرسال الفورم للخادم (لو موجود)
            if (form.action && form.method) {
                fetch(form.action, {
                    method: form.method,
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                }).catch(() => {});
            }

            // تنظيف الفورم
            form.reset();

            // رسالة تأكيد للمستخدم
            if (telegramSent) {
                alert('✅ تم إرسال طلبك بنجاح!\n\nسيتم تحويلك الآن إلى الواتساب للتواصل المباشر مع إدارة المعهد.');
            } else {
                alert('✅ تم استلام طلبك!\n\nجاري تحويلك إلى الواتساب...');
            }

            // تحويل للواتساب مع رسالة مخصصة
            const whatsappMessage = createWhatsAppMessage(name, message, trackCode);
            const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(whatsappMessage)}`;
            
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
            }, 500);

        } catch (error) {
            console.error('Form Error:', error);
            
            // تحويل مباشر للواتساب في حالة الخطأ
            const fallbackMessage = 'السلام عليكم، أريد الاستفسار عن خدمات معهد درة الأقصى';
            window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(fallbackMessage)}`, '_blank');
            
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'إرسال الرسالة';
            }
        }
    };

    // ===== تأثيرات الظهور عند التمرير (Intersection Observer) =====
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // جميع العناصر اللي هنطبق عليها الأنيميشن
        const animatedSelectors = [
            '.subject-card',
            '.blog-card', 
            '.feature-card',
            '.full-article',
            '.about-content',
            '.about-image',
            '.about-feature',
            '.section-header',
            '.contact-card',
            '.contact-item',
            '.hero-text',
            '.hero-visual',
            '.institute-card',
            '.articles-cta'
        ];

        document.querySelectorAll(animatedSelectors.join(',')).forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.2s ease ${index * 0.03}s, transform 0.6s ease ${index * 0.03}s`;
            observer.observe(el);
        });
    }
    initScrollAnimations();

    // ===== زر العودة للأعلى =====
    function initScrollToTop() {
        if (!scrollBtn) return;
        
        const toggleScrollBtn = () => {
            if (window.scrollY > 500) {
                scrollBtn.classList.add('show');
            } else {
                scrollBtn.classList.remove('show');
            }
        };
        
        window.addEventListener('scroll', toggleScrollBtn, { passive: true });
        toggleScrollBtn(); // فحص أولي عند تحميل الصفحة
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ 
                top: 0, 
                behavior: 'smooth' 
            });
        });
    }
    initScrollToTop();

    // ===== تأثير الهيدر عند التمرير =====
    if (mainHeader) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) {
                mainHeader.classList.add('scrolled');
            } else {
                mainHeader.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // ===== التمرير السلس للروابط الداخلية =====
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href.length < 2) return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerHeight = mainHeader ? mainHeader.offsetHeight : 80;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    initSmoothScroll();

    // ===== معالجة أخطاء تحميل الصور =====
    function initImageFallback() {
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('error', function() {
                // إضافة خلفية بديلة للصور المكسورة
                this.style.backgroundColor = '#f1f5f9';
                this.style.minHeight = '200px';
                this.style.display = 'flex';
                this.style.alignItems = 'center';
                this.style.justifyContent = 'center';
                this.alt = 'صورة توضيحية - معهد درة الأقصى';
                
                // محاولة إضافة أيقونة بديلة
                const icon = document.createElement('i');
                icon.className = 'fa-solid fa-image';
                icon.style.fontSize = '3rem';
                icon.style.color = '#cbd5e1';
                this.parentNode.insertBefore(icon, this);
            });
        });
    }
    initImageFallback();

    // ===== إضافة rel="noopener noreferrer" للروابط الخارجية =====
    function secureExternalLinks() {
        document.querySelectorAll('a[target="_blank"]').forEach(link => {
            link.setAttribute('rel', 'noopener noreferrer');
        });
    }
    secureExternalLinks();

    // ===== إضافة تأثيرات تفاعلية للبطاقات =====
    function initCardInteractions() {
        // تأثير الـ hover على بطاقات الخدمات
        document.querySelectorAll('.subject-card, .blog-card, .feature-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
            });
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    initCardInteractions();

    // ===== تحسين تجربة القراءة في صفحة المقالات =====
    function initReadingExperience() {
        // إضافة estimated reading time للمقالات
        document.querySelectorAll('.full-article-body').forEach(body => {
            const text = body.textContent || body.innerText;
            const wordCount = text.trim().split(/\s+/).length;
            const readingTime = Math.ceil(wordCount / 200); // 200 كلمة في الدقيقة
            
            const metaElement = body.querySelector('.article-meta');
            if (metaElement) {
                const timeSpan = document.createElement('span');
                timeSpan.innerHTML = ` | <i class="fa-regular fa-clock"></i> وقت القراءة: ${readingTime} دقائق`;
                metaElement.appendChild(timeSpan);
            }
        });
    }
    initReadingExperience();

    // ===== التهيئة النهائية =====
    function init() {
        // تفعيل الرابط النشط
        setActiveNavLink();
        
        // إظهار زر التمرير إذا كنا في منتصف الصفحة
        if (scrollBtn && window.scrollY > 500) {
            scrollBtn.classList.add('show');
        }

        // رسالة ترحيب في الكونسول
        console.log(`
╔══════════════════════════════════════╗
║  🏫 ${INSTITUTE_NAME}
║  📍 الكويت - حولي - شارع اليرموك
║  📞 ${INSTITUTE_PHONES.primary}
║  📞 ${INSTITUTE_PHONES.secondary}
║  📞 ${INSTITUTE_PHONES.tertiary}
║  📷 ${INSTAGRAM_URL}
║  ✨ الموقع جاهز للعمل بنجاح!
╚══════════════════════════════════════╝
        `);
    }

    // تشغيل التهيئة عند تحميل الصفحة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

// ===== معالجة خطأ تحميل صورة اللوجو =====
function initLogoFallback() {
    const logoImg = document.querySelector('.logo-img');
    const logoIcon = document.querySelector('.logo-icon');
    
    if (logoImg && logoIcon) {
        // لو الصورة اتحملت بنجاح
        logoImg.addEventListener('load', () => {
            logoIcon.classList.remove('logo-fallback');
        });
        
        // لو الصورة فشلت في التحميل
        logoImg.addEventListener('error', () => {
            logoIcon.classList.add('logo-fallback');
            console.warn('⚠️ صورة اللوجو (logo.png) غير موجودة، تم استخدام الأيقونة البديلة.');
        });
        
        // فحص أولي
        if (!logoImg.complete || logoImg.naturalWidth === 0) {
            logoIcon.classList.add('logo-fallback');
        }
    }
}

// استدعاء الدالة في التهيئة
document.addEventListener('DOMContentLoaded', initLogoFallback);

})();