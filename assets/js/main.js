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

(function () {
  "use strict";

  /**
   * Thêm class 'scrolled' khi scroll xuống - tạo hiệu ứng sticky header
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Bật/tắt menu mobile - đổi icon hamburger thành X
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list"); // Icon hamburger
    mobileNavToggleBtn.classList.toggle("bi-x"); // Icon X
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToogle);
  }

  /**
   * Tự động đóng menu mobile khi click vào link
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Enhanced Booking Form Functionality
   * Cải tiến chức năng đặt bàn với validation và UX tốt hơn
   */
  function initBookingForm() {
    const bookingForm = document.getElementById("bookingForm");
    const dateInput = document.getElementById("reservationDate");
    const timeInput = document.getElementById("reservationTime");

    if (!bookingForm) return;

    // Set minimum date to today
    if (dateInput) {
      const today = new Date();
      const minDate = today.toISOString().split("T")[0];
      dateInput.setAttribute("min", minDate);

      // Set default date to tomorrow
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const defaultDate = tomorrow.toISOString().split("T")[0];
      dateInput.value = defaultDate;
    }

    // Set default time to 7:00 PM
    if (timeInput) {
      timeInput.value = "19:00";
    }

    // Add input validation and formatting
    const phoneInput = bookingForm.querySelector('input[name="phone"]');
    if (phoneInput) {
      phoneInput.addEventListener("input", function (e) {
        // Format phone number as user types
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 0) {
          if (value.length <= 4) {
            value = value.replace(/(\d{4})/, "$1");
          } else if (value.length <= 7) {
            value = value.replace(/(\d{4})(\d{3})/, "$1 $2");
          } else {
            value = value.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
          }
        }
        e.target.value = value;
      });
    }

    // Add enhanced validation
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const selectedDate = new Date(formData.get("date"));
      const selectedTime = formData.get("time");
      const currentDate = new Date();

      // Clear previous error messages
      clearFormMessages();

      // Validate date is not in the past
      if (selectedDate < currentDate.setHours(0, 0, 0, 0)) {
        showFormError("Vui lòng chọn ngày trong tương lai.");
        return;
      }

      // Validate time is within operating hours
      const [hours, minutes] = selectedTime.split(":").map(Number);
      if (hours < 6 || (hours >= 22 && minutes > 0)) {
        showFormError("Vui lòng chọn giờ trong khoảng 6:00 AM - 10:00 PM.");
        return;
      }

      // Validate if selected time is not in the past for today
      const today = new Date();
      const isToday = selectedDate.toDateString() === today.toDateString();
      if (isToday) {
        const currentTime = today.getHours() * 60 + today.getMinutes();
        const selectedTimeMinutes = hours * 60 + minutes;
        if (selectedTimeMinutes <= currentTime + 60) {
          // At least 1 hour from now
          showFormError("Vui lòng đặt bàn trước ít nhất 1 giờ.");
          return;
        }
      }

      // Show loading state
      showFormLoading(true);

      // Simulate form submission (replace with actual AJAX call)
      setTimeout(() => {
        showFormLoading(false);
        showFormSuccess();
        this.reset();
        // Reset default values
        if (dateInput) dateInput.value = defaultDate;
        if (timeInput) timeInput.value = "19:00";
      }, 2000);
    });

    // Add visual feedback for form interactions
    const formControls = bookingForm.querySelectorAll(
      ".form-control, .custom-select"
    );
    formControls.forEach((control) => {
      control.addEventListener("focus", function () {
        this.closest(".form-group").classList.add("focused");
      });

      control.addEventListener("blur", function () {
        if (!this.value) {
          this.closest(".form-group").classList.remove("focused");
        }
      });

      // Check if already has value on page load
      if (control.value) {
        control.closest(".form-group").classList.add("focused");
      }
    });
  }

  function clearFormMessages() {
    const form = document.getElementById("bookingForm");
    if (!form) return;

    form.querySelector(".error-message").style.display = "none";
    form.querySelector(".sent-message").style.display = "none";
    form.querySelector(".loading").style.display = "none";
  }

  function showFormError(message) {
    const form = document.getElementById("bookingForm");
    if (!form) return;

    const errorElement = form.querySelector(".error-message");
    errorElement.textContent = message;
    errorElement.style.display = "block";

    // Scroll to error message
    errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function showFormSuccess() {
    const form = document.getElementById("bookingForm");
    if (!form) return;

    const successElement = form.querySelector(".sent-message");
    successElement.style.display = "block";

    // Scroll to success message
    successElement.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function showFormLoading(show) {
    const form = document.getElementById("bookingForm");
    if (!form) return;

    const loadingElement = form.querySelector(".loading");
    const submitButton = form.querySelector(".btn-reserve");

    if (show) {
      loadingElement.style.display = "block";
      submitButton.disabled = true;
      submitButton.style.opacity = "0.7";
    } else {
      loadingElement.style.display = "none";
      submitButton.disabled = false;
      submitButton.style.opacity = "1";
    }
  }

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Khởi tạo hiệu ứng animation khi scroll - AOS library
   */
  function aosInit() {
    AOS.init({
      duration: 600, // Thời gian animation (ms)
      easing: "ease-in-out", // Kiểu chuyển động
      once: true, // Chỉ chạy 1 lần
      mirror: false, // Không lặp lại khi scroll ngược
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Khởi tạo hệ thống lọc menu - Isotope filtering
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry"; // Layout dạng gạch
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*"; // Hiện tất cả
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order"; // Thứ tự gốc

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        }
      );
    });

    // Xử lý click vào nút filter (Bún Bò Chính, Món Kèm, etc.)
    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener(
          "click",
          function () {
            isotopeItem
              .querySelector(".isotope-filters .filter-active")
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            initIsotope.arrange({
              filter: this.getAttribute("data-filter"), // Lọc theo category
            });
            if (typeof aosInit === "function") {
              aosInit(); // Refresh animation sau khi filter
            }
          },
          false
        );
      });
  });

  /**
   * Khởi tạo slider - dùng cho testimonials và gallery
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config); // Tạo slider với config từ HTML
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Khởi tạo popup gallery - hiển thị ảnh lớn khi click
   */
  const glightbox = GLightbox({
    selector: ".glightbox", // Áp dụng cho elements có class 'glightbox'
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Highlight menu item khi scroll đến section tương ứng
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      // Kiểm tra xem có đang ở trong section này không
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active"); // Highlight menu item hiện tại
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
})();

