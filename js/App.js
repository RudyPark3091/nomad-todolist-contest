// App is top level component that contains
// all the other child components

import MainPage from "./mainPage.js";
import Calendar from "./calendar.js";
import Paginator from "./paginator.js";
import TodoManager from "./todoManager.js";
import TodoRenderer from "./todoRenderer.js";
import { TodoRendererTemp } from "./todoRenderer.js";
import Modal from "./modal.js";
import DetailPage from "./detailPage.js";

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
    this.$detailPage = new DetailPage(
      document.querySelector("#todo"),
      this.todoManager
    );
    // this.$todoRenderer = new TodoRenderer(
    //   document.querySelector("#todo"),
    //   this.todoManager
    // );
    this.$modal = new Modal(
      this.$todoRenderer,
      this.todoManager,
      this.$landing,
      this.$calendar
    );

    this.$todoTemp = new TodoRendererTemp(
      this.$landing.$target,
      this.$calendar,
      this.$detailPage,
      this.todoManager
    );
    this.$calendar.setRenderer(todo.calendarTodoRenderer);
  }

  render() {
    this.$landing.render();
    this.$calendar.render();
    this.$detailPage.render();
    this.$modal.render();

    this.$todoTemp.render();

    this.$paginator.add(document.querySelector("#landing"));
    this.$paginator.add(this.$calendar.$target);
    this.$paginator.add(this.$detailPage.$target);
    this.$paginator.init();
  }
}

export default App;
