# EvenBetterAPI [![Twitter](https://img.shields.io/twitter/url/https/twitter.com/cloudposse.svg?style=social&label=Follow%20me)](https://twitter.com/bebiksior) 
[![NPM Version](https://img.shields.io/npm/v/@evenbetter/evenbetter-api?style=for-the-badge)](https://www.npmjs.com/package/@evenbetter/evenbetter-api)


`EvenBetterAPI` is a API that is used in [EvenBetter](https://github.com/bebiksior/EvenBetter).

Here's what you can do with this API:
- Listen to custom events like: `onCaidoLoad`, `onContextMenuOpen`, `onPageOpen`, `onSettingsTabOpen`.
- Create tables and fill it with your data by using the `EvenBetterAPI.components.table` object.
- Open and close modals by using the `EvenBetterAPI.modal` object.

## Note
This is not official Caido frontend API. Official Caido frontend API can be found at [Caido SDK Frontend](https://github.com/caido/sdk-frontend). You can use this API in your own Caido frontend plugins.

## Installation
You can install EvenBetterAPI by running:
```bash
npm i @evenbetter/evenbetter-api
```

## Example
```javascript
import EvenBetterAPI from "@evenbetter/evenbetter-api";
import { Caido } from "@caido/sdk-frontend";

// Function to generate a page with navigation bar and content
function generatePage(): HTMLElement {
  const body = document.createElement("div");
  body.style.gap = "0.5em";
  body.style.display = "flex";
  body.style.flexDirection = "column";
  
  // Create navigation bar
  const navigationBar = EvenBetterAPI.components.createNavigationBar({
    title: "Example",
    items: [
      { title: "Example", url: "#/example" },
      { title: "Hello", url: "#/hello" },
    ],
  });
  body.appendChild(navigationBar);

  body.appendChild(generateRandomTable());

  return body;
}

const generateRandomRow = () => {
  const row = new Map<string, string>();
  row.set("Name", "Item " + Math.floor(Math.random() * 1000));
  row.set("Value", "Value " + Math.floor(Math.random() * 100));
  row.set("Version", "v" + Math.floor(Math.random() * 10) + ".0");
  row.set("Date", new Date().toLocaleDateString());
  return row;
};

// Generate a table with 20 randomized rows
const generateRandomTable = ()  => {
  const tableData = Array.from({ length: 20 }, () => generateRandomRow());

  const randomTable = EvenBetterAPI.components.table.createTable({
    columns: [
      { name: "Name", width: "15em" },
      { name: "Value", width: "20em" },
      { name: "Version", width: "10em" },
      { name: "Date", width: "10em" },
    ],
    data: tableData,
    height: "500px",
  });
  
  randomTable.style.backgroundColor = "var(--c-bg-subtle)";
  return randomTable;
}

// Register /example and /hello so we can navigate to them
Caido.navigation.addPage("/example", {
  body: generatePage(),
});

Caido.navigation.addPage("/hello", {
  body: generatePage(),
});

// Add an "Example" item to the sidebar
Caido.sidebar.registerItem("Example", "/example");

// Open a modal when Caido is loaded
EvenBetterAPI.eventManager.on("onCaidoLoad", () => {
  EvenBetterAPI.modal.openModal({
    title: "Hello, World!",
    content: "This is a modal",
  });
});
```

## Community
Come join Caido community on [Discord](https://links.caido.io/www-discord). EvenBetter has separate channel `#evenbetter`. Feel free to ask questions, share your ideas and report bugs :D
