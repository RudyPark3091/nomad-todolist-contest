import Clock from "./clock.js";

class Landing {
  constructor($target) {
    this.$target = $target;
    this.$clock = new Clock(this.$target);
  }

  render() {
    this.$clock.render();
  }
}

export default Landing;