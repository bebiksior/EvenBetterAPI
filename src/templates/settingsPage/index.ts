import {
  InputType,
  type Input,
  type InputGroup,
  type SelectOption,
  type SettingsPageOptions,
} from "./types";
import "./settingsPage.css";
import type { EvenBetterAPI } from "../..";
import { getCaidoAPI } from "../../utils/caidoapi";
import {
  getSetting,
  setSetting,
} from "../../storage";

export class SettingsPage {
  private title: string;
  private description: string;
  private inputGroups: InputGroup[];
  private evenBetterAPI: EvenBetterAPI;

  constructor(evenBetterAPI: EvenBetterAPI, options: SettingsPageOptions) {
    this.evenBetterAPI = evenBetterAPI;
    this.title = options.title;
    this.description = options.description;
    this.inputGroups = options.inputGroups;

    this.initDefaults();
  }

  private async initDefaults() {
    for (const [groupIndex, group] of this.inputGroups.entries()) {
      for (const [inputIndex, input] of group.inputs.entries()) {
        if (input.defaultValue && !getSetting(input.id)) {
          await setSetting(input.id, input.defaultValue);
        }
      }
    }
  }

  private className(input: string): string {
    return `eb-settings-page__${input}`;
  }

  render(): HTMLElement {
    const container = document.createElement("div");
    container.classList.add(this.className("container"));

    const header = document.createElement("div");
    header.classList.add(this.className("header"));

    const titleElement = document.createElement("h1");
    titleElement.textContent = this.title;
    titleElement.classList.add(this.className("title"));
    header.appendChild(titleElement);

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = this.description;
    descriptionElement.classList.add(this.className("description"));
    header.appendChild(descriptionElement);

    container.appendChild(header);

    const groupsContainer = document.createElement("div");
    groupsContainer.classList.add(this.className("groups"));

    this.inputGroups.forEach((group) => {
      const groupContainer = document.createElement("div");
      groupContainer.classList.add(this.className("group"));
      if (group.width) {
        if (group.width.toLowerCase() == "fill-space") {
          groupContainer.style.flex = "1";
        } else {
          groupContainer.style.width = group.width;
        }
      }

      const groupHeader = document.createElement("div");
      groupHeader.classList.add(this.className("group-header"));

      const groupName = document.createElement("div");
      groupName.textContent = group.groupName;
      groupName.classList.add(this.className("group-name"));

      const groupDescription = document.createElement("p");
      groupDescription.textContent = group.groupDescription;
      groupDescription.classList.add(this.className("group-description"));

      groupHeader.appendChild(groupName);
      groupHeader.appendChild(groupDescription);

      groupContainer.appendChild(groupHeader);

      const groupInputs = document.createElement("div");
      groupInputs.classList.add(this.className("group-inputs"));

      group.inputs.forEach((input) => {
        if (group.separateWithLine) {
          const line = document.createElement("hr");
          line.classList.add(this.className("line"));
          groupInputs.appendChild(line);
        }

        const inputElement = this.createInputElement(input, (value) => {
          setSetting(input.id, value);
        });
        groupInputs.appendChild(inputElement);
      });

      groupContainer.appendChild(groupInputs);
      groupsContainer.appendChild(groupContainer);
    });

    container.appendChild(groupsContainer);
    return container;
  }

  private createInputElement(
    input: Input,
    onInput?: (value: string) => void
  ): HTMLElement {
    const wrapper = document.createElement("div");
    wrapper.classList.add(this.className("input-wrapper"));
    if (input.type == InputType.CHECKBOX) {
      wrapper.classList.add(this.className("checkbox-wrapper"));
    }

    const label = document.createElement("label");
    if (input.labelAsHTML) {
      label.innerHTML = input.label;
    } else {
      label.textContent = input.label;
    }
    label.setAttribute("for", input.id);
    wrapper.appendChild(label);

    let inputElement: HTMLElement;

    switch (input.type) {
      case InputType.TEXT:
        inputElement = this.evenBetterAPI.components.createTextInput(
          "100%",
          input.placeholder
        );

        const inputText = inputElement.querySelector(
          "input"
        ) as HTMLInputElement;
        
        const textSettingValue = getSetting(input.id) as string;
        if (textSettingValue) {
          inputText.value = textSettingValue;
        } else {
          inputText.value = input.defaultValue as string;
        }

        if (onInput) {
          inputText.addEventListener("input", (event) => {
            onInput(inputText.value);
          });
        }
        break;
      case InputType.NUMBER:
        inputElement = this.evenBetterAPI.components.createTextInput(
          "100%",
          input.placeholder
        );
        (inputElement.querySelector("input") as HTMLInputElement).type =
          "number";

        const inputNumber = inputElement.querySelector(
          "input"
        ) as HTMLInputElement;

        const numberSettingValue = getSetting(input.id) as string;
        if (numberSettingValue) {
          inputNumber.value = numberSettingValue;
        } else {
          inputNumber.value = input.defaultValue as string;
        }

        if (onInput) {
          inputNumber.addEventListener("input", (event) => {
            onInput(inputNumber.value);
          });
        }
        break;
      case InputType.CHECKBOX:
        inputElement = this.evenBetterAPI.components.createCheckbox();

        const checkbox = inputElement.querySelector(
          "input"
        ) as HTMLInputElement;

        const checkboxSettingValue = getSetting(input.id) as string;
        if (checkboxSettingValue) {
          checkbox.checked = checkboxSettingValue == "true";
        } else {
          checkbox.checked = input.defaultValue == "true";
        }

        if (onInput) {
          checkbox.addEventListener("change", (event) => {
            onInput(checkbox.checked.toString());
          });
        }
        break;
      case InputType.SELECT:
        const selectOptions = input.options as SelectOption[];
        inputElement =
          this.evenBetterAPI.components.createSelectInput(selectOptions);

        const select = inputElement as HTMLSelectElement;
        const selectSettingValue = getSetting(input.id) as string;
        if (selectSettingValue) {
          select.value = selectSettingValue;
        } else {
          select.value = input.defaultValue as string;
        }

        if (onInput) {
          select.addEventListener("change", (event) => {
            onInput(select.value);
          });
        }
        break;
      default:
        throw new Error(`Invalid input type: ${input.type}`);
    }

    wrapper.appendChild(inputElement);

    return wrapper;
  }
}
