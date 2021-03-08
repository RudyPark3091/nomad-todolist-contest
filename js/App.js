// App is top level component that contains
// all the other child components

import MainPage from "./mainPage.js";
import Calendar from "./calendar.js";
import Paginator from "./paginator.js";
import TodoManager from "./todoManager.js";
import TodoRenderer from "./todoRenderer.js";
import Modal from "./modal.js";

class App {
  constructor() {
    this.$paginator = new Paginator();
    this.todoManager = new TodoManager();
    this.$landing = new MainPage(
      document.querySelector("#landing"),
      this.todoManager
    );
    this.$calendar = new Calendar(
      document.querySelector("#calendar"),
      this.todoManager
    );
    this.$todoRenderer = new TodoRenderer(
      document.querySelector("#todo"),
      this.todoManager
    );
    this.$modal = new Modal(
      this.$todoRenderer,
      this.todoManager,
      this.$landing,
      this.$calendar
    );

    window.onload = (_) => {
      document.body.style.overflowY = "scroll";
    };

    window.onresize = (_) => {
      this.H = 0;
      window.scroll({ top: 0, behavior: "smooth" });
      document.body.style.overflowY = "scroll";

      if (window.innerWidth < window.innerHeight) {
        document.querySelector("#landing").classList.add("vertical");
      } else {
        document.querySelector("#landing").classList.remove("vertical");
      }
    };
  }

  render() {
    this.$landing.render();
    this.$calendar.render();
    this.$todoRenderer.render(this.todoManager.db);
    this.$modal.render();

    this.$paginator.add(document.querySelector("#landing"));
    this.$paginator.add(this.$calendar.$target);
    this.$paginator.add(this.$todoRenderer.$target);
    this.$paginator.init();
  }
}

export default App;
