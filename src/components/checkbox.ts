import loadCSS from "../css";

const checkboxCSS = `
.eb-checkbox__input {
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
    width: 1.15em;
    height: 1.15em;
    border: .1em solid grey;
    border-radius: 4px;
    display: inline-grid;
    place-content: center;
    margin: 0;
}
.eb-checkbox__input:checked:before {
    transform: scale(1);
}
.eb-checkbox__input:before {
    content: "";
    transform: scale(0);
    width: .65em;
    height: .65em;
    border-radius: 2px;
    box-shadow: inset 1em 1em var(--c-fg-secondary);
}
.eb-button__label {
    display: inline-flex;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
`;

export const createCheckbox = () => {
  loadCSS({ id: "checkbox", cssText: checkboxCSS });

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
