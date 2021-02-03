class TodoManager {
  constructor($target) {
    this.$target = $target;
    const $todoManager = document.createElement("div");
    this.$todoManager = $todoManager;

    this.db = [];
  }

  getAll() {
    return this.db;
  }

  getById(id) {
    const filtered = this.db.filter(item => item.id === id);
    if (filtered.length === 1)
      return filtered;
    else
      return null;
  }

  create(Todo) {
    this.db.push(Todo);
  }

  update(id, { ...Todo }) {
    this.db.forEach(todo => {
      if (todo.id === id) {
        todo.title = Todo.title;
        todo.content = Todo.content;
        todo.done = Todo.done;
      }
    });
  }

  delete(id) {
    this.db = this.db.filter(item => item.id !== id);
  }
}

export default TodoManager;