# 🗂️ TÓM TẮT NHANH - CẤU TRÚC CODE

## 📊 THỐNG KÊ TỔNG QUAN

- **Tổng số files CSS**: 46 files (~2.5MB)
- **Tổng số files JS**: 34 files (~1.8MB)
- **Template gốc**: Platia (BootstrapMade)
- **Customization**: Vietnamese Restaurant Theme

---

## 🎯 FILES CHÍNH CẦN NẮM

### 1. 🎨 **CSS - Styling & Design**

```
assets/css/main.css (4,025 dòng)
├── Variables & Theme Colors
├── Navigation & Header
├── Menu Grid System (Isotope)
├── Gallery & Lightbox
├── Responsive Breakpoints
└── Vietnamese Customizations
```

### 2. ⚡ **JavaScript - Functionality**

```
assets/js/main.js (250+ dòng)
├── Navigation Control
├── Mobile Menu Toggle
├── Scroll Effects & Spy
├── Menu Filtering (Isotope)
├── Animation (AOS)
├── Gallery (GLightbox)
└── Slider (Swiper)
```

---

## 🔧 THƯ VIỆN VENDOR (8 MAIN LIBRARIES)

| Library             | Size  | Purpose    | Usage                       |
| ------------------- | ----- | ---------- | --------------------------- |
| **Bootstrap**       | 200KB | Framework  | Grid, Components, Utilities |
| **AOS**             | 32KB  | Animations | Scroll-triggered effects    |
| **Isotope**         | 85KB  | Filtering  | Menu category filtering     |
| **GLightbox**       | 57KB  | Gallery    | Image popup/lightbox        |
| **Swiper**          | 175KB | Slider     | Testimonials carousel       |
| **Bootstrap Icons** | 180KB | Icons      | UI icons throughout         |
| **imagesLoaded**    | 8KB   | Utility    | Isotope layout timing       |
| **PHP Form**        | 5KB   | Validation | Contact form validation     |

---

## 🍽️ VIETNAMESE RESTAURANT FEATURES

### 🏷️ **Menu Categories:**

- `filter-main` → 🍲 Bún Bò Chính
- `filter-topping` → 🥢 Món Kèm
- `filter-drinks` → 🥤 Đồ Uống
- `filter-combo` → 💡 Combo Ưu Đãi

### 💰 **Pricing System:**

```css
.price-overlay {
  /* Vietnamese currency format: "65.000đ" */
  background: var(--accent-color);
  border-radius: 25px;
}
```

### 🎨 **Badge System:**

```css
.badge-chef       /* Món Chủ Lực - Gold */
/* Món Chủ Lực - Gold */
.badge-signature  /* Đặc Sản - Purple */
.badge-combo      /* Tiết Kiệm - Red + Animation */
.badge-vegetarian /* Chay - Green */
.badge-fresh; /* Tươi Ngon - Light Green */
```

---

## 📱 RESPONSIVE DESIGN

### 📐 **Breakpoints:**

```css
/* Mobile First */
320px+  → Mobile phones
768px+  → Tablets
992px+  → Small desktops
1200px+ → Large desktops
```

### 🎯 **Key Responsive Features:**

- Mobile hamburger menu
- Touch-friendly buttons (44px min)
- Responsive image grid
- Flexible typography scaling
- Optimized mobile navigation

---

## ⚡ PERFORMANCE OPTIMIZATION

### 🚀 **Loading Strategy:**

1. **Critical CSS** inline trong `<head>`
2. **Non-critical CSS** defer load
3. **JavaScript** async/defer loading
4. **Images** lazy loading
5. **Fonts** preload optimization

### 📊 **Bundle Analysis:**

- **Critical Path**: ~130KB (CSS + JS)
- **Total Assets**: ~4.3MB (uncompressed)
- **Gzipped**: ~1.2MB estimated
- **First Paint**: <2s target

---

## 🛠️ CUSTOMIZATION POINTS

### 🎨 **Colors (CSS Variables):**

```css
:root {
  --accent-color: #e07844; /* Orange chủ đạo */
  --heading-color: #291812; /* Nâu đậm tiêu đề */
  --background-color: #f8efeb; /* Nền ấm áp */
}
```

### 🖼️ **Images to Replace:**

- Logo: `assets/img/logo.webp`
- Food photos: `assets/img/restaurant/`
- Gallery: Custom restaurant photos
- Chef photos: `assets/img/person/`

### 📝 **Content Areas:**

- Menu items & prices
- Restaurant info & contact
- About section
- Testimonials
- Gallery captions

---

## 🔍 DEBUGGING CHECKLIST

### ❌ **Common Issues:**

1. **Isotope not working** → Check imagesLoaded
2. **Mobile menu stuck** → Bootstrap JS loaded?
3. **Animations broken** → AOS initialization?
4. **Gallery not opening** → GLightbox selector correct?

### ✅ **Quick Fixes:**

```javascript
// Re-initialize Isotope after content change
if (typeof initIsotope !== "undefined") {
  initIsotope.reloadItems();
  initIsotope.arrange();
}

// Refresh AOS animations
AOS.refresh();

// Reload GLightbox
glightbox.reload();
```

---

## 📞 MAINTENANCE TASKS

### 🔄 **Regular Updates:**

- [ ] Menu items & pricing
- [ ] Gallery images (seasonal)
- [ ] Contact information
- [ ] Staff testimonials
- [ ] Seasonal promotions

### 🧹 **Code Maintenance:**

- [ ] Update vendor libraries
- [ ] Optimize image sizes
- [ ] Check broken links
- [ ] Validate forms
- [ ] Performance audit

---

## 💡 DEVELOPMENT TIPS

### 🎯 **Best Practices:**

1. **Test mobile-first** - Majority users are mobile
2. **Optimize images** - Use WebP format when possible
3. **Validate HTML** - Semantic markup for SEO
4. **Check accessibility** - ARIA labels, keyboard navigation
5. **Performance budget** - Keep total page size < 2MB

### 🔧 **Tools Recommended:**

- **Chrome DevTools** - Debugging & performance
- **Lighthouse** - Performance audit
- **Wave** - Accessibility testing
- **GTmetrix** - Speed testing

---

_⭐ Quick Reference cho Website Nhà Hàng Bún Bò Huế "Hương Vị Cố Đô"_
_📅 Updated: October 2025_
