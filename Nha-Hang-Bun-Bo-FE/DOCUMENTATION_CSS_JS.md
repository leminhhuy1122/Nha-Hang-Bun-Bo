# 📚 TÀI LIỆU CHI TIẾT - CSS & JAVASCRIPT FILES

## 🎯 TỔNG QUAN DỰ ÁN

Website nhà hàng Bún Bò Huế "Hương Vị Cố Đô" được xây dựng dựa trên template Platia với các customization cho văn hóa Việt Nam.

---

## 📁 CẤU TRÚC THƯ MỤC

```
assets/
├── css/
│   └── main.css                    # File CSS chính
├── js/
│   └── main.js                     # File JavaScript chính
└── vendor/                         # Thư viện bên thứ 3
    ├── aos/                        # Animate On Scroll
    ├── bootstrap/                  # Bootstrap Framework
    ├── bootstrap-icons/            # Bootstrap Icons
    ├── glightbox/                  # Lightbox Gallery
    ├── imagesloaded/              # Image Loading Library
    ├── isotope-layout/            # Grid Filtering System
    ├── php-email-form/            # Form Validation
    └── swiper/                    # Touch Slider
```

---

## 🎨 1. FILE CSS CHÍNH

### 📄 `assets/css/main.css` (4,025 dòng)

#### **🔧 CHỨC NĂNG CHÍNH:**

- **Design System**: CSS Custom Properties cho colors, fonts, spacing
- **Responsive Layout**: Mobile-first design với breakpoints
- **Component Styling**: Header, Hero, Menu, Gallery, Footer
- **Vietnamese Customization**: Typography và color scheme phù hợp văn hóa VN

#### **📋 CÁC SECTION QUAN TRỌNG:**

1. **CSS Variables (Dòng 15-50)**

   ```css
   :root {
     --accent-color: #e07844; /* Màu chủ đạo nhà hàng */
     --heading-color: #291812; /* Màu tiêu đề */
     --background-color: #f8efeb; /* Màu nền ấm áp */
   }
   ```

2. **Navigation Styling (Dòng 200-400)**

   - Sticky header với scroll effects
   - Mobile hamburger menu
   - Dropdown navigation

3. **Menu Grid System (Dòng 1200-1600)**

   - Isotope filtering layout
   - Menu card design
   - Price overlay styling
   - Dietary badges (Đặc biệt, Chay, Combo, etc.)

4. **Gallery & Lightbox (Dòng 2800-3200)**

   - Image hover effects
   - Filter buttons styling
   - Responsive image grid

5. **Vietnamese Customizations (Dòng 1570-1590)**
   ```css
   .badge-combo {
     background-color: color-mix(in srgb, #ff6347, transparent 20%);
     animation: pulse 2s ease-in-out infinite alternate;
   }
   ```

---

## ⚡ 2. FILE JAVASCRIPT CHÍNH

### 📄 `assets/js/main.js` (206 dòng)

#### **🔧 CHỨC NĂNG CHÍNH:**

- **Navigation Control**: Mobile menu, scroll effects, active states
- **Animation Integration**: AOS library initialization
- **Menu Filtering**: Isotope grid system
- **Gallery Management**: GLightbox và Swiper integration

#### **📋 CÁC FUNCTION QUAN TRỌNG:**

1. **`toggleScrolled()` (Dòng 15-20)**

   ```javascript
   // Thêm class 'scrolled' khi user scroll > 100px
   // Tạo hiệu ứng sticky header và background change
   ```

2. **`mobileNavToogle()` (Dòng 25-35)**

   ```javascript
   // Toggle mobile menu open/close
   // Đổi icon hamburger ↔ X
   // Responsive navigation cho mobile devices
   ```

3. **`aosInit()` (Dòng 85-95)**

   ```javascript
   // Khởi tạo Animate On Scroll library
   // Tạo hiệu ứng fade-in khi scroll đến elements
   ```

4. **`Isotope Layout` (Dòng 95-125)**
   ```javascript
   // Menu filtering system
   // Filter theo: Bún Bò Chính, Món Kèm, Đồ Uống, Combo
   // Masonry layout responsive
   ```

---

## 📚 3. THỨ VIỆN VENDOR

### 🎭 **AOS - Animate On Scroll**

- **Files**: `aos.js`, `aos.css`
- **Chức năng**: Tạo animation khi scroll đến elements
- **Usage**: `data-aos="fade-up"` trong HTML

### 🎨 **Bootstrap 5.3.7**

