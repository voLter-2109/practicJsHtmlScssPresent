export default class Form {
  constructor(form) {
    this.form = document.querySelectorAll(form);

    this.message = {
      loading: "Загрузка...",
      success: "Спасибо! Скоро мы с вами свяжемся",
      failure: "Что-то пошло не так...",
    };
    this.path = "http://localhost:3002/posts";
  }

  async postData(url, data) {
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: data,
    });

    return await res.json();
  }
  clearInputs(inputs) {
    inputs.forEach((item) => {
      item.value = "";
    });
  }

  init() {
    this.form.forEach((item) => {
      item.addEventListener("submit", (e) => {
        e.preventDefault();
        this.inputs = item.querySelectorAll("input");

        let statusMessage = document.createElement("div");
        statusMessage.style.cssText = `
        margin-top: 15px;
        font-size: 18px;
        color: grey;
        `;
        statusMessage.textContent = this.message.loading;
        item.parentNode.appendChild(statusMessage);

        const formData = new FormData(item);
        let json = JSON.stringify(Object.fromEntries(formData));
        console.log(json);
        console.log(this.path);

        this.postData(this.path, json)
          .then((res) => {
            console.log(res);
            statusMessage.textContent = this.message.loading;
          })
          .catch(() => {
            statusMessage.textContent = this.message.failure;
          })
          .finally(() => {
            statusMessage.textContent = this.message.success;
            this.clearInputs(this.inputs);
            setTimeout(() => {
              statusMessage.remove();
            }, 6000);
          });
      });
    });
  }
}
