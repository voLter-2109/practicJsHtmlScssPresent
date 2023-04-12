"use strict";

import modals from "./modules/modals.js";
import sliders from "./modules/sliders.js";
import forms from "./modules/forms.js";
import mask from "./modules/mask.js";
import checkTextInputs from "./modules/checkTextInputs.js";
import showMoreStyle from "./modules/showMoreStyle.js";
import calc from "./modules/calc.js";
import filter from "./modules/filter.js";
import picturesSize from "./modules/picturesSize.js";
import accardion from "./modules/accardion.js";
import burger from "./modules/burger.js";
import scrolling from "./modules/scrolling.js";
import drop from "./modules/drop.js";

window.addEventListener("DOMContentLoaded", () => {
  modals();
  sliders(
    ".feedback-slider-item",
    "horizontal",
    ".main-prev-btn",
    ".main-next-btn"
  );
  sliders(".main-slider-item", "vertical");
  forms();
  mask("[name='phone']");
  checkTextInputs("[name='name']");
  checkTextInputs("[name='message']");
  showMoreStyle(".button-styles", "#styles .row");
  calc("#size", "#material", "#options", ".promocode", ".calc-price");
  filter();
  picturesSize(".sizes-block");
  accardion(".accordion-heading");
  burger(".burger-menu", ".burger");
  scrolling(".pageup");
  drop();
});


