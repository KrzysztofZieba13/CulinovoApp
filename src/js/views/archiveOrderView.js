import View from "./View";

class archiveOrderView extends View {
  _closeCardBtn = document.querySelector(".archive-close");
  _cardSection = document.querySelector(".section-orders--archive");
  _archiveBtn = document.querySelector(".nav-link__archive");
  _parentElement = document.querySelector(".archive");
  _overlay = document.querySelector(".overlay");
  _archiveAccordionBar;
  _archiveAccordionContainer;

  constructor() {
    super();
    this._actionCard(this._closeCardBtn, this._archiveBtn);
  }

  showOrderListener() {
    this._archiveAccordionBar.forEach((el) => {
      el.addEventListener("click", () => {
        el.nextElementSibling.classList.toggle("hidden");
      });
    });
  }

  addUserOrdersArchiveHandler(handler) {
    this._archiveBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      this._cardSection.classList.remove("hide-section");
      this._overlay.classList.remove("hidden");
      await handler();
    });
  }

  _actionCard(closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this._cardSection.classList.add("hide-section");
      this._overlay.classList.add("hidden");
    });

    this._overlay.addEventListener("click", (e) => {
      this._cardSection.classList.add("hide-section");
      this._overlay.classList.add("hidden");
    });
  }

  render(ordersData) {
    this._clear(this._parentElement);
    this._parentElement.insertAdjacentHTML(
      "beforeend",
      this._generateMarkup(ordersData)
    );
    this._archiveAccordionBar = document.querySelectorAll(
      ".accordion--archive-bar"
    );
    this.showOrderListener();
  }

  _generateMarkup(ordersData) {
    if (!ordersData) {
      return "<div class='text'>Brak zamówień</div>";
    }
    const markup = ordersData
      .map((arr) => {
        return `
        <div class="accordion--archive-bar accordion-bar">
          ${arr[0].day}.${arr[0].month}.${arr[0].year}
          <i class="ph-accordion ph ph-caret-down"></i>
          <i class="ph-accordion ph ph-caret-up hidden"></i>
        </div>
        <div class="accordion--archive-container grid grid--4-cols hidden">
        ${arr
          .map((el) => {
            return `
            <div class="img-archive--container">
              <img
                src="${el.imagePath}"
                alt="zdjęcie posiłku z historii twoich zamówień"
                class="image-archive"
              />
            </div>
            <div class="archive-number--portions">${el.portions}x</div>
            <div class="archive-meal--title">${el.productName}</div>
            <div class="archive-meal-price">${el.productPrice}zł</div>
          `;
          })
          .join("")}
            <div class="archive--order-summary">
              <div class="archive--order-total">Całość: ${
                arr[0].totalPrice
              }zł</div>
              
            </div> 
         </div>
        `;
      })
      .join("");
    return markup;
  }
}

export default new archiveOrderView();
