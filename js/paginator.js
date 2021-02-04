class Paginator {
  constructor(onScroll) {
    this.onScroll = onScroll
    // HTML elements being paginated
    this.$items = [];
    // length of item;
    this.count = 0;
    // present scroll amount
    this.H = 0;
    window.onload = _ => {
      document.body.style.overflowY = "scroll";
    }

    window.onresize = _ => {
      this.H = 0;
      window.scroll({ top: 0, behavior: "smooth" });
      document.body.style.overflowY = "scroll";
    }
    // amount of pixel to activate scroll
    this.OFFSET = 1;
    // variable for scroll debouncing
    this.tick = null;

    document.body.onscroll = onScroll;
  }

  add($item) {
    this.$items.push($item);
    this.count += 1;
  }

  init() {
    this.$items.forEach(item => {
      item.classList.add("paginated");
    });
  }
}

export default Paginator;