/**
 * =======================================================================
 * SHOPPING CART FUNCTIONALITY
 * =======================================================================
 */

// Cart data
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// DOM elements
const cartIcon = document.getElementById("cart-icon");
const cartCount = document.getElementById("cart-count");
const cartModal = document.getElementById("cart-modal");
const checkoutModal = document.getElementById("checkout-modal");
const cartItems = document.getElementById("cart-items");
const cartEmpty = document.getElementById("cart-empty");
const cartTotal = document.getElementById("cart-total");
const checkoutItems = document.getElementById("checkout-items");
const checkoutTotal = document.getElementById("checkout-total");

// Initialize cart
document.addEventListener("DOMContentLoaded", function () {
  updateCartUI();
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  // Add to cart buttons
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const name = this.dataset.name;
      const price = parseInt(this.dataset.price);
      const image = this.dataset.image;

      addToCart({ name, price, image });

      // Visual feedback
      this.innerHTML = '<i class="bi bi-check-circle"></i> Đã thêm!';
      this.style.background = "#28a745";

      // Show success toast
      showToast(
        "Thành công!",
        `Đã thêm "${name}" vào giỏ hàng`,
        "success",
        3000
      );

      setTimeout(() => {
        this.innerHTML = '<i class="bi bi-cart-plus"></i> Thêm vào giỏ';
        this.style.background = "";
      }, 1500);
    });
  });

  // Cart icon click
  cartIcon.addEventListener("click", openCartModal);

  // Modal close buttons
  document
    .querySelector(".cart-close")
    .addEventListener("click", closeCartModal);
  document
    .querySelector(".checkout-close")
    .addEventListener("click", closeCheckoutModal);

  // Modal backdrop click
  cartModal.addEventListener("click", function (e) {
    if (e.target === cartModal) closeCartModal();
  });

  checkoutModal.addEventListener("click", function (e) {
    if (e.target === checkoutModal) closeCheckoutModal();
  });

  // Cart actions
  document.getElementById("clear-cart").addEventListener("click", clearCart);
  document
    .getElementById("checkout-btn")
    .addEventListener("click", openCheckoutModal);
  document.getElementById("back-to-cart").addEventListener("click", backToCart);
  document.getElementById("place-order").addEventListener("click", placeOrder);
}

// Add item to cart
function addToCart(item) {
  const existingItem = cart.find((cartItem) => cartItem.name === item.name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  saveCart();
  updateCartUI();
}

// Remove item from cart
function removeFromCart(itemName) {
  cart = cart.filter((item) => item.name !== itemName);
  saveCart();
  updateCartUI();
}

// Update item quantity
function updateQuantity(itemName, change) {
  const item = cart.find((cartItem) => cartItem.name === itemName);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(itemName);
    } else {
      saveCart();
      updateCartUI();
    }
  }
}

