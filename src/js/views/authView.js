import View from "./View";

class authView extends View {
  _inputEmailSignIn = document.querySelector(".signIn--auth-login");
  _inputPasswordSignIn = document.querySelector(".signIn--auth-password");
  _inputEmail = document.querySelector("#inputEmail");
  _inputName = document.querySelector("#inputName");
  _inputPassword = document.querySelector("#inputPassword");
  _submitRegister = document.querySelector("#submit-register");
  _submitLogin = document.querySelector("#submit-login");
  _switchToLoginRegister = document.querySelectorAll(".switch-option");
  _authHeader = document.querySelectorAll(".auth-header");
  _authForm = document.querySelectorAll(".form-auth");
  _signinErrorEmail = document.querySelector(".signIn--error-email");
  _signinErrorPassword = document.querySelector(".signIn--error-password");
  _registerFeedback = document.querySelector(".register-feedback");
  _registerErrorEmail = document.querySelector(".register--error-email");
  _registerErrorFname = document.querySelector(".register--error-fname");
  _registerErrorPassword = document.querySelector(".register--error-password");
  _inputErrorSpan = document.querySelectorAll(".input-error--span");
  _signInBox = document.querySelector(".signIn-Box");
  _registerBox = document.querySelector(".register-Box");
  _parentElement = document.querySelector(".auth-box");
  _formError = document.querySelector(".form-error");

  constructor() {
    super();
    this._switchAuthOption();
  }

  addHandlerAuth(handler) {
    this._submitRegister.addEventListener("click", (e) => {
      e.preventDefault();
      const isRegister = true;
      handler(
        this._inputEmail.value,
        this._inputPassword.value,
        this._inputName.value,
        isRegister
      );
    });

    this._submitLogin.addEventListener("click", (e) => {
      e.preventDefault();
      handler(this._inputEmailSignIn.value, this._inputPasswordSignIn.value);
    });
  }

  _switchAuthOption() {
    this._switchToLoginRegister.forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        this._authForm.forEach((el) => el.classList.toggle("hidden"));
        this._authHeader.forEach((el) => el.classList.toggle("hidden"));
        this.clearErrorMessage();
      });
    });
  }

  renderErrorMessage(message) {
    if (message.includes("auth/email-already-in-use")) {
      this._renderErrorStyles(
        this._registerErrorEmail,
        "Email jest już zajęty!"
      );
    }
    if (message.includes("auth/invalid-email")) {
      const message = "Błąd! Wprowadź poprawny email";
      this._renderErrorStyles(this._registerErrorEmail, message);
      this._renderErrorStyles(this._signinErrorEmail, message);
    }
    if (message.includes("auth/weak-password")) {
      this._renderErrorStyles(
        this._registerErrorPassword,
        "Słabe hasło(minimum 6 znaków)"
      );
    }
    if (message.includes("auth/internal-error")) {
      this._renderErrorStyles(
        this._formError,
        "Błąd Serwera! Sprobuj ponowenie później lub skontaktuj się z administratorem"
      );
    }
    if (message.includes("auth/invalid-name")) {
      this._renderErrorStyles(
        this._registerErrorFname,
        "Błąd! Wprowadź prawidłowe imię"
      );
    }
    if (message.includes("auth/invalid-login-credentials")) {
      this._renderErrorStyles(
        this._formError,
        "Błąd! Wprowadzone dane są nieprawidłowe lub nie istnieją"
      );
    }
    if (message.includes("auth/missing-password")) {
      this._renderErrorStyles(
        this._signinErrorPassword,
        "Błąd! Wprowadź hasło"
      );
    }

    if (message.includes("auth/network-request-failed")) {
      this._renderErrorStyles(
        this._formError,
        "Problem z połączeniem! Sprobuj ponowenie później lub skontaktuj się z dostawcą internetu"
      );
    }
  }

  clearErrorMessage() {
    this._inputErrorSpan.forEach((el) => {
      el.classList.add("hidden-visibility");
      el.previousElementSibling.classList.remove("border--error-input");
    });
  }

  _renderErrorStyles(element, text) {
    element.classList.remove("hidden-visibility");
    element.textContent = text;
    element.previousElementSibling.classList.add("border--error-input");
  }

  renderSuccessfullRegistrationFeedback() {
    this._authHeader.forEach((el) => el.classList.add("hidden"));
    this._authForm.forEach((el) => el.classList.add("hidden"));
    this._registerFeedback.classList.remove("hidden");
  }
}

export default new authView();
