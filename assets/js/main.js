/**
* Template Name: Gp
* Template URL: https://bootstrapmade.com/gp-free-multipurpose-html-bootstrap-template/
* Updated: Aug 15 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Portfolio item details popup on index page
   */
  document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('portfolio-popup');
    if (!popup) return;

    const titleEl = document.getElementById('portfolio-popup-title');
    const descEl = document.getElementById('portfolio-popup-description');
    const closeBtn = popup.querySelector('.portfolio-popup-close');
    const backdrop = popup.querySelector('.portfolio-popup-backdrop');

    // Longer, rich descriptions for each portfolio item (keyed by title)
    const longDescriptions = {
      'AI Sales Agent': 'Our AI Sales Agent is a fully customizable, GPT-powered assistant that qualifies leads, answers product questions, and follows up automatically across email, chat, and WhatsApp. It integrates with your existing CRM and knowledge base so it can talk in your brand\'s voice, log every interaction, and hand off warm leads directly to your sales team.',
      'Brick & Click': 'Brick & Click is a real estate management platform that connects on-ground operations with a powerful digital back office. It centralizes listings, client interactions, payments, and task tracking so agencies can manage viewings, negotiations, and deals from one place—whether they are in the office or on site.',
      'Craft UML': 'Craft UML is a visual modeling tool designed for software engineers and architects who want quick, clean, and shareable diagrams without the overhead of complex enterprise suites. It supports core UML diagrams, versioning, and collaboration so your design docs always stay in sync with the system reality.',
      'Trackly': 'Trackly is a lightweight, opinionated project management tool for small, fast-moving teams. It focuses on clarity: who is doing what, by when, and why. Boards, timelines, and progress views are optimized for execution, not vanity metrics—helping teams ship features faster with less noise.'
    };

    function openPopup(item) {
      const info = item.querySelector('.portfolio-info');
      const title = info && info.querySelector('h4') ? info.querySelector('h4').textContent : '';
      const shortDesc = info && info.querySelector('p') ? info.querySelector('p').textContent : '';

      // Prefer a dedicated long description if available, otherwise fall back to the short one
      const desc = longDescriptions[title] || shortDesc;

      if (titleEl) titleEl.textContent = title;
      if (descEl) descEl.textContent = desc;

      popup.classList.add('show');
    }

    function closePopup() {
      popup.classList.remove('show');
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closePopup);
    }
    if (backdrop) {
      backdrop.addEventListener('click', closePopup);
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && popup.classList.contains('show')) {
        closePopup();
      }
    });

    document.querySelectorAll('.portfolio .portfolio-item .details-link').forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const item = this.closest('.portfolio-item');
        if (item) {
          openPopup(item);
        }
      });
    });

    // Also open popup when clicking anywhere on the portfolio card,
    // except when clicking the image preview (lightbox) link.
    document.querySelectorAll('.portfolio .portfolio-item').forEach(function(item) {
      item.addEventListener('click', function(e) {
        if (e.target.closest('.preview-link') || e.target.closest('.details-link')) {
          return;
        }
        openPopup(item);
      });
    });
  });

})();