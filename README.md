# EvenBetterAPI [![Twitter](https://img.shields.io/twitter/url/https/twitter.com/cloudposse.svg?style=social&label=Follow%20me)](https://twitter.com/bebiksior) 
[![NPM Version](https://img.shields.io/npm/v/@bebiks/evenbetter-api?style=for-the-badge)](https://www.npmjs.com/package/@bebiks/evenbetter-api)

> [!NOTE]  
> I think that current Caido SDK is enough for most of the things you might want to do. This API has been built when plugins were still a simple Custom JS box. I think that this API is still useful for things that need to edit core Caido functionality - thats why I still use it in reworked EvenBetter version.

`EvenBetterAPI` is a API that is used in [EvenBetter](https://github.com/bebiksior/EvenBetter).

Here's what you can do with this API:
- Listen to custom events like: `onCaidoLoad`, `onContextMenuOpen`, `onPageOpen`, `onSettingsTabOpen`.
- Create tables and fill it with your data by using the `EvenBetterAPI.components.createTable` object.
- Create navigation menus by using the `EvenBetterAPI.components.createNavigationBar` function.
- Add prompts to commands in the command palette by using the `EvenBetterAPI.promptCommands.createPromptCommand` function.
- Create components such as text inputs, checkboxes, etc. by using the `EvenBetterAPI.components` object.
- Open modals by using the `EvenBetterAPI.modal` object.
- Show toast notifications by using the `EvenBetterAPI.toast` object.

## Example: creating a table
```javascript
const evenBetterAPI = new EvenBetterAPI(caido, {
  manifestID: "evenbetter-sampleplugin",
  name: "EvenBetter: Sample Plugin",
});

const randomTable = evenBetterAPI.components.createTable({
    columns: [
      { name: "Name", width: "15em" },
      { name: "Value", width: "15em" },
    ],
});

randomTable.addRow([
  {
    columnName: "Name",
    value: "EvenBetterAPI",
  },
  {
    columnName: "Value",
    value: "Awesome",
  },
])

randomTable.getHTMLElement(); // returns the table HTMLElement
```

## Example Plugin
For a full example of how to use this API, check out the [EvenBetterPluginExample](https://github.com/bebiksior/EvenBetterPluginExample) repository.

## Note
This is not official Caido frontend API. Official Caido frontend API can be found at [Caido SDK Frontend](https://github.com/caido/sdk-frontend). You can use this API in your own Caido frontend plugins.

## Installation
You can install EvenBetterAPI by running:
```bash
pnpm i @bebiks/evenbetter-api
```

## Community
Come join Caido community on [Discord](https://links.caido.io/www-discord). EvenBetter has separate channel `#evenbetter`. Feel free to ask questions, share your ideas and report bugs :D