- **Files**: `bootstrap.css`, `bootstrap.js`
- **Chức năng**: Framework CSS responsive, components, utilities
- **Customization**: Override variables trong main.css

### 🖼️ **Bootstrap Icons**

- **Files**: `bootstrap-icons.css`, font files
- **Chức năng**: Icon font với 1800+ icons
- **Usage**: `<i class="bi bi-telephone"></i>`

### 📸 **GLightbox**

- **Files**: `glightbox.js`, `glightbox.css`
- **Chức năng**: Popup gallery với zoom, slide effects
- **Features**: Video support, responsive, touch gestures

### 🧱 **Isotope Layout**

- **Files**: `isotope.pkgd.js`
- **Chức năng**: Grid filtering và sorting
- **Usage trong menu**: Filter theo categories món ăn

### 🖼️ **imagesLoaded**

- **Files**: `imagesloaded.pkgd.min.js`
- **Chức năng**: Detect khi images load xong
- **Purpose**: Đảm bảo Isotope layout correct sau khi images load

### 📧 **PHP Email Form**

- **Files**: `validate.js`
- **Chức năng**: Client-side form validation
- **Forms**: Contact form, reservation form

### 🎢 **Swiper**

- **Files**: `swiper-bundle.js`, `swiper-bundle.css`
- **Chức năng**: Touch slider/carousel
- **Usage**: Testimonials slider, image galleries

---

## 🛠️ 4. CUSTOMIZATION CHO NHÀ HÀNG VIỆT NAM

### 🍲 **Menu System Modifications**

```css
/* Vietnamese Food Categories */
.filter-main    /* Bún Bò Chính */
/* Bún Bò Chính */
.filter-topping /* Món Kèm */
.filter-drinks  /* Đồ Uống */
.filter-combo; /* Combo Ưu Đãi */
```

### 🏷️ **Vietnamese Badge System**

```css
.badge-chef      /* Món Chủ Lực */
/* Món Chủ Lực */
.badge-signature /* Đặc Sản */
.badge-traditional /* Truyền Thống */
.badge-vegetarian  /* Chay */
.badge-combo      /* Tiết Kiệm */
.badge-handmade   /* Thủ Công */
.badge-fresh; /* Tươi Ngon */
```

### 💰 **Pricing Display**

```css
.price-overlay {
  /* Format: "65.000đ" - Vietnamese currency */
  background-color: var(--accent-color);
  border-radius: 25px;
}
```

---

## 📱 5. RESPONSIVE BREAKPOINTS

```css
/* Mobile First Approach */
@media (max-width: 768px) /* Mobile */ @media (max-width: 992px) /* Tablet */ @media (min-width: 1200px) /* Desktop */ @media (min-width: 1400px); /* Large Desktop */
```

---

## ⚡ 6. PERFORMANCE OPTIMIZATIONS

### 🚀 **Loading Strategy**

1. **Critical CSS**: Inline critical path CSS
2. **Lazy Loading**: Images load khi visible
3. **Minification**: All vendor files minified
4. **Event Delegation**: Efficient event handling

### 🎯 **Best Practices Implemented**

- Mobile-first responsive design
- Semantic HTML structure
- Accessibility compliance (ARIA labels)
- SEO-friendly markup
- Vietnamese language support (UTF-8)

---

## 🔧 7. DEVELOPMENT WORKFLOW

### 📝 **File Modification Order**

1. **HTML Structure**: Layout và content
2. **CSS Styling**: Visual design và responsive
3. **JavaScript Functionality**: Interactive features
4. **Testing**: Cross-browser compatibility

### 🧪 **Testing Checklist**

- ✅ Mobile responsiveness
- ✅ Cross-browser compatibility
- ✅ Performance optimization
- ✅ Accessibility compliance
- ✅ Vietnamese character encoding

---

## 📞 SUPPORT & MAINTENANCE

### 🔄 **Regular Updates Needed**

- Menu items và pricing
- Gallery images
- Contact information
- Testimonials

### 🐛 **Common Issues & Solutions**

1. **Isotope Layout Issues**: Check imagesLoaded integration
2. **Mobile Menu Problems**: Verify Bootstrap JS loaded
3. **Animation Glitches**: AOS initialization timing
4. **Font Loading**: Vietnamese character support

---

_📅 Tài liệu được cập nhật: October 2025_
_🏪 Dự án: Website Nhà Hàng Bún Bò Huế "Hương Vị Cố Đô"_
