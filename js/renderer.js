import Calendar from "./calendar.js";

class Renderer {
  constructor($target) {
    this.$calendar = new Calendar(document.querySelector("#calendar"));
  }

  render() {
    this.$calendar.render();
  }
}

export default Renderer;