// Clear entire cart
function clearCart() {
  showConfirm(
    "Xóa giỏ hàng",
    "Bạn có chắc muốn xóa tất cả sản phẩm trong giỏ hàng?",
    () => {
      cart = [];
      saveCart();
      updateCartUI();
      showToast("Đã xóa!", "Giỏ hàng đã được làm trống", "info", 3000);
    }
  );
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Update cart UI
function updateCartUI() {
  updateCartCount();
  updateCartItems();
  updateCartTotal();
}

// Update cart count
function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
  cartCount.style.display = totalItems > 0 ? "flex" : "none";
}

// Update cart items display
function updateCartItems() {
  if (cart.length === 0) {
    cartItems.style.display = "none";
    cartEmpty.style.display = "block";
    return;
  }

  cartItems.style.display = "block";
  cartEmpty.style.display = "none";

  cartItems.innerHTML = cart
    .map(
      (item) => `
    <div class="cart-item">
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${formatPrice(item.price)}</div>
      </div>
      <div class="cart-item-controls">
        <button class="quantity-btn" onclick="updateQuantity('${
          item.name
        }', -1)">-</button>
        <span class="quantity-display">${item.quantity}</span>
        <button class="quantity-btn" onclick="updateQuantity('${
          item.name
        }', 1)">+</button>
        <i class="bi bi-trash remove-item" onclick="removeFromCart('${
          item.name
        }')" title="Xóa món này"></i>
      </div>
    </div>
  `
    )
    .join("");
}

// Update cart total
function updateCartTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = formatPrice(total);
  checkoutTotal.textContent = formatPrice(total);
}

// Format price
function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN").format(price) + "đ";
}

// Modal functions
function openCartModal() {
  cartModal.style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeCartModal() {
  cartModal.style.display = "none";
  document.body.style.overflow = "";
}

function openCheckoutModal() {
  if (cart.length === 0) {
    showToast(
      "Giỏ hàng trống!",
      "Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán",
      "warning",
      4000
    );
    return;
  }

  closeCartModal();
  updateCheckoutItems();
  checkoutModal.style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeCheckoutModal() {
  checkoutModal.style.display = "none";
  document.body.style.overflow = "";
}

function backToCart() {
  closeCheckoutModal();
  openCartModal();
}

// Update checkout items display
function updateCheckoutItems() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById(
    "checkout-item-count"
  ).textContent = `${totalItems} món`;
  document.getElementById("checkout-subtotal").textContent = formatPrice(
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  checkoutItems.innerHTML = cart
    .map(
      (item) => `
    <div class="checkout-item">
      <div class="checkout-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="checkout-item-details">
        <div class="checkout-item-name">${item.name}</div>
        <div class="checkout-item-controls">
          <button class="checkout-quantity-btn" onclick="updateQuantityInCheckout('${
            item.name
          }', -1)">-</button>
          <span class="checkout-quantity-display">${item.quantity}</span>
          <button class="checkout-quantity-btn" onclick="updateQuantityInCheckout('${
            item.name
          }', 1)">+</button>
          <i class="bi bi-trash checkout-remove-item" onclick="removeFromCartInCheckout('${
            item.name
          }')" title="Xóa món này"></i>
        </div>
      </div>
      <div class="checkout-item-price">${formatPrice(
        item.price * item.quantity
      )}</div>
    </div>
  `
    )
    .join("");
}

// Place order
function placeOrder() {
  const form = document.getElementById("checkout-form");
  const formData = new FormData(form);

  if (!form.checkValidity()) {
    form.reportValidity();
    showToast(
      "Thông tin chưa đầy đủ!",
      "Vui lòng điền đầy đủ thông tin bắt buộc",
      "error",
      4000
    );
    return;
  }

  // Simulate order processing
  const orderData = {
    items: cart,
    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    customer: Object.fromEntries(formData),
    orderTime: new Date().toISOString(),
  };

  // In a real application, you would send this to your server
  console.log("Order placed:", orderData);

  // Show success modal
  showSuccessModal(orderData);

  // Clear cart and close checkout modal
  cart = [];
  saveCart();
  updateCartUI();
  closeCheckoutModal();
}

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    if (checkoutModal.style.display === "block") {
      closeCheckoutModal();
    } else if (cartModal.style.display === "block") {
      closeCartModal();
    }
  }
});

// Functions for checkout modal
function updateQuantityInCheckout(itemName, change) {
  updateQuantity(itemName, change);
  updateCheckoutItems();
}

