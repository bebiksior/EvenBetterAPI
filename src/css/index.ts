type CSSModule = {
  id: string;
  cssText: string;
};

const loadedCSSModules: Set<string> = new Set();

const loadCSS = ({ id, cssText }: CSSModule): void => {
  if (loadedCSSModules.has(id) || document.querySelector(`#${id}`)) {
    return;
  }

  const style = document.createElement("style");
  style.id = id;
  style.textContent = cssText;
  style.classList.add("evenbetterapi-css-module");

  document.head.appendChild(style);
  loadedCSSModules.add(id);
};

export default loadCSS;