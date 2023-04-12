import Slider from "./slider.js";

export default class MainSlider extends Slider {
  constructor(btns) {
    super(btns);
  }

  showSlides(n) {
    if (n > this.slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = this.slides.length;
    }

    try {
      if (n === 3) {
        this.hanson.classList.add("animated");
        let timerId = setTimeout(() => {
          this.hanson.style.opacity = "1";
          this.hanson.classList.add("slideInUp");
          clearTimeout(timerId);
        }, 3000);
      }
    } catch (e) {}

    Array.from(this.slides).forEach((slide) => {
      slide.style.display = "none";
    });

    this.slides[this.slideIndex - 1].style.display = "block";
  }

  // смена слайдов основного слайдера - this.slideIndex
  plusSlides(n) {
    this.showSlides((this.slideIndex += n));
  }

  bindTriggers() {
    this.btns.forEach((item) => {
      item.addEventListener("click", () => {
        this.plusSlides(1);
      });

      item.parentNode.previousElementSibling.addEventListener("click", (e) => {
        console.log(e.target.closest(".page"));
        e.preventDefault();
        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
      });
    });
    // почему не работает с одинаковыми классами?
    document
      .querySelectorAll(".module__info-controls .prev")
      .forEach((item) => {
        item.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.plusSlides(-1);
        });
      });

    document.querySelectorAll(".nextmodule").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.plusSlides(1);
      });
    });
  }

  render() {
    if (this.container) {
      try {
        this.hanson = document.querySelector(".hanson");
      } catch (err) {
        console.log(err);
      }

      this.showSlides(this.slideIndex);
      this.bindTriggers();
    }
  }
}
