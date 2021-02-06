const DB_KEYWORD = "rudy-todos";
const DB_CAL_KEYWORD = "rudy-todos-calendar";

class TodoManager {
  constructor() {
    const $todoManager = document.createElement("div");
    this.$todoManager = $todoManager;

    this.db = JSON.parse(localStorage.getItem(DB_KEYWORD));
    this.dbCalendar = JSON.parse(localStorage.getItem(DB_CAL_KEYWORD));
    if (!this.db) this.db = [];
    if (!this.dbCalendar) this.dbCalendar = {};
  }

  parseDue(due) {
    const [year, month, date] = due.split("-").map(i => parseInt(i));
    return [year, month, date];
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
    const _id = this.db.length ? this.db[this.db.length - 1].id + 1 : 1;
    this.db.push({
      id: _id,
      ...Todo
    });

    const [year, month, date] = this.parseDue(Todo.due);

    if (!isNaN(year) && !isNaN(month) && !isNaN(date)) {
      if (this.dbCalendar[year] === undefined) this.dbCalendar[year] = {};
      if (this.dbCalendar[year][month] === undefined) this.dbCalendar[year][month] = {};

      !this.dbCalendar[year][month][date] ?
        this.dbCalendar[year][month][date] = 1 :
        this.dbCalendar[year][month][date] += 1;
    }

    localStorage.setItem(DB_KEYWORD, JSON.stringify(this.db));
    localStorage.setItem(DB_CAL_KEYWORD, JSON.stringify(this.dbCalendar));
  }

  update(id, { ...Todo }) {
    this.db.forEach(todo => {
      if (todo.id === +id) {
        const [year, month, date] = this.parseDue(todo.due);

        if (!isNaN(year) && !isNaN(month) && !isNaN(date)) {
          this.dbCalendar[year][month][date] === 1 ?
            delete this.dbCalendar[year][month][date] :
            this.dbCalendar[year][month][date] -= 1;
        }

        if (Todo.title) todo.title = Todo.title;
        if (Todo.content) todo.content = Todo.content;
        if (Todo.due) todo.due = Todo.due;
        if (Todo.done) todo.done = Todo.done;
      }
    });

    const [year, month, date] = this.parseDue(Todo.due);

    if (!isNaN(year) && !isNaN(month) && !isNaN(date)) {
      if (this.dbCalendar[year] === undefined) this.dbCalendar[year] = {};
      if (this.dbCalendar[year][month] === undefined) this.dbCalendar[year][month] = {};

      !this.dbCalendar[year][month][date] ?
        this.dbCalendar[year][month][date] = 1 :
        this.dbCalendar[year][month][date] += 1;
    }

    localStorage.setItem(DB_KEYWORD, JSON.stringify(this.db));
    localStorage.setItem(DB_CAL_KEYWORD, JSON.stringify(this.dbCalendar));
  }

  delete(id) {
    const item = this.db.filter(todo => todo.id === +id);
    const [year, month, date] = this.parseDue(item[0].due);
    if (!isNaN(year) && !isNaN(month) && !isNaN(date)) {
      this.dbCalendar[year][month][date] === 1 ?
        delete this.dbCalendar[year][month][date] :
        this.dbCalendar[year][month][date] -= 1;
    }
    this.db = this.db.filter(todo => todo.id !== +id);
    localStorage.setItem(DB_KEYWORD, JSON.stringify(this.db));
    localStorage.setItem(DB_CAL_KEYWORD, JSON.stringify(this.dbCalendar));
  }
}

export default TodoManager;