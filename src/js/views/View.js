import { auth } from "../firebaseInit";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default class View {
  _overlay = document.querySelector(".overlay");
  _auth;
  _user;

  constructor() {
    this._auth = auth;
    onAuthStateChanged(this._auth, (user) => {
      if (user) {
        this._user = user;
        document
          .querySelector(".feedback-notification")
          ?.classList.remove("hidden");
      } else {
        this._user = null;
        document
          .querySelector(".feedback-notification")
          ?.classList.add("hidden");
      }
    });
  }

  renderSpinner(place) {
    this._parentElement.insertAdjacentHTML(
      place,
      '<div class="spinner"></div>'
    );
  }

  removeSpinner() {
    document.querySelector(".spinner").remove();
  }

  _clear(element) {
    element.innerHTML = "";
  }

  //hide form after clicking "zarejestruj" or "zaloguj" and show if error occur
  visiblityForm(action, isRegister) {
    //hide forms for regsiter and signIn
    if (action === "hide")
      document.querySelectorAll(".form-auth").forEach((el) => {
        el.classList.add("hidden");
      });

    //show form again if error occured (for registration)
    if (action === "show" && isRegister) {
      this._registerBox.classList.remove("hidden");
      this._signInBox.classList.add("hidden");
    }

    //show form again if error occured (for signIn)
    if (action === "show" && !isRegister) {
      this._signInBox.classList.remove("hidden");
      this._registerBox.classList.add("hidden");
    }
  }

  //open (by clicking nav icon), close(by clicking X button or on overlay)
  _actionCard(closeBtn, openBtn) {
    closeBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      this._cardSection.classList.add("hide-section");
      this._overlay.classList.add("hidden");
    });

    if (openBtn) {
      openBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this._cardSection.classList.remove("hide-section");
        this._overlay.classList.remove("hidden");
      });
    }

    this._overlay.addEventListener("click", (e) => {
      this._cardSection.classList.add("hide-section");
      this._overlay.classList.add("hidden");
    });
  }
}
