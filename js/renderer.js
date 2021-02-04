import Calendar from "./calendar.js";
import Paginator from "./paginator.js";
import Todo from "./todo.js";
import TodoManager from "./todoManager.js";
import TodoRenderer from "./todoRenderer.js";

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
  }

  render() {
    this.$calendar.render();
    this.$todo.render(this.data);
    this.$paginator.add(this.$calendar.$target);
    this.$paginator.add(this.$todo.$target);
    this.$paginator.init();
  }
}

export default Renderer;