import Slider from "./slider.js";

export default class MiniSlider extends Slider {
  constructor(container, next, prev, activeClass, animate, autoPlay) {
    super(container, next, prev, activeClass, animate, autoPlay);
  }

  decorizeSlides() {
    let test = [].slice.call(this.slides);
    test.forEach((slide) => {
      slide.classList.remove(this.activeClass);
      if (this.animate) {
        slide.querySelector(".card__title").style.opacity = "0.4";
        slide.querySelector(".card__controls-arrow").style.opacity = "0";
      }
    });

    if (!this.slides[0].closest("button")) {
      this.slides[0].classList.add(this.activeClass);
    }

    if (this.animate) {
      this.slides[0].querySelector(".card__title").style.opacity = "1";
      this.slides[0].querySelector(".card__controls-arrow").style.opacity = "1";
    }
  }

  bindTriggers() {
    this.next.addEventListener("click", () => {
      this.nextSlide();
    });

    this.prev.addEventListener("click", () => {
      let active = this.slides[this.slides.length - 1];
      this.container.insertBefore(active, this.slides[0]);
      this.decorizeSlides();
    });
  }

  nextSlide() {
    this.container.appendChild(this.slides[0]);
    this.decorizeSlides();
  }

  init() {
    try {
      this.container.style.cssText = `
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      align-items: flex-start;
      `;

      this.bindTriggers();
      this.decorizeSlides();

      if (this.autoPlay) {
        setInterval(() => {
          this.nextSlide();
        }, 5000);
      }
    } catch (err) {}
  }
}
