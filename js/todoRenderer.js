class TodoRenderer {
  constructor($target, todoManager) {
    this.$target = $target;
    this.tasks = todoManager;
    const $container = document.createElement("div");
    $container.classList.add("todo-container");
    $container.onscroll = e => e.stopPropagation();

    this.$container = $container;
  }

  render(data) {
    let html = "";

    data.map(item => {
      html += `
      <div class="todo-wrapper">
        <span class="todo-title">${item.title}</span>
        <span class="todo-content">${item.content}</span>
        <span class="todo-due">${item.due}</span>
      </div>
      `;
    })

    this.$container.innerHTML = html;
    this.$target.appendChild(this.$container);
  }
}

export default TodoRenderer;