class CalendarTodoRenderer {
  constructor($calendar, todoManager) {
    this.$calendar = $calendar;
    this.todoManager = todoManager;

    this.month = this.$calendar.date.getMonth();
    this.year = this.$calendar.date.getFullYear();

    // move beneath to render()
    const dbCalendar = this.todoManager.dbCalendar;
    const todoOfYear = dbCalendar[this.year];
    const todoOfMonth = todoOfYear[this.month + 1];

    for (const [date, count] of Object.entries(todoOfMonth)) {
      const $wrapper = this.$calendar.$container.querySelector(
        `.calendar-day-wrapper-${date}`
      );
      for (let i = 0; i < count; i++)
        $wrapper.appendChild(document.createElement("div"));
    }

    const $dotsWrapper = document.createElement("div");
    $dotsWrapper.classList.add("calendar-dots-wrapper");
  }

  setMonth(month) {
    this.month = month;
  }

  setYear(year) {
    this.year = year;
  }

  render() {}
}

export default CalendarTodoRenderer;
