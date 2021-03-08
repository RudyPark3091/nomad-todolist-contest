// MainPage manages main page of application
// contains clock and 'todo items of the month'

import Clock from "./clock.js";
import LandingTodo from "./landingTodo.js";

class MainPage {
  constructor($target, todoManager) {
    this.$target = $target;
    this.todoManager = todoManager;

    this.$clock = new Clock(this.$target);
    this.$landingTodo = new LandingTodo(this.$target, this.todoManager);

    if (window.innerWidth < window.innerHeight) {
      document.querySelector("#landing").classList.add("vertical");
    }
  }

  render() {
    this.$clock.render();
    this.$landingTodo.render();
  }
}

export default MainPage;
