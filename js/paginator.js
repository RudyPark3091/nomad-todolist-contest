// Paginator makes application 'one-page-scrollable'
// not needed if application would be refactored to a SPA

class Paginator {
  constructor() {
    // HTML elements being paginated
    this.$items = [];
    // length of $items;
    this.count = 0;
  }

  add($item) {
    this.$items.push($item);
    this.count += 1;
  }

  init() {
    this.$items.forEach((item) => {
      item.classList.add("paginated");
    });
  }
}

export default Paginator;
