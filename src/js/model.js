import { app } from "./firebaseInit";
import {
  getDatabase,
  ref,
  child,
  get,
  update,
  push,
  remove,
} from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import "firebase/functions";
import { getFunctions, httpsCallable } from "firebase/functions";

//models
export const state = {
  pizzaMenu: [],
  burgersMenu: [],
  pastaMenu: [],
  seafoodMenu: [],
  dessertsMenu: [],
  hotDrinksMenu: [],
};
export const checkout = [];
export const userModel = {
  user: {
    admin: false,
  },
  errorMessage: [],
  ordersArchive: [],
  notifications: [],
};
export const adminModel = {
  ordersQueue: [],
  page: 1,
  ordersPerPage: 5,
  allOrders: [],
};

//instances
const auth = getAuth(app);
const db = getDatabase(app);
const functionInstance = getFunctions(app);

//functions
export const loadMenu = async function () {
  try {
    let snapshot = await get(child(ref(db), `products/pizza`));
    state.pizzaMenu = Object.values(snapshot.val());
    snapshot = await get(child(ref(db), `products/burgers`));
    state.burgersMenu = Object.values(snapshot.val());
    snapshot = await get(child(ref(db), `products/pasta`));
    state.pastaMenu = Object.values(snapshot.val());
    snapshot = await get(child(ref(db), `products/seafood`));
    state.seafoodMenu = Object.values(snapshot.val());
    snapshot = await get(child(ref(db), `products/desserts`));
    state.dessertsMenu = Object.values(snapshot.val());
    snapshot = await get(child(ref(db), `products/hotDrinks`));
    state.hotDrinksMenu = Object.values(snapshot.val());
    if (!snapshot.exists()) throw new Error("No data availalbe ;(");
  } catch (err) {
    console.error(err);
  }
};

export const authUser = async function (
  email,
  password,
  isRegistration = false,
  name = ""
) {
  try {
    //clear error message array
    userModel.errorMessage = [];

    //SIGN IN
    if (!isRegistration) {
      validateForm({ email, password, name: null, isRegistration });

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
    }

    //REGISTRATION
    if (isRegistration) {
      // const accountsSnapshot = await get(child(ref(db), `accounts/`));
      // validateForm({ email, password, name, isRegistration }, accountsSnapshot);
      validateForm({ email, password, name, isRegistration });

      //protect against register without username, execute only when error is invalid name
      if (
        userModel.errorMessage.includes("auth/invalid-name") &&
        userModel.errorMessage.length === 1
      )
        return;

      //try to register new user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      //add user to accounts realtime database
      addAccountToRDB(userCredential, email);

      // create display name for new registered user which is his name
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
    }
  } catch (err) {
    const errorCode = err.code;
    userModel.errorMessage.push(errorCode);
  }
};

// const validateForm = function (authData, accountsSnapshot) {
const validateForm = function (authData) {
  userModel.errorMessage = [];

  //check for registration
  if (authData.isRegistration) {
    //check if email exist
    // if (Object.values(accountsSnapshot.val()).includes(authData.email))
    //   userModel.errorMessage.push("auth/email-already-in-use");

    //check if password is strong enough
    if (authData.password.length < 6)
      userModel.errorMessage.push("auth/weak-password");

    //check if Name is empty
    if (authData.name.trim().length === 0) {
      userModel.errorMessage.push("auth/invalid-name");
    }
  }

  //check for signIn
  if (!authData.isRegistration) {
    if (authData.password.trim().length === 0)
      userModel.errorMessage.push("auth/missing-password");
  }
};

const addAccountToRDB = function (key, email) {
  //add to realtime database on firebase
  const newUserRef = ref(db, `accounts/`);
  update(newUserRef, { [key.user.uid]: email });
};

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const idTokenResult = await user.getIdTokenResult();
    userModel.user.admin = idTokenResult.claims.admin;
    userModel.user = user;
  }
});

const userOrdersQueueRef = function (path = "") {
  return ref(db, `queueOrders/${path}`);
};

const userOrdersRef = function (userId) {
  return ref(db, `orders/${userId}`);
};

const notificationsRef = function (path) {
  return ref(db, `notifications/${path}`);
};

export const addUserOrderToQueue = async function (
  tprice,
  isLogged,
  clientData
) {
  const date = new Date();
  const userId = isLogged ? userModel.user.uid : "unauthenticated";
  checkout[0] = {
    ...checkout[0],
    userId,
    inProgress: false,
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    totalPrice: tprice,
    ...clientData,
  };

  const reference = userOrdersQueueRef();
  const newOrderKey = push(reference).key;
  checkout[0].orderId = newOrderKey;
  update(reference, {
    [newOrderKey]: checkout,
  });
  if (checkout[0].userId === "unauthenticated") return;
  await pushNotification(checkout[0].userId, checkout[0].orderId);
};