function removeFromCartInCheckout(itemName) {
  showConfirm(
    "Xóa món ăn",
    "Bạn có chắc muốn xóa món này khỏi đơn hàng?",
    () => {
      removeFromCart(itemName);
      updateCheckoutItems();
      showToast("Đã xóa!", `Đã xóa "${itemName}" khỏi đơn hàng`, "info", 3000);

      // If cart is empty, close checkout and show message
      if (cart.length === 0) {
        closeCheckoutModal();
        showToast(
          "Giỏ hàng trống!",
          "Giỏ hàng của bạn đã trống, vui lòng thêm sản phẩm",
          "warning",
          4000
        );
      }
    }
  );
}

/**
 * =======================================================================
 * CUSTOM NOTIFICATION SYSTEM
 * =======================================================================
 */

// Toast notification system
function showToast(title, message, type = "info", duration = 4000) {
  const toastContainer = document.getElementById("toast-container");
  const toast = document.createElement("div");

  const icons = {
    success: "bi-check-circle-fill",
    error: "bi-x-circle-fill",
    warning: "bi-exclamation-triangle-fill",
    info: "bi-info-circle-fill",
  };

  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="toast-icon ${icons[type]}"></i>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close">&times;</button>
  `;

  toastContainer.appendChild(toast);

  // Close button functionality
  const closeBtn = toast.querySelector(".toast-close");
  closeBtn.addEventListener("click", () => removeToast(toast));

  // Auto remove after duration
  setTimeout(() => removeToast(toast), duration);
}

function removeToast(toast) {
  toast.classList.add("removing");
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 300);
}

// Custom confirm dialog
function showConfirm(title, message, onConfirm, onCancel = null) {
  const confirmModal = document.getElementById("confirm-modal");
  const confirmTitle = document.getElementById("confirm-title");
  const confirmText = document.getElementById("confirm-text");
  const confirmOk = document.getElementById("confirm-ok");
  const confirmCancel = document.getElementById("confirm-cancel");

  confirmTitle.textContent = title;
  confirmText.textContent = message;
  confirmModal.style.display = "block";
  document.body.style.overflow = "hidden";

  // Remove existing event listeners
  const newConfirmOk = confirmOk.cloneNode(true);
  const newConfirmCancel = confirmCancel.cloneNode(true);
  confirmOk.parentNode.replaceChild(newConfirmOk, confirmOk);
  confirmCancel.parentNode.replaceChild(newConfirmCancel, confirmCancel);

  // Add new event listeners
  newConfirmOk.addEventListener("click", () => {
    confirmModal.style.display = "none";
    document.body.style.overflow = "";
    if (onConfirm) onConfirm();
  });

  newConfirmCancel.addEventListener("click", () => {
    confirmModal.style.display = "none";
    document.body.style.overflow = "";
    if (onCancel) onCancel();
  });

  // Close on backdrop click
  confirmModal.addEventListener("click", (e) => {
    if (e.target === confirmModal) {
      confirmModal.style.display = "none";
      document.body.style.overflow = "";
      if (onCancel) onCancel();
    }
  });
}

// Success order modal
function showSuccessModal(orderData) {
  const successModal = document.getElementById("success-modal");
  const successMessage = document.getElementById("success-message");
  const successClose = document.getElementById("success-close");

  successMessage.innerHTML = `
    Cảm ơn bạn đã đặt hàng! <br>
    <strong>Tổng tiền: ${formatPrice(orderData.total)}</strong><br>
    Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận đơn hàng.
  `;

  successModal.style.display = "block";
  document.body.style.overflow = "hidden";

  successClose.addEventListener("click", () => {
    successModal.style.display = "none";
    document.body.style.overflow = "";
  });

  // Close on backdrop click
  successModal.addEventListener("click", (e) => {
    if (e.target === successModal) {
      successModal.style.display = "none";
      document.body.style.overflow = "";
    }
  });
}

// Initialize notification system
document.addEventListener("DOMContentLoaded", function () {
  // Close modals on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      const confirmModal = document.getElementById("confirm-modal");
      const successModal = document.getElementById("success-modal");

      if (confirmModal.style.display === "block") {
        confirmModal.style.display = "none";
        document.body.style.overflow = "";
      }

      if (successModal.style.display === "block") {
        successModal.style.display = "none";
        document.body.style.overflow = "";
      }
    }
  });
});

// Expose functions globally for onclick handlers
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.updateQuantityInCheckout = updateQuantityInCheckout;
window.removeFromCartInCheckout = removeFromCartInCheckout;
window.showToast = showToast;
window.showConfirm = showConfirm;

/**
 * Initialize Enhanced Booking Form on DOM Load
 */
document.addEventListener("DOMContentLoaded", function () {
  initBookingForm();
});
