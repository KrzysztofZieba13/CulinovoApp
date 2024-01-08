import View from "./View";

class queueManagementView extends View {
  _parentElement;
  _btnCloseModal;
  _currentOrder;
  _currentModal;
  constructor() {
    super();
  }

  setElements() {
    this._parentElement = document.querySelector(".admin-orders");
    this._btnCloseModal = document.querySelector(".admin--modal-x");
  }

  addOrderHandler(handler) {
    this._parentElement.addEventListener("click", (e) => {
      e.preventDefault();
      const clickedElement = e.target;

      //close modal
      if (clickedElement?.matches(".admin--modal-x")) this._closeModal();

      //in progess order
      if (
        clickedElement
          .closest(".admin--order-action")
          ?.matches(".admin--order-progress")
      ) {
        this._inProgressOrder(clickedElement, handler);
        return;
      }

      //remove order
      if (
        clickedElement
          .closest(".admin--order-action")
          ?.matches(".admin--order-reject")
      ) {
        this._rejectOrder(clickedElement, handler);
        return;
      }

      //delivered order
      if (
        clickedElement
          .closest(".admin--order-action")
          ?.matches(".admin--order-ready")
      ) {
        this._acceptOrder(clickedElement, handler);
        return;
      }
      this._currentOrder = clickedElement.closest(".admin-order");
      if (!this._currentOrder) return;
      this._currentModal = this._currentOrder.nextElementSibling;
      this._currentModal.classList.remove("hidden");
      this._overlay.classList.remove("hidden");
      this._hideByOverlay(this._currentModal);
    });
  }

  _closeModal() {
    this._currentModal.classList.add("hidden");
    this._overlay.classList.add("hidden");
    return;
  }

  _inProgressOrder(clickedElement, handler) {
    const element = clickedElement.closest(".admin--order-actions");
    handler({
      actionName: "inProgress",
      orderId: element.dataset.orderId,
      userId: element.dataset.userId,
      decision: true,
    });
    element.querySelector(".admin--order-progress").remove();
    element.querySelector(".admin--order-reject").remove();
  }

  _rejectOrder(clickedElement, handler) {
    const element = clickedElement.closest(".admin--order-actions");
    handler({
      actionName: "remove",
      orderId: element.dataset.orderId,
      userId: element.dataset.userId,
      decision: false,
    });
  }

  _acceptOrder(clickedElement, handler) {
    const element = clickedElement.closest(".admin--order-actions");
    handler({
      actionName: "accepted",
      orderId: element.dataset.orderId,
      userId: element.dataset.userId,
    });
  }

  //hide modal after click on overlay
  _hideByOverlay(element) {
    this._overlay.addEventListener("click", () => {
      element.classList.add("hidden");
      this._overlay.classList.add("hidden");
    });
  }

  render(orders) {
    this._clear(this._parentElement);
    if (orders.length === 0)
      this._parentElement.insertAdjacentHTML(
        "afterbegin",
        `<h3 class="text" style="text-align: center;">Brak zamówień</h3>`
      );
    this._parentElement.insertAdjacentHTML(
      "afterbegin",
      this._generateMarkup(orders)
    );
  }

  _generateMarkup(orders) {
    const markup = orders
      .map((order) => {
        return `
        <div class="admin-order">
          <div class="admin--order-id">${order[0].orderId}</div>
          <div class="admin--order-actions" data-order-id="${
            order[0].orderId
          }" data-user-id="${order[0].userId}">
            ${
              order[0].inProgress
                ? ""
                : `
                  <div class="admin--order-progress admin--order-action">
                    <i class="ph ph-hourglass-medium"></i>
                  </div>         
                  <div class="admin--order-reject admin--order-action">
                    <i class="ph ph-x"></i>
                  </div>
                `
            }
            <div class="admin--order-ready admin--order-action">
              <i class="ph ph-check"></i>
            </div>
          </div>
        </div>
        ${this._generateOrderMarkup(order, order[0].orderId, order[0])}
        `;
      })
      .join("");
    return markup;
  }

  _generateOrderMarkup(orders, orderId, clientData) {
    const markup = `
        <div class="admin--order-modal hidden">
          <i class="ph ph-x admin--modal-x"></i>
          <p class="admin--order-title">Zamówienie: ${orderId}</p>
          <p class="text">Dane klienta</p>
          <div class="modal--client-data grid grid--2-cols">
            <p class="client-modal client-name">imię: ${clientData.name}</p>
            <p class="client-modal client-city">miejscowość: ${
              clientData.city
            }</p>
            <p class="client-modal client-lname">nazwisko: ${
              clientData.lastName
            }</p>
            <p class="client-modal client-street">ulica: ${
              clientData.street
            }</p>
            <p class="client-modal client--zipcode">kod: ${
              clientData.zipcode
            }</p>
            <p class="client-modal client--building-number">nr: ${
              clientData.numerBuilding
            }</p>
          </div>
          <p class="text">Zamówienie</p>
          <div class="modal--order-details">
            ${orders
              .map((order) => {
                return `
                <div class="modal--order-row">
                    <p class="client-modal client-meal">${order.productName}</p>
                    <p class="client-modal modal-portions">x${order.portions}</p>
                </div>
                `;
              })
              .join("")}
          </div>
        </div>
    `;
    return markup;
  }
}

export default new queueManagementView();
