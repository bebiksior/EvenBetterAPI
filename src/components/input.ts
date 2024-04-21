import EvenBetterAPI from "..";
import loadCSS from "../css";
import cssText from "./input.css";

export function createTextInput(
  width: string,
  placeholder = "Search...",
  includeCopyButton = false,
  iconClass?: string
): HTMLDivElement {
  loadCSS({ id: "eb-text-input", cssText: cssText.toString() });

  const outerDiv = document.createElement("div");
  outerDiv.classList.add("formkit-outer", "c-text-input__outer");
  outerDiv.setAttribute("style", `width: ${width};`);

  const wrapperDiv = document.createElement("div");
  wrapperDiv.classList.add("formkit-wrapper");
  wrapperDiv.style.display = "flex";

  const innerDiv = document.createElement("div");
  innerDiv.classList.add("formkit-inner", "eb-text-input__inner");

  const prefixDiv = document.createElement("div");
  prefixDiv.classList.add("c-text-input__prefix");
  prefixDiv.setAttribute(
    "style",
    "align-self: center; color: var(--c-fg-subtle);"
  );

  const icon = document.createElement("i");
  icon.classList.add("c-icon", "fas");
  if (iconClass) icon.classList.add(iconClass);

  const input = document.createElement("input");
  input.setAttribute("placeholder", placeholder);
  input.setAttribute("spellcheck", "false");
  input.classList.add("formkit-input", "c-text-input__input");
  input.setAttribute("type", "text");
  input.setAttribute(
    "style",
    "width: 100%; background: transparent; border: 0; outline: 0; color: inherit; box-sizing: border-box; line-height: inherit;"
  );

  if (iconClass) prefixDiv.appendChild(icon);

  innerDiv.appendChild(prefixDiv);
  innerDiv.appendChild(input);

  if (includeCopyButton) {
    const copyButton = document.createElement("button");
    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
    copyButton.setAttribute(
      "style",
      "background: transparent; border: 0; outline: 0; cursor: pointer; padding: 0; margin-left: 10px;"
    );
    copyButton.addEventListener("click", () => {
      navigator.clipboard.writeText(input.value);
      EvenBetterAPI.toast.showToast({
        message: "Copied to clipboard",
        position: "bottom",
        type: "info",
        duration: 1000,
      });
    });
    innerDiv.appendChild(copyButton);
  }

  wrapperDiv.appendChild(innerDiv);

  outerDiv.appendChild(wrapperDiv);

  return outerDiv;
}
