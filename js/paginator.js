class Paginator {
  constructor() {
    // HTML elements being paginated
    this.$items = [];
    // length of $items;
    this.count = 0;
    // presents scroll amount
    this.H = 0;
    // amount of pixel to activate scroll
    this.OFFSET = 1;
    // variable for scroll debouncing
    this.tick = null;
    this.isChrome = navigator.userAgent.indexOf("Chrome") !== -1;

    this.onScroll = this.onScroll.bind(this);
  }

  add($item) {
    this.$items.push($item);
    this.count += 1;
  }

  init() {
    this.$items.forEach(item => {
      item.classList.add("paginated");
    });

    document.body.onscroll = this.onScroll;
  }

  onScroll() {
    let scroll = !this.tick;
    clearTimeout(this.tick);
    document.body.style.overflow = "hidden";

    this.tick = setTimeout(_ => {
      this.tick = null
      document.body.style.overflow = "scroll";
    }, this.isChrome ? 500 : 1000);

    if (scroll) {
      if (
        window.scrollY - this.H >= this.OFFSET &&
        window.scrollY > this.H
      ) {
        this.H += window.innerHeight;
      } else if (
        this.H - window.scrollY >= this.OFFSET &&
        window.scrollY < this.H
      ) {
        this.H -= window.innerHeight;
      }

      window.scroll({ top: this.H, behavior: "smooth" });
    }
  }
}

export default Paginator;