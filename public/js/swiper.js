const swiper = new Swiper(".swiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

const testimonialSwiper = new Swiper(".testimonials-swiper", {
  slidePerView: 1,
  spaceBetween: 20,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".testimonials-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".testimonials-button-next",
    prevEl: ".testimonials-button-prev",
  },
});
