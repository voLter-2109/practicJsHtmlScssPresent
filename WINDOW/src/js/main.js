"use strict";

import "./inclusion/slider.js";
import modals from "./inclusion/modalWindow.js";
import tabs from "./inclusion/tabs.js";
import forms from "./inclusion/forms.js";
import changeModalState from "./inclusion/changeModalState.js";
import timer from "./inclusion/timer.js";
import images from "./inclusion/images.js";

window.addEventListener("DOMContentLoaded", () => {
  let modalState = {};
  let deadline = "2023-01-01";

  changeModalState(modalState);
  modals();
  tabs(".glazing_slider ", ".glazing_block", ".glazing_content", "active");
  tabs(
    ".decoration_slider",
    ".no_click",
    ".decoration_content > div > div",
    "after_click"
  );
  tabs(
    ".balcon_icons",
    ".balcon_icons_img",
    ".big_img > img",
    "do_image_more",
    "inline-block"
  );
  forms(modalState);
  timer(".container1", deadline);
  images();
});
