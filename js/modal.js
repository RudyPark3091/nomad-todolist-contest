class Modal {
  constructor($todoRenderer, todoManager, $landing) {
    this.$todoRenderer = $todoRenderer;
    this.tasks = todoManager;
    this.$landing = $landing;

    const $modal = document.createElement("div");
    $modal.id = "modal";
    $modal.classList.add("hidden");

    const $buttonWrapper = document.createElement("div");
    $buttonWrapper.id = "modal-button-wrapper";

    // close button of modal
    const $closeButton = document.createElement("button");
    $closeButton.id = "modal-close";
    $closeButton.addEventListener("click", e => {
      document.body.style.overflow = "scroll";
      $modal.classList.toggle("hidden");
      const $inputs = document.querySelectorAll("input");
      $inputs.forEach(input => {
        input.value = "";
        input.classList.remove("modal-alert");
      });
      document.querySelector("textarea").value = "";
      document.querySelector(".modal-alert-message").innerText = "";
    });

    $buttonWrapper.appendChild($closeButton);
    $buttonWrapper.appendChild(document.createElement("button"));
    $buttonWrapper.appendChild(document.createElement("button"));

    // ok button of Modal
    const $okButton = document.createElement("button");
    $okButton.id = "modal-ok";
    $okButton.innerText = "Ok";
    this.onSubmit = this.onSubmit.bind(this);
    $okButton.addEventListener("click", this.onSubmit);

    const $alert = document.createElement("div");
    $alert.style.color = "red";
    $alert.classList.add("modal-alert-message");

    this.$buttonWrapper = $buttonWrapper;
    this.$closeButton = $closeButton;
    this.$okButton = $okButton;
    this.$alert = $alert;
    this.$modal = $modal;

    // typing due date on modal
    this.$modal.addEventListener("change", e => {
      const target = e.target;
      if (
        target.classList[0] === "modal-year" ||
        target.classList[0] === "modal-month" ||
        target.classList[0] === "modal-date"
      ) {
        if (isNaN(parseInt(target.value))) {
          target.classList.add("modal-alert");
          $alert.innerText = "This todo won't be in the calendar";
        } else {
          const yes = this.validate(target.classList[0].split("-")[1], +target.value);
          if (yes) {
            target.classList.remove("modal-alert")
            $alert.innerText = "";
          } else {
            if (target.classList[1] !== "modal-alert")
              target.classList.add("modal-alert");
            $alert.innerText = "Check your due date numbers";
          }
        }
      }
    });
  }

  render() {
    let html = `
    <input class="modal-title" type="text" placeholder="title"/>
    <textarea class="modal-content" type="text" placeholder="content"></textarea>
    <div class="modal-due-wrapper">
      <span class="modal-due-span">due date: </span>
      <input class="modal-year" type="text" placeholder="year"/>
      <input class="modal-month" type="text" placeholder="month"/>
      <input class="modal-date" type="text" placeholder="date"/>
    </div>
    `;

    this.$modal.innerHTML = html;

    this.$modal.appendChild(this.$buttonWrapper);
    this.$modal.appendChild(this.$alert);
    this.$modal.appendChild(this.$okButton);
    document.body.appendChild(this.$modal);
  }

  validate(context, num) {
    if (context === "year") {
      return (num.toString().length === 4 ? true : false);
    } else if (context === "month") {
      return (0 < num && num <= 12 ? true : false);
    } else if (context === "date") {
      return (0 < num && num <= 31 ? true : false);
    }
  }

  onSubmit($todoRenderer, tasks) {
    document.body.style.overflow = "scroll";
    const $title = document.querySelector(".modal-title");
    const $content = document.querySelector(".modal-content");

    const $year = document.querySelector(".modal-year");
    const $month = document.querySelector(".modal-month");
    const $date = document.querySelector(".modal-date");

    const _id = document.querySelector("#modal").dataset.id;
    const due = `${$year.value}-${$month.value}-${$date.value}`;
    if (+_id === 0) {
      this.tasks.create({
        title: $title.value,
        content: $content.value,
        due: due,
        done: false,
      });
    } else {
      this.tasks.update(_id, {
        title: $title.value,
        content: $content.value,
        due: due,
      });
    }
    this.$todoRenderer.render(this.tasks.db);
    this.$landing.$landingTodo.render();
    
    $title.value = "";
    $content.value = "";
    $year.value = "";
    $month.value = "";
    $date.value = "";

    $year.classList.remove("modal-alert");
    $month.classList.remove("modal-alert");
    $date.classList.remove("modal-alert");
    document.querySelector(".modal-alert-message").innerText = "";

    this.$modal.classList.toggle("hidden");
  }
}

export default Modal;