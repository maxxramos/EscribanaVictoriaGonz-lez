/* ═══════════════════════════════════════════════════════════
   ESCRIBANA VICTORIA GONZÁLEZ — Main JS
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Inicializar Lucide Icons ──────────────────────────────
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ── Referencias DOM ────────────────────────────────────────
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');
  const navLinks  = navMenu.querySelectorAll('a');
  const fadeEls   = document.querySelectorAll('.fade-in');

  // ──────────────────────────────────────────────────────────
  // 1. NAVBAR — sticky + scroll effect
  // ──────────────────────────────────────────────────────────
  function handleNavbarScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // ──────────────────────────────────────────────────────────
  // 2. MOBILE MENU — hamburger toggle
  // ──────────────────────────────────────────────────────────
  function openMenu() {
    hamburger.classList.add('open');
    navMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    hamburger.classList.contains('open') ? closeMenu() : openMenu();
  });

  navLinks.forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('click', (e) => {
    if (
      navMenu.classList.contains('open') &&
      !navMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // ──────────────────────────────────────────────────────────
  // 3. SMOOTH SCROLL (fallback)
  // ──────────────────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ──────────────────────────────────────────────────────────
  // 4. SERVICIOS MODAL
  // ──────────────────────────────────────────────────────────
  const serviceData = {
    inmuebles: {
      icon: 'home',
      title: 'Compraventa de Inmuebles',
      body: 'Gestión integral del proceso de compraventa de bienes inmuebles: revisión de títulos de propiedad, redacción de boletos de reserva y escrituras definitivas, certificaciones registrales y coordinación de todas las partes intervinientes. Cada operación es ejecutada con la mayor diligencia para garantizar una transacción segura, transparente y con plena validez jurídica.'
    },
    vehiculos: {
      icon: 'car',
      title: 'Compraventa de Vehículos',
      body: 'Tramitación completa de la compraventa de vehículos automotores: redacción de contratos de compraventa, certificación de firmas ante los organismos competentes, verificación de que el bien se encuentre libre de gravámenes, prendas e inhibiciones, y gestión ágil de la transferencia registral. Brindamos seguridad y claridad en cada paso del proceso para proteger tanto al comprador como al vendedor.'
    },
    certificaciones: {
      icon: 'badge-check',
      title: 'Certificaciones',
      body: 'Legalización de firmas, copias certificadas de documentos originales, autenticaciones notariales y apostillas para uso tanto nacional como internacional. Nuestras certificaciones tienen plena validez jurídica ante organismos públicos, privados e instituciones del exterior. Agilidad y rigor en cada trámite, garantizando que sus documentos sean reconocidos donde usted los necesite.'
    },
    poderes: {
      icon: 'file-text',
      title: 'Poderes',
      body: 'Elaboración de poderes generales, especiales y de administración para representar a personas físicas o jurídicas ante organismos públicos o privados, instituciones financieras, entidades registrales y cualquier acto que lo requiera. Redactamos el poder de acuerdo a las necesidades específicas del mandante, asegurando su alcance legal, vigencia y validez ante todos los organismos pertinentes.'
    },
    sucesiones: {
      icon: 'users',
      title: 'Sucesiones y Testamentos',
      body: 'Tramitación completa de procesos sucesorios con acompañamiento personalizado en cada etapa: inventario de bienes, declaratoria de herederos, partición de herencias. También redactamos testamentos cumpliendo todas las formalidades legales vigentes en Uruguay, para garantizar que la voluntad del testador sea respetada de manera íntegra y sin contratiempos.'
    },
    actas: {
      icon: 'clipboard-list',
      title: 'Actas',
      body: 'Redacción de actas de constatación, actas de estado de conservación de inmuebles, actas de juntas societarias, actas de notoriedad y todo tipo de instrumentos notariales que den fe de hechos con pleno valor probatorio. Las actas notariales son herramientas clave para respaldar situaciones jurídicas de manera fehaciente, con validez legal y fuerza probatoria ante cualquier instancia.'
    },
    arrendamiento: {
      icon: 'key',
      title: 'Contratos de Arrendamiento',
      body: 'Elaboración y certificación de contratos de arrendamiento de inmuebles con todas las cláusulas necesarias para proteger tanto al arrendador como al arrendatario. Incluye asesoramiento sobre depósitos en garantía, plazos contractuales, condiciones de uso del inmueble, cláusulas de rescisión y cumplimiento de la legislación de arrendamientos urbanos vigente en Uruguay.'
    },
    propiedades: {
      icon: 'building-2',
      title: 'Constitución de Propiedades',
      body: 'Tramitación de constituciones de propiedad horizontal, declaratorias de inversión, reglamentos de copropiedad, adjudicaciones de unidades y promesas de compraventa en proyectos inmobiliarios. Asesoramiento integral para desarrolladores, constructores y particulares que buscan dar forma legal a sus proyectos con total seguridad jurídica ante el Ministerio de Vivienda y los registros correspondientes.'
    },
    sas: {
      icon: 'briefcase',
      title: 'Constitución de SAS',
      body: 'Asesoramiento integral en constitución de Sociedades por Acciones Simplificadas (SAS), incluyendo redacción de estatutos, inscripción registral y acompañamiento en todo el proceso. Soluciones ágiles, seguras y adaptadas a cada emprendimiento.'
    }
  };

  const serviceModal = document.getElementById('serviceModal');
  const modalTitle   = document.getElementById('modalTitle');
  const modalBody    = document.getElementById('modalBody');
  const modalIcon    = document.getElementById('modalIcon');
  const modalClose   = document.getElementById('modalClose');

  function openModal(serviceKey) {
    const data = serviceData[serviceKey];
    if (!data) return;

    // Populate content
    modalTitle.textContent = data.title;
    modalBody.textContent  = data.body;

    // Set icon (lucide)
    modalIcon.innerHTML = `<i data-lucide="${data.icon}"></i>`;
    if (typeof lucide !== 'undefined') {
      lucide.createIcons({ nodes: [modalIcon] });
    }

    // Open overlay
    serviceModal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    requestAnimationFrame(() => modalClose.focus());
  }

  function closeModal() {
    serviceModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Open on card click or Enter/Space key
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.service));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card.dataset.service);
      }
    });
  });

  modalClose.addEventListener('click', closeModal);

  // Close on overlay click (outside modal box)
  serviceModal.addEventListener('click', (e) => {
    if (e.target === serviceModal) closeModal();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && serviceModal.classList.contains('open')) {
      closeModal();
    }
  });

  // ──────────────────────────────────────────────────────────
  // 5. REVIEWS CAROUSEL — 1 reseña a la vez, altura dinámica
  // ──────────────────────────────────────────────────────────
  const reviewsCarousel = document.getElementById('reviewsCarousel');
  const reviewsWindow   = document.getElementById('reviewsWindow');
  const reviewsTrack    = document.getElementById('reviewsTrack');
  const reviewsPrev     = document.getElementById('reviewsPrev');
  const reviewsNext     = document.getElementById('reviewsNext');
  const reviewsDots     = document.getElementById('reviewsDots');
  const reviewsCounter  = document.getElementById('reviewsCounter');
  const reviewCards     = Array.from(reviewsTrack.querySelectorAll('.review-card'));
  const totalReviews    = reviewCards.length;

  let reviewIndex   = 0;
  let reviewAutoplay = null;
  let resizeTimer   = null;

  // Build dots
  reviewCards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'reviews-carousel__dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Reseña ${i + 1}`);
    dot.addEventListener('click', () => {
      goToReview(i);
      resetAutoplay();
    });
    reviewsDots.appendChild(dot);
  });

  const dots = reviewsDots.querySelectorAll('.reviews-carousel__dot');

  function updateWindowHeight() {
    const activeCard = reviewCards[reviewIndex];
    if (!activeCard) return;
    // Use scrollHeight to get true height regardless of overflow
    reviewsWindow.style.height = activeCard.scrollHeight + 'px';
  }

  function updateDots() {
    dots.forEach((dot, i) => dot.classList.toggle('active', i === reviewIndex));
  }

  function updateCounter() {
    reviewsCounter.textContent = `${reviewIndex + 1} / ${totalReviews}`;
  }

  function updateButtons() {
    reviewsPrev.style.opacity = '1';
    reviewsPrev.style.pointerEvents = 'auto';
    reviewsNext.style.opacity = '1';
    reviewsNext.style.pointerEvents = 'auto';
  }

  function goToReview(index) {
    // Wrap around
    reviewIndex = ((index % totalReviews) + totalReviews) % totalReviews;
    reviewsTrack.style.transform = `translateX(-${reviewIndex * 100}%)`;
    updateDots();
    updateCounter();
    updateButtons();
    // Update height after transition settles
    setTimeout(updateWindowHeight, 450);
  }

  function nextReview() { goToReview(reviewIndex + 1); }
  function prevReview() { goToReview(reviewIndex - 1); }

  reviewsNext.addEventListener('click', () => { nextReview(); resetAutoplay(); });
  reviewsPrev.addEventListener('click', () => { prevReview(); resetAutoplay(); });

  // Autoplay
  function startAutoplay() {
    stopAutoplay();
    reviewAutoplay = setInterval(nextReview, 5000);
  }

  function stopAutoplay() {
    clearInterval(reviewAutoplay);
  }

  function resetAutoplay() {
    startAutoplay();
  }

  // Pause on hover
  reviewsCarousel.addEventListener('mouseenter', stopAutoplay);
  reviewsCarousel.addEventListener('mouseleave', startAutoplay);

  // Touch swipe
  let touchStartX = 0;

  reviewsTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  reviewsTrack.addEventListener('touchend', (e) => {
    const delta = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 45) {
      delta > 0 ? nextReview() : prevReview();
      resetAutoplay();
    }
  }, { passive: true });

  // Resize handler
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Re-apply transform without animation
      reviewsTrack.style.transition = 'none';
      reviewsTrack.style.transform = `translateX(-${reviewIndex * 100}%)`;
      requestAnimationFrame(() => {
        reviewsTrack.style.transition = '';
        updateWindowHeight();
      });
    }, 150);
  });

  // Init carousel
  function initCarousel() {
    reviewsTrack.style.transform = 'translateX(0)';
    updateDots();
    updateCounter();
    updateButtons();
    // Set initial height after a paint
    requestAnimationFrame(() => {
      setTimeout(updateWindowHeight, 100);
    });
    startAutoplay();
  }

  initCarousel();

  // ──────────────────────────────────────────────────────────
  // 6. COLABORACIONES — Ken Burns crossfade carousel
  // ──────────────────────────────────────────────────────────
  const colabsSlider = document.getElementById('colabsSlider');
  const colabsDotsEl = document.getElementById('colabsDots');
  const colabsPrevBtn = document.getElementById('colabsPrev');
  const colabsNextBtn = document.getElementById('colabsNext');

  if (colabsSlider) {
    const colabSlides = Array.from(colabsSlider.querySelectorAll('.colabs__slide'));
    const totalColabs = colabSlides.length;
    let colabIndex   = 0;
    let colabTimer   = null;

    // Build dots
    colabSlides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'colabs__dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Imagen ${i + 1}`);
      dot.addEventListener('click', () => { goToColab(i); resetColabTimer(); });
      colabsDotsEl.appendChild(dot);
    });
    const colabDots = colabsDotsEl.querySelectorAll('.colabs__dot');

    function goToColab(index) {
      // Remove active & reset Ken Burns by replacing img with clone
      const prevSlide = colabSlides[colabIndex];
      const prevImg   = prevSlide.querySelector('.colabs__img');
      prevSlide.classList.remove('colabs__slide--active');
      const clone = prevImg.cloneNode(true);
      prevSlide.replaceChild(clone, prevImg);

      colabIndex = ((index % totalColabs) + totalColabs) % totalColabs;
      colabSlides[colabIndex].classList.add('colabs__slide--active');
      colabDots.forEach((d, i) => d.classList.toggle('active', i === colabIndex));
    }

    function resetColabTimer() {
      clearInterval(colabTimer);
      colabTimer = setInterval(() => goToColab(colabIndex + 1), 4500);
    }

    colabsPrevBtn.addEventListener('click', () => { goToColab(colabIndex - 1); resetColabTimer(); });
    colabsNextBtn.addEventListener('click', () => { goToColab(colabIndex + 1); resetColabTimer(); });

    // Touch swipe
    let colabTouchX = 0;
    colabsSlider.addEventListener('touchstart', e => { colabTouchX = e.touches[0].clientX; }, { passive: true });
    colabsSlider.addEventListener('touchend', e => {
      const delta = colabTouchX - e.changedTouches[0].clientX;
      if (Math.abs(delta) > 45) { goToColab(colabIndex + (delta > 0 ? 1 : -1)); resetColabTimer(); }
    }, { passive: true });

    resetColabTimer();

    if (typeof lucide !== 'undefined') lucide.createIcons({ nodes: [colabsPrevBtn, colabsNextBtn] });
  }

  // ──────────────────────────────────────────────────────────
  // 7. FADE-IN — Intersection Observer
  // ──────────────────────────────────────────────────────────
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  fadeEls.forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.05}s`;
    observer.observe(el);
  });

});
