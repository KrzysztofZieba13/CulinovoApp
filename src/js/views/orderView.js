import View from "./View";

class orderView extends View {
  _orderCloseBtn = document.querySelector(".order-close");
  _cardSection = document.querySelector(".section-order");
  _btnCheckoutProducts = document.querySelector(".btn-checkout");
  _submitBtn = document.querySelector(".form--order-btn");
  _totalOrderValueEl = document.querySelector(".checkout--order-value");
  _totalOrderValue;
  _sectionCheckout = document.querySelector(".section-checkout");
  _overlay = document.querySelector(".overlay");
  _inputErrorSpan = document.querySelectorAll(".input-error--span");

  _nameForm = document.querySelector("#name");
  _lastNameForm = document.querySelector("#last-name");
  _addressCityForm = document.querySelector("#address-city");
  _addressStreetForm = document.querySelector("#address-street");
  _numerBuildingForm = document.querySelector("#numer-building");
  _zipcodeForm = document.querySelector("#zipcode");

  _nameError = document.querySelector(".order--error-name");
  _lastnameError = document.querySelector(".order--error-lastname");
  _cityError = document.querySelector(".order--error-city");
  _streetError = document.querySelector(".order--error-street");
  _numerBuildingError = document.querySelector(".order--error-numerBuilding");
  _zipcodeError = document.querySelector(".order--error-zipcode");

  _feedbackModal = document.querySelector(".order-feedback");

  constructor() {
    super();
    this._addListenerOrderForm();
    this._actionCard(this._orderCloseBtn);
  }

  _addListenerOrderForm() {
    this._btnCheckoutProducts.addEventListener("click", (e) => {
      e.preventDefault();
      if (this._totalOrderValueEl.dataset.checkoutLength === "0") return;
      this._totalOrderValue = this._totalOrderValueEl.dataset.totalPrice;
      if (!this._totalOrderValue) return;
      this._submitBtn.innerHTML = `Potwierdź (${this._totalOrderValue}zł)`;
      this._cardSection.classList.remove("hide-section");
    });

    this._orderCloseBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this._cardSection.classList.add("hide-section");
    });
  }

  addUserOrderHandler(handler) {
    this._submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const isLogged = this._user ? true : false;
      const inputObj = {
        name: this._nameForm.value,
        lastName: this._lastNameForm.value,
        city: this._addressCityForm.value,
        street: this._addressStreetForm.value,
        numerBuilding: this._numerBuildingForm.value,
        zipcode: this._zipcodeForm.value,
      };
      const isError = this._validateForm(inputObj);
      if (isError) return;
      this._sectionCheckout.classList.add("hide-section");
      this._cardSection.classList.add("hide-section");
      this._clearErrorMessage();
      if (!this._user) handler(this._totalOrderValue, isLogged, inputObj);
      else handler(this._totalOrderValue, isLogged, inputObj, this._user.uid);
      this._clearInputs();
      this._showFeedbackModal();
    });
  }

  _showFeedbackModal() {
    this._feedbackModal.classList.remove("hidden");
    this._overlay.addEventListener("click", () => {
      this._feedbackModal.classList.add("hidden");
    });
  }

  _validateForm(formData) {
    let isError = false;
    if (formData.name.trim().length === 0) {
      this._generateError(this._nameError);
      isError = true;
    }
    if (formData.lastName.trim().length === 0) {
      this._generateError(this._lastnameError);
      isError = true;
    }
    if (formData.city.trim().length === 0) {
      this._generateError(this._cityError);
      isError = true;
    }
    if (formData.street.trim().length === 0) {
      this._generateError(this._streetError);
      isError = true;
    }
    if (formData.numerBuilding.trim().length === 0) {
      this._generateError(this._numerBuildingError);
      isError = true;
    }
    if (formData.zipcode.trim().length === 0) {
      this._generateError(this._zipcodeError);
      isError = true;
    }
    return isError;
  }

  _generateError(element) {
    element.classList.remove("hidden-visibility");
    element.previousElementSibling.classList.add("border--error-input");
  }

  _clearErrorMessage() {
    this._inputErrorSpan.forEach((el) => {
      el.classList.add("hidden-visibility");
      el.previousElementSibling.classList.remove("border--error-input");
    });
  }

  _clearInputs() {
    this._nameForm.value = "";
    this._lastNameForm.value = "";
    this._addressCityForm.value = "";
    this._addressStreetForm.value = "";
    this._numerBuildingForm.value = "";
    this._zipcodeForm.value = "";
  }
}

export default new orderView();
