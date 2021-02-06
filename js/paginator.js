class Paginator {
  constructor() {
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

    this.onScroll = this.onScroll.bind(this);
    document.body.onscroll = this.onScroll;
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

  onScroll() {
    document.body.style.overflowY = "scroll";

    let scroll = !this.tick;
    clearTimeout(this.tick);
    document.body.style.overflowY = "hidden";

    this.tick = setTimeout(_ => {
      this.tick = null
      document.body.style.overflowY = "scroll";
    }, 500);
    if (scroll) {
      if (
        window.scrollY - this.H > this.OFFSET &&
        window.scrollY > this.H &&
        this.H < window.innerHeight * this.count
      ) {
        // scrolling down
        this.H += window.innerHeight;
      } else if (
        this.H - window.scrollY > this.OFFSET &&
        window.scrollY < this.H &&
        this.H > 0
      ) {
        // scrolling up
        this.H -= window.innerHeight;
      }

      window.scroll({
        top: this.H,
        behavior: "smooth"
      });
    }
  }
}

export default Paginator;