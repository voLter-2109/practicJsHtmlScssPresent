"use strict";

import { postData } from "../services/requests";

const forms = () => {
  const form = document.querySelectorAll("form"),
    inputs = document.querySelectorAll("input"),
    upload = document.querySelectorAll("[name='upload']");

  let imgName;
  let api;
  let loadFile;

  const message = {
    loading: "Загрузка...",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так...",
    spiner: "./img/spinner.gif",
    ok: "./img/ok.webp",
    fail: "./img/fail.webp",
  };

  const path = {
    disigner: "http://localhost:3002/img",
    question: "http://localhost:3002/text",
  };

  const clearInputs = () => {
    inputs.forEach((item) => {
      item.value = "";
    });
    upload.forEach((item) => {
      item.previousElementSibling.textContent = "Файл не выбран";
    });
  };

  upload.forEach((item) => {
    item.addEventListener("input", () => {
      let dots;
      const arr = item.files[0].name.split(".");
      arr[0].length > 5 ? (dots = "...") : (dots = ".");
      const name = arr[0].substring(0, 6) + dots + arr[1];
      item.previousElementSibling.textContent = name;
    });
  });

  form.forEach((item) => {
    // костыль
    try {
      let nameImg = item.querySelector("input[name='upload']");
      nameImg.addEventListener("change", () => {
        imgName = nameImg.files[0];
      });
    } catch (err) {
      console.log(err);
    }
    //

    item.addEventListener("submit", (e) => {
      e.preventDefault();
      let statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      item.parentNode.appendChild(statusMessage);

      item.classList.add("animated", "fadeOutUp");
      setTimeout(() => {
        item.style.display = "none";
      }, 400);

      let statusImg = document.createElement("img");
      statusImg.setAttribute("src", message.spiner);
      statusImg.classList.add("animated", "fadeInUp");
      statusMessage.appendChild(statusImg);

      let textMessaga = document.createElement("div");
      textMessaga.textContent = message.loading;
      statusMessage.appendChild(textMessaga);

      const formData = new FormData(item);
      let x = Object.fromEntries(formData);
      let y = formData.get("upload");
      if (
        item.closest(".popup-design") ||
        item.classList.contains("calc_form")
      ) {
        api = path.disigner;
        loadFile = { name: y.name, type: y.type };
      } else {
        api = path.question;
        loadFile = "none";
      }

      let test = {
        name: x.name,
        phone: x.phone,
        email: x.email,
        message: x.message,
        loadFile: loadFile,
      };
      const json = JSON.stringify(Object.assign({}, test));

      postData(api, json)
        .then((res) => {
          console.log(res);
          statusImg.setAttribute("src", message.ok);
          textMessaga.textContent = message.success;
        })
        .catch(() => {
          statusImg.setAttribute("src", message.fail);
          textMessaga.textContent = message.failure;
        })
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessage.remove();
            item.style.display = "block";
            item.classList.remove("fadeOutUp");
            item.classList.add("fadeInUp");
          }, 5000);
        });
    });
  });
};

export default forms;
