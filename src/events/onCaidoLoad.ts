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
        this.trigger();
      }
    }, 25);
  }

  trigger(): void {
    this.handlers.forEach((handler) => handler());
  }
}

const isCaidoLoaded = () => {
  return document.querySelector(".c-content") !== null;
};
