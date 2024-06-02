import { EventManager } from "./events/EventManager";
import { OnCaidoLoad } from "./events/onCaidoLoad";
import { OnContextMenuOpen } from "./events/onContextMenuOpen";
import { OnPageOpen } from "./events/onPageOpen";
import { OnSettingsTabOpen } from "./events/onSettingsTabOpen";
import { ToastAPI } from "./toast";
import { OnCommandRun } from "./events/onCommandRun";
import { EVENBETTERAPI_VERSION } from "./constants";
import type { Caido } from "@caido/sdk-frontend";
import { setCaidoAPI } from "./utils/caidoapi";
import { ComponentsAPI } from "./components/components";
import { PromptCommandAPI } from "./promptcommands";
import { ModalAPI } from "./modal";
import { HelpersAPI } from "./helpers";
import { setPluginData } from "./utils/plugindata";
import { TemplatesAPI } from "./templates";
import { getWelcomeToast, removeWelcomeToast } from "./storage";

interface PluginData {
  manifestID: string;
  name: string;
}

class EvenBetterAPI {
  modal: ModalAPI;
  toast: ToastAPI;
  components: ComponentsAPI;
  eventManager: EventManager;
  promptCommands: PromptCommandAPI;
  templates: TemplatesAPI;
  version: string;
  helpers: HelpersAPI;

  constructor(caido: Caido, pluginData: PluginData) {
    setCaidoAPI(caido);
    setPluginData(pluginData);

    this.eventManager = new EventManager();
    const onCaidoLoad = new OnCaidoLoad();
    const onSettingsTabOpen = new OnSettingsTabOpen();
    const onPageOpen = new OnPageOpen(this.eventManager);
    const onContextMenuOpen = new OnContextMenuOpen();
    const onCommandRun = new OnCommandRun();

    this.eventManager.registerEvent("onCaidoLoad", onCaidoLoad);
    this.eventManager.registerEvent("onSettingsTabOpen", onSettingsTabOpen);
    this.eventManager.registerEvent("onPageOpen", onPageOpen);
    this.eventManager.registerEvent("onContextMenuOpen", onContextMenuOpen);
    this.eventManager.registerEvent("onCommandRun", onCommandRun);
    this.eventManager.on("onCaidoLoad", () => {
      this.eventManager.triggerEvent("onPageOpen", {
        newUrl: location.hash,
        oldUrl: "",
      });

      const welcomeToast = getWelcomeToast();
      if (welcomeToast) {
        try {
          this.toast.showToast(JSON.parse(welcomeToast));
        } catch (e) {
          console.error(e);
          removeWelcomeToast();
        }
        
        removeWelcomeToast();
      }
    });
    this.eventManager.initEvents();

    this.helpers = new HelpersAPI();
    this.promptCommands = new PromptCommandAPI(this);
    this.modal = new ModalAPI(this);
    this.toast = new ToastAPI(this);
    this.components = new ComponentsAPI(this);
    this.templates = new TemplatesAPI(this);

    this.version = EVENBETTERAPI_VERSION;
  }
}

export { EvenBetterAPI };
