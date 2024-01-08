import { auth } from "../firebaseInit";
import View from "./View";
import { getIdTokenResult, onAuthStateChanged, signOut } from "firebase/auth";

class navigationView extends View {
  _nav = document.querySelector(".header");
  _btnGoTop = document.querySelector(".btn--go-top");
  _navHeight = this._nav.getBoundingClientRect();
  _header = document.querySelector(".section--landing-page");
  _fromFooterTop = document.querySelector(".footer--go-top");
  _offertOfTheDayBtn = document.querySelector(".hero-btn");
  _logo = document.querySelector(".logo");
  _logInBtn = document.querySelector(".nav-link__login");
  _logOutBtn = document.querySelector(".nav-link__logout");
  _ordersArchiveBtn = document.querySelector(".nav-link__archive");
  _notificationsBtn = document.querySelector(".nav-link__notifications");
  _adminNav = document.querySelector(".admin-nav");
  _adminHeader = document.querySelector(".admin-header");
  _adminHeroBtn;
  _user;
  _admin;

  constructor() {
    super();
    //set an observer to Auth Object
    this.getUserStateAndAction();
    this._adminNav.classList.add("hidden");
    this._initIntersectionObserver(
      (entries) => this._callbackObserver(entries, this._nav, "sticky"),
      0,
      this._navHeight.height
    );

    this._initIntersectionObserver(
      (entries) => this._callbackObserver(entries, this._btnGoTop, "visible"),
      0.7,
      0
    );

    //scroll smooth to page top after button click
    this._btnGoTop.addEventListener("click", (e) => {
      this._scrollTop(e);
    });
    //scroll smooth to page top from footer button
    this._fromFooterTop.addEventListener("click", (e) => {
      this._scrollTop(e);
    });

    this._logo.addEventListener("click", (e) => this._scrollTop(e));

    //scroll smooth to offert of the day
    if (this._offertOfTheDayBtn) {
      this._offertOfTheDayBtn.addEventListener("click", (e) => {
        this._scrollTo(e, ".hero-btn");
      });
    }

    if (this._adminHeader) {
      this._adminHeader.innerHTML = "Tylko admin";
    }
  }

  addLogoutButtonHandler(handler) {
    this._logOutBtn.addEventListener("click", () => {
      signOut(this._auth);
      handler();
    });
  }

  getUserStateAndAction() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this._user = user.uid;
        const idTokenResult = await user.getIdTokenResult();
        if (idTokenResult.claims.admin) {
          this._admin = idTokenResult.claims.admin;
          this._adminNav.classList.remove("hidden");
          if (this._adminHeader) {
            this._adminHeader.innerHTML = `Witaj, ${user.displayName}`;
          }
        }
        if (this._offertOfTheDayBtn.dataset.isAdmin === "true" && this._admin) {
          this._adminHeroBtn = document.querySelector(".admin--hero-btn");
          this._adminHeroBtn.href = "#adminContent";
        }
        this.renderNavBtn();
        if (this._ordersArchiveBtn)
          this._ordersArchiveBtn.classList.remove("hidden");
      } else {
        this._adminNav.classList.add("hidden");
        this.renderNavBtn();
        if (this._ordersArchiveBtn)
          this._ordersArchiveBtn.classList.add("hidden");
        if (this._adminHeader) {
          this._adminHeader.innerHTML = "Tylko admin";
        }
      }
    });
  }

  _initIntersectionObserver(callback, th, rootMargin) {
    const observer = new IntersectionObserver(callback.bind(this), {
      root: null,
      threshold: th,
      rootMargin: `-${rootMargin}px`,
    });

    observer.observe(this._header);
  }

  _callbackObserver(entries, element, className) {
    const [entry] = entries;

    if (!entry.isIntersecting) element.classList.add(className);
    else element.classList.remove(className);
  }

  _scrollTop(e) {
    e.preventDefault();
    this._header.scrollIntoView({ behavior: "smooth" });
  }

  _scrollTo(e, parentClass) {
    e.preventDefault();
    const clicked = e.target.closest(parentClass);
    const startsWith = clicked.getAttribute("href").startsWith("#");
    if (!startsWith && !this._admin) {
      if (this._user) signOut(this._auth);
      return (window.location.href = "http://localhost:1234/auth.html");
    }
    const scrollTo = document.querySelector(clicked.getAttribute("href"));
    if (!scrollTo) return (window.location.pathname = "auth.html");
    scrollTo.scrollIntoView({ behavior: "smooth" });
  }

  renderNavBtn() {
    if (this._user) {
      this._logInBtn.classList.add("hidden");
      this._logOutBtn.classList.remove("hidden");
      this._notificationsBtn?.classList.remove("hidden");
    } else {
      this._logInBtn.classList.remove("hidden");
      this._logOutBtn.classList.add("hidden");
      this._notificationsBtn?.classList.add("hidden");
    }
  }
}

export default new navigationView();
