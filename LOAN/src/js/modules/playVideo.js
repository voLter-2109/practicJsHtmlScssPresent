export default class VideoPlayer {
  constructor(triggers, overlay) {
    this.btns = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector(".close");
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
  }

  bindTriggers() {
    this.btns.forEach((btn, i) => {
      try {
        const blockedElem = btn.closest(
          ".module__video-item"
        ).nextElementSibling;

        if (i % 2 === 0) {
          blockedElem.setAttribute("disabled", "true");
        }
      } catch (err) {}

      btn.addEventListener("click", () => {
        if (
          !btn.closest(".module__video-item") ||
          btn.closest(".module__video-item").getAttribute("disabled") !== "true"
        ) {
          this.activeBtn = btn;
          if (document.querySelector("iframe#frame")) {
            this.overlay.style.display = "flex";
            if (this.path !== btn.getAttribute("data-url")) {
              this.path = btn.getAttribute("data-url");
              this.player.loadVideoById({ videoId: this.path });
            }
          } else {
            console.log(2);
            this.path = btn.getAttribute("data-url");
            console.log(this.path);
            console.log(this.player);
            this.createPlayer(this.path);
          }
        }
      });
    });
  }

  bindCloseBtn() {
    this.close.addEventListener("click", () => {
      this.overlay.style.display = "none";
      try {
        this.player.stopVideo();
      } catch (err) {}
    });
  }

  createPlayer(url) {
    this.player = new YT.Player("frame", {
      height: "100%",
      width: "100%",
      videoId: `${url}`,
      events: {
        onStateChange: this.onPlayerStateChange,
      },
    });

    this.overlay.style.display = "flex";
  }
  onPlayerStateChange(state) {
    try {
      const blockedElem = this.activeBtn.closest(
        ".module__video-item"
      ).nextElementSibling;
      const playBtn = this.activeBtn.querySelector("svg").cloneNode(true);

      if (state.data === 0) {
        if (
          blockedElem
            .querySelector(".play__circle")
            .classList.contains("closed")
        ) {
          console.log(0);
          blockedElem.querySelector(".play__circle").classList.remove("closed");
          blockedElem.querySelector("svg").remove();
          blockedElem.querySelector(".play__circle").appendChild(playBtn);
          blockedElem.querySelector(".play__text").textContent = "play video";
          blockedElem
            .querySelector(".play__text")
            .classList.remove(".attention");
          blockedElem.style.cssText = `
          opacity: 1;
          filter: none;
          `;
          blockedElem.setAttribute("disabled", "false");
        }
      }
    } catch (err) {}
  }

  init() {
    if (this.btns) {
      const tag = document.createElement("script");

      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      this.bindTriggers();
      this.bindCloseBtn();
    }
  }
}
