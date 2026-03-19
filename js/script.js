(function () {
  'use strict';

  // ----- Year in footer -----
  document.getElementById('year').textContent = new Date().getFullYear();

  // ----- Navbar scroll state -----
  const navbar = document.getElementById('navbar');
  function updateNavbar() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // ----- Mobile menu toggle -----
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    document.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ----- Smooth scroll for anchor links -----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ----- Scroll reveal (Intersection Observer) -----
  const revealEls = document.querySelectorAll('.reveal, .reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-scale');
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { rootMargin: '0px 0px -40px 0px', threshold: 0.1 }
  );
  revealEls.forEach(function (el) {
    revealObserver.observe(el);
  });

  // ----- Video carousel -----
  const track = document.getElementById('carouselTrack');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsContainer = document.getElementById('carouselDots');

  if (!track || !slides.length) return;

  const totalSlides = slides.length;
  let currentIndex = 0;

  function goToSlide(index) {
    currentIndex = ((index % totalSlides) + totalSlides) % totalSlides;
    track.style.transform = 'translateX(-' + currentIndex * 100 + '%)';
    updateDots();
  }

  function updateDots() {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      goToSlide(currentIndex - 1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      goToSlide(currentIndex + 1);
    });
  }

  // Build dots
  if (dotsContainer) {
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.addEventListener('click', function () {
        goToSlide(i);
      });
      dotsContainer.appendChild(dot);
    }
  }

  // Optional: autoplay carousel (pause on hover)
  let autoplayTimer;
  function startAutoplay() {
    autoplayTimer = setInterval(function () {
      goToSlide(currentIndex + 1);
    }, 5000);
  }
  function stopAutoplay() {
    clearInterval(autoplayTimer);
  }
  startAutoplay();
  const carouselWrapper = document.querySelector('.carousel-wrapper');
  if (carouselWrapper) {
    carouselWrapper.addEventListener('mouseenter', stopAutoplay);
    carouselWrapper.addEventListener('mouseleave', startAutoplay);
  }

  // ----- Contact form -----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // Replace with real submission (e.g. fetch to API or Formspree)
      var btn = contactForm.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = 'Message sent!';
        btn.disabled = false;
        contactForm.reset();
        setTimeout(function () {
          btn.textContent = originalText;
        }, 2000);
      }, 800);
    });
  }

  // ----- Cursor Glow Effect -----
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow) {
    document.addEventListener('mousemove', function (e) {
      requestAnimationFrame(() => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
      });
    });
  }

  // ----- VanillaTilt Init -----
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.video-card, .about-card, .testimonial-card'), {
      max: 10,
      speed: 400,
      glare: true,
      "max-glare": 0.2,
      perspective: 1000
    });
  }

  // ----- Security Measures -----
  // Disable right-click
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });

  // Disable specific shortcuts (F12, Ctrl+Shift+I, Ctrl+U, etc.)
  document.addEventListener('keydown', function (e) {
    // F12
    if (e.key === 'F12') {
      e.preventDefault();
    }
    // Ctrl+Shift+I/J/C
    if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'i', 'j', 'c'].includes(e.key)) {
      e.preventDefault();
    }
    // Ctrl+U
    if (e.ctrlKey && ['U', 'u'].includes(e.key)) {
      e.preventDefault();
    }
    // Ctrl+S
    if (e.ctrlKey && ['S', 's'].includes(e.key)) {
      e.preventDefault();
    }
    // Ctrl+C (Copy)
    if (e.ctrlKey && ['C', 'c'].includes(e.key)) {
      e.preventDefault();
    }
  });

  // Prevent generic drag/drop and copy/cut/paste
  document.addEventListener('dragstart', e => e.preventDefault());
  document.addEventListener('drop', e => e.preventDefault());
  document.addEventListener('copy', e => e.preventDefault());
  document.addEventListener('cut', e => e.preventDefault());
  document.addEventListener('paste', e => e.preventDefault());

})();
