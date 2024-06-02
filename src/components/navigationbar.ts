import type { EvenBetterAPI } from "..";
import type { PageOpenEvent } from "../events/onPageOpen";
import log from "../utils/Logger";

interface NavigationItem {
  title: string;
  url: string;
  icon?: string;
  sidebarItemName?: string;
  onOpen?: () => void;
}

export interface NavigationBarData {
  title: string;
  items: NavigationItem[];
  customButtons?: HTMLElement[];
}

export function createNavigationBar(
  evenBetterAPI: EvenBetterAPI,
  data: NavigationBarData
): HTMLElement {
  const container = document.createElement("div");
  container.classList.add("c-menu-bar");
  container.style.width = "100%";

  const menubar = document.createElement("div");
  menubar.classList.add("p-menubar", "p-component");
  menubar.setAttribute("data-pc-name", "menubar");
  menubar.setAttribute("data-pc-section", "root");

  const startSection = document.createElement("div");
  startSection.classList.add("p-menubar-start");
  startSection.setAttribute("data-pc-section", "start");

  const titleDiv = document.createElement("div");
  titleDiv.classList.add("c-settings__title");
  titleDiv.style.padding = "0 var(--c-space-4)";
  titleDiv.style.fontWeight = "700";
  titleDiv.textContent = data.title;

  startSection.appendChild(titleDiv);

  const list = document.createElement("ul");
  list.classList.add("p-menubar-root-list");

  const links = data.items.map((itemData) => {
    return itemData.url;
  });

  data.items.forEach((itemData) => {
    const listItem = document.createElement("li");
    listItem.classList.add("p-menuitem");
    listItem.setAttribute("role", "menuitem");
    listItem.style.margin = "0";

    const itemContent = document.createElement("div");
    itemContent.classList.add("p-menuitem-content");
    itemContent.setAttribute("data-pc-section", "content");

    const menuItem = document.createElement("div");
    menuItem.classList.add("c-settings__item");
    menuItem.setAttribute("data-is-active", "true");
    menuItem.addEventListener("click", () => {
      menubar.classList.remove("p-menubar-mobile-active");
    });

    const link = document.createElement("a");
    link.setAttribute("href", itemData.url);
    link.setAttribute("draggable", "false");
    link.draggable = false;
    link.classList.add("p-menuitem-link");

    if (itemData.url === location.hash) {
      link.style.backgroundColor = "rgba(255,255,255,.04)";
      link.style.borderRadius = "var(--c-border-radius-2)";
    }

    let highlightedElement: HTMLElement | null = null;
    evenBetterAPI.eventManager.on("onPageOpen", (event: PageOpenEvent) => {
      if (itemData.sidebarItemName) {
        if (links.includes(event.newUrl)) {
          const sidebarItems = document.querySelectorAll(".c-sidebar-item");
          if (sidebarItems) {
            const sidebarItem = Array.from(sidebarItems).filter(
              (el) => el.textContent === itemData.sidebarItemName
            ) as HTMLElement[];

            if (sidebarItem.length >= 1) {
              highlightedElement = sidebarItem[0];
              highlightedElement.setAttribute("data-is-selected", "true");
              highlightedElement.setAttribute("data-is-active", "true");
            }
          }
        } else {
          if (highlightedElement) {
            highlightedElement.removeAttribute("data-is-selected");
            highlightedElement.removeAttribute("data-is-active");
            highlightedElement = null;
          }
        }
      }

      if (event.newUrl === itemData.url) {
        if (itemData.onOpen) {
          itemData.onOpen();
        }

        link.style.backgroundColor = "rgba(255,255,255,.04)";
        link.style.borderRadius = "var(--c-border-radius-2)";
      } else {
        link.style.backgroundColor = "";
        link.style.borderRadius = "";
      }
    });

    if (itemData.icon) {
      const icon = document.createElement("i");
      icon.classList.add("c-icon", "fas", itemData.icon);
      icon.style.marginRight = "var(--c-space-2)";

      link.appendChild(icon);
    }

    const span = document.createElement("span");
    span.textContent = itemData.title;

    link.appendChild(span);
    menuItem.appendChild(link);
    itemContent.appendChild(menuItem);
    listItem.appendChild(itemContent);
    list.appendChild(listItem);
  });

  const menuButton = document.createElement("a");
  menuButton.setAttribute("role", "button");
  menuButton.setAttribute("tabindex", "0");
  menuButton.classList.add("p-menubar-button");
  menuButton.setAttribute("aria-haspopup", "true");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Navigation");
  menuButton.setAttribute("data-pc-section", "button");
  menuButton.setAttribute("aria-controls", "pv_id_3");

  menuButton.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="p-icon" aria-hidden="true" data-pc-section="menubuttonicon"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.3226 3.6129H0.677419C0.497757 3.6129 0.325452 3.54152 0.198411 3.41448C0.0713707 3.28744 0 3.11514 0 2.93548C0 2.75581 0.0713707 2.58351 0.198411 2.45647C0.325452 2.32943 0.497757 2.25806 0.677419 2.25806H13.3226C13.5022 2.25806 13.6745 2.32943 13.8016 2.45647C13.9286 2.58351 14 2.75581 14 2.93548C14 3.11514 13.9286 3.28744 13.8016 3.41448C13.6745 3.54152 13.5022 3.6129 13.3226 3.6129ZM13.3226 7.67741H0.677419C0.497757 7.67741 0.325452 7.60604 0.198411 7.479C0.0713707 7.35196 0 7.17965 0 6.99999C0 6.82033 0.0713707 6.64802 0.198411 6.52098C0.325452 6.39394 0.497757 6.32257 0.677419 6.32257H13.3226C13.5022 6.32257 13.6745 6.39394 13.8016 6.52098C13.9286 6.64802 14 6.82033 14 6.99999C14 7.17965 13.9286 7.35196 13.8016 7.479C13.6745 7.60604 13.5022 7.67741 13.3226 7.67741ZM0.677419 11.7419H13.3226C13.5022 11.7419 13.6745 11.6706 13.8016 11.5435C13.9286 11.4165 14 11.2442 14 11.0645C14 10.8848 13.9286 10.7125 13.8016 10.5855C13.6745 10.4585 13.5022 10.3871 13.3226 10.3871H0.677419C0.497757 10.3871 0.325452 10.4585 0.198411 10.5855C0.0713707 10.7125 0 10.8848 0 11.0645C0 11.2442 0.0713707 11.4165 0.198411 11.5435C0.325452 11.6706 0.497757 11.7419 0.677419 11.7419Z" fill="currentColor"></path></svg>`;
  menuButton.addEventListener("click", () => {
    menubar.classList.toggle("p-menubar-mobile-active");
    list.style.zIndex = menubar.classList.contains("p-menubar-mobile-active")
      ? "1200"
      : "";
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth < 955) {
      menubar.classList.add("p-menubar-mobile");
    } else {
      menubar.classList.remove("p-menubar-mobile");
      menubar.classList.remove("p-menubar-mobile-active");
    }
  });
  window.dispatchEvent(new Event("resize"));

  const customButtons = document.createElement("div");
  customButtons.classList.add("p-menubar-end");
  customButtons.setAttribute("data-pc-section", "end");
  customButtons.style.display = "flex";
  customButtons.style.gap = ".5em";
  customButtons.style.alignItems = "center";

  if (data.customButtons) {
    data.customButtons.forEach((button) => {
      customButtons.appendChild(button);
    });
  }

  menubar.appendChild(startSection);
  menubar.appendChild(menuButton);
  menubar.appendChild(list);
  menubar.appendChild(customButtons);
  container.appendChild(menubar);

  return container;
}
