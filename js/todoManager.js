class TodoManager {
  constructor(data) {
    const $todoManager = document.createElement("div");
    this.$todoManager = $todoManager;

    this.db = data;
  }

  getAll() {
    return this.db;
  }

  getById(id) {
    const filtered = this.db.filter(item => item.id === +id);
    if (filtered.length === 1)
      return filtered[0];
    else
      return null;
  }

  create({ ...Todo }) {
    this.db.push({
      id: this.db.lengnth,
      ...Todo
    });
  }

  update(id, { ...Todo }) {
    this.db.forEach(todo => {
      if (todo.id === +id) {
        if (Todo.title) todo.title = Todo.title;
        if (Todo.content) todo.content = Todo.content;
        if (Todo.due) todo.due = Todo.due;
        if (Todo.done) todo.done = Todo.done;
      }
    });
  }

  delete(id) {
    this.db = this.db.filter(item => item.id !== +id);
  }
}

export default TodoManager;