import { Caido } from "@caido/sdk-frontend";
import EvenBetterAPI from "..";

export const hotReloading = async () => {
  if (localStorage.getItem("previousPath")) {
    setTimeout(() => {
      window.location.hash = localStorage.getItem("previousPath") || "";
      localStorage.removeItem("previousPath");
    }, 200);
  }

  const socket = new WebSocket("ws://localhost:8081");

  socket.addEventListener("open", () => {
    EvenBetterAPI.toast.showToast({
      message: "Connected to Caido Hot Reloading Server",
      duration: 2000,
      type: "success",
      position: "bottom",
    });
  });

  socket.addEventListener("close", () => {
    EvenBetterAPI.toast.showToast({
      message: "Disconnected from Caido Hot Reloading Server",
      duration: 2000,
      type: "error",
      position: "bottom",
    });
  });

  socket.addEventListener("message", (event) => {
    try {
      const eventData = JSON.parse(event.data);
      const eventType = eventData.event;
      const eventDataPayload = eventData.data;

      switch (eventType) {
        case "caido:loadJS":
          updateViewerSettings(eventDataPayload, "");
          break;
        case "caido:loadCSS":
          updateViewerSettings("", eventDataPayload);
          break;
        case "caido:reload":
          localStorage.setItem("previousPath", window.location.hash);
          location.reload();
          break;
        default:
          console.error("Unknown event type received:", eventType);
      }
    } catch (error) {
      console.error("Error parsing WebSocket message:", error);
    }
  });

  const updateViewerSettings = async (js: string, css: string) => {
    const viewerSettings = await fetchUserSettings();
    if (!viewerSettings) return;

    const newViewerSettings = {
      input: {
        data: viewerSettings.data,
        migrations: viewerSettings.migrations,
      },
    };

    if (js) newViewerSettings.input.data.js = js;

    if (css) newViewerSettings.input.data.css = css;

    return Caido.graphql.updateViewerSettings(newViewerSettings);
  };

  const fetchUserSettings = async () => {
    return await Caido.graphql.userSettings().then((data) => {
      return data.viewer.settings;
    });
  };
};
