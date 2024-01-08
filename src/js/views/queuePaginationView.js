import View from "./View";

class queuePaginationView extends View {
  _parentElement;
  _data;
  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".page-btns");
      if (!btn) return;
      if (btn.classList.contains("disabled")) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  setParentElement() {
    this._parentElement = document.querySelector(".pagination");
  }

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear(this._parentElement);
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.ordersQueue.length / this._data.ordersPerPage
    );

    //Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
        <div class="prev-page page-btns disabled">Cofnij</div>
        <div class="page-number">${curPage}/${numPages}</div>
        <div class="next-page page-btns" data-goto="${curPage + 1}">Dalej</div>
        `;
    }

    //Last page
    if (curPage === numPages && numPages > 1) {
      return `
        <div class="prev-page page-btns" data-goto="${curPage - 1}">Cofnij</div>
        <div class="page-number">${curPage}/${numPages}</div>
        <div class="next-page page-btns disabled">Dalej</div>
        `;
    }

    //Other page
    if (curPage < numPages) {
      return `
        <div class="prev-page page-btns" data-goto="${curPage - 1}">Cofnij</div>
        <div class="page-number">${curPage}/${numPages}</div>
        <div class="next-page page-btns" data-goto="${curPage + 1}">Dalej</div>
        `;
    }

    return "";
  }
}

export default new queuePaginationView();
