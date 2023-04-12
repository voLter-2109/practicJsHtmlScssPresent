"use strict";

function calc() {
  // calculate__________________________________________________________________________

  const result = document.querySelector(".calculating__result span");
  let sex, height, weight, age, ration;

  if (localStorage.getItem("sex")) {
    sex = localStorage.getItem("sex");
  } else {
    sex = "female";
    localStorage.setItem("sex", "female");
  }

  if (localStorage.getItem("ration")) {
    ration = localStorage.getItem("ration");
  } else {
    ration = 1.375;
    localStorage.setItem("ration", 1.375);
  }

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ration) {
      result.textContent = "____";
      return;
    }

    if (sex === "female") {
      result.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ration
      );
    } else {
      result.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ration
      );
    }
  }
  calcTotal();

  function initLocalSettings(selector, activeClass) {
    const element = document.querySelectorAll(selector);

    element.forEach((e) => {
      e.classList.remove(activeClass);
      if (e.getAttribute("id") === localStorage.getItem("sex")) {
        e.classList.add(activeClass);
      }

      if (e.getAttribute("data-ration") === localStorage.getItem("ration")) {
        e.classList.add(activeClass);
      }
    });
  }

  initLocalSettings("#gender div", "calculating__choose-item_active");
  initLocalSettings(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );

  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        if (e.target.getAttribute("data-ration")) {
          ration = +e.target.getAttribute("data-ration");
          localStorage.setItem("ration", +e.target.getAttribute("data-ration"));
        } else {
          sex = e.target.getAttribute("id");
          localStorage.setItem("sex", e.target.getAttribute("id"));
        }

        elements.forEach((element) => {
          element.classList.remove(activeClass);
        });

        e.target.classList.add(activeClass);

        calcTotal();
      });
    });
  }

  function getDinamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener("input", () => {
      if (input.value.match(/\D/g)) {
        input.style.border = "1px solid red";
      } else {
        input.style.border = "none";
      }

      switch (input.getAttribute("id")) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }

      calcTotal();
    });
  }

  getDinamicInformation("#height");
  getDinamicInformation("#weight");
  getDinamicInformation("#age");

  getStaticInformation("#gender div", "calculating__choose-item_active");
  getStaticInformation(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );
}

export {calc};
