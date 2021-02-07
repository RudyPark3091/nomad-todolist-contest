import Landing from "./landing.js";
import Calendar from "./calendar.js";
import Paginator from "./paginator.js";
import TodoManager from "./todoManager.js";
import TodoRenderer from "./todoRenderer.js";
import Modal from "./modal.js";

class Renderer {
  constructor() {
    this.$paginator = new Paginator();
    this.tasks = new TodoManager();
    this.$landing = new Landing(document.querySelector("#landing"), this.tasks);
    this.$calendar = new Calendar(document.querySelector("#calendar"), this.tasks);
    this.$todo = new TodoRenderer(document.querySelector("#todo"), this.tasks);
    this.$modal = new Modal(this.$todo, this.tasks);
  }

  render() {
    this.$landing.render();
    this.$calendar.render();
    this.$todo.render(this.tasks.db);
    this.$modal.render();

    this.$paginator.add(document.querySelector("#landing"));
    this.$paginator.add(this.$calendar.$target);
    this.$paginator.add(this.$todo.$target);
    this.$paginator.init();
  }
}

export default Renderer;