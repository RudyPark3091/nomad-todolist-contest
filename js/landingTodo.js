class LandingTodo {
  constructor($target, tasks) {
    this.$target = $target;
    this.tasks = tasks;
    this.$items = [];

    const $container = document.createElement("div");
    $container.classList.add("landing-todo-container");
    this.$container = $container;

    const $empty = document.createElement("div");
    $empty.classList.add("landing-todo-empty");
    $empty.innerText = "No to-dos this month!";
    this.$empty = $empty;

    const $label = document.createElement("div");
    $label.classList.add("landing-todo-label");
    this.$label = $label;

    this.$target.appendChild(this.$container);
  }

  getMonthName(month) {
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
    return monthNames[month - 1];
  }

  getSuffix(date) {
    const suffixes = ["st", "nd", "rd"];
    let suffix = "th";
    const endNum = date % 10;
    if (0 < endNum && endNum <= 3) {
      suffix = suffixes[endNum - 1];
    }
    if (date === 11 || date === 12 || date === 13) suffix = "th";
    return suffix;
  }

  init() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    this.$label.innerText =
      `To-dos of this month - ${this.getMonthName(month)}`;

    this.$items = [];
    this.tasks.db.forEach(todo => {
      const [_year, _month, _date] = this.tasks.parseDue(todo.due);
      if (_year === year && _month === month) {
        this.$items.push({
          id: todo.id,
          date: _date,
          content: todo.content
        });
      }
    });

    this.$container.appendChild(this.$label);

    if (this.$items.length === 0) {
      // const $div = document.createElement("div");
      // $div.classList.add("landing-todo-empty");
      // $div.innerText = "No to-dos this month!";
      this.$container.appendChild(this.$empty);
    } else {
      this.$items.forEach(todo => {
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
  }

  render() {
    while (this.$container.hasChildNodes()) {
      this.$container.removeChild(this.$container.childNodes[0]);
    }
    this.$target.removeChild(this.$container);
    this.init();
    this.$target.appendChild(this.$container);
  }
}

export default LandingTodo;