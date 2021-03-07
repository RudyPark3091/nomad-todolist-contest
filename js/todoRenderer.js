class TodoRenderer {
  constructor($target, todoManager) {
    this.$target = $target;
    this.todoManager = todoManager;
    const $container = document.createElement("div");
    $container.classList.add("todo-container");

    $container.onclick = (e) => {
      e.stopPropagation();
      // deletes todo
      if (e.target.className === "todo-delete") {
        const yes = confirm("Are you sure to delete this todo?");
        if (!yes) return;

        this.todoManager.delete(e.target.dataset.id);
        this.render(this.todoManager.db);

        // remove tooltips
        const $tooltip = document.querySelector(
          `.calendar-tooltip > div[data-id="${e.target.dataset.id}"]`
        );
        try {
          const $parent = $tooltip.parentElement;
          $tooltip.remove();
          if (!$parent.hasChildNodes()) $parent.remove();
        } catch (e) {
          // ignores this error
          // if present calendar view is not same with
          // deleting todo's due month above removal of
          // element will make error
        }

        // remove todo's of this month
        const $items = Array.from(
          document.querySelectorAll(".landing-todo-wrapper")
        );

        try {
          $items
            .filter((item) => item.dataset.id === e.target.dataset.id)[0]
            .remove();
        } catch (e) {
          // ignores this error
          // if deleting todo's due month is not this month
          // element removal above will make error
        }
      }
      // shows modal for updating todo
      else if (e.target.className === "todo-update") {
        document.body.style.overflow = "hidden";

        const $modal = document.querySelector("#modal");
        $modal.classList.toggle("hidden");
        const _id = e.target.dataset.id;
        $modal.dataset.id = _id;

        const item = this.todoManager.getById(_id);
        $modal.querySelector(".modal-title").value = item.title;
        $modal.querySelector(".modal-content").value = item.content;
        const _due = item.due.split("-");
        $modal.querySelector(".modal-year").value = _due[0];
        $modal.querySelector(".modal-month").value = _due[1];
        $modal.querySelector(".modal-date").value = _due[2];
      }
      // shows modal for adding new todo
      else if (e.target.className === "todo-add-button") {
        document.body.style.overflow = "hidden";
        const $modal = document.querySelector("#modal");
        $modal.classList.toggle("hidden");
        $modal.dataset.id = 0;
      }
      // deletes all todos
      else if (e.target.className === "todo-deleteall-button") {
        const yes = confirm("Are you sure to delete all todos?");
        if (!yes) return;

        let $todos = document.querySelectorAll(".todo-wrapper");
        $todos.forEach(($todo) => $todo.remove());
        $todos = document.querySelectorAll(".landing-todo-wrapper");
        $todos.forEach(($todo) => $todo.remove());
        this.todoManager.deleteAll();
        this.render(this.todoManager.db);
      }
    };

    const $addButton = document.createElement("button");
    $addButton.classList.add("todo-add-button");
    $addButton.innerText = "+";
    this.$addButton = $addButton;

    const $deleteButton = document.createElement("button");
    $deleteButton.classList.add("todo-deleteall-button");
    $deleteButton.innerText = "X";
    this.$deleteButton = $deleteButton;

    this.$container = $container;
  }

  render(data) {
    let html = "";

    if (data.length === 0) {
      html =
        '<div class="todo-empty">No to-dos yet!<br>Click on top right button and add one :)</div>';
      this.$container.classList.add("todo-empty");
    } else {
      data.forEach((item) => {
        html += `
        <div class="todo-wrapper">
          <button data-id="${item.id}" class="todo-delete"></button>
          <button data-id="${item.id}" class="todo-update"></button>
          <div class="todo-due">${item.due}</div>
          <div class="todo-item">
            ${item.title ? `<span class="todo-title">${item.title}</span>` : ""}
            ${
              item.content
                ? `<span class="todo-content">${item.content}</span>`
                : ""
            }
          </div>
        </div>
        `;
      });
      this.$container.classList.remove("todo-empty");
    }

    this.$container.innerHTML = html;
    this.$container.appendChild(this.$addButton);
    this.$container.appendChild(this.$deleteButton);
    this.$target.appendChild(this.$container);
  }
}

export default TodoRenderer;
