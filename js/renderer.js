import Calendar from "./calendar.js";
import Paginator from "./paginator.js";
import Todo from "./todo.js";
import TodoManager from "./todoManager.js";
import TodoRenderer from "./todoRenderer.js";
import Modal from "./modal.js";

class Renderer {
  data = [
    new Todo({
      id: 1,
      title: "item 1",
      content: "say hi",
      due: "2020-10-11",
      done: false,
    }),
    new Todo({
      id: 2,
      title: "item 2",
      content: "say hi",
      due: "2020-10-11",
      done: false,
    }),
    new Todo({
      id: 3,
      content: "item with no title",
      due: "2020-10-11",
      done: false,
    }),
    new Todo({
      id: 4,
      title: "item 4",
      content: "some loooooooooooooooooooooooong content",
      due: "2020-10-11",
      done: false,
    }),
  ];

  constructor($target) {
    this.$paginator = new Paginator(e => {
      document.body.style.overflowY = "scroll";
      if (window.scrollY - this.$paginator.H > this.$paginator.OFFSET) {
        document.body.style.overflowY = "hidden";
      } else if (this.$paginator.H - window.scrollY > this.$paginator.OFFSET) {
        document.body.style.overflowY = "hidden";
      }

      if (this.$paginator.tick) clearTimeout(this.$paginator.tick);

      this.$paginator.tick = setTimeout(_ => {
        if (
          window.scrollY > this.$paginator.H &&
          this.$paginator.H < window.innerHeight * this.$paginator.count
        ) {
          // scrolling down
          this.$paginator.H += window.innerHeight;
        } else if (window.scrollY < this.$paginator.H && this.$paginator.H > 0) {
          // scrolling up
          this.$paginator.H -= window.innerHeight;
        }

        window.scroll({
          top: this.$paginator.H,
          behavior: "smooth"
        });
      }, 200);
    });
    this.$calendar = new Calendar(document.querySelector("#calendar"));
    this.tasks = new TodoManager(this.data);
    this.$todo = new TodoRenderer(document.querySelector("#todo"), this.tasks);
    this.$modal = new Modal(e => {
      const $title = document.querySelector(".modal-title");
      const $content = document.querySelector(".modal-content");

      const $year = document.querySelector(".modal-year");
      const $month = document.querySelector(".modal-month");
      const $date = document.querySelector(".modal-date");

      const _id = document.querySelector("#modal").dataset.id;
      const due = `${$year.value}-${$month.value}-${$date.value}`;
      this.tasks.update(_id, {
        title: $title.value,
        content: $content.value,
        due: due,
      });
      this.$todo.render(this.data);
      
      $title.value = "";
      $content.value = "";
      $year.value = "";
      $month.value = "";
      $date.value = "";

      $year.classList.remove("modal-alert");
      $month.classList.remove("modal-alert");
      $date.classList.remove("modal-alert");

      this.$modal.$modal.classList.toggle("hidden");
    });
  }

  render() {
    this.$calendar.render();
    this.$todo.render(this.data);
    this.$modal.render();
    this.$paginator.add(this.$calendar.$target);
    this.$paginator.add(this.$todo.$target);
    this.$paginator.init();
  }
}

export default Renderer;