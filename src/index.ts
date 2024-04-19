import { createCheckbox } from "./components/checkbox";
import { createNavigationBar } from "./components/navigationbar";
import loadCSS from "./css";
import { EventManager } from "./events/EventManager";
import { OnCaidoLoad } from "./events/onCaidoLoad";
import { OnContextMenuOpen } from "./events/onContextMenuOpen";
import { OnPageOpen } from "./events/onPageOpen";
import { OnSettingsTabOpen } from "./events/onSettingsTabOpen";
import { closeModal, openModal } from "./modal";
import { showToast } from "./toast";
import { createTextInput } from './components/input';
import { OnCommandRun } from "./events/onCommandRun";
import { PromptCommandAPI, setupPromptCommands } from "./promptcommands";
import { hotReloading } from './hotReloading/index';
import { createTable } from './components/table';

interface Modal {
  openModal: typeof openModal;
  closeModal: typeof closeModal;
}

interface Components {
  createTable: typeof createTable;
  createNavigationBar: typeof createNavigationBar;
  createCheckbox: typeof createCheckbox;
  createTextInput: typeof createTextInput;
}

interface Toast {
  showToast: typeof showToast;
}

interface EvenBetterAPI {
  modal: Modal;
  toast: Toast;
  components: Components;
  eventManager: EventManager;
  promptCommands: typeof PromptCommandAPI;
  hotReloading: typeof hotReloading;
  loadCSS: typeof loadCSS;
}

function initializeEvenBetterAPI(): EvenBetterAPI {
  const eventManager = new EventManager();
  const onCaidoLoad = new OnCaidoLoad();
  const onSettingsTabOpen = new OnSettingsTabOpen();
  const onPageOpen = new OnPageOpen(eventManager);
  const onContextMenuOpen = new OnContextMenuOpen();
  const onCommandRun = new OnCommandRun();

  eventManager.registerEvent("onCaidoLoad", onCaidoLoad);
  eventManager.registerEvent("onSettingsTabOpen", onSettingsTabOpen);
  eventManager.registerEvent("onPageOpen", onPageOpen);
  eventManager.registerEvent("onContextMenuOpen", onContextMenuOpen);
  eventManager.registerEvent("onCommandRun", onCommandRun);
  eventManager.initEvents();

  setupPromptCommands(eventManager);

  const modal: Modal = {
    openModal,
    closeModal,
  };

  const toast: Toast = {
    showToast,
  };

  const components: Components = {
    createTable,
    createNavigationBar,
    createCheckbox,
    createTextInput,
  };

  return {
    modal,
    toast,
    components,
    eventManager,
    loadCSS,
    promptCommands: PromptCommandAPI,
    hotReloading,
  };
}

declare global {
  interface Window {
    EvenBetterAPI?: EvenBetterAPI;
  }
}

let EvenBetterAPI: EvenBetterAPI;

if (typeof window !== "undefined" && window.EvenBetterAPI) {
  EvenBetterAPI = window.EvenBetterAPI;
} else {
  EvenBetterAPI = initializeEvenBetterAPI();

  if (typeof window !== "undefined") {
    window.EvenBetterAPI = EvenBetterAPI;
  }
}

export default EvenBetterAPI;