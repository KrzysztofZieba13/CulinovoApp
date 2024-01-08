import * as model from "./model.js";
import navigationView from "./views/navigationView.js";
import menuView from "./views/menuView.js";
import authView from "./views/authView.js";
import archiveOrderView from "./views/archiveOrderView.js";
import orderView from "./views/orderView.js";
import summaryCheckoutView from "./views/summaryCheckoutView.js";
import notificationsView from "./views/notificationsView.js";

const controlMenu = function (cat, menuAction = false) {
  menuView.render(model.state[`${cat}Menu`], cat, menuAction);
};

const controlCheckout = function (product) {
  let exist = false;
  model.checkout.forEach((item) => {
    if (item.id === product.id) {
      const curPortions = +item.portions;
      item.portions = curPortions + product.portions;
      exist = true;
    }
  });
  if (!exist) model.checkout.push(product);
  model.saveToLocalStorage("checkout", model.checkout);
  summaryCheckoutView.render(model.checkout);
};

const controlUpdateFromCheckout = async function (updateProduct) {
  model.checkout.forEach((item, i) => {
    if (item.id === updateProduct.id) item.portions = updateProduct.portions;
    if (item.portions === 0) {
      model.checkout.splice(i, 1);
    }
  });
  model.saveToLocalStorage("checkout", model.checkout);
  summaryCheckoutView.render(model.checkout);
};

const controlAddUserOrder = async function (
  totalPrice,
  isLogged,
  clientData,
  userId = false
) {
  await model.addUserOrderToQueue(totalPrice, isLogged, clientData);
  clearCheckout();
  if (!userId) return;
  await controlNotification(userId);
};

const loadLocalStorage = function () {
  const localStorageData = model.loadFromLocalStorage("checkout");

  if (localStorageData && Array.isArray(localStorageData)) {
    model.checkout.push(...localStorageData);
    summaryCheckoutView.render(model.checkout);
  }
};

export const clearCheckout = function () {
  //clear checkout from all items
  model.clearArray("checkout");
  model.saveToLocalStorage("checkout");
  summaryCheckoutView.render(model.checkout);
};

const controlUserArchive = async function () {
  try {
    await model.clearArray("orderArchive");
    archiveOrderView.renderSpinner("beforeend");
    await model.loadUserOrdersArchive();
    archiveOrderView.removeSpinner();
    archiveOrderView.render(model.userModel.ordersArchive);
  } catch (err) {
    archiveOrderView.render(false);
  }
};

const controlNotification = async function (userId) {
  const data = await model.getNotifications(userId);
  notificationsView.render(data);
};

const controlDelNotification = async function (userId, orderId) {
  await model.removeOrderFromNotification(userId, orderId);
  await controlNotification(userId);
};

const init = async function () {
  await model.loadMenu();
  menuView.addHandlerMenu(controlMenu);
  menuView.addHandlerNav(controlMenu);
  archiveOrderView.addUserOrdersArchiveHandler(controlUserArchive);
  summaryCheckoutView.addToCheckoutHandler(controlCheckout);
  summaryCheckoutView.addToCheckoutDirectlyHandler(controlUpdateFromCheckout);
  loadLocalStorage();
  summaryCheckoutView.addHandlerClearCheckout(clearCheckout);
  orderView.addUserOrderHandler(controlAddUserOrder);
  navigationView.addLogoutButtonHandler(clearCheckout);
  notificationsView.addNotificationHandler(controlNotification);
  notificationsView.addTrashHandler(controlDelNotification);
  notificationsView.renderNotif(controlNotification);
};
init();
