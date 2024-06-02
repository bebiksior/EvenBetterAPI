import { EvenBetterAPI } from "..";
import { getCaidoAPI } from "../utils/caidoapi";

interface PromptCommand {
  commandName: string;
  promptPlaceholder: string;
  onPrompt: (promptValue: string) => void;
}

let promptCommands: PromptCommand[] = [];

const openPromptMenu = (evenBetterAPI: EvenBetterAPI, promptCommand: PromptCommand) => {
  const promptMenu = document.createElement("div");
  promptMenu.classList.add("custom");

  const promptMenuRoot = document.createElement("div");
  promptMenuRoot.setAttribute("command-root", "");
  promptMenu.appendChild(promptMenuRoot);

  const promptMenuDialog = document.createElement("div");
  promptMenuDialog.setAttribute("command-dialog", "");
  promptMenuRoot.appendChild(promptMenuDialog);

  const promptMenuMask = document.createElement("div");
  promptMenuMask.setAttribute("command-dialog-mask", "");
  promptMenuMask.style.display = "flex";
  promptMenuMask.style.justifyContent = "center";
  promptMenuMask.style.alignItems = "center";
  promptMenuMask.addEventListener("click", () => {
    promptMenu.remove();
  });

  promptMenuDialog.appendChild(promptMenuMask);

  const promptMenuWrapper = document.createElement("div");
  promptMenuWrapper.setAttribute("command-dialog-wrapper", "");
  promptMenuWrapper.style.minWidth = "600px";
  promptMenuWrapper.style.padding = "1em";
  promptMenuWrapper.style.margin = "0";
  promptMenuMask.appendChild(promptMenuWrapper);

  const promptMenuBody = document.createElement("div");
  promptMenuBody.setAttribute("command-dialog-body", "");
  promptMenuBody.style.display = "flex";
  promptMenuBody.style.gap = "0.5em";
  promptMenuWrapper.addEventListener("click", (event) => {
    event.stopPropagation();
  });
  promptMenuWrapper.appendChild(promptMenuBody);

  const promptInput = evenBetterAPI.components.createTextInput(
    "100%",
    promptCommand.promptPlaceholder
  );
  promptInput.style.zIndex = "100";
  promptInput.addEventListener("click", (event) => {
    event.stopPropagation();
  });
  promptMenuBody.appendChild(promptInput);

  const promptSubmitButton = getCaidoAPI().ui.button({
    label: "Submit",
    variant: "primary",
  });
  promptSubmitButton.addEventListener("click", () => {
    const input = promptInput.querySelector("input") as HTMLInputElement;
    promptCommand.onPrompt(input.value);

    promptMenu.remove();
  });
  promptMenuBody.appendChild(promptSubmitButton);

  document.body.appendChild(promptMenu);
  promptInput.querySelector("input")?.focus();
  promptInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      promptSubmitButton.click();
    }

    if (event.key === "Escape") {
      promptMenu.remove();
    }
  });
};

const createPromptCommand = (
  EvenBetterAPI: EvenBetterAPI,
  commandName: string,
  promptPlaceholder: string,
  onPrompt: (promptValue: string) => void
) => {
  promptCommands.push({
    commandName,
    promptPlaceholder,
    onPrompt,
  });
};

export class PromptCommandAPI {
  private apiInstance: EvenBetterAPI;

  constructor(apiInstance: EvenBetterAPI) {
    this.apiInstance = apiInstance;

    this.apiInstance.eventManager.on("onCommandRun", (commandName: string) => {
      const promptCommand = promptCommands.find(
        (promptCommand) => promptCommand.commandName === commandName
      );
      if (!promptCommand) return;
  
      openPromptMenu(this.apiInstance, promptCommand);
    });
  }

  createPromptCommand(
    commandName: string,
    promptPlaceholder: string,
    onPrompt: (promptValue: string) => void
  ) {
    createPromptCommand(this.apiInstance, commandName, promptPlaceholder, onPrompt);
  }
}