//after admin clicked on klepsydra change inPorgress field to true and update UI
export const updateInProgressInQueue = function (orderId) {
  const reference = userOrdersQueueRef(`${orderId}/0/`);
  update(reference, { inProgress: true });
};

export const addUserOrderToOrders = async function (userId, orderId) {
  const orderRef = ref(db, `orders/${userId}`);
  const queueOrderRef = ref(db, `queueOrders/${orderId}`);
  const snapshotQueue = await get(queueOrderRef);
  update(orderRef, { [orderId]: snapshotQueue.val() });
};

//push notification to get user know about his order
export const pushNotification = async function (
  userId,
  orderId,
  decision = "waiting"
) {
  const notificationRef = notificationsRef(userId);
  const queueRef = ref(db, `queueOrders/${orderId}/0/`);
  const snap = await get(queueRef);
  const data = snap.val();
  let decisionOrder;
  if (decision === true) decisionOrder = "W realizacji";
  if (decision === false) decisionOrder = "Odrzucone";
  if (decision === "waiting") decisionOrder = "Oczekiwanie";
  update(notificationRef, {
    [orderId]: {
      decision: decisionOrder,
      accepted: false,
      year: data.year,
      month: data.month,
      day: data.day,
      hour: data.hour,
      minute: data.minute,
      userId,
      orderId,
    },
  });
};

export const updateNotification = function (userId, orderId) {
  const notificationRef = notificationsRef(`${userId}/${orderId}`);
  update(notificationRef, { accepted: true });
};

export const getNotifications = async function (userId) {
  const ref = notificationsRef(userId);
  try {
    const snapshot = await get(ref);
    userModel.notifications = Object.values(snapshot.val()).reverse();
    return userModel.notifications;
  } catch (err) {
    return;
  }
};

export const getAllOrders = async function () {
  const ref = userOrdersRef();
  try {
    const snapshot = await get(ref);
    adminModel.allOrders = Object.values(snapshot.val());
    return adminModel.allOrders;
  } catch (err) {
    return;
  }
};

//Load orders to archive by user
export const loadUserOrdersArchive = async function () {
  const reference = userOrdersRef(userModel.user.uid);
  const snapshot = await get(reference);
  if (!snapshot.val()) throw new Error("nie działa");
  userModel.ordersArchive = Object.values(snapshot.val()).reverse();
};

//Load ALL orders from queue to admin management panel
export const loadQueueToAdmin = async function () {
  const reference = userOrdersQueueRef();
  const snapshot = await get(reference);
  if (!snapshot.val()) return;
  adminModel.ordersQueue = Object.values(snapshot.val());
  adminModel.page = 1;
};

//get amount of orders in queue to display
export const getQueueResultPage = function (page = adminModel.page) {
  adminModel.page = page;
  const start = (page - 1) * adminModel.ordersPerPage;
  const end = page * adminModel.ordersPerPage;

  return adminModel.ordersQueue.slice(start, end);
};

//delete order by admin
export const removeOrder = function (orderId) {
  const reference = userOrdersQueueRef(orderId);
  remove(reference);
};

//delete notification by admin or by user (if order was rejected)
export const removeOrderFromNotification = async function (userId, orderId) {
  const reference = notificationsRef(`${userId}/${orderId}`);
  await remove(reference);
  clearArray("notifications");
  userModel.notifications = await getNotifications(userId);
};

//save to local storage
export const saveToLocalStorage = function (key, objValue) {
  localStorage.setItem(key, JSON.stringify(objValue));
};

//loading local storage
export const loadFromLocalStorage = function (key) {
  const localStorageItems = localStorage.getItem(key);
  if (localStorageItems === "undefined") return;
  return localStorageItems ? JSON.parse(localStorageItems) : [];
};

//clear array
export const clearArray = function (arr) {
  return new Promise((resolve, _) => {
    if (arr === "checkout") checkout.splice(0, checkout.length);
    if (arr === "orderArchive")
      userModel.ordersArchive.splice(0, userModel.ordersArchive.length);
    if (arr === "adminQueue")
      adminModel.ordersQueue.splice(0, adminModel.ordersQueue.length);
    if (arr === "notifications")
      userModel.notifications?.splice(0, userModel.notifications.length);
    resolve();
  });
};

export const addAdminRole = async function (email) {
  const cloudFunction = httpsCallable(functionInstance, "addAdminRole");
  const result = await cloudFunction({ email });
};
