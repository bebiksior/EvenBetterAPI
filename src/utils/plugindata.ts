interface PluginData {
  manifestID: string;
  name: string;
}

let PluginData: PluginData | null = null;

export const setPluginData = (pluginData: PluginData) => {
  PluginData = pluginData;
};

export const getPluginData = () => {
  if (!PluginData) {
    throw new Error("PluginData is not set yet!");
  }

  return PluginData;
};