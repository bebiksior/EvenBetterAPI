import type { Event } from "./EventManager";

export class OnProjectChange implements Event<string> {
  private handlers: ((newProjectID: string) => void)[] = [];

  addHandler(handler: (newProjectID: string) => void): void {
    this.handlers.push(handler);
  }

  init() {
    const targetNode = document.querySelector(".c-current-project");

    if (targetNode) {
      const callback = (
        mutationsList: MutationRecord[],
        observer: MutationObserver
      ) => {
        for (const mutation of mutationsList) {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "data-project-id"
          ) {
            const newValue = targetNode.getAttribute("data-project-id");
            if (newValue) this.trigger(newValue);
          }
        }
      };

      const observer = new MutationObserver(callback);

      const config = { attributes: true, attributeFilter: ["data-project-id"] };

      observer.observe(targetNode, config);
    }
  }

  trigger(newProjectID: string): void {
    this.handlers.forEach((handler) => handler(newProjectID));
  }

  removeHandler(handler: (newProjectID: string) => void): void {
    this.handlers = this.handlers.filter((h) => h !== handler);
  }
}
