// TodoManager manages 'todo items' of
// application at the top level
// every data about 'todo item' should go through this class

class TodoManager {
  DB_KEYWORD = "rudy-todos";
  DB_CAL_KEYWORD = "rudy-todos-calendar";

  constructor() {
    const $todoManager = document.createElement("div");
    this.$todoManager = $todoManager;

    this.db = JSON.parse(localStorage.getItem(this.DB_KEYWORD));
    this.dbCalendar = JSON.parse(localStorage.getItem(this.DB_CAL_KEYWORD));
    if (!this.db) this.db = [];
    if (!this.dbCalendar) this.dbCalendar = {};
  }

  parseDue(due) {
    const [year, month, date] = due.split("-").map((i) => parseInt(i));
    return [year, month, date];
  }

  getAll() {
    return this.db;
  }

  getById(id) {
    const filtered = this.db.filter((item) => item.id === +id);
    if (filtered.length === 1) return filtered[0];
    else return null;
  }

  create({ ...Todo }) {
    const _id = this.db.length ? this.db[this.db.length - 1].id + 1 : 1;
    this.db.push({
      id: _id,
      ...Todo,
    });

    const [year, month, date] = this.parseDue(Todo.due);

    if (!isNaN(year) && !isNaN(month) && !isNaN(date)) {
      if (this.dbCalendar[year] === undefined) this.dbCalendar[year] = {};
      if (this.dbCalendar[year][month] === undefined)
        this.dbCalendar[year][month] = {};

      !this.dbCalendar[year][month][date]
        ? (this.dbCalendar[year][month][date] = 1)
        : (this.dbCalendar[year][month][date] += 1);

      const $container = document.querySelector(".calendar-container");
      const $target = document.querySelector(`.calendar-day-${date}`);
      if (
        parseInt($container.dataset.month) + 1 === month &&
        parseInt($container.dataset.year) === year
      ) {
        const $d = document.createElement("div");
        $d.classList.add("calendar-dots");
        $target.appendChild($d);
      }
    }

    localStorage.setItem(this.DB_KEYWORD, JSON.stringify(this.db));
    localStorage.setItem(this.DB_CAL_KEYWORD, JSON.stringify(this.dbCalendar));
  }

  update(id, { ...Todo }) {
    this.db.forEach((todo) => {
      if (todo.id === +id) {
        let [year, month, date] = this.parseDue(todo.due);

        if (!isNaN(year) && !isNaN(month) && !isNaN(date)) {
          this.dbCalendar[year][month][date] === 1
            ? delete this.dbCalendar[year][month][date]
            : (this.dbCalendar[year][month][date] -= 1);

          let $container = document.querySelector(".calendar-container");
          let $target = document.querySelector(`.calendar-day-${date}`);
          if (
            parseInt($container.dataset.month) + 1 === month &&
            parseInt($container.dataset.year) === year
          ) {
            const $dot = $target.querySelector(".calendar-dots");
            $target.removeChild($dot);
          }
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
      if (this.dbCalendar[year][month] === undefined)
        this.dbCalendar[year][month] = {};

      !this.dbCalendar[year][month][date]
        ? (this.dbCalendar[year][month][date] = 1)
        : (this.dbCalendar[year][month][date] += 1);

      const $container = document.querySelector(".calendar-container");
      const $target = document.querySelector(`.calendar-day-${date}`);
      if (
        parseInt($container.dataset.month) + 1 === month &&
        parseInt($container.dataset.year) === year
      ) {
        const $d = document.createElement("div");
        $d.classList.add("calendar-dots");
        $target.appendChild($d);
      }
    }

    localStorage.setItem(this.DB_KEYWORD, JSON.stringify(this.db));
    localStorage.setItem(this.DB_CAL_KEYWORD, JSON.stringify(this.dbCalendar));
  }

  delete(id) {
    const item = this.db.filter((todo) => todo.id === +id);
    const [year, month, date] = this.parseDue(item[0].due);
    if (!isNaN(year) && !isNaN(month) && !isNaN(date)) {
      this.dbCalendar[year][month][date] === 1
        ? delete this.dbCalendar[year][month][date]
        : (this.dbCalendar[year][month][date] -= 1);

      const $container = document.querySelector(".calendar-container");
      const $target = document.querySelector(`.calendar-day-${date}`);
      if (
        parseInt($container.dataset.month) + 1 === month &&
        parseInt($container.dataset.year) === year
      ) {
        const $dot = $target.querySelector(".calendar-dots");
        $target.removeChild($dot);
      }
    }

    this.db = this.db.filter((todo) => todo.id !== +id);
    localStorage.setItem(this.DB_KEYWORD, JSON.stringify(this.db));
    localStorage.setItem(this.DB_CAL_KEYWORD, JSON.stringify(this.dbCalendar));
  }

  deleteAll() {
    this.db = [];
    this.dbCalendar = {};

    const $dots = document.querySelectorAll(".calendar-dots");
    $dots.forEach(($dot) => $dot.remove());

    const $_container = document.querySelector(".landing-todo-container");
    if (!document.querySelector(".landing-todo-empty")) {
      const $div = document.createElement("div");
      $div.classList.add("landing-todo-empty");
      $div.innerText = "No to-dos this month!";
      $_container.appendChild($div);
    }

    localStorage.setItem(this.DB_KEYWORD, JSON.stringify(this.db));
    localStorage.setItem(this.DB_CAL_KEYWORD, JSON.stringify(this.dbCalendar));
  }
}

export default TodoManager;
