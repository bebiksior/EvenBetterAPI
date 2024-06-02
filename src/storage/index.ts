import { getPluginData } from "../utils/plugindata";

export const setSetting = async (key: string, value: any) => {
  const pluginData = getPluginData()
  localStorage.setItem(`ebapi:settings:${pluginData.manifestID}:${key}`, value);
};

export const getSetting = (key: string) => {
  const pluginData = getPluginData()
  return localStorage.getItem(`ebapi:settings:${pluginData.manifestID}:${key}`);
};

export const getWelcomeToast = () => {
  return localStorage.getItem('ebapi:welcomeToast');
}

export const setWelcomeToast = async (toast: any) => {
  localStorage.setItem('ebapi:welcomeToast', toast);
};