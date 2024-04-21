import loadCSS from "../css";
import checkboxCSS from "./checkbox.css";

export const createCheckbox = () => {
  loadCSS({ id: "checkbox", cssText: checkboxCSS.toString() });

  const checkbox = document.createElement("div");
  checkbox.classList.add("eb-button__label");

  const ebCheckbox = document.createElement("div");
  ebCheckbox.classList.add("eb-checkbox");

  const formkitOuter = document.createElement("div");
  formkitOuter.classList.add("formkit-outer");
  formkitOuter.dataset.family = "box";
  formkitOuter.dataset.type = "checkbox";
  formkitOuter.dataset.complete = "true";

  const label = document.createElement("label");
  label.classList.add("formkit-wrapper", "eb-checkbox__wrapper");
  label.dataset.checked = "true";

  const innerSpan = document.createElement("span");
  innerSpan.classList.add("formkit-inner", "eb-checkbox__inner");

  const checkboxInput = document.createElement("input");
  checkboxInput.classList.add("formkit-input", "eb-checkbox__input");
  checkboxInput.type = "checkbox";

  const decoratorSpan = document.createElement("span");
  decoratorSpan.classList.add("formkit-decorator");
  decoratorSpan.setAttribute("aria-hidden", "true");

  innerSpan.appendChild(checkboxInput);
  innerSpan.appendChild(decoratorSpan);

  label.appendChild(innerSpan);
  formkitOuter.appendChild(label);
  ebCheckbox.appendChild(formkitOuter);
  checkbox.appendChild(ebCheckbox);

  return checkbox;
};
