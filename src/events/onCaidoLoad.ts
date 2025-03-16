import type { Event } from "./EventManager";

export class OnCaidoLoad implements Event {
  private handlers: (() => void)[] = [];

  addHandler(handler: () => void): void {
    this.handlers.push(handler);
  }

  init() {
    // wait for Caido to load
    const interval = setInterval(() => {
      if (isCaidoLoaded()) {
        clearInterval(interval);

        // wait 300ms for other plugins to load
        setTimeout(() => {
          this.trigger();
        }, 300);
      }
    }, 25);
  }

  trigger(): void {
    this.handlers.forEach((handler) => handler());
  }

  removeHandler(handler: () => void): void {
    this.handlers = this.handlers.filter((h) => h !== handler);
  }
}

const isCaidoLoaded = () => {
  return document.querySelector(".c-content") !== null;
};
