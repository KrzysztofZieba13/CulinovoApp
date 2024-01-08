import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseInit";
import * as model from "./model.js";
import adminContentView from "./views/adminContentView.js";
import queueManagementView from "./views/queueManagementView";
import makeAdminView from "./views/makeAdminView";
import queuePaginationView from "./views/queuePaginationView";
import navigationView from "./views/navigationView.js";
import adminHeroView from "./views/adminHeroView.js";

const loadContent = function () {
  adminContentView.loadAdminContent();
};

export const controlAdminQueueManagement = async function (goToPage = 1) {
  try {
    await model.clearArray("adminQueue");
    queueManagementView.renderSpinner("beforeend");
    await model.loadQueueToAdmin();
    queueManagementView.removeSpinner();
    const result = model.getQueueResultPage(goToPage);
    queueManagementView.render(result);
    queuePaginationView.render(model.adminModel);
  } catch (err) {
    console.error(err.message);
  }
};

const controlQueueOrders = async function (action) {
  let goToPage = model.adminModel.page;
  if (
    (model.adminModel.ordersQueue.length - 1) / (goToPage * 5) < 1 &&
    model.adminModel.ordersQueue.length > 5
  ) {
    goToPage -= 1;
  }
  if (action.actionName === "inProgress") {
    model.updateInProgressInQueue(action.orderId);
    await model.clearArray("notifications");
    model.pushNotification(action.userId, action.orderId, action.decision);
  }
  if (action.actionName === "remove") {
    model.pushNotification(action.userId, action.orderId, action.decision);
    model.removeOrder(action.orderId);
    controlAdminQueueManagement(goToPage);
  }
  if (action.actionName === "accepted") {
    model.addUserOrderToOrders(action.userId, action.orderId);
    model.removeOrder(action.orderId);
    controlAdminQueueManagement(goToPage);
    await model.removeOrderFromNotification(action.userId, action.orderId);
  }
};

const controlAdminRole = function (email) {
  model.addAdminRole(email);
};

const controlPagination = function (goToPage) {
  queueManagementView.render(model.getQueueResultPage(goToPage));
  queuePaginationView.render(model.adminModel);
};

const controlLogout = function () {
  adminContentView.clearAdminContent();
};

// const controlNotification = function (userId, orderId) {
//   model.removeOrderFromNotification(userId, orderId);
// };

const init = function () {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const idTokenResult = await user.getIdTokenResult();
      if (!idTokenResult.claims.admin) return;
      loadContent();
      queueManagementView.setElements();
      controlAdminQueueManagement();
      queueManagementView.addOrderHandler(controlQueueOrders);
      queuePaginationView.setParentElement();
      queuePaginationView.addHandlerClick(controlPagination);
      makeAdminView.setElements();
      makeAdminView.addAdminHandler(controlAdminRole);
    } else {
      return;
    }
  });
  adminHeroView.onLogoutClickHandler(controlLogout);
};
init();
