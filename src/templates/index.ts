import type { EvenBetterAPI } from "..";
import type { SettingsPageOptions } from "./settingsPage/types";
import { SettingsPage } from "./settingsPage";

export class TemplatesAPI {
    private apiInstance: EvenBetterAPI;
    
    constructor(apiInstance: EvenBetterAPI) {
        this.apiInstance = apiInstance;
    }
    
    createSettingsPage(options: SettingsPageOptions): SettingsPage {
        return new SettingsPage(this.apiInstance, options);
    }
}