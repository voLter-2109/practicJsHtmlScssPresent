"use strict";

const picturesSize = (imgSelector) => {
  const blocks = document.querySelectorAll(imgSelector);

  function showImg(block) {
    const img = block.querySelector("img");
    img.src = img.src.slice(0, -5) + "-1.webp";
    block.querySelectorAll("p:not(.sizes-hit)").forEach((p) => {
      p.style.display = "none";
    });
    return;
  }

  function hideImg(block) {
    const img = block.querySelector("img");
    img.src = img.src.slice(0, -7) + ".webp";
    block.querySelectorAll("p:not(.sizes-hit)").forEach((p) => {
      p.style.display = "block";
    });
    return;
  }

  blocks.forEach((block) => {
    block.addEventListener("mouseover", () => {
      showImg(block);
    });

    block.addEventListener("mouseout", () => {
      hideImg(block);
    });
  });
};

export default picturesSize;
