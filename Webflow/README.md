# Reusable Code for Every Website

This repository contains a collection of reusable CSS and JavaScript snippets that can enhance the user experience on any website. These snippets include UI improvements, smooth scrolling, custom scrollbars, and a date picker.

## Table of Contents
- [Reusable Code for Every Website](#reusable-code-for-every-website)
  - [Table of Contents](#table-of-contents)
  - [Global Styles](#global-styles)
  - [Caret Behavior](#caret-behavior)
  - [Custom Scrollbar](#custom-scrollbar)
  - [Lenis Smooth Scrolling](#lenis-smooth-scrolling)
    - [CSS for Lenis Smooth Scroll](#css-for-lenis-smooth-scroll)
    - [JavaScript for Smooth Scrolling](#javascript-for-smooth-scrolling)
  - [Scroll Lock](#scroll-lock)
    - [CSS](#css)
  - [Limit text to fixed lines](#limit-text-to-fixed-lines)
    - [CSS](#css-1)
    - [JavaScript](#javascript)
  - [Date Picker](#date-picker)
    - [Include Date Picker Styles](#include-date-picker-styles)
    - [Custom Date Picker Styling](#custom-date-picker-styling)
    - [JavaScript for Date Picker](#javascript-for-date-picker)
  - [Scroll Buttons for Carousels](#scroll-buttons-for-carousels)
    - [Usage](#usage)
  - [Webflow BaguetteBox/Lightbox Integration](#webflow-baguetteboxlightbox-integration)
    - [Dependencies](#dependencies)
    - [JavaScript Implementation](#javascript-implementation)
  - [Swiper Integration](#swiper-integration)
    - [Sample HTML Structure](#sample-html-structure)
  - [Number Counter Animation](#number-counter-animation)
  - [Pausing an embedded YouTube video](#pausing-an-embedded-youtube-video)
  - [Countdown Timer](#countdown-timer)
  - [Dynamic Multi-Image Slider using CMS image collection](#dynamic-multi-image-slider-using-cms-image-collection)
  - [Infinite Horizontal Move And Pause on Hover](#infinite-horizontal-move-and-pause-on-hover)
  - [Dark/Light Mode](#darklight-mode)
  - [Dynamic CMS Grid in Webflow](#dynamic-cms-grid-in-webflow)
  - [Text Highlight Animations with GSAP ScrollTrigger](#text-highlight-animations-with-gsap-scrolltrigger)
  - [Play Button Wave Demo + Lity Lightbox for YouTube Video Popup](#play-button-wave-demo--lity-lightbox-for-youtube-video-popup)
  - [3D](#3d)


---
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

## Lenis Smooth Scrolling

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

## Limit text to fixed lines

### CSS

```css
.text {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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
```

---
---

## Number Counter Animation

```js
// Function to animate the number counter / ticker
function animateCounter(id, start = 0, end, suffix = "", duration = 2000) {
  const element = document.querySelector(id);
  const stepTime = Math.abs(Math.floor(duration / (end - start)));
  let current = start;

  const timer = setInterval(() => {
    current += 1;
    element.textContent = `${current}${suffix}`;
    if (current >= end) {
      clearInterval(timer);
    }
  }, stepTime);
}

// Store the `end` values and reset `innerText` to 0
const counters = [
  { id: "#score-1", end: parseInt(document.querySelector("#score-1").innerText, 10) },
  { id: "#score-2", end: parseInt(document.querySelector("#score-2").innerText, 10) },
  { id: "#score-3", end: parseInt(document.querySelector("#score-3").innerText, 10) },
  { id: "#score-4", end: parseInt(document.querySelector("#score-4").innerText, 10) }
];

// Reset the `innerText` to 0
counters.forEach((counter) => {
  const element = document.querySelector(counter.id);
  if (element) element.innerText = 0;
});

// Set up Intersection Observer
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Start counters dynamically based on stored `end` values
        counters.forEach((counter) => {
          animateCounter(counter.id, 0, counter.end);
        });

        // Unobserve after animation starts
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 1.0 } // Trigger only when fully visible
);

// Observe #score-3 (or any suitable target element)
const target = document.querySelector("#score-2");
observer.observe(target);
```

---
---

## Pausing an embedded YouTube video

```js
function pauseYouTubeVideo() {
    const embedlyIframe = document.querySelector(".brand-video iframe");

    if (embedlyIframe) {
        try {
            // Ensure `enablejsapi=1` is present in the iframe src
            if (!embedlyIframe.src.includes("enablejsapi=1")) {
                embedlyIframe.src += (embedlyIframe.src.includes("?") ? "&" : "?") + "enablejsapi=1";
            }

            // Send pause command to YouTube iframe
            embedlyIframe.contentWindow.postMessage(
                '{"event":"command","func":"pauseVideo","args":""}',
                "*"
            );
        } catch (error) {
            console.error("Error accessing YouTube iframe:", error);
        }
    }
}

// Add event listeners
document.querySelector(".brand-video-container")?.addEventListener("click", pauseYouTubeVideo);
```

---
---

## Countdown Timer

```js
function startCountdown() {
  // Set the target date to February 14, 2025
  const targetDate = new Date('2025-03-10T14:00:00').getTime();

  // Countdown logic
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // If the countdown is over, reset all values to 00 and stop the interval
    if (distance <= 0) {
      document.getElementById('days').innerText = '00';
      document.getElementById('hours').innerText = '00';
      document.getElementById('minutes').innerText = '00';
      document.getElementById('seconds').innerText = '00';
      clearInterval(interval);
      return;
    }

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the results with padded zeros
    document.getElementById('days').innerText = String(days).padStart(2, '0');
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
  }

  // Call the countdown logic immediately to avoid delay
  updateCountdown();

  // Update the countdown every second
  const interval = setInterval(updateCountdown, 1000);
}

// Start the countdown
startCountdown();
```

---
---

## Dynamic Multi-Image Slider using CMS image collection

https://webflow.com/made-in-webflow/website/Tutorial-Dynamic-Multi-Image-Slider

https://tutorial-dynamic-slider-multi-image.webflow.io/

```js
// Images slides
(function () {
    var sliderId = 'MultiImageSlider';
    var collectionListWrapperId = 'MultiImageCollectionWrapper';
    var slideClass = 'w-slide';
    var leftArrowClass = 'w-slider-arrow-left';
    var rightArrowClass = 'w-slider-arrow-right';
    var slideNavClass = 'w-slider-nav';
    var collectionItemClass = 'w-dyn-item';
    
    var $slider = $('#' + sliderId);
    var $slides = $slider.find('.' + slideClass);
    var $collectionWrapper = $('#' + collectionListWrapperId);
    var $images = $collectionWrapper.find('.' + collectionItemClass);
    if ($slider && $collectionWrapper) {
        $slider.css('opacity', 0);
        if (!$images || !$images.length) {
            $slider.remove();
        }
        else {
            var imgCount = $images.length;
            var slideCount = $slides.length;
            if (imgCount > slideCount) imgCount = slideCount;
            for (var i = 0; i < imgCount; i++) {
                // Three Ways:-

                // 1. OLD: Directly set the background image of the slide from the image element
                // $slides[i].style.backgroundImage = $images[i].style.backgroundImage;   //old code
                
                // NEW: Extract the image URL from the inline backgroundImage style
                var imgUrl = $images[i].style.backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
                // Clear existing content
                $($slides[i]).empty();
                // Create clickable element
                var link = $('<a>', {
                    href: imgUrl,
                    class: 'glightbox',
                    // 2. bg-image- width:100%, height:100%, cover
                    // style: 'display:block;width:100%;height:100%;background-image:url(' + imgUrl + ');background-size:cover;background-position:center;'
                    // 3. bg-image- width:auto, height:100%
                    style: 'display:block;width:100%;height:100%;' +
                           'background-image:url(' + imgUrl + ');' +
                           'background-size:auto 100%;' +
                           'background-repeat:no-repeat;' +
                           'background-position:center;'
                });
                // Append the link element to the current slide
                $($slides[i]).append(link);
            }
            for (var i = slideCount; i > imgCount; i--) {
                $slides[i - 1].remove();
            }

            if (imgCount < 2) {
                $slider.find('.' + leftArrowClass + ', .' + rightArrowClass + ', .' + slideNavClass).remove();
            }
            $slider.css('opacity', 1);
        }
        $collectionWrapper.remove();
    }   
})();
```

---
---

## Infinite Horizontal Move And Pause on Hover

Example HTML & CSS
```css
/* General Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background-color: #111;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    padding: 50px 0;
}

/* Scroll Container */
.scroll-container {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    background: #222;
    padding: 20px 0;
    position: relative;
    border-radius: 10px;
    display: flex;
    gap: 30px;
}

/* Scroll Container for reverse */
.scroll-container.reverse-container {
  justify-content: flex-end;
}

/* Scroll Wrapper (for moving elements) */
.scroll-wrapper {
    display: flex;
    gap: 30px;
    width: max-content;
    animation: scroll-testimonials 10s linear infinite;
}

/* Reverse scrolling */
.scroll-wrapper.reverse {
    animation: scroll-testimonials-reverse 10s linear infinite;
}

/* Individual Items */
.scroll-item {
    display: inline-block;
    font-size: 20px;
    font-weight: bold;
    background: #333;
    padding: 15px 30px;
    border-radius: 8px;
    white-space: nowrap;
    transition: transform 0.2s ease-in-out;
}

/* Pause animation on hover */
.scroll-container:hover .scroll-wrapper {
    animation-play-state: paused;
}

/* Keyframes for normal scroll */
@keyframes scroll-testimonials {
    from {
        transform: translate3d(0, 0, 0);
    }
    to {
        transform: translate3d(-100%, 0, 0);
    }
}

/* Keyframes for reverse scroll */
@keyframes scroll-testimonials-reverse {
    from {
        transform: translate3d(0, 0, 0);
    }
    to {
        transform: translate3d(100%, 0, 0);
    }
}
```

```html
<!-- Forward Scrolling -->
<h2>Infinite Scroll - Forward Direction</h2>
<div class="scroll-container">
    <div class="scroll-wrapper">
        <div class="scroll-item">Item 1</div>
        <div class="scroll-item">Item 2</div>
        <div class="scroll-item">Item 3</div>
        <div class="scroll-item">Item 4</div>
        <div class="scroll-item">Item 5</div>
        <div class="scroll-item">Item 6</div>
        <div class="scroll-item">Item 7</div>
        <div class="scroll-item">Item 8</div>
        <div class="scroll-item">Item 9</div>
        <div class="scroll-item">Item 10</div>
    </div>
    <div class="scroll-wrapper">
        <div class="scroll-item">Item 1</div>
        <div class="scroll-item">Item 2</div>
        <div class="scroll-item">Item 3</div>
        <div class="scroll-item">Item 4</div>
        <div class="scroll-item">Item 5</div>
        <div class="scroll-item">Item 6</div>
        <div class="scroll-item">Item 7</div>
        <div class="scroll-item">Item 8</div>
        <div class="scroll-item">Item 9</div>
        <div class="scroll-item">Item 10</div>
    </div>
</div>

<h2>Infinite Scroll - Reverse Direction</h2>
<div class="scroll-container reverse-container">
    <div class="scroll-wrapper reverse">
        <div class="scroll-item">Reverse 1</div>
        <div class="scroll-item">Reverse 2</div>
        <div class="scroll-item">Reverse 3</div>
        <div class="scroll-item">Reverse 4</div>
        <div class="scroll-item">Reverse 5</div>
        <div class="scroll-item">Reverse 6</div>
        <div class="scroll-item">Reverse 7</div>
        <div class="scroll-item">Reverse 8</div>
        <div class="scroll-item">Reverse 9</div>
        <div class="scroll-item">Reverse 10</div>
    </div>
    <div class="scroll-wrapper reverse">
        <div class="scroll-item">Reverse 1</div>
        <div class="scroll-item">Reverse 2</div>
        <div class="scroll-item">Reverse 3</div>
        <div class="scroll-item">Reverse 4</div>
        <div class="scroll-item">Reverse 5</div>
        <div class="scroll-item">Reverse 6</div>
        <div class="scroll-item">Reverse 7</div>
        <div class="scroll-item">Reverse 8</div>
        <div class="scroll-item">Reverse 9</div>
        <div class="scroll-item">Reverse 10</div>
    </div>
</div>
```

## Dark/Light Mode

```css
/* Dark/Light Mode */
.light-dark-container {
    transition: transform 0.3s ease; /* Smooth transitions */
}

.light-dark-button[aria-pressed="true"] .light-dark-container {
    transform: translateX(-50%); /* Dark mode */
}

.light-dark-button[aria-pressed="false"] .light-dark-container {
    transform: translateX(0%); /* Light mode */
}

/* Hover state */
/*
.light-dark-button[aria-pressed="true"]:hover .light-dark-container {
    transform: translateX(0%);
}
*/
/* Preview light mode */

/*
.light-dark-button[aria-pressed="false"]:hover .light-dark-container {
    transform: translateX(-50%);
}
*/
/* Preview dark mode */
```

```js
<script 
tr-color-vars="variables...e.g. background,background-2,text,text-2,text-3,text-4,button-background,button-text..." 
duration="0.5" 
ease="power1.out" 
src="https://cdn.jsdelivr.net/gh/flowtricks/scripts@v1.0.4/dark-mode-toggle.js">
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
```

Add two variables color & dark...
(add all variables under these two)

https://www.youtube.com/watch?v=grA47dBXzPg

---
---

## Dynamic CMS Grid in Webflow

https://www.youtube.com/watch?v=VJ0swK8mbg4

---
---

## Text Highlight Animations with GSAP ScrollTrigger

https://youtu.be/rRm92sXekeY?si=ip86XLc43eb62Tov

```js
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
<script src="https://unpkg.com/split-type"></script>
<script async>
gsap.registerPlugin(ScrollTrigger);
const splitTypes = document.querySelectorAll('.scroll-highlight');
splitTypes.forEach((char,i) => {
  const text = new SplitType(char, {types: ['chars','words']});
  gsap.from(text.chars, {
    scrollTrigger: {
      trigger: char,
      start: 'top 80%',
      end: 'top 20%',
      scrub: true,
    },
    opacity: 0.2,
    stagger: 0.1,
  })
});
</script>
```

---
---

## Play Button Wave Demo + Lity Lightbox for YouTube Video Popup

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Play Button Wave Demo</title>

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css">
  <!-- Lity Lightbox CSS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lity/2.4.0/lity.min.css">

  <style>
    body {
      background-color: #f0f0f0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .video-main {
      position: relative;
      display: inline-block;
    }

    .video {
      height: 50px;
      width: 50px;
      line-height: 50px;
      text-align: center;
      border-radius: 100%;
      background: #000;
      color: #fff;
      display: inline-block;
      z-index: 999;
      font-size: 20px;
    }

    @keyframes waves {
      0% {
        transform: scale(0.2, 0.2);
        opacity: 0;
      }
      50% {
        opacity: 0.9;
      }
      100% {
        transform: scale(0.9, 0.9);
        opacity: 0;
      }
    }

    .waves {
      position: absolute;
      width: 150px;
      height: 150px;
      background: rgba(0, 0, 0, 0.3);
      opacity: 0;
      border-radius: 100%;
      right: -50px;
      bottom: -50px;
      z-index: -1;
      animation: waves 3s ease-in-out infinite;
    }

    .wave-1 {
      animation-delay: 0s;
    }

    .wave-2 {
      animation-delay: 1s;
    }

    .wave-3 {
      animation-delay: 2s;
    }
  </style>
</head>
<body>

  <div class="video-main">
    <div class="promo-video">
      <div class="waves-block">
        <div class="waves wave-1"></div>
        <div class="waves wave-2"></div>
        <div class="waves wave-3"></div>
      </div>
    </div>
    <a href="https://www.youtube.com/watch?v=BqI0Q7e4kbk" class="video video-popup" data-lity>
      <i class="fa fa-play"></i>
    </a>
  </div>

  <!-- jQuery -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <!-- Lity Lightbox JS -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/lity/2.4.0/lity.min.js"></script>

</body>
</html>
```

---
---

## 3D

New Spline & Webflow Integration-
https://www.youtube.com/watch?v=NhtNciucUOE&t=21s

How to embed Vectary WebAR viewer to Webflow-
https://www.vectary.com/3d-modeling-blog/webflow-webar-viewer/

The best way to get 3D designs to Augmented Reality-
https://www.youtube.com/watch?v=u25b3hw4vnI