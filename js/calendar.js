const getLastDay = (year, month) => {
  if (month === 1) {
    return (year % 4 === 0 ? 29 : 28);
  } else if (month === 3 || month === 5 || month === 8 || month === 10) {
    return 30;
  } else {
    return 31;
  }
}

class Calendar {
  date = null;
  container = null;

  constructor($target, todoManager) {
    this.setDate(new Date());
    this.tasks = todoManager;

    this.$target = $target;
    this.handlePrevMonth = this.handlePrevMonth.bind(this);
    this.handleNextMonth = this.handleNextMonth.bind(this);
    this.init(this.date, true);
    $target.appendChild(this.$container);
  }

  setDate(date) {
    this.date = date;
  }

  handlePrevMonth(e) {
    const year = this.date.getFullYear();
    const month = this.date.getMonth();
    const newYear = month === 0 ? year - 1 : year;
    const newMonth = month === 0 ? 11 : month - 1;

    const newDate = new Date(newYear, newMonth);
    this.setDate(newDate);
    console.log(this.$container);
    this.$target.removeChild(this.$container);
    this.init(this.date, false);
    this.$target.appendChild(this.$container);
  }

  handleNextMonth(e) {
    const year = this.date.getFullYear();
    const month = this.date.getMonth();
    const newYear = month === 11 ? year + 1 : year;
    const newMonth = month === 11 ? 0 : month + 1;

    const newDate = new Date(newYear, newMonth);
    this.setDate(newDate);
    console.log(this.$container);
    this.$target.removeChild(this.$container);
    this.init(this.date, false);
    this.$target.appendChild(this.$container);
  }

  init(date, isToday) {
    const $container = document.createElement("div");
    $container.classList.add("calendar-container");

    const _year = date.getFullYear();
    const _month = date.getMonth();
    const _last = getLastDay(_year, _month);

    const monthlyFirstDay = new Date(_year, _month);
    const _first = monthlyFirstDay.getDay();

    const days = [];
    for (let i = 0; i < _first; i++) {
      days.push(-1);
    }

    for (let i = 1; i <= _last; i++) {
      days.push(i);
    }

    days.forEach(day => {
      const $div = document.createElement("div");
      if (day !== -1) $div.innerText = day;
      if (isToday && day === date.getDay())
        $div.classList.add("calendar-today");
      $container.appendChild($div);
    })

    this.$container = $container;
  }

  render() {
    const prevButton = document.createElement("button");
    prevButton.classList.add("calendar-prev");
    prevButton.innerText = "<";
    prevButton.dataset.year = this.date.getFullYear();
    prevButton.dataset.month = this.date.getMonth();
    prevButton.addEventListener("click", this.handlePrevMonth);

    const nextButton = document.createElement("button");
    nextButton.classList.add("calendar-next");
    nextButton.innerText = ">";
    nextButton.dataset.year = this.date.getFullYear();
    nextButton.dataset.month = this.date.getMonth();
    nextButton.addEventListener("click", this.handleNextMonth);

    this.$target.appendChild(prevButton);
    this.$target.appendChild(this.$container);
    this.$target.appendChild(nextButton);
  }
}

export default Calendar;