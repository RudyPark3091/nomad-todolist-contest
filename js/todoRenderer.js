class TodoRenderer {
  constructor($target, todoManager) {
    this.$target = $target;
    this.tasks = todoManager;
    const $container = document.createElement("div");
    $container.classList.add("todo-container");
    $container.onscroll = e => e.stopPropagation();
    $container.onclick = e => {
      e.stopPropagation();
      if (e.target.className === "todo-delete") {
        this.tasks.delete(e.target.dataset.id);
        this.render(this.tasks.db);
      } else if (e.target.className === "todo-update") {
        const $modal = document.querySelector("#modal");
        $modal.classList.toggle("hidden");
        $modal.dataset.id = e.target.dataset.id;
      } else if (e.target.className === "todo-add-button") {
        const $modal = document.querySelector("#modal");
        $modal.classList.toggle("hidden");
        $modal.dataset.id = 0;
      }
    }

    const $addButton = document.createElement("button");
    $addButton.classList.add("todo-add-button");
    $addButton.innerText = "+";
    this.$addButton = $addButton;

    this.$container = $container;
  }

  render(data) {
    let html = "";

    data.map(item => {
      html += `
      <div class="todo-wrapper">
        <button data-id="${item.id}" class="todo-delete"></button>
        <button data-id="${item.id}" class="todo-update"></button>
        <div class="todo-due">${item.due}</div>
        <div class="todo-item">
          ${item.title ? `<span class="todo-title">${item.title}</span>` : ""}
          <span class="todo-content">${item.content}</span>
        </div>
      </div>
      `;
    })

    this.$container.innerHTML = html;
    this.$container.appendChild(this.$addButton);
    this.$target.appendChild(this.$container);
  }
}

export default TodoRenderer;