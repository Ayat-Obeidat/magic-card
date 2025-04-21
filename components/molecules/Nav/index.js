import { createElement } from "../../../utils/index.js";
import { NavLink } from "../../atoms/NavLink/index.js";
import { BurgerIcon } from "../../atoms/BurgerIcon/index.js";
import { Button } from "../../atoms/Button/index.js";
import { APP_PAGES } from "../../../constants/index.js";

export class Nav {
  constructor() {
    this._navBar = createElement("nav", { className: "navbar" });
    this.toggleButton = new Button("🌓", () => {
      console.log("clicked!");
      this.toggleThemeLight();
    });
    this.toggleButton.addClassName("theme-toggle");

    this.logo = createElement(
      "div",
      {
        className: "logo nav-link",
      },
      "MTG Cards"
    );

    // theme-toggle class
    //navThemeToggle id
    this.linksContainer = createElement("div", { className: "nav-links" });

    this.links = APP_PAGES.map(({ text, href }) => {
      const link = new NavLink(text, href);
      this.linksContainer.appendChild(link.element);
      return link;
    });

    this.burger = new BurgerIcon(() => this.toggleMenu());
    this._navBar.append(
      this.logo,
      this.burger.element,
      this.linksContainer,
      this.toggleButton.element
    );

    window.addEventListener("hashchange", () => this.updateActiveLink());
    window.addEventListener("load", () => this.updateActiveLink());
    this.updateActiveLink();
  }

  toggleMenu() {
    this.linksContainer.classList.toggle("open");
  }

  toggleThemeLight() {
    const body = document.getElementsByTagName("body")[0];
    body.classList.toggle("dark");
  }

  updateActiveLink() {
    const currentPage = location.hash.replace("#", "") || "home";
    this.links.forEach((link) => {
      if (link.href === currentPage) {
        link.element.classList.add("active");
      } else {
        link.element.classList.remove("active");
      }
    });

    this.linksContainer.classList.remove("open");
  }

  setActiveLink(pageName) {
    this.links.forEach((link) => {
      if (link.href === pageName) {
        link.element.classList.add("active");
      } else {
        link.element.classList.remove("active");
      }
    });
    this.linksContainer.classList.remove("open");
  }

  get element() {
    return this._navBar;
  }
}
