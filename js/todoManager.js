const DB_KEYWORD = "rudy-todos";

class TodoManager {
  constructor() {
    const $todoManager = document.createElement("div");
    this.$todoManager = $todoManager;

    this.db = JSON.parse(localStorage.getItem(DB_KEYWORD));
    if (!this.db) this.db = [];
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
      id: this.db[this.db.length - 1].id + 1,
      ...Todo
    });
    localStorage.setItem(DB_KEYWORD, JSON.stringify(this.db));
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
    localStorage.setItem(DB_KEYWORD, JSON.stringify(this.db));
  }

  delete(id) {
    this.db = this.db.filter(item => item.id !== +id);
    localStorage.setItem(DB_KEYWORD, JSON.stringify(this.db));
  }
}

export default TodoManager;