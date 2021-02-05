const PIXEL = 20;
const CANVAS_WIDTH = PIXEL * 17;
const CANVAS_HEIGHT = PIXEL * 5;

// to render numbers properly,
// make sure $target's background color is
// not transparent
class Clock {
  constructor($target) {
    this.$target = $target;

    this.color = "#ddd";
    this.bgColor = window.getComputedStyle(
      document.querySelector("#landing")
    ).backgroundColor;

    const $canvas = document.createElement("canvas");
    $canvas.setAttribute("width", CANVAS_WIDTH);
    $canvas.setAttribute("height", CANVAS_HEIGHT);

    this.ctx = $canvas.getContext("2d");
    this.ctx.fillStyle = this.color;
    this.$canvas = $canvas;

    this.hour = 0;
    this.minute = 0;
    this.second = 0;

    this.tick();
    setInterval(() => this.tick(), 1000);
  }

  render() {
    this.ctx.fillRect(PIXEL * 8, PIXEL, PIXEL, PIXEL);
    this.ctx.fillRect(PIXEL * 8, PIXEL * 3, PIXEL, PIXEL);
    this.$target.appendChild(this.$canvas);
  }

  draw(num, pos) {
    this.ctx.fillStyle = this.color;
    switch (num) {
      case 0:
        this.ctx.fillRect(pos, 0, 60, 20);
        this.ctx.fillRect(pos, PIXEL, 20, 60);
        this.ctx.fillRect(pos + PIXEL * 2, PIXEL, 20, 60);
        this.ctx.fillRect(pos, PIXEL * 4, 60, 20);
        break;

      case 1:
        this.ctx.fillRect(pos + PIXEL * 2, 0, 20, 100);
        break;

      case 2:
        this.ctx.fillRect(pos, 0, 60, 20);
        this.ctx.fillRect(pos + PIXEL * 2, PIXEL, 20, 20);
        this.ctx.fillRect(pos, PIXEL * 2, 60, 20);
        this.ctx.fillRect(pos, PIXEL * 3, 20, 20);
        this.ctx.fillRect(pos, PIXEL * 4, 60, 20);
        break;

      case 3:
        this.ctx.fillRect(pos, 0, 60, 20);
        this.ctx.fillRect(pos + PIXEL * 2, PIXEL, 20, 20);
        this.ctx.fillRect(pos, PIXEL * 2, 60, 20);
        this.ctx.fillRect(pos + PIXEL * 2, PIXEL * 3, 20, 20);
        this.ctx.fillRect(pos, PIXEL * 4, 60, 20);
        break;

      case 4:
        this.ctx.fillRect(pos + PIXEL * 2, 0, 20, 100);
        this.ctx.fillRect(pos, 0, 20, 60);
        this.ctx.fillRect(pos + PIXEL, PIXEL * 2, 20, 20);
        break;

      case 5:
        this.ctx.fillRect(pos, 0, 60, 20);
        this.ctx.fillRect(pos, PIXEL, 20, 20);
        this.ctx.fillRect(pos, PIXEL * 2, 60, 20);
        this.ctx.fillRect(pos + PIXEL * 2, PIXEL * 3, 20, 20);
        this.ctx.fillRect(pos, PIXEL * 4, 60, 20);
        break;

      case 6:
        this.ctx.fillRect(pos, 0, 60, 20);
        this.ctx.fillRect(pos, PIXEL, 20, 20);
        this.ctx.fillRect(pos, PIXEL * 2, 60, 20);
        this.ctx.fillRect(pos, PIXEL * 3, 20, 20);
        this.ctx.fillRect(pos + PIXEL * 2, PIXEL * 3, 20, 20);
        this.ctx.fillRect(pos, PIXEL * 4, 60, 20);
        break;

      case 7:
        this.ctx.fillRect(pos + PIXEL * 2, 0, 20, 100);
        this.ctx.fillRect(pos, 0, 40, 20);
        break;

      case 8:
        this.ctx.fillRect(pos, 0, 60, 20);
        this.ctx.fillRect(pos, PIXEL, 20, 20);
        this.ctx.fillRect(pos + PIXEL * 2, PIXEL, 20, 20);
        this.ctx.fillRect(pos, PIXEL * 2, 60, 20);
        this.ctx.fillRect(pos, PIXEL * 3, 20, 20);
        this.ctx.fillRect(pos + PIXEL * 2, PIXEL * 3, 20, 20);
        this.ctx.fillRect(pos, PIXEL * 4, 60, 20);
        break;

      case 9:
        this.ctx.fillRect(pos, 0, 60, 20);
        this.ctx.fillRect(pos, PIXEL, 20, 20);
        this.ctx.fillRect(pos + PIXEL * 2, PIXEL, 20, 20);
        this.ctx.fillRect(pos, PIXEL * 2, 60, 20);
        this.ctx.fillRect(pos + PIXEL * 2, PIXEL * 3, 20, 20);
        this.ctx.fillRect(pos, PIXEL * 4, 60, 20);
        break;
    }
  }

  clearHour() {
    this.ctx.fillStyle = this.bgColor;
    this.ctx.fillRect(0, 0, PIXEL * 7, this.$canvas.height);
    this.ctx.fillStyle = this.color;
  }

  clearMinute() {
    this.ctx.fillStyle = this.bgColor;
    this.ctx.fillRect(PIXEL * 10, 0, PIXEL * 7, this.$canvas.height);
    this.ctx.fillStyle = this.color;
  }

  tick() {
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();

    if (hour !== this.hour) {
      const slot1 = 0;
      const slot2 = PIXEL * 4;

      this.clearHour();
      this.draw(hour < 10 ? 0 : parseInt(hour / 10), slot1);
      this.draw(hour % 10, slot2);
      this.hour = hour;
    }
    if (minute !== this.minute) {
      const slot1 = PIXEL * 10;
      const slot2 = PIXEL * 14;

      this.clearMinute();
      this.draw(minute < 10 ? 0 : parseInt(minute / 10), slot1);
      this.draw(minute % 10, slot2);
      this.minute = minute;
    }
  }
}

export default Clock;
