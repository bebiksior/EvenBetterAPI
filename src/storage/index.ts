import { getCaidoAPI } from "../utils/caidoapi";
import type { PluginStorage } from "./types";

export const getStorageData = (): PluginStorage | undefined => {
  return (getCaidoAPI().storage.get() as PluginStorage) || {};
};

export const setSetting = async (key: string, value: any) => {
  let currentValues = getCaidoAPI().storage.get() as
    | PluginStorage
    | undefined;

  if (!currentValues?.settings) {
    currentValues = {};
    currentValues.settings = [];
  }

  const settingIndex = currentValues.settings?.findIndex((setting) => setting[0] === key);
  if (settingIndex === -1) {
    currentValues.settings.push([key, value]);
  } else {
    currentValues.settings[settingIndex] = [key, value];
  }

  await getCaidoAPI().storage.set(currentValues);
};

export const getSetting = (key: string) => {
  const currentValues = getCaidoAPI().storage.get() as PluginStorage | undefined;
  if (!currentValues?.settings) {
    return undefined;
  }

  const setting = currentValues.settings.find((setting) => setting[0] === key);
  return setting?.[1];
};

export const getWelcomeToast = () => {
  const storage = getStorageData();
  return storage?.welcomeToast;
}

export const setWelcomeToast = async (toast: any) => {
  let storage = getStorageData();
  if (!storage) {
    storage = {};
  }

  storage.welcomeToast = toast;
  await getCaidoAPI().storage.set(storage);
};