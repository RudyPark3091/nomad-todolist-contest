class LandingTodo {
  constructor($target, tasks) {
    this.$target = $target;
    this.tasks = tasks;
    this.$items = [];

    const $label = document.createElement("div");
    $label.classList.add("landing-todo-label");
    this.$label = $label;

    this.$container.appendChild($label);

    this.init();
  }

  init() {
    const $container = document.createElement("div");
    $container.classList.add("landing-todo-container");
    this.$container = $container;

    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const monthNames = [
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
    this.$label.innerText = `< To-dos of this month - ${monthNames[month - 1]} >`;

    this.tasks.db.forEach(todo => {
      const [_year, _month, _date] = this.tasks.parseDue(todo.due);
      if (_year === year && _month === month) {
        this.$items.push({
          date: _date,
          content: todo.content
        });
      }
    });

    this.$items.forEach(todo => {
      const $div = document.createElement("div");
      $div.classList.add("landing-todo-wrapper");

      const $span = document.createElement("div");
      const suffixes = ["st", "nd", "rd"];
      let suffix = "th";
      const endNum = todo.date % 10;
      if (0 < endNum && endNum <= 3) {
        suffix = suffixes[endNum - 1];
      }
      $span.innerText = `by ${todo.date}${suffix}`;
      $div.innerText = todo.content;
      $div.appendChild($span);

      this.$container.appendChild($div);
    });
  }

  render() {
    this.$target.appendChild(this.$container);
  }
}

export default LandingTodo;