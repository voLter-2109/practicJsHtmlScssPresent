"use strict";

import MainSlider from "./slider/slider-main.js";

function linkHtml(trigger) {
  const linkSlider = new MainSlider({ container: ".modules__content-slider" });

  const links = document.querySelectorAll(trigger);
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      // e.preventDefault();
      console.log(e.target);
    });
  });
}

export default linkHtml;
