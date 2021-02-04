class Modal {
  constructor(onSubmit) {
    const $modal = document.createElement("div");
    $modal.id = "modal";
    $modal.classList.add("hidden");

    const $buttonWrapper = document.createElement("div");
    $buttonWrapper.id = "modal-button-wrapper";

    const $closeButton = document.createElement("button");
    $closeButton.id = "modal-close";
    $closeButton.addEventListener("click", e => {
      $modal.classList.toggle("hidden");
    });

    $buttonWrapper.appendChild($closeButton);
    $buttonWrapper.appendChild(document.createElement("button"));
    $buttonWrapper.appendChild(document.createElement("button"));

    const $okButton = document.createElement("button");
    $okButton.id = "modal-ok";
    $okButton.innerText = "Ok";
    $okButton.addEventListener("click", onSubmit);

    const $alert = document.createElement("div");
    $alert.style.color = "red";
    $alert.classList.add("modal-alert-message");

    this.$buttonWrapper = $buttonWrapper;
    this.$closeButton = $closeButton;
    this.$okButton = $okButton;
    this.$alert = $alert;
    this.$modal = $modal;
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
          target.classList.remove("modal-alert")
          $alert.innerText = "";
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
}

export default Modal;