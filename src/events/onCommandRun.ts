import type { Event } from "./EventManager";

export class OnCommandRun implements Event<string> {
  private handlers: ((commandName: string) => void)[] = [];
  private commandObserver: MutationObserver | null = null;
  private selectedCommand: Element | null = null;

  addHandler(handler: (commandName: string) => void): void {
    this.handlers.push(handler);
  }

  init() {
    const observeCommandRun = (commandPalette: Element) => {
      this.commandObserver = new MutationObserver((mutations) => {
        const selectedCommand = getSelectedCommand();
        if (selectedCommand !== this.selectedCommand) {
          this.selectedCommand = selectedCommand;
        }
      });

      this.commandObserver.observe(commandPalette, {
        attributes: true,
        subtree: true,
      });
    };

    const getSelectedCommand = () => {
      return document.querySelector("[command-item][aria-selected='true']");
    };

    const observer = new MutationObserver((mutations) => {
      for (let mutation of mutations) {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node: Node) => {
            const element = node as Element;
            if (node.nodeType === 1 && element.hasAttribute("command-theme")) {
              observeCommandRun(element);
            }
          });

          mutation.removedNodes.forEach((node: Node) => {
            const element = node as Element;
            if (node.nodeType === 1 && element.hasAttribute("command-theme")) {
              if (!this.selectedCommand) return;
              const commandName =
                this.selectedCommand.getAttribute("data-value");

              if (commandName) this.trigger(commandName);

              if (this.commandObserver) {
                this.commandObserver.disconnect();
                this.commandObserver = null;
              }
            }
          });
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  trigger(commandName: string): void {
    this.handlers.forEach((handler) => handler(commandName));
  }

  removeHandler(handler: (commandName: string) => void): void {
    this.handlers = this.handlers.filter((h) => h !== handler);
  }
}
