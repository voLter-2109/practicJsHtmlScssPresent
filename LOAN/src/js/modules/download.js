export default class Download {
  constructor(trigger) {
    this.download = Array.from(document.querySelectorAll(trigger));
    this.path = "./img/img/Bitmap.jpg";
    console.log(this.download);
  }

  downloadItem(path) {
    const elem = document.createElement("a");
    elem.setAttribute("href", path);
    elem.setAttribute("download", "file");
    elem.setAttribute("target", "_self");
    console.log(1);
    elem.style.display = "none";
    document.body.appendChild(elem);
    elem.click();
    elem.classList.remove();
  }

  init() {
    this.download.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        // e.preventDefault();
        this.downloadItem(this.path);
      });
    });
  }
}
