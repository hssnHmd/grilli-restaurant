'use strict';

const preloader = document.querySelector('[data-preloaded]');

window.addEventListener('load', function () {
  preloader.classList.add('loaded');
  document.body.classList.add('loaded');
});

/**
 * Add event listener to multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

const navbar = document.querySelector('[data-navbar]');
const navTogglers = document.querySelectorAll('[data-nav-toggler]');
const overlay = document.querySelector('[data-overlay]');

const toggleNavbar = function () {
  navbar.classList.toggle('active');
  overlay.classList.toggle('active');
  document.body.classList.toggle('nav-active');
};

addEventOnElements(navTogglers, 'click', toggleNavbar);

/**
 * Header && back to top
 */

const header = document.querySelector('[data-header]');
const backTopBtn = document.querySelector('[data-back-top-btn]');
let lastScrollPos = 0;

const hieHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;

  if (isScrollBottom) {
    header.classList.add('hide');
  } else {
    header.classList.remove('hide');
  }
  lastScrollPos = window.scrollY;
};

window.addEventListener('scroll', function () {
  if (window.scrollY >= 50) {
    header.classList.add('active');
    backTopBtn.classList.add('active');

    hieHeader();
  } else {
    header.classList.remove('active');
    backTopBtn.classList.remove('active');
  }
});

/**
 * Hero Slider
 */

const heroSlider = document.querySelector('[data-hero-slider]');
const heroSliderItems = document.querySelectorAll('[data-hero-slider-item]');
const nextSlideBtn = document.querySelector('[data-next-btn]');
const prevSlideBtn = document.querySelector('[data-prev-btn]');

let currentSlidePos = 0;
let lastActiveSlideItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSlideItem.classList.remove('active');
  heroSliderItems[currentSlidePos].classList.add('active');
  lastActiveSlideItem = heroSliderItems[currentSlidePos];
};

const sliderNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }
  updateSliderPos();
};

nextSlideBtn.addEventListener('click', sliderNext);

const sliderPrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }
  updateSliderPos();
};

prevSlideBtn.addEventListener('click', sliderPrev);

/**
 * Auto slider
 */

let autoSliderInterval;

const autoSlide = function () {
  autoSliderInterval = setInterval(function () {
    sliderNext();
  }, 7000);
};

addEventOnElements([nextSlideBtn, prevSlideBtn], 'mouseover', function () {
  clearInterval(autoSliderInterval);
});
addEventOnElements([nextSlideBtn, prevSlideBtn], 'mouseout', autoSlide);

window.addEventListener('load', autoSlide);

/**
 * Parallax effect
 */

const parallaxItems = document.querySelectorAll('[data-parallax-item]');
let x, y;

window.addEventListener('mousemove', function (e) {
  x = (e.clientX / window.innerWidth) * 10 - 5;
  y = (e.clientY / window.innerHeight) * 10 - 5;

  // reverse the number eg: 20 ->-20  , -5 -> 5
  x = x - x * 2;
  y = y - y * 2;
  for (let i = 0; i < parallaxItems.length; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px,${y}px, 0px)`;
  }
});
