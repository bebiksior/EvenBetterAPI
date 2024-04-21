import loadCSS from "../css";
import tableCSS from "./table.css";

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
      cssText: tableCSS.toString(),
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
