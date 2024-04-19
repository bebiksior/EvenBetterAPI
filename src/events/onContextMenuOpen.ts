import type { Event } from "./EventManager";

export class OnContextMenuOpen implements Event<Element> {
  private handlers: ((element: Element) => void)[] = [];

  addHandler(handler: (element: Element) => void): void {
    this.handlers.push(handler);
  }

  init() {
    const observer = new MutationObserver((mutations) => {
      for (let mutation of mutations) {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node: Node) => {
            const element = node as Element;
            if (
              node.nodeType === 1 &&
              element.classList.contains("p-contextmenu")
            ) {
              this.trigger(element);
            }
          });
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  trigger(element: Element): void {
    this.handlers.forEach((handler) => handler(element));
  }
}
