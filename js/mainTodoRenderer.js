class MainTodoRenderer {
  constructor($target, todoManager) {
    this.$target = $target;
    this.todoManager = todoManager;

    this.$container = document.createElement("div");
    this.$container.classList.add("landing-todo-container");

    this.$empty = document.createElement("div");
    this.$empty.classList.add("landing-todo-empty");
    this.$empty.innerText = "No to-dos this month!";

    this.$label = document.createElement("div");
    this.$label.classList.add("landing-todo-label");

    this.$todoElements = [];
  }

  render() {
    while (this.$container.hasChildNodes()) {
      this.$container.removeChild(this.$container.childNodes[0]);
    }

    const db = this.todoManager.db;

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    this.$label.innerText = `Todos of ${this.getMonthName(month)}`;

    const items = [];
    db.forEach((todo) => {
      const [_year, _month, _date] = this.todoManager.parseDue(todo.due);
      if (_year === year && _month === month) {
        items.push({
          id: todo.id,
          date: _date,
          content: todo.content,
        });
      }
    });

    this.$container.appendChild(this.$label);
    if (items.length === 0) {
      this.$container.appendChild(this.$empty);
    } else {
      items.forEach((todo) => {
        const $div = document.createElement("div");
        $div.classList.add("landing-todo-wrapper");
        $div.dataset.id = todo.id;

        const $span = document.createElement("div");
        $span.innerText = `by ${todo.date}${this.getSuffix(todo.date)}`;
        $div.innerText = todo.content;
        $div.appendChild($span);

        this.$container.appendChild($div);
      });
    }

    this.$target.appendChild(this.$container);
  }

  getMonthName(month) {
    const names = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return names[month - 1];
  }

  getSuffix(date) {
    if (date === 11 || date === 12 || date === 13) return "th";
    switch (date % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }
}

export default MainTodoRenderer;
