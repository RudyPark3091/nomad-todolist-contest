// to render numbers properly,
// make sure $target's background color is
// not transparent
class Clock {
  constructor($target) {
    this.$target = $target;

    this.PIXEL = parseInt(
      Math.max(window.innerWidth / 50, window.innerHeight / 50)
    );
    this.CANVAS_WIDTH = this.PIXEL * 17;
    this.CANVAS_HEIGHT = this.PIXEL * 5;

    this.color = "#888";
    this.bgColor = window.getComputedStyle(
      document.querySelector("#landing")
    ).backgroundColor;

    const $canvas = document.createElement("canvas");
    $canvas.setAttribute("width", this.CANVAS_WIDTH);
    $canvas.setAttribute("height", this.CANVAS_HEIGHT);

    this.ctx = $canvas.getContext("2d");
    this.ctx.fillStyle = this.color;
    this.$canvas = $canvas;

    this.hour = -1;
    this.minute = -1;
    this.second = -1;

    this.tick();
    setInterval(() => this.tick(), 1000);
  }

  render() {
    this.ctx.fillRect(this.PIXEL * 8, this.PIXEL, this.PIXEL, this.PIXEL);
    this.ctx.fillRect(this.PIXEL * 8, this.PIXEL * 3, this.PIXEL, this.PIXEL);
    this.$target.appendChild(this.$canvas);
  }

