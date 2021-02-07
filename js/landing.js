import Clock from "./clock.js";
import LandingTodo from "./landingTodo.js";

class Landing {
  constructor($target, tasks) {
    this.$target = $target;
    this.tasks = tasks;

    this.$clock = new Clock(this.$target);
    this.$landingTodo = new LandingTodo(this.$target, this.tasks);
  }

  render() {
    this.$clock.render();
    this.$landingTodo.render();
  }
}

export default Landing;