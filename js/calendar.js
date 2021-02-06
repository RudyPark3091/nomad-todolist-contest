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
  today = new Date();

  constructor($target, todoManager) {
    this.setDate(new Date());
    this.tasks = todoManager;

    const $label = document.createElement("div");
    $label.innerText =
      `${this.date.getMonth() + 1} / ${this.date.getFullYear()}`;
    this.$label = $label;

    this.$target = $target;
    this.init(this.date, true);

    this.handlePrevMonth = this.handlePrevMonth.bind(this);
    this.handleNextMonth = this.handleNextMonth.bind(this);
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

    this.$target.removeChild(this.$container);
    this.init(
      this.date,
      this.today.getFullYear() === newYear && this.today.getMonth() === newMonth
    );
    this.$target.appendChild(this.$container);
  }

  handleNextMonth(e) {
    const year = this.date.getFullYear();
    const month = this.date.getMonth();
    const newYear = month === 11 ? year + 1 : year;
    const newMonth = month === 11 ? 0 : month + 1;

    const newDate = new Date(newYear, newMonth);
    this.setDate(newDate);
    this.$target.removeChild(this.$container);
    this.init(
      this.date,
      this.today.getFullYear() === newYear && this.today.getMonth() === newMonth
    );
    this.$target.appendChild(this.$container);
  }

  init(date, isToday) {
    this.$label.innerText =
      `${this.date.getMonth() + 1} / ${this.date.getFullYear()}`;
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

    let db;
    let target, amt, dots;
    let idx = 0;

    try {
      db = this.tasks.dbCalendar[_year][_month + 1];
      if (db !== undefined) {
        target = Object.keys(db);
        amt = Object.values(db)
        dots = true;
      }
    } catch(e) {
      dots = false;
    }

    days.forEach(day => {
      const $div = document.createElement("div");
      if (day !== -1) $div.innerText = day;
      if (isToday && day === this.today.getDate())
        $div.classList.add("calendar-today");

      const $dot = document.createElement("div");
      $dot.classList.add("calendar-dots-wrapper");
      $dot.classList.add(`calendar-day-${day}`);

      if (dots && day === +target[idx]) {
        
        for (let i = 0; i < amt[idx]; i++) {
          const $d = document.createElement("div");
          $d.classList.add("calendar-dots");
          $dot.appendChild($d);
        }

        idx += 1;
      }

      $div.appendChild($dot);
      $container.appendChild($div);
    });

    $container.dataset.month = _month;
    $container.dataset.year = _year;
    this.$container = $container;
  }

  render() {
    const $wrapper = document.createElement("div");
    $wrapper.classList.add("calendar-label-wrapper");

    const $prevButton = document.createElement("button");
    $prevButton.classList.add("calendar-prev");
    $prevButton.innerText = "<";
    $prevButton.addEventListener("click", this.handlePrevMonth);

    const $nextButton = document.createElement("button");
    $nextButton.classList.add("calendar-next");
    $nextButton.innerText = ">";
    $nextButton.addEventListener("click", this.handleNextMonth);

    $wrapper.appendChild($prevButton);
    $wrapper.appendChild(this.$label);
    $wrapper.appendChild($nextButton);

    this.$target.appendChild($wrapper);
    this.$target.appendChild(this.$container);
  }
}

export default Calendar;