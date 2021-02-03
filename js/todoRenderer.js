class TodoRenderer {
  constructor($target, todoManager) {
    this.$target = $target;
    this.tasks = todoManager;
    const $container = document.createElement("div");
    $container.classList.add("todo-container");
    $container.onscroll = e => e.stopPropagation();
    $container.onclick = e => {
      if (e.target.className === "todo-delete") {
        this.tasks.delete(e.target.dataset.id);
        this.render(this.tasks.db);
      }
    }

    this.$container = $container;
  }

  render(data) {
    let html = "";

    data.map(item => {
      html += `
      <div class="todo-wrapper">
        <button data-id="${item.id}" class="todo-delete">X</button>
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