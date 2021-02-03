import Calendar from "./calendar.js";
import Paginator from "./paginator.js";

class Renderer {
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
        console.log("operation here");
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
  }

  render() {
    this.$calendar.render();
    this.$paginator.add(this.$calendar.$target);
    this.$paginator.add(document.querySelector("#todo"));
    this.$paginator.init();
  }
}

export default Renderer;