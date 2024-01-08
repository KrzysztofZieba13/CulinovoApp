class adminContentView {
  _parentElement = document.querySelector(".admin-content");
  loadAdminContent() {
    const sectionQueue = `
    <section class="section-orders--management admin">
        <span class="subtitle">Zarządzanie</span>
        <h2 class="secondary-header">Zarządzaj zamówieniami</h2>
        <div class="admin-orders"></div>
        <div class="pagination"></div>
    </section>
    `;

    const sectionMakeAdmin = `
    <section class="section-make--admin admin">
        <span class="subtitle">Konto</span>
        <h2 class="secondary-header">Dodaj admina</h2>
        <form class="make--admin-form">
          <label class="form-label" for="adminEmail">Email</label>
          <input type="email" id="adminEmail" class="form-input" />
          <button class="btn--make-admin" type="submit">Dodaj admina</button>
        </form>
    </section>
    `;

    this._parentElement.insertAdjacentHTML("beforeend", sectionQueue);
    this._parentElement.insertAdjacentHTML("beforeend", sectionMakeAdmin);
  }

  clearAdminContent() {
    const sectionQueue = document.querySelector(".section-orders--management");
    const sectionMakeAdmin = document.querySelector(".section-make--admin");
    sectionQueue.remove();
    sectionMakeAdmin.remove();
  }
}

export default new adminContentView();
