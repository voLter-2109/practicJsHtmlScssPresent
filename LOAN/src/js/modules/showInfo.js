export default class ShowInfo {
  constructor(trigger) {
    this.btns = document.querySelectorAll(trigger);
  }

  showBlockInfo() {
    this.btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        let msg = btn.nextElementSibling;
        msg.classList.add("animated");
        msg.style.display = "block";
        // msg.classList.toggle("msg");
      });
    });
  }

  init() {
    this.showBlockInfo();
  }
}
