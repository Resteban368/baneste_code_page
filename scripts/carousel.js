/* ============================================
   CAROUSEL FUNCTIONALITY
   ============================================ */

class ProjectCarousel {
  constructor(carouselElement) {
    this.carousel = carouselElement;
    this.track = carouselElement.querySelector('.carousel-track');
    this.slides = carouselElement.querySelectorAll('.carousel-slide');
    this.prevBtn = carouselElement.querySelector('.carousel-prev');
    this.nextBtn = carouselElement.querySelector('.carousel-next');
    this.indicators = carouselElement.querySelectorAll('.indicator');

    this.currentIndex = 0;
    this.slideCount = this.slides.length;
    this.autoPlayInterval = null;
    this.onSlideChange = null; // callback externo

    // Guarda la instancia en el elemento para acceso externo
    carouselElement._carouselInstance = this;

    this.init();
  }

  init() {
    this.prevBtn.addEventListener('click', () => this.prev());
    this.nextBtn.addEventListener('click', () => this.next());

    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToSlide(index));
    });

    this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());

    this.carousel.addEventListener('touchstart', () => this.stopAutoPlay(), { passive: true });
    this.carousel.addEventListener('touchend', () => this.startAutoPlay(), { passive: true });

    this.startAutoPlay();
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.updateCarousel();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.slideCount;
    this.updateCarousel();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.slideCount) % this.slideCount;
    this.updateCarousel();
  }

  updateCarousel() {
    this.track.style.transform = `translateX(${-this.currentIndex * 100}%)`;

    this.indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentIndex);
    });

    if (this.onSlideChange) this.onSlideChange(this.currentIndex);

    this.stopAutoPlay();
    this.startAutoPlay();
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => this.next(), 5000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
}

// Inicializa todos los carruseles en la página
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.project-carousel').forEach(carousel => {
    new ProjectCarousel(carousel);
  });
});
