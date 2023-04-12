"use strict";

import { getResource } from "../services/services";

function cards() {
  // классы на вкладке выбор меню
  // шаблон через Классы
  // ...classes -rest оператор
  class MenuCard {
    constructor(src, alt, title, descr, prise, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.prise = prise;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.trancfer = 27;
    }

    changeToUAH() {
      this.prise = this.prise * this.trancfer;
      return this.prise;
    }

    render() {
      let element = document.createElement("div");

      // добавление классов через аргументы, rest обработает все  после parentSelector, если их не не выдaet ошибку

      if (this.classes.length === 0) {
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        this.classes.forEach((item) => element.classList.add(item));
      }

      element.innerHTML = `
          <img src=${this.src} alt=${this.alt}>
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.changeToUAH()}</span> руб/день</div>
          </div>
        `;
      this.parent.append(element);
    }
  }

  // работа с сервером через библиотеку axios
  getResource("http://localhost:3002/menu").then((data) => {
    data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(
        img,
        altimg,
        title,
        descr,
        price,
        ".menu .container"
      ).render();
    });
  });
}

export { cards };
