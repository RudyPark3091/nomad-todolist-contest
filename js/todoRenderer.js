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
        const _id = e.target.dataset.id;
        $modal.dataset.id = _id;

        const item = this.tasks.getById(_id);
        $modal.querySelector(".modal-title").value = item.title;
        $modal.querySelector(".modal-content").value = item.content;
        const _due = item.due.split("-");
        $modal.querySelector(".modal-year").value = _due[0];
        $modal.querySelector(".modal-month").value = _due[1];
        $modal.querySelector(".modal-date").value = _due[2];
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

    data.forEach(item => {
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