# Reusable Code for Every Website

This repository contains a collection of reusable CSS and JavaScript snippets that can enhance the user experience on any website. These snippets include UI improvements, smooth scrolling, custom scrollbars, and a date picker.

## Table of Contents

- [Global Styles](#global-styles)
- [Caret Behavior](#caret-behavior)
- [Custom Scrollbar](#custom-scrollbar)
- [Smooth Scrolling](#smooth-scrolling)
- [Scroll Lock](#scroll-lock)
- [Date Picker](#date-picker)
- [Scroll Buttons for Carousels](#scroll-buttons-for-carousels)
- [Webflow BaguetteBox/Lightbox Integration](#webflow-baguetteboxlightbox-integration)
- [Swiper Integration](#swiper-integration)

---

## Global Styles

```css
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

## Caret Behavior

```css
* {
  caret-color: transparent;
}

input, textarea {
  caret-color: #000;
}
```

## Custom Scrollbar

```css
body::-webkit-scrollbar {
  width: 6px;
}

body::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 4px;
}

body::-webkit-scrollbar-thumb {
  background: #a5a294;
  border-radius: 4px;
}

body::-webkit-scrollbar-thumb:hover {
  background: #555;
}
```

## Smooth Scrolling

### CSS for Lenis Smooth Scroll

```css
html.lenis {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: hidden;
}
```

### JavaScript for Smooth Scrolling

```html
<script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.23/bundled/lenis.min.js"></script>
<script>
let lenis = new Lenis({
  lerp: 0.1,
  wheelMultiplier: 0.7,
  gestureOrientation: "vertical",
  normalizeWheel: false,
  smoothTouch: false,
});
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
</script>
```

## Scroll Lock

### CSS

```css
.body-lock {
  overflow: hidden;
}
```

### JavaScript

```js
const nav = document.querySelector('.w-nav');
const navButton = document.querySelector('.w-nav-button');
const body = document.body;

if(nav) {
  nav.addEventListener('click', function () {
    setTimeout(() => {
      if (navButton.classList.contains('w--open')) {
        lenis.stop();
        body.classList.add('body-lock');
      } else {
        lenis.start();
        body.classList.remove('body-lock');
      }
    }, 300);
  });
}
```

## Date Picker

### Include Date Picker Styles

```html
<link rel="stylesheet" href="https://fengyuanchen.github.io/datepicker/css/datepicker.css">
```

### Custom Date Picker Styling

```css
:root {
  --main-light-color: #f3f5fb;
  --main-dark-color: #321f59;
  --main-active-color: #642eff;
}

.datepicker-dropdown {
  border-radius: 8px !important;
  border: 0 !important;
  box-shadow: 0px 48px 88px rgba(23, 9, 54, 0.08);
  box-sizing: border-box;
}
```

### JavaScript for Date Picker

```html
<script src="https://fengyuanchen.github.io/datepicker/js/datepicker.js"></script>
<script>
$(document).ready(function () {
  $('[data-toggle="datepicker"]').datepicker({
    format: 'mm-dd-yyyy'
  });
  if (window.innerWidth < 768) {
    $('[data-toggle="datepicker"]').attr('readonly', 'readonly')
  }
});
</script>
```

---

## Scroll Buttons for Carousels
```html
<script defer>
document.querySelector('[SCROLL_BUTTON_LEFT]').addEventListener('click', function() {
  const wrapper = document.querySelector('[SCROLL_WRAPPER]');
  wrapper.scrollBy({
    left: -window.innerWidth * 0.75,
    behavior: 'smooth'
  });
});

document.querySelector('[SCROLL_BUTTON_RIGHT]').addEventListener('click', function() {
  const wrapper = document.querySelector('[SCROLL_WRAPPER]');
  wrapper.scrollBy({
    left: window.innerWidth * 0.75,
    behavior: 'smooth'
  });
});

const div = document.querySelector('[SCROLL_CONTAINER]');
div.addEventListener('mousedown', () => {
  div.style.cursor = 'grabbing';
});

document.addEventListener('mouseup', () => {
  div.style.cursor = 'grab';
});
</script>
```

### Usage
Replace placeholder values like `[SCROLL_CONTAINER]`, `[SCROLL_BUTTON_LEFT]`, `[BODY_LOCK]`, etc., with actual class names in your project.

---

## Webflow BaguetteBox/Lightbox Integration

This script initializes the BaguetteBox.js lightbox functionality for Webflow projects. Ensure that the required CSS and JS files are included in your project.

### Dependencies
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/baguettebox.js/1.11.1/baguetteBox.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/baguettebox.js/1.11.1/baguetteBox.min.js"></script>
```

### JavaScript Implementation
```html
<script>
// Ensure the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Initialize baguetteBox on the desired container (adjust selector based on your Webflow setup)
    baguetteBox.run(".grid-placeholder", {
        captions: false, // Disable captions
        buttons: 'auto', // Display navigation buttons
        async: false, // Disable async loading
        animation: 'slideIn', // Choose animation type: 'fadeIn' or 'slideIn'
    });
});
</script>
```
## Swiper Integration

### Sample HTML Structure
```html
<div class="grid-placeholder">
    <a href="image1.jpg"><img src="thumbnail1.jpg" alt="Image 1"></a>
    <a href="image2.jpg"><img src="thumbnail2.jpg" alt="Image 2"></a>
    <a href="image3.jpg"><img src="thumbnail3.jpg" alt="Image 3"></a>
</div>

---

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Swiper Integration</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.css"/>
    <script src="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js"></script>
    <style>
        .swiper {
            width: 80%;
            height: 300px;
        }
        .swiper-slide {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            background: #ddd;
            border-radius: 10px;
        }
    </style>
</head>
<body>
    <div class="swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide">Slide 1</div>
            <div class="swiper-slide">Slide 2</div>
            <div class="swiper-slide">Slide 3</div>
            <div class="swiper-slide">Slide 4</div>
            <div class="swiper-slide">Slide 5</div>
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-pagination"></div>
    </div>
    <script>
        const swiper = new Swiper('.swiper', {
            slidesPerView: 'auto',
            centeredSlides: true,
            loop: true,
            spaceBetween: window.innerWidth <= 768 ? window.innerWidth / 10 : window.innerWidth / 12,
            initialSlide: 3,
            autoplay: {
                delay: 3000,
                disableOnInteraction: true,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            grabCursor: true,
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
        });
    </script>
</body>
</html>

---