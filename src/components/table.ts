import loadCSS from "../css";

const tableCSS = `
  :root {
    --c-table-background: #2b2e35;
    --c-table-even-item-row: #353942;
    --c-table-item-row-hover: var(--c-bg-default);
  }
  .c-evenbetter_table_card-body {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .c-evenbetter_table-container {
    overscroll-behavior-y: none;
    overflow: auto;
    height: 100%;
    border-radius: 5px !important;
  }
  .c-evenbetter_table_header-row {
    min-width: fit-content;
    width: 100%;
    white-space: nowrap;
    border-bottom: 2px solid var(--c-bg-default);
    background-color: var(--c-table-background);
    position: sticky;
    top: 0;
    z-index: 1;
  }
  .c-evenbetter_table_header-cell {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: var(--c-space-2) var(--c-space-4);
    color: var(--c-fg-subtle);
    user-select: none;
    min-width: var(--1e00f3f4);
    box-sizing: border-box;
    border-right: .1em solid var(--c-bg-default);
  }
  [data-sortable="true"][data-is-resizing="false"]
    .c-evenbetter_table_header-cell {
    cursor: pointer;
  }
  [data-align="start"] .c-evenbetter_header-cell_wrapper {
    flex-direction: row;
  }
  .c-evenbetter_header-cell_wrapper {
    display: inline-flex;
    gap: var(--c-space-2);
    width: 100%;
  }
  .c-evenbetter_header-cell_content {
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;
  }
  .c-evenbetter_table-item-cell {
    min-width: var(--cellWidth);
    display: inline-flex;
    align-items: center;
    padding: 0 1rem;
    width: var(--cellWidth);
    height: 100%;
    box-sizing: border-box;
  }
  .c-evenbetter_table-item-cell__inner {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .c-evenbetter_table-item-row {
    display: flex;
    min-width: fit-content;
    height: 42px;
    box-sizing: border-box;
    white-space: nowrap;
    border-bottom: 0.1em solid var(--c-bg-default);
    width: 100%;
  }
  .c-evenbetter_table-item-row:hover {
    background-color: var(--c-table-item-row-hover);
  }
  .c-evenbetter_table_row[data-is-even="true"] {
    background-color: var(--c-table-even-item-row);
  }
  .c-evenbetter_table_row:hover {
    cursor: pointer;
    background-color: var(--c-table-item-row-hover);
  }
  .c-evenbetter_table_header-cell:last-child {
    border-right: none;
  }
  .c-evenbetter_table {
    outline: none;
    width: 100%;
    height: 100%;
    display: flex;
}`;

type TableColumn = {
  name: string;
  width: string;
};

type TableCell = {
  columnName: string;
  value: string | HTMLElement;
};

const generateTableHTML = () => {
  const htmlContent = `<div class="c-evenbetter_table_card-body"><div class="c-evenbetter_table-container" data-is-empty="false" data-is-loading="false" style="overflow-y: auto;"><div class="c-evenbetter_table_header-row"></div><div class="c-table__wrapper" style="margin-top: 0px;"></div></div></div>`;
  return htmlContent;
};

interface TableConfig {
  tableHeight: string;
  columns: TableColumn[];
  rowHeight?: string;
}

export const createTable = (config: TableConfig) => {
  return new TableAPI(config);
};

export class TableAPI {
  private tableElement: HTMLElement;
  private tableWrapper: HTMLElement;

  constructor(
    private config: {
      tableHeight: string;
      columns: TableColumn[];
      rowHeight?: string;
    }
  ) {
    loadCSS({
      id: "eb-table-css",
      cssText: tableCSS,
    });

    this.tableElement = document.createElement("div");
    this.tableElement.className = "c-evenbetter_table";
    this.tableElement.style.overflow = "auto";
    this.tableElement.style.width = "100%";
    this.tableElement.style.height = this.config.tableHeight;
    this.tableElement.setAttribute(
      "data-row-height",
      this.config.rowHeight || "42px"
    );
    this.tableElement.innerHTML = generateTableHTML();
    this.tableWrapper = this.tableElement.querySelector(
      ".c-table__wrapper"
    ) as HTMLElement;

    const cardBody = this.tableElement.querySelector(
      ".c-evenbetter_table_card-body"
    ) as HTMLElement;
    if (!cardBody) {
      throw new Error("Card body not found");
    }

    cardBody.style.height = this.config.tableHeight;
    cardBody.style.width = "100%";

    const columnRow = this.tableElement.querySelector(
      ".c-evenbetter_table_header-row"
    );
    if (!columnRow) {
      throw new Error("Column row not found");
    }

    this.config.columns.forEach((column) => {
      columnRow.innerHTML += `<div class="c-evenbetter_table_header-cell" data-sortable="true" data-resizable="true" data-align="start" data-is-resizing="false" style="--1e00f3f4: 4rem; width: max(${column.width}, 56px);"><div class="c-evenbetter_header-cell_wrapper"><div class="c-evenbetter_header-cell_content">${column.name}</div></div></div>`;
    });
  }

  filterRows(filterText: string) {
    const rows = this.tableWrapper.querySelectorAll(".c-evenbetter_table_row");
    let visibleRowIndex = 1;
    rows.forEach((row, index) => {
      const tableRow = row as HTMLElement;

      const cells = row.querySelectorAll(".c-evenbetter_table-item-cell");
      let shouldShowRow = false;
      cells.forEach((cell) => {
        if (
          cell.textContent?.toLowerCase().includes(filterText.toLowerCase())
        ) {
          shouldShowRow = true;
        }
      });

      if (shouldShowRow) {
        tableRow.style.display = "flex";
        tableRow.setAttribute(
          "data-is-even",
          (visibleRowIndex % 2 === 0).toString()
        );
        visibleRowIndex++;
      } else {
        tableRow.style.display = "none";
        tableRow.removeAttribute("data-is-even");
      }
    });
  }

  clearRows() {
    this.tableWrapper.innerHTML = "";
  }

  addRow(row: TableCell[], onClick?: () => void) {
    const isEven = (this.tableWrapper.children.length + 1) % 2 === 0;

    const rowContainer = document.createElement("div");
    rowContainer.className = "c-evenbetter_table_row";
    rowContainer.setAttribute("data-is-even", isEven.toString());

    const itemRow = document.createElement("div");
    itemRow.className = "c-evenbetter_table-item-row";
    if (this.config.rowHeight) itemRow.style.height = this.config.rowHeight;

    row.forEach((cell) => {
      const cellWidth = this.config.columns.find(
        (column) => column.name === cell.columnName
      )?.width;

      const itemCell = document.createElement("div");
      itemCell.className = "c-evenbetter_table-item-cell";
      itemCell.setAttribute("data-column-id", cell.columnName);
      itemCell.setAttribute("data-align", "start");
      itemCell.style.setProperty("--cellWidth", `max(${cellWidth}, 56px)`);

      const cellInner = document.createElement("div");
      cellInner.className = "c-evenbetter_table-item-cell__inner";

      if (typeof cell.value === "string") cellInner.textContent = cell.value;
      else cellInner.appendChild(cell.value);

      itemCell.appendChild(cellInner);

      itemRow.appendChild(itemCell);
    });

    if (onClick) {
      itemRow.addEventListener("click", onClick);
    }

    rowContainer.appendChild(itemRow);
    this.tableWrapper.appendChild(rowContainer);
  }

  getHTMLElement() {
    return this.tableElement;
  }

  static createTable(config: TableConfig) {
    return new TableAPI(config);
  }
}
