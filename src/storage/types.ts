import type { ToastOptions } from "../toast";

export type PluginStorage = {
  welcomeToast?: ToastOptions;
  settings?: [string, any][];
};
