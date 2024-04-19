import log from "../utils/Logger";
import { EventManager, type Event } from "./EventManager";

export interface PageOpenEvent {
  newUrl: string;
  oldUrl: string;
}

export class OnPageOpen implements Event<PageOpenEvent> {
  private handlers: ((data: PageOpenEvent) => void)[] = [];
  private eventManager: EventManager;

  constructor(eventManagerInstance: EventManager) {
    this.eventManager = eventManagerInstance;
  }

  addHandler(handler: (data: PageOpenEvent) => void): void {
    this.handlers.push(handler);
  }

  init() {
    let previousUrl = window.location.href;

    const observer = new MutationObserver(() => {
      if (window.location.href !== previousUrl) {
        let newPath = new URL(window.location.href).hash,
          oldPath = new URL(previousUrl).hash;

        previousUrl = window.location.href;

        if (newPath.includes("?custom-path="))
          newPath = newPath.split("?custom-path=")[1];

        if (oldPath.includes("?custom-path="))
          oldPath = oldPath.split("?custom-path=")[1];

        document
          .querySelector(".c-content")
          ?.setAttribute("data-page", newPath);

        this.trigger({
          newUrl: newPath,
          oldUrl: oldPath,
        });
      }
    });
    const config = { subtree: true, childList: true };

    observer.observe(document, config);
  }

  trigger(data: PageOpenEvent) {
    log.info(`Page updated: ${data.oldUrl} -> ${data.newUrl}`);

    if (data.newUrl.startsWith("#/settings/")) {
      this.eventManager.triggerEvent(
        "onSettingsTabOpen",
        data.newUrl.replace("#/settings/", "")
      );
    }

    this.handlers.forEach((handler) => handler(data));
  }
}
