import View from "./View";
import { auth } from "../firebaseInit";
import { getIdTokenResult, onAuthStateChanged, signOut } from "firebase/auth";

class notificationsView extends View {
  _cardSection = document.querySelector(".section--notification-card");
  _parentElement = document.querySelector(".notifications");
  _btnClose = document.querySelector(".notification-close");
  _btnOpen = document.querySelector(".nav-link__notifications");
  _notificationsAmount = document.querySelector(".notifications-amount");
  _data;

  constructor() {
    super();
    this._actionCard(this._btnClose, this._btnOpen);
  }

  addTrashHandler(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const trash = e.target.closest(".notification-trash");
      if (!trash) return;
      const userId = trash.dataset.userId;
      const orderId = trash.dataset.orderId;
      handler(userId, orderId);
    });
  }

  addNotificationHandler(handler) {
    this._btnOpen?.addEventListener("click", () => {
      handler(this._user.uid);
    });
  }

  render(data) {
    this._clear(this._parentElement);
    this._data = data;
    this._parentElement.insertAdjacentHTML("beforeend", this._generateMarkup());
    if (!this._data) return this._notificationsAmount.classList.add("hidden");
    if (this._data.length > 0) {
      this._notificationsAmount.classList.remove("hidden");
      this._notificationsAmount.innerHTML = this._data.length;
    } else {
      this._notificationsAmount.classList.add("hidden");
    }
  }

  renderNotif(handler) {
    if (!this._user) return;
    handler(this._user.uid);
  }

  _generateMarkup() {
    if (!this._data) return "<p class='text'>Brak powiadomień</p>";
    let icon;

    const markup = this._data
      .map((notif) => {
        const date = new Date(
          notif.year,
          notif.month,
          notif.day,
          notif.hour,
          notif.minute
        );
        const options = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "numeric",
          minute: "numeric",
          hour12: false,
          timeZone: "Europe/Warsaw",
        };

        const formattedDate = new Intl.DateTimeFormat("pl-PL", options).format(
          date
        );

        if (notif.decision === "W realizacji")
          icon = "<i class='ph ph-cooking-pot notification--in-progress'></i>";
        if (notif.decision === "Odrzucone")
          icon = "<i class='ph ph-x notification-rejected'></i>";
        if (notif.decision === "Oczekiwanie")
          icon = "<i class='ph ph-hourglass-medium notification-waiting'></i>";
        return `
        <div class="notification" >
          ${
            icon === `<i class='ph ph-x notification-rejected'></i>`
              ? `<i class='ph ph-trash notification-trash' data-user-id='${notif.userId}' data-order-id='${notif.orderId}'></i>`
              : ""
          }
          <div class="notification-icon">
            ${icon}
          </div>
          <div class="notification-details">
            <div class="notification-status">${notif.decision}</div>
            <div class="notification-date">
              <div class="notification-day">${formattedDate}</div>
              
            </div>
          </div>
        </div>
        `;
      })
      .join("");

    return markup;
  }
}

export default new notificationsView();
