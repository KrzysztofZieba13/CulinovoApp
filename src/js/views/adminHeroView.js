import { auth } from "../firebaseInit";
import { getIdTokenResult, onAuthStateChanged, signOut } from "firebase/auth";

class adminHeroView {
  _adminNav = document.querySelector(".admin-nav");
  _adminHeader = document.querySelector(".admin-header");
  _adminHeroBtn = document.querySelector(".admin--hero-btn");
  _adminLogoutBtn = document.querySelector(".admin-logout");
  _adminLoginBtn = document.querySelector(".admin-login");
  _user;

  constructor() {
    this.getUserStateAndAction();
  }

  onLogoutClickHandler(handler) {
    this._adminLogoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this._adminHeroBtn.href = "auth.html";
      handler();
      signOut(auth);
      this._adminLoginBtn.classList.remove("hidden");
      this._adminLogoutBtn.classList.add("hidden");
    });
  }

  getUserStateAndAction() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this._user = user.uid;
        this._adminHeroBtn = document.querySelector(".admin--hero-btn");
        const idTokenResult = await user.getIdTokenResult();
        if (idTokenResult.claims.admin) {
          this._adminNav.classList.remove("hidden");
          this._adminHeader.innerHTML = `Witaj, ${user.displayName} `;
        }
      } else {
        this._adminNav.classList.add("hidden");
        this._adminHeader.innerHTML = "Tylko admin";
      }
    });
  }
}

export default new adminHeroView();
