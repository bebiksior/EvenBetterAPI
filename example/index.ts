import { Caido } from "@caido/sdk-frontend";
import EvenBetterAPI from "../src";
import loadCSS from "../src/css";

const customCSS = `
.c-content[data-page="#/hello"],
.c-content[data-page="#/example"] {
  overflow: auto;
}
`

// Function to generate a page with navigation bar and content
function generatePage(): HTMLElement {
  // This will add the custom CSS to the page, id is used to prevent duplicate CSS
  loadCSS({
    id: "custom-css",
    cssText: customCSS,
  });

  const randomTable = generateRandomTable();
  const body = document.createElement("div");
  body.style.gap = "0.5em";
  body.style.height = "100%";
  body.style.display = "flex";
  body.style.flexDirection = "column";
  
  // Create navigation bar
  const navigationBar = EvenBetterAPI.components.createNavigationBar({
    title: "Example",
    items: [
      { title: "Example", url: "#/example", icon: "fa-home" },
      { title: "Hello", url: "#/hello", icon: "fa-cog" },
    ],
    customButtons: [
      Caido.ui.button({
        label: "Click me",
        variant: "primary",
      }),
    ],
  });

  body.appendChild(navigationBar);

  const content = document.createElement("div");
  content.style.display = "flex";
  content.style.flexDirection = "column";
  content.style.backgroundColor = "var(--c-bg-subtle)";
  content.style.height = "100%";

  const topRow = document.createElement("div");
  topRow.style.display = "flex";
  topRow.style.alignItems = "center";
  topRow.style.gap = "0.5em";
  topRow.style.padding = "1em";

  const clickMeButton = Caido.ui.button({
    label: "Click me",
    variant: "primary",
    size: "medium",
  });

  clickMeButton.addEventListener("click", () => {
    EvenBetterAPI.toast.showToast({
      message: "Button clicked!",
      type: "success",
      duration: 2000,
      position: "bottom",
    });
  });

  topRow.appendChild(clickMeButton);

  const searchInput = EvenBetterAPI.components.createTextInput("15em", "Search...");
  searchInput.addEventListener("input", (event) => {
    const value = (event.target as HTMLInputElement).value;
    randomTable.filterRows(value);
  });
  topRow.appendChild(searchInput);

  content.appendChild(topRow);
  content.appendChild(randomTable.getHTMLElement());
  body.appendChild(content);

  return body;
}

const values = [
  "Caido",
  "EvenBetterAPI",
  "Caido > Burp",
  "Hello, Caido!",
  "Hello, World!",
  "Comic Sans is the best font",
  "This is a random sentence",
]
const generateRandomRow = () => {
  const row = new Map<string, string>();
  row.set("Name", values[Math.floor(Math.random() * values.length)]);
  row.set("Value", "Value " + Math.floor(Math.random() * 100));
  row.set("Version", "v" + Math.floor(Math.random() * 10) + ".0");
  row.set("Date", new Date().toLocaleDateString());
  return row;
};

// Generate a table with 20 randomized rows
const generateRandomTable = ()  => {
  const tableData = Array.from({ length: 20 }, () => generateRandomRow());

  const randomTable = EvenBetterAPI.components.createTable({
    tableHeight: "40em",
    columns: [
      { name: "Name", width: "15em" },
      { name: "Value", width: "15em" },
      { name: "Version", width: "10em" },
      { name: "Date", width: "10em" },
    ],
  });

  tableData.forEach((row) => {
    const name = row.get("Name") || "",
      value = row.get("Value") || "",
      version = row.get("Version") || "",
      date = row.get("Date") || "";

    randomTable.addRow([
      { columnName: "Name", value: name },
      { columnName: "Value", value: value },
      { columnName: "Version", value: version },
      { columnName: "Date", value: date },
    ]);
  });
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
