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
    this.$todoRenderer = new TodoRenderer(document.querySelector("#todo"), this.tasks);
    this.$modal = new Modal(this.$todoRenderer, this.tasks, this.$landing, this.$calendar);

    window.onload = _ => {
      document.body.style.overflowY = "scroll";
    }

    window.onresize = _ => {
      this.H = 0;
      window.scroll({ top: 0, behavior: "smooth" });
      document.body.style.overflowY = "scroll";

      if (window.innerWidth < window.innerHeight) {
        document.querySelector("#landing").classList.add("vertical");
      } else {
        document.querySelector("#landing").classList.remove("vertical");
      }
    }
  }

  render() {
    this.$landing.render();
    this.$calendar.render();
    this.$todoRenderer.render(this.tasks.db);
    this.$modal.render();

    this.$paginator.add(document.querySelector("#landing"));
    this.$paginator.add(this.$calendar.$target);
    this.$paginator.add(this.$todoRenderer.$target);
    this.$paginator.init();
  }
}

export default Renderer;