document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 'auto',
      centeredSlides: true,
      loop: true,
      spaceBetween: 0,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  });