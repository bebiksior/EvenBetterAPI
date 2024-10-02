import log from "../utils/Logger";
import { type Event } from "./EventManager";

export class OnSettingsTabOpen implements Event<string> {
  private handlers: ((data?: string) => void)[] = [];

  addHandler(handler: (data?: string) => void): void {
    this.handlers.push(handler);
  }

  init() {}

  trigger(data: string) {
    log.info(`Settings tab opened: ${data}`);

    this.handlers.forEach((handler) => handler(data));
  }

  removeHandler(handler: (data: string) => void): void {
    this.handlers = this.handlers.filter((h) => h !== handler);
  }
}
