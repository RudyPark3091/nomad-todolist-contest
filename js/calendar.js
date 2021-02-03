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

  constructor($target) {
    this.setDate(new Date());
    this.$target = $target;
    this.init(this.date, true);
    $target.appendChild(this.$container);
  }

  handlePrevMonth(e) {
    const _month = +e.target.dataset.month;
    const _year = +e.target.dataset.year;

    const _prevYear = _month === 0 ? _year - 1 : _year;
    const _prevMonth = _month === 0 ? 11 : _month - 1;
    e.target.dataset.year = _prevYear;
    e.target.dataset.month = _prevMonth;

    const _d = new Date(_prevYear, _prevMonth);
    const _first = _d.getDay();
    const _last = getLastDay(_prevYear, _prevMonth);

    const $target = document.querySelector(".calendar-container");
    $target.innerHTML = "";
    const _days = [];
    for (let i = 0; i < _first; i++) {
      _days.push(-1);
    }

    for (let i = 1; i <= _last; i++) {
      _days.push(i);
    }

    _days.forEach(day => {
      const $div = document.createElement("div");
      if (day !== -1) $div.innerText = day;
      $target.appendChild($div);
    });
  }

  handleNextMonth(e) {
    const _month = +e.target.dataset.month;
    const _year = +e.target.dataset.year;

    const _nextYear = _month === 11 ? _year + 1 : _year;
    const _nextMonth = _month === 11 ? 0 : _month + 1;
    e.target.dataset.year = _nextYear;
    e.target.dataset.month = _nextMonth;

    const _d = new Date(_nextYear, _nextMonth);
    const _first = _d.getDay();
    const _last = getLastDay(_nextYear, _nextMonth);

    const $target = document.querySelector(".calendar-container");
    $target.innerHTML = "";
    const _days = [];
    for (let i = 0; i < _first; i++) {
      _days.push(-1);
    }

    for (let i = 1; i <= _last; i++) {
      _days.push(i);
    }

    _days.forEach(day => {
      const $div = document.createElement("div");
      if (day !== -1) $div.innerText = day;
      $target.appendChild($div);
    });
  }

  init(d, isThisMonth) {
    const $container = document.createElement("div");
    $container.classList.add("calendar-container");

    const today = d;
    const _year = today.getFullYear();
    const _month = today.getMonth();
    const _last = getLastDay(_year, _month);

    const monthlyFirstDay = new Date(_year, _month);
    const _first = monthlyFirstDay.getDate();

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
      if (isThisMonth && day === today.getDay())
        $div.classList.add("calendar-today");
      $container.appendChild($div);
    })

    this.$container = $container;
  }

  setDate(date) {
    this.date = date;
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