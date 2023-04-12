export default class Slider {
  constructor({
    container = null,
    btns = null,
    next = null,
    prev = null,
    activeClass = "",
    animate,
    autoPlay,
    linkNumber = "0",
  } = {}) {
    this.container = document.querySelector(container);
    try {
      this.slides = this.container.children;
    } catch (err) {}
    this.btns = document.querySelectorAll(btns);
    this.prev = document.querySelector(prev);
    this.next = document.querySelector(next);
    this.activeClass = activeClass;
    this.animate = animate;
    this.autoPlay = autoPlay;
    this.slideIndex = 1;
  }
}
