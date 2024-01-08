import * as model from "./model.js";
import { auth } from "./firebaseInit";
import authView from "./views/authView.js";
import { onAuthStateChanged } from "firebase/auth";

const controlAuth = async function (email, password, name, isRegister = false) {
  //clear all errors from register/singin form
  authView.clearErrorMessage();

  //register user
  if (isRegister) {
    authView.visiblityForm("hide", isRegister);
    authView.renderSpinner("beforeend");
    await model.authUser(email, password, isRegister, name);
    authView.removeSpinner();
    if (model.userModel.errorMessage.length > 0) {
      authView.visiblityForm("show", isRegister);
      return authView.renderErrorMessage(model.userModel.errorMessage);
    }
    authView.renderSuccessfullRegistrationFeedback();

    //move page to main page after 3 seconds
    setTimeout(() => {
      window.location.href = `http://localhost:1234/index.html`;
    }, 3000);
  }

  //Sign in user
  if (!isRegister) {
    authView.visiblityForm("hide", isRegister);
    authView.renderSpinner("beforeend");
    await model.authUser(email, password, isRegister);
    authView.removeSpinner();
    if (model.userModel.errorMessage.length > 0) {
      authView.visiblityForm("show", isRegister);
      return authView.renderErrorMessage(model.userModel.errorMessage);
    }
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        if (idTokenResult.claims.admin)
          window.location.href = `http://localhost:1234/admin.html`;
        else {
          window.location.href = `http://localhost:1234/index.html`;
        }
      }
    });
  }
};

const init = function () {
  authView.addHandlerAuth(controlAuth);
};
init();
