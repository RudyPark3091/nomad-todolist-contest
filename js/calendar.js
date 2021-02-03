class Calendar {
  constructor($target) {
    this.$target = $target;
    this.init();
    $target.appendChild(this.$container);
  }

  init() {
    const $container = document.createElement("div");
    $container.classList.add("calendar-container");

    const today = new Date();
    for (let i = 0; i < 42; i++) {
      const $div = document.createElement("div");
      $div.innerText = i.toString();
      $container.appendChild($div);
    }

    this.$container = $container;
  }

  render() {
    this.$target.appendChild(this.$container);
  }
}

export default Calendar;