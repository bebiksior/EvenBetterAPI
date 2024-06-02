import type { EvenBetterAPI } from "..";
import { createCheckbox } from "./checkbox";
import { createTextInput } from "./input";
import { createNavigationBar, type NavigationBarData } from "./navigationbar";
import { createSelect } from "./select";
import { createTable, type TableAPI, type TableConfig } from "./table";

export class ComponentsAPI {
  private apiInstance: EvenBetterAPI;

  constructor(apiInstance: EvenBetterAPI) {
    this.apiInstance = apiInstance;
  }

  createTable(config: TableConfig): TableAPI {
    return createTable(this.apiInstance, config);
  }

  createNavigationBar(data: NavigationBarData): HTMLElement {
    return createNavigationBar(this.apiInstance, data);
  }

  createCheckbox(): HTMLDivElement {
    return createCheckbox(this.apiInstance);
  }

  createTextInput(width: string, placeholder: string | undefined, includeCopyButton = false, iconClass?: string): HTMLDivElement {
    return createTextInput(this.apiInstance, width, placeholder, includeCopyButton, iconClass);
  }

  createSelectInput(options: { value: string; label: string }[]): HTMLSelectElement {
    return createSelect(this.apiInstance, options);
  }
}