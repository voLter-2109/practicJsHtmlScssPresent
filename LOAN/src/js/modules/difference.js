export default class Difference {
  constructor(oldOfficer, newOfficer, items) {
    this.oldOfficer = document.querySelector(oldOfficer);
    this.newOfficer = document.querySelector(newOfficer);

    try {
      this.oldItems = this.oldOfficer.querySelectorAll(items);
      this.newItems = this.newOfficer.querySelectorAll(items);
    } catch (err) {}

    this.items = items;
    this.oldCounter = 0;
    this.newCounter = 0;
  }

  bindTriggers(container, items, counter) {
    container.querySelector(".plus").addEventListener("click", () => {
      if (counter !== items.length - 2) {
        items[counter].style.display = "flex";
        counter++;
      } else {
        items[counter].style.display = "flex";
        items[this.oldItems.length - 1].remove();
      }
    });
  }

  hideItems(items) {
    items.forEach((item, i, arr) => {
      if (i !== arr.length - 1) {
        item.style.display = "none";
      }
    });
  }

  init() {
    try {
      this.hideItems(this.oldItems);
      this.hideItems(this.newItems);

      this.bindTriggers(this.newOfficer, this.newItems, this.newCounter);
      this.bindTriggers(this.oldOfficer, this.oldItems, this.oldCounter);
    } catch (err) {}
  }
}
