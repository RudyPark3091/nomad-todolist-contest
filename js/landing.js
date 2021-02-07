import Clock from "./clock.js";
import LandingTodo from "./landingTodo.js";

class Landing {
  constructor($target, tasks) {
    this.$target = $target;
    this.tasks = tasks;

    this.$clock = new Clock(this.$target);
    this.$landingTodo = new LandingTodo(this.$target, this.tasks);

    if (window.innerWidth < window.innerHeight) {
      document.querySelector("#landing").classList.add("vertical");
    }
  }

  render() {
    this.$clock.render();
    this.$landingTodo.render();
  }
}

export default Landing;