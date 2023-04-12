"use strict";

import { closeModal, openModal } from "./modal";
import { postDate } from "../services/services";

function forms(formSelector, modalTimerId) {
  // форма отправки на сервер(позвоните мне)

  const forms = document.querySelectorAll(formSelector);

  let message = {
    loading: "./img/img/form/spinner.svg",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что - то пошло не так...",
  };

  forms.forEach((item) => {
    bingPostDate(item);
  });

  function bingPostDate(form) {
    // отмена стандартного действия при нажатии на кнопку
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // вывод текстового сообщение о текущем процессе
      let statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
        `;
      form.insertAdjacentElement("afterend", statusMessage);

      let formDate = new FormData(form); // 4 шаг

      const json = JSON.stringify(Object.fromEntries(formDate.entries()));
      //
      postDate("http://localhost:3002/requests", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset(); //сброс введенных параметров в полях формы
        });
    });
  }

  function showThanksModal(massege) {
    let prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.add("hide");
    openModal(".modal", modalTimerId);

    let thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
      <div class="modal__content">
      <div class="modal__close" data-close>×</div>
      <div class="modal__title">${massege}</div>
      </div>`;

    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal(".modal");
    }, 4000);
  }
}

export { forms };
