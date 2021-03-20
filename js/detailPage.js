import DetailTodoRenderer from "./detailTodoRenderer.js";

class DetailPage {
  constructor($target, todoManager) {
    this.$target = $target;
    this.todoManager = todoManager;

    this.$container = document.createElement("div");
  }

  render() {
    this.$target.appendChild(this.$container);
  }
}

export default DetailPage;
