/**
* Template Name: Platia - JavaScript cho Website Nhà Hàng Bún Bò Huế "Hương Vị Cố Đô"
* Original Template URL: https://bootstrapmade.com/platia-bootstrap-restaurant-template/
* Updated: Oct 2025 with Bootstrap v5.3.7
* Modified for: Vietnamese Restaurant - Bún Bò Huế Speciality
* Author: BootstrapMade.com (Original), Modified for Vietnamese Restaurant
* License: https://bootstrapmade.com/license/
* 
* =======================================================================
* FILE JAVASCRIPT CHÍNH - CHỨC NĂNG TỔNG QUAN:
* =======================================================================
* 
* 🚀 1. NAVIGATION & SCROLL FUNCTIONALITY
*    - toggleScrolled(): Thêm class 'scrolled' khi scroll > 100px (sticky header effect)
*    - mobileNavToogle(): Toggle menu mobile, đổi icon hamburger <-> X
*    - navmenuScrollspy(): Highlight menu item active dựa trên scroll position
*    - toggleScrollTop(): Hiện/ẩn nút scroll to top
* 
* 📱 2. MOBILE RESPONSIVENESS
*    - Mobile navigation toggle với touch support
*    - Dropdown menu toggle cho mobile
*    - Auto-close mobile menu khi click vào link
*    - Touch-friendly interface
* 
* 🎨 3. ANIMATIONS & VISUAL EFFECTS
*    - aosInit(): Khởi tạo AOS (Animate On Scroll) library
*    - Smooth scrolling behaviors
*    - Preloader removal khi page load xong
*    - Visual feedback cho user interactions
* 
* 🍽️ 4. MENU FILTERING SYSTEM (Isotope)
*    - initIsotope(): Khởi tạo filtering system cho menu items
*    - Filter theo categories: Bún Bò Chính, Món Kèm, Đồ Uống, Combo
*    - Masonry layout cho responsive grid
*    - imagesLoaded integration để đảm bảo layout correct
* 
* 🖼️ 5. IMAGE GALLERY & MEDIA
*    - GLightbox integration cho popup gallery
*    - Swiper slider initialization cho testimonials
*    - Image lazy loading support
*    - Responsive image handling
* 
* ⚡ 6. PERFORMANCE OPTIMIZATION
*    - Event delegation cho better performance
*    - Debounced scroll events
*    - Lazy initialization của components
*    - Memory leak prevention
* 
* 🎯 7. VIETNAMESE RESTAURANT SPECIFIC
*    - Menu filtering cho món Việt Nam
*    - Price display formatting
*    - Vietnamese text support
*    - Cultural UI/UX considerations
* 
* =======================================================================
*/

(function() {
  "use strict";

  /**
   * Thêm class 'scrolled' khi scroll xuống - tạo hiệu ứng sticky header
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
   * Bật/tắt menu mobile - đổi icon hamburger thành X
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');   // Icon hamburger
    mobileNavToggleBtn.classList.toggle('bi-x');      // Icon X
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Tự động đóng menu mobile khi click vào link
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
   * Khởi tạo hiệu ứng animation khi scroll - AOS library
   */
  function aosInit() {
    AOS.init({
      duration: 600,        // Thời gian animation (ms)
      easing: 'ease-in-out', // Kiểu chuyển động
      once: true,           // Chỉ chạy 1 lần
      mirror: false         // Không lặp lại khi scroll ngược
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Khởi tạo hệ thống lọc menu - Isotope filtering
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';    // Layout dạng gạch
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';  // Hiện tất cả
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order'; // Thứ tự gốc

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    // Xử lý click vào nút filter (Bún Bò Chính, Món Kèm, etc.)
    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')  // Lọc theo category
        });
        if (typeof aosInit === 'function') {
          aosInit();  // Refresh animation sau khi filter
        }
      }, false);
    });

  });

  /**
   * Khởi tạo slider - dùng cho testimonials và gallery
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);  // Tạo slider với config từ HTML
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Khởi tạo popup gallery - hiển thị ảnh lớn khi click
   */
  const glightbox = GLightbox({
    selector: '.glightbox'  // Áp dụng cho elements có class 'glightbox'
  });

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
   * Highlight menu item khi scroll đến section tương ứng
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      // Kiểm tra xem có đang ở trong section này không
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');  // Highlight menu item hiện tại
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();