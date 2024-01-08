import View from "./View";

class checkoutView extends View {
  _checkoutBtn = document.querySelector(".nav-link__basket");
  _cardSection = document.querySelector(".section-checkout");
  _checkoutCloseBtn = document.querySelector(".checkout-close");
  _checkoutTrash = document.querySelector(".trash-btn");
  _checkoutItemsInBasket = document.querySelector(".items--in-basket");
  _parentElement = document.querySelector(".checkout-items");
  _accordion = document.querySelector(".accordion");
  _orderValue = document.querySelector(".checkout--order-value");
  _totalPrice = 0;
  _orders;
  _btnFormOrder = document.querySelector(".form--order-btn");
  _orderSection = document.querySelector(".section-order");

  constructor() {
    super();
    this._actionCard(this._checkoutCloseBtn, this._checkoutBtn);
    this._updatePortions(this._accordion);
    this._updatePortions(this._parentElement);
  }

  //change portions directly from checkout
  addToCheckoutDirectlyHandler(handler) {
    //function execute directly from checkout
    this._parentElement.addEventListener("keydown", (e) => {
      //function is updating portions after input numer of portions and accept value by clicking enter
      //enter code: 13
      if (e.keyCode !== 13) return;
      e.preventDefault();
      const inputBtn = e.target.closest(".input-portions");
      if (!inputBtn) return;
      const portions = +inputBtn.value;
      if (portions <= 0) return;
      const id = inputBtn.dataset.id;
      handler({ id, portions });
    });

    this._parentElement.addEventListener("click", (e) => {
      //function is updating portions after clicking on + or -
      const updateBtn = e.target.closest(".checkout-portion");
      if (!updateBtn) return;
      const inputElement =
        updateBtn.parentNode.querySelector(".input-portions");
      const portions = +inputElement.value;
      const id = inputElement.dataset.id;
      handler({ id, portions });
    });
  }

  //clear localstorage and remove everything from checkout array in model
  addHandlerClearCheckout(handler) {
    this._checkoutTrash.addEventListener("click", () => {
      handler();
    });
  }

  //update portions after click from main page
  _updatePortions(element) {
    element.addEventListener("click", (e) => {
      const updateBtn = e.target.closest(".update-portions");
      if (!updateBtn) return;
      //remove portion
      if (updateBtn.dataset.updateTo === "minus") {
        const inputValue =
          +updateBtn.parentNode.querySelector(".input-portions").value;
        if (inputValue - 1 < 0) return;
        updateBtn.parentNode.querySelector(".input-portions").value =
          inputValue - 1;
        return;
      }
      //add portion
      const inputValue =
        +updateBtn.parentNode.querySelector(".input-portions").value;
      updateBtn.parentNode.querySelector(".input-portions").value =
        inputValue + 1;
    });
  }

  //add to checkout
  addToCheckoutHandler(handler) {
    this._accordion.addEventListener("click", (e) => {
      e.preventDefault();
      const btn = e.target.closest(".add--to-basket");
      if (!btn) return;
      const portions = +btn.parentNode.querySelector(".input-portions").value;
      if (portions <= 0) return;
      const imagePath = btn.dataset.imagePath;
      const productName = btn.dataset.name;
      const productPrice = +btn.dataset.price;
      handler({
        id: btn.dataset.id,
        category: btn.dataset.cat,
        portions,
        imagePath,
        productName,
        productPrice,
      });
    });
  }

  render(orders) {
    this._orders = orders;
    this._orderValue.dataset.checkoutLength = this._orders.length;
    this._clear(this._parentElement);
    this._parentElement.insertAdjacentHTML(
      "afterbegin",
      this._generateMarkup(orders)
    );
    this.updateTotalOrders(orders);
    if (orders.length > 0) {
      this._checkoutItemsInBasket.classList.remove("hidden");
      this._checkoutItemsInBasket.innerHTML = orders.length;
    } else {
      this._checkoutItemsInBasket.classList.add("hidden");
    }
  }

  _generateMarkup(orders) {
    const markup = orders.map((order) => {
      return `
      <div class="checkout--summary-item" >
          <div class="checkout-image">
          <img
              src="${order.imagePath}"
              alt="Zdjęcie poglądowe twojego posiłku dodanego do koszyka"
          />
          </div>
          <div class="checkout--order-deatils">
          <h3 class="checkout--order-header">${order.productName}</h3>
          <form class="checkout-form">
              <button type="button" class="update-portions decrease-portion checkout-portion" data-update-to="minus">
              -
              </button>
              <input
              type="number"
              value="${order.portions}"
              class="checkout--input-portions input-portions accordion--input-portions"
              data-id=${order.id}

              />
              <button type="button" class="update-portions increase-portion checkout-portion" data-update-to="plus">
              +
              </button>
          </form>
          </div>
          <p class="checkout--order-price">${(
            Math.ceil(order.productPrice * order.portions * 100) / 100
          ).toFixed(2)}zł</p>
      </div>`;
    });
    return markup.join("");
  }

  updateTotalOrders(orders) {
    const price = orders.reduce(
      (total, order) => total + order.productPrice * order.portions,
      0
    );
    this._totalPrice = price;
    const formatedPrice = this._totalPrice.toFixed(2);
    this._orderValue.dataset.totalPrice = formatedPrice;
    this._orderValue.innerHTML = `Zamów (${formatedPrice}zł)`;
  }
}

export default new checkoutView();
