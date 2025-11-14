# 📖 CHI TIẾT CÁC THƯ VIỆN VENDOR

## 🎭 1. AOS - ANIMATE ON SCROLL

### 📁 **Files:**

- `aos.js` (21KB) - Core animation library
- `aos.css` (11KB) - Animation styles và keyframes
- `aos.esm.js` (ES Module version)
- `aos.cjs.js` (CommonJS version)

### 🔧 **Chức năng:**

```javascript
// Khởi tạo trong main.js
AOS.init({
  duration: 600, // Thời gian animation (ms)
  easing: "ease-in-out", // Timing function
  once: true, // Chỉ animate 1 lần
  mirror: false, // Không reverse khi scroll up
});
```

### 🎨 **Animation Types được sử dụng:**

- `fade-up` - Fade in từ dưới lên
- `fade-left` - Fade in từ phải sang trái
- `zoom-in` - Scale từ nhỏ đến bình thường
- `slide-up` - Slide từ dưới lên

### 💡 **Usage trong HTML:**

```html
<div data-aos="fade-up" data-aos-delay="200">
  <!-- Content sẽ fade-up sau 200ms -->
</div>
```

---

## 🎨 2. BOOTSTRAP 5.3.7

### 📁 **Files:**

- `bootstrap.css` (200KB) - Full framework
- `bootstrap.min.css` (160KB) - Minified version
- `bootstrap.js` (80KB) - JavaScript components
- `bootstrap.bundle.js` (85KB) - JS + Popper.js included

### 🧩 **Components được sử dụng:**

1. **Grid System**

   ```css
   .container,
   .row,
   .col-*; /* Responsive grid layout */
   ```

2. **Navigation**

   ```css
   .navbar,
   .nav,
   .dropdown; /* Header navigation system */
   ```

3. **Cards**

   ```css
   .card,
   .card-body,
   .card-img-top; /* Menu item cards */
   ```

4. **Utilities**
   ```css
   .mb-5,
   .text-center,
   .d-flex; /* Spacing, alignment, display utilities */
   ```

### 🎯 **Customizations trong main.css:**

```css
/* Override Bootstrap variables */
:root {
  --bs-primary: #e07844;
  --bs-font-sans-serif: "Roboto", sans-serif;
}
```

---

## 🖼️ 3. BOOTSTRAP ICONS

### 📁 **Files:**

- `bootstrap-icons.css` (80KB) - Icon font CSS
- `bootstrap-icons.woff2` (100KB) - Font file
- `bootstrap-icons.json` - Icon metadata

### 🎯 **Icons được sử dụng trong website:**

```html
<!-- Navigation -->
<i class="bi bi-list"></i>
<!-- Hamburger menu -->
<i class="bi bi-x"></i>
<!-- Close button -->

<!-- Contact -->
<i class="bi bi-telephone"></i>
<!-- Phone -->
<i class="bi bi-envelope"></i>
<!-- Email -->
<i class="bi bi-geo-alt"></i>
<!-- Location -->

<!-- Social Media -->
<i class="bi bi-facebook"></i>
<!-- Facebook -->
<i class="bi bi-instagram"></i>
<!-- Instagram -->

<!-- UI Elements -->
<i class="bi bi-arrow-up"></i>
<!-- Scroll to top -->
<i class="bi bi-star-fill"></i>
<!-- Rating stars -->
```

### 💡 **Usage Pattern:**

```css
.bi {
  font-family: "bootstrap-icons";
  font-size: 1.5rem;
  color: var(--accent-color);
}
```

---

## 📸 4. GLIGHTBOX

### 📁 **Files:**

- `glightbox.js` (45KB) - Core lightbox functionality
- `glightbox.css` (12KB) - Lightbox styling
- `glightbox.min.js` (38KB) - Minified version

### 🔧 **Configuration:**

```javascript
// Khởi tạo trong main.js
const glightbox = GLightbox({
  selector: ".glightbox",
  touchNavigation: true,
  loop: true,
  autoplayVideos: false,
});
```

### 🖼️ **Features:**

- **Image Gallery**: Popup với navigation
- **Video Support**: YouTube, Vimeo embedding
- **Touch Gestures**: Swipe trên mobile
- **Responsive**: Auto-resize theo screen
- **Zoom**: Scroll to zoom images

### 💡 **Usage trong HTML:**

```html
<!-- Gallery images -->
<a
  href="assets/img/gallery/large-image.jpg"
  class="glightbox"
  data-gallery="restaurant-gallery"
>
  <img src="assets/img/gallery/thumb.jpg" alt="Gallery" />
</a>
```

---

## 🧱 5. ISOTOPE LAYOUT

### 📁 **Files:**

- `isotope.pkgd.js` (85KB) - Complete package
- `isotope.pkgd.min.js` (70KB) - Minified version

### 🎯 **Chức năng chính:**

1. **Filtering**: Lọc items theo category
2. **Sorting**: Sắp xếp theo criteria
3. **Layout**: Masonry, fitRows, vertical
4. **Animation**: Smooth transitions

