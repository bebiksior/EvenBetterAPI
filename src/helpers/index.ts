import { invokeTauri, isTauri } from "../utils/tauri";

const loadedCSSModules: Set<string> = new Set();

type CSSModule = {
  id: string;
  cssText: string;
};

export class HelpersAPI {
  downloadFile = async (filename: string, data: string) => {
    if (isTauri()) {
      return invokeTauri("download", { filename, data });
    } else {
      const blob = new Blob([data], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
    }
  };

  openInBrowser = (url: string) => {
    if (isTauri()) {
      invokeTauri("open_in_browser", { url });
    } else {
      window.open(url, "_blank");
    }
  };

  loadCSS = ({ id, cssText }: CSSModule): void => {
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
}
