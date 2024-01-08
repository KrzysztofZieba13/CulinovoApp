import View from "./View";

class menuView extends View {
  _data;
  _parentElement = document.querySelector(".accordion");
  _spinnerElement = document.querySelector(".spinner");
  _heroRightNav = document.querySelector(".hero--right-nav");

  //menu field clicked in hero section
  addHandlerNav(handler) {
    this._heroRightNav.addEventListener("click", (e) => {
      e.preventDefault();
      const menuPanelField = e.target.closest(".menu--panel-field");
      if (!menuPanelField.dataset.cat) return;

      //page navigation
      document
        .querySelector(menuPanelField.getAttribute("href"))
        .scrollIntoView({ behavior: "smooth" });
      handler(menuPanelField.dataset.cat, true);
    });
  }

  //menu bar clicked directly in menu
  addHandlerMenu(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const accordionBar = e.target.closest(".accordion-bar");
      if (!accordionBar) return;
      handler(accordionBar.dataset.cat);
    });
  }

  render(data, cat, navAction = false) {
    if (!data) return;
    this._data = data;
    const markup = this._generateMarkup(cat);
    const accordionMenuContainer = document.querySelector(`.menu-${cat}`);

    accordionMenuContainer.classList.toggle("active");
    //change arrows on menu bar up to down OR down to up
    this._toggleArrows(accordionMenuContainer.previousElementSibling);

    //Guard if statement, prevents multiplying items in menu
    if (!accordionMenuContainer.classList.contains("active")) {
      this._clear(accordionMenuContainer);
      accordionMenuContainer.classList.add("hidden");
      if (!navAction) return;
      this._toggleArrows(accordionMenuContainer.previousElementSibling);
      accordionMenuContainer.classList.add("active");
    }
    accordionMenuContainer.insertAdjacentHTML("afterbegin", markup);
    const spinnerElement = this._generateSpinner(accordionMenuContainer);

    //Don't display until image is loaded
    const img = accordionMenuContainer.querySelector(".product-img");
    img.addEventListener("load", () => {
      spinnerElement.classList.add("hidden");
      accordionMenuContainer.classList.remove("hidden");
      spinnerElement.remove();
    });
  }

  _generateMarkup(cat) {
    const length = this._data.length;
    const markup = this._data.map(
      (product, i) => `
        <div class="${
          i === length - 1 ? "ac" : "accordion-context"
        } grid grid--2-cols">
          <div class="menu--product-details">
            <h3 class="third-header product-header">
              ${product.name}         
            </h3>
            <p class="text ingredients">(${product.ingredients.join(", ")})</p>
            <p class="text accordion--product-description">
              ${product.description}
            </p>
            <p class="text accordion--product-price">${product.price}zł</p>
            <form class="accordion-form">
              <button type="button" class="update-portions decrease-portion" data-update-to="minus">-</button>
              <input
                type="number"
                placeholder="1"
                class="input-portions accordion--input-portions"
                value="1"
                
              />
              <button type="button" class="update-portions increase-portion" data-update-to="plus">+</button>
              <button class="add--to-basket" data-id="${
                product.id
              }" data-cat="${cat}" data-image-path="${
        product.imagePath
      }" data-name="${product.name}", data-price="${product.price}">
                Dodaj <i class="ph ph-basket ph--basket-add"></i>
              </button>
            </form>
          </div>
          <div class="product--image-container">
            <img
              src=${product.imagePath}
              class="product-img"
              alt="zdjęcie pizzy"
            />
          </div>
        </div>
    `
    );
    return markup.join("");
  }

  _generateSpinner(parentElement) {
    parentElement.insertAdjacentHTML("afterend", '<div class="spinner"></div>');
    return document.querySelector(".spinner");
  }

  _toggleArrows(element) {
    element
      .querySelectorAll(".ph-accordion")
      .forEach((arrow) => arrow.classList.toggle("hidden"));
  }
}

export default new menuView();