### 🍽️ **Configuration cho Menu:**

```javascript
// Menu filtering system
let initIsotope = new Isotope(".isotope-container", {
  itemSelector: ".isotope-item",
  layoutMode: "masonry",
  filter: "*", // Show all initially
  sortBy: "original-order",
});

// Filter event handlers
filters.addEventListener("click", function () {
  initIsotope.arrange({
    filter: this.getAttribute("data-filter"),
  });
});
```

### 🏷️ **Filter Categories:**

```css
.filter-main     /* Bún Bò Chính */
/* Bún Bò Chính */
.filter-topping  /* Món Kèm */
.filter-drinks   /* Đồ Uống */
.filter-combo; /* Combo Ưu Đãi */
```

---

## 🖼️ 6. IMAGESLOADED

### 📁 **Files:**

- `imagesloaded.pkgd.min.js` (8KB) - Lightweight library

### 🔧 **Purpose:**

Đảm bảo Isotope layout được tính toán đúng sau khi tất cả images đã load xong.

### 💡 **Integration:**

```javascript
// Wait for images to load before initializing Isotope
imagesLoaded(container, function () {
  initIsotope = new Isotope(container, {
    // Isotope configuration
  });
});
```

### ⚡ **Benefits:**

- Prevents layout jumping
- Ensures correct masonry positioning
- Better user experience
- Prevents CLS (Cumulative Layout Shift)

---

## 📧 7. PHP EMAIL FORM

### 📁 **Files:**

- `validate.js` (5KB) - Client-side validation

### 🔧 **Validation Rules:**

```javascript
// Form validation patterns
const validation = {
  name: /^[a-zA-ZÀ-ỹ\s]{2,50}$/, // Vietnamese names
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Email format
  phone: /^[0-9]{10,11}$/, // VN phone numbers
  message: /.{10,}/, // Minimum 10 characters
};
```

### 📝 **Forms được validate:**

1. **Contact Form** - Liên hệ
2. **Reservation Form** - Đặt bàn
3. **Newsletter Form** - Đăng ký tin tức

### 🎯 **Vietnamese Customization:**

```javascript
// Vietnamese error messages
const errorMessages = {
  name: "Vui lòng nhập họ tên hợp lệ",
  email: "Email không đúng định dạng",
  phone: "Số điện thoại không hợp lệ",
  message: "Tin nhắn quá ngắn",
};
```

---

## 🎢 8. SWIPER

### 📁 **Files:**

- `swiper-bundle.js` (150KB) - Full featured version
- `swiper-bundle.css` (25KB) - Swiper styling
- `swiper-bundle.min.js` (120KB) - Minified

### 🔧 **Configuration cho Testimonials:**

```javascript
// Testimonials slider
const testimonialSwiper = new Swiper(".testimonials-slider", {
  loop: true,
  speed: 600,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  slidesPerView: "auto",
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },
  breakpoints: {
    320: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1200: { slidesPerView: 3 },
  },
});
```

### 🎯 **Features được sử dụng:**

- **Autoplay**: Tự động chuyển slide
- **Loop**: Lặp vô hạn
- **Pagination**: Dots navigation
- **Responsive**: Breakpoints cho mobile/tablet/desktop
- **Touch**: Swipe gestures

### 💡 **Usage Areas:**

1. **Testimonials**: Customer reviews
2. **Chef Showcase**: Staff profiles
3. **Food Gallery**: Image carousel

---

## 🚀 PERFORMANCE CONSIDERATIONS

### ⚡ **Loading Strategy:**

```html
<!-- Critical CSS inline -->
<style>
  /* Critical path CSS */
</style>

<!-- Non-critical CSS defer -->
<link
  rel="preload"
  href="vendor/aos/aos.css"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
/>

<!-- JavaScript async loading -->
<script src="vendor/bootstrap/js/bootstrap.min.js" defer></script>
```

### 📊 **Bundle Sizes:**

- **Total CSS**: ~400KB (minified: ~320KB)
- **Total JS**: ~450KB (minified: ~360KB)
- **Critical Path**: ~50KB CSS + ~80KB JS

### 🎯 **Optimization Techniques:**

1. **Minification**: All files minified
2. **Compression**: Gzip/Brotli compression
3. **Lazy Loading**: Non-critical resources
4. **Tree Shaking**: Remove unused code
5. **CDN**: Use CDN for vendor libraries

---

## 🛠️ DEVELOPMENT TOOLS

### 🔧 **Build Process:**

```bash
# Development
npm run dev    # Watch files for changes

# Production
npm run build  # Minify and optimize

# Testing
npm run test   # Cross-browser testing
```

### 📱 **Testing Devices:**

- **Mobile**: iPhone, Android phones
- **Tablet**: iPad, Android tablets
- **Desktop**: Chrome, Firefox, Safari, Edge
- **Screen Readers**: NVDA, JAWS

---

_📅 Last Updated: October 2025_
_🔧 Maintained by: Web Development Team_
