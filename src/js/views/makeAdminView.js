class makeAdminView {
  _makeAdminForm;
  _makeAdminInput;

  addAdminHandler(handler) {
    this._makeAdminForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const adminEmail = this._makeAdminInput.value;
      handler(adminEmail);
    });
  }

  setElements() {
    this._makeAdminForm = document.querySelector(".make--admin-form");
    this._makeAdminInput = document.querySelector("#adminEmail");
  }
}

export default new makeAdminView();
