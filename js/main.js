const swiper = new Swiper('.masters-swiper', {
  // Показывать только один слайд
  slidesPerView: 1,
  // Расстояние между слайдами
  spaceBetween: 30,
  // Центрирование активного слайда
  centeredSlides: true,
  // Бесконечная loop-прокрутка
  loop: true,
  // Скорость анимации
  speed: 600,

  // Настройки для адаптива (на разных ширинах экрана можно показывать больше карточек)
  breakpoints: {
    // при ширине экрана >= 768px показывать 2 слайда
    768: {
      slidesPerView: 2,
    },
    // при ширине экрана >= 1200px показывать 3 слайда
    1200: {
      slidesPerView: 1,
    }
  },

  // Навигационные стрелки
  navigation: {
    nextEl: '.custom-next',
    prevEl: '.custom-prev',
  },

  // Пагинация (буллеты)
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    // Динамические буллеты (буллеты будут меняться количеством при слайд-группах)
    dynamicBullets: true
  },
});


// Ленивая загрузка изображений для галереи
document.addEventListener('DOMContentLoaded', function() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback для старых браузеров
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
    });
  }
});


// Слайдер отзывов
const reviewsSwiper = new Swiper('.reviews-slider', {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 20,
  centeredSlides: true,
  speed: 600,
  
  // Пагинация
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  
  // Адаптив
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 15,
      centeredSlides: false,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
      centeredSlides: false,
    }
  },
  
  // Автопрокрутка
  autoplay: {
    delay: 3000,
    disableOnInteraction: true,
  },
});


// Анимация появления контактов
document.addEventListener('DOMContentLoaded', function() {
  const contactItems = document.querySelectorAll('.contact-item');
  
  contactItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
      item.style.transition = 'all 0.6s ease';
      item.style.opacity = '1';
      item.style.transform = 'translateX(0)';
    }, 100 * index);
  });
});

// Плавный скролл к карте
document.querySelectorAll('.contact-link[href^="mailto:"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = this.href;
  });
});


// Плавный скролл для навигации в футере
document.querySelectorAll('footer a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Анимация появления футера при скролле
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px'
};

const footerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Наблюдаем за футером
const footer = document.querySelector('footer');
if (footer) {
  footer.style.opacity = '0';
  footer.style.transform = 'translateY(20px)';
  footer.style.transition = 'all 0.6s ease';
  footerObserver.observe(footer);
}


// Функционал бургер-меню
document.addEventListener('DOMContentLoaded', function() {
  const burgerMenu = document.querySelector('.burger-menu');
  const mobileNav = document.querySelector('.mobile-nav');
  const overlayNav = document.querySelector('.overlay-nav');
  const body = document.body;
  
  // Открытие/закрытие меню
  burgerMenu.addEventListener('click', function() {
    this.classList.toggle('active');
    mobileNav.classList.toggle('active');
    overlayNav.classList.toggle('active');
    body.classList.toggle('no-scroll');
  });
  
  // Закрытие меню при клике на оверлей
  overlayNav.addEventListener('click', function() {
    burgerMenu.classList.remove('active');
    mobileNav.classList.remove('active');
    this.classList.remove('active');
    body.classList.remove('no-scroll');
  });
  
  // Закрытие меню при клике на ссылку
  const navLinks = document.querySelectorAll('.mobile-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      burgerMenu.classList.remove('active');
      mobileNav.classList.remove('active');
      overlayNav.classList.remove('active');
      body.classList.remove('no-scroll');
    });
  });
  
  // Плавная прокрутка для всех навигационных ссылок
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Рассчитываем позицию с учетом высоты хэдера
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