  draw(num, pos) {
    this.ctx.fillStyle = this.color;
    switch (num) {
      case 0:
        this.ctx.fillRect(pos, 0, this.PIXEL * 3, this.PIXEL);
        this.ctx.fillRect(pos, this.PIXEL, this.PIXEL, this.PIXEL * 3);
        this.ctx.fillRect(
          pos + this.PIXEL * 2,
          this.PIXEL,
          this.PIXEL,
          this.PIXEL * 3
        );
        this.ctx.fillRect(pos, this.PIXEL * 4, this.PIXEL * 3, this.PIXEL);
        break;

      case 1:
        this.ctx.fillRect(pos + this.PIXEL * 2, 0, this.PIXEL, this.PIXEL * 5);
        break;

      case 2:
        this.ctx.fillRect(pos, 0, this.PIXEL * 3, this.PIXEL);
        this.ctx.fillRect(
          pos + this.PIXEL * 2,
          this.PIXEL,
          this.PIXEL,
          this.PIXEL
        );
        this.ctx.fillRect(pos, this.PIXEL * 2, this.PIXEL * 3, this.PIXEL);
        this.ctx.fillRect(pos, this.PIXEL * 3, this.PIXEL, this.PIXEL);
        this.ctx.fillRect(pos, this.PIXEL * 4, this.PIXEL * 3, this.PIXEL);
        break;

      case 3:
        this.ctx.fillRect(pos, 0, this.PIXEL * 3, this.PIXEL);
        this.ctx.fillRect(
          pos + this.PIXEL * 2,
          this.PIXEL,
          this.PIXEL,
          this.PIXEL
        );
        this.ctx.fillRect(pos, this.PIXEL * 2, this.PIXEL * 3, this.PIXEL);
        this.ctx.fillRect(
          pos + this.PIXEL * 2,
          this.PIXEL * 3,
          this.PIXEL,
          this.PIXEL
        );
        this.ctx.fillRect(pos, this.PIXEL * 4, this.PIXEL * 3, this.PIXEL);
        break;

      case 4:
        this.ctx.fillRect(pos + this.PIXEL * 2, 0, this.PIXEL, this.PIXEL * 5);
        this.ctx.fillRect(pos, 0, this.PIXEL, this.PIXEL * 3);
        this.ctx.fillRect(
          pos + this.PIXEL,
          this.PIXEL * 2,
          this.PIXEL,
          this.PIXEL
        );
        break;

      case 5:
        this.ctx.fillRect(pos, 0, this.PIXEL * 3, this.PIXEL);
        this.ctx.fillRect(pos, this.PIXEL, this.PIXEL, this.PIXEL);
        this.ctx.fillRect(pos, this.PIXEL * 2, this.PIXEL * 3, this.PIXEL);
        this.ctx.fillRect(
          pos + this.PIXEL * 2,
          this.PIXEL * 3,
          this.PIXEL,
          this.PIXEL
        );
        this.ctx.fillRect(pos, this.PIXEL * 4, this.PIXEL * 3, this.PIXEL);
        break;

      case 6:
        this.ctx.fillRect(pos, 0, this.PIXEL * 3, this.PIXEL);
        this.ctx.fillRect(pos, this.PIXEL, this.PIXEL, this.PIXEL);
        this.ctx.fillRect(pos, this.PIXEL * 2, this.PIXEL * 3, this.PIXEL);
        this.ctx.fillRect(pos, this.PIXEL * 3, this.PIXEL, this.PIXEL);
        this.ctx.fillRect(
          pos + this.PIXEL * 2,
          this.PIXEL * 3,
          this.PIXEL,
          this.PIXEL
        );
        this.ctx.fillRect(pos, this.PIXEL * 4, this.PIXEL * 3, this.PIXEL);
        break;

      case 7:
        this.ctx.fillRect(pos + this.PIXEL * 2, 0, this.PIXEL, this.PIXEL * 5);
        this.ctx.fillRect(pos, 0, this.PIXEL * 2, this.PIXEL);
        break;

      case 8:
        this.ctx.fillRect(pos, 0, this.PIXEL * 3, this.PIXEL);
        this.ctx.fillRect(pos, this.PIXEL, this.PIXEL, this.PIXEL);
        this.ctx.fillRect(
          pos + this.PIXEL * 2,
          this.PIXEL,
          this.PIXEL,
          this.PIXEL
        );
        this.ctx.fillRect(pos, this.PIXEL * 2, this.PIXEL * 3, this.PIXEL);
        this.ctx.fillRect(pos, this.PIXEL * 3, this.PIXEL, this.PIXEL);
        this.ctx.fillRect(
          pos + this.PIXEL * 2,
          this.PIXEL * 3,
          this.PIXEL,
          this.PIXEL
        );
        this.ctx.fillRect(pos, this.PIXEL * 4, this.PIXEL * 3, this.PIXEL);
        break;

      case 9:
        this.ctx.fillRect(pos, 0, this.PIXEL * 3, this.PIXEL);
        this.ctx.fillRect(pos, this.PIXEL, this.PIXEL, this.PIXEL);
        this.ctx.fillRect(
          pos + this.PIXEL * 2,
          this.PIXEL,
          this.PIXEL,
          this.PIXEL
        );
        this.ctx.fillRect(pos, this.PIXEL * 2, this.PIXEL * 3, this.PIXEL);
        this.ctx.fillRect(
          pos + this.PIXEL * 2,
          this.PIXEL * 3,
          this.PIXEL,
          this.PIXEL
        );
        this.ctx.fillRect(pos, this.PIXEL * 4, this.PIXEL * 3, this.PIXEL);
        break;
    }
  }

  clearHour() {
    this.ctx.fillStyle = this.bgColor;
    this.ctx.fillRect(0, 0, this.PIXEL * 7, this.$canvas.height);
    this.ctx.fillStyle = this.color;
  }

  clearMinute() {
    this.ctx.fillStyle = this.bgColor;
    this.ctx.fillRect(this.PIXEL * 10, 0, this.PIXEL * 7, this.$canvas.height);
    this.ctx.fillStyle = this.color;
  }

  tick() {
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();

    if (hour !== this.hour) {
      const slot1 = 0;
      const slot2 = this.PIXEL * 4;

      this.clearHour();
      this.draw(hour < 10 ? 0 : parseInt(hour / 10), slot1);
      this.draw(hour % 10, slot2);
      this.hour = hour;
    }
    if (minute !== this.minute) {
      const slot1 = this.PIXEL * 10;
      const slot2 = this.PIXEL * 14;

      this.clearMinute();
      this.draw(minute < 10 ? 0 : parseInt(minute / 10), slot1);
      this.draw(minute % 10, slot2);
      this.minute = minute;
    }
  }
}

export default Clock;
