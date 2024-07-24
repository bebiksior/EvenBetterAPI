import type { EvenBetterAPI } from "..";
import "./table.css"

type TableColumn = {
  name: string;
  width?: string;
};

type TableCell = {
  columnName: string;
  value: string | HTMLElement;
};

function minifyHTML(strings: TemplateStringsArray, ...values: any[]): string {
  return strings.reduce((result, string, i) => {
    let combined = string + (values[i] !== undefined ? values[i] : "");
    return result + combined.replace(/\s+/g, " ").trim();
  }, "");
}

const generateTableHTML = () => {
  return minifyHTML`
      <table role="table" class="p-datatable-table" data-pc-section="table">
        <thead class="p-datatable-thead" role="rowgroup" data-pc-section="thead" style="position: sticky;">
          <tr role="row" data-pc-section="headerrow">
          </tr>
        </thead>
        <tbody class="p-datatable-tbody" role="rowgroup" data-pc-section="tbody">
        </tbody>
      </table>
    `.trim();
};

export interface TableConfig {
  columns: TableColumn[];
}

export const createTable = (
  evenbetterAPI: EvenBetterAPI,
  config: TableConfig
) => {
  return new TableAPI(config);
};

interface TableRowElement {
  htmlElement: HTMLElement;
  cells: TableCell[];
}

export class TableAPI {
  private tableElement: HTMLElement;
  private tableBody: HTMLElement;
  private rows: TableRowElement[] = [];

  constructor(
    private config: {
      columns: TableColumn[];
    }
  ) {
    this.tableElement = document.createElement("div");
    this.tableElement.className =
      "p-datatable p-datatable-responsive-scroll p-datatable-striped p-datatable-sm";
    this.tableElement.style.overflow = "auto";
    this.tableElement.style.width = "100%";
    this.tableElement.style.height = "100%";
    this.tableElement.innerHTML = generateTableHTML();
    this.tableBody = this.tableElement.querySelector(
      ".p-datatable-tbody"
    ) as HTMLElement;

    const table = this.tableElement.querySelector("table") as HTMLElement;

    table.style.width = "100%";
    table.style.tableLayout = "fixed";

    const headerRow = this.tableElement.querySelector(
      "[data-pc-section=headerrow]"
    ) as HTMLElement;
    if (!headerRow) {
      throw new Error("Column row not found");
    }

    this.config.columns.forEach((column) => {
      const headerCell = document.createElement("th");
      headerCell.className = "p-column-header";
      headerCell.setAttribute("role", "columnheader");
      headerCell.setAttribute("data-pc-section", "headercell");
      headerCell.setAttribute("data-p-resizable-column", "false");
      headerCell.setAttribute("data-p-filter-column", "false");
      headerCell.setAttribute("data-p-reorderable-column", "false");
      headerCell.setAttribute("first", "0");

      const headerContent = document.createElement("div");
      headerContent.className = "p-column-header-content";
      headerContent.setAttribute("data-pc-section", "headercontent");

      const headerTitle = document.createElement("span");
      headerTitle.className = "p-column-title";
      headerTitle.setAttribute("data-pc-section", "headertitle");
      headerTitle.textContent = column.name;

      headerContent.appendChild(headerTitle);
      headerCell.appendChild(headerContent);

      if (column.width) headerCell.style.width = column.width;

      headerRow.appendChild(headerCell);
    });
  }

  filterRows(filterText: string) {
    let visibleRowIndex = 0;
    this.rows.forEach((row) => {
      const tableRow = row.htmlElement;
      const cells = row.cells;
      let shouldShowRow = false;

      cells.forEach((cell) => {
        if (typeof cell.value === "string") {
          if (cell.value.toLowerCase().includes(filterText.toLowerCase())) {
            shouldShowRow = true;
          }
        } else {
          if (
            cell.value.textContent
              ?.toLowerCase()
              .includes(filterText.toLowerCase())
          ) {
            shouldShowRow = true;
          }
        }
      });

      if (shouldShowRow) {
        tableRow.style.removeProperty("display");

        tableRow.classList.remove("p-row-even", "p-row-odd");
        tableRow.classList.add(
          visibleRowIndex % 2 === 0 ? "p-row-even" : "p-row-odd"
        );

        visibleRowIndex++;
      } else {
        tableRow.style.display = "none";
        tableRow.removeAttribute("data-is-even");
      }
    });
  }

  clearRows() {
    this.rows.forEach((row) => {
      row.htmlElement.remove();
    });

    this.rows = [];
  }

  addRow(cells: TableCell[], onClick?: () => void) {
    const isEven = (this.tableBody.children.length + 1) % 2 !== 0;

    const tableRow = document.createElement("tr");
    tableRow.className = `p-row-${isEven ? "even" : "odd"}`;
    tableRow.setAttribute("tabindex", "-1");
    tableRow.setAttribute("role", "row");
    tableRow.setAttribute("data-pc-section", "bodyrow");
    tableRow.setAttribute("data-p-index", "0");
    tableRow.setAttribute("data-p-selectable-row", "false");
    tableRow.setAttribute("draggable", "false");

    cells.forEach((cell) => {
      const cellWidth = this.config.columns.find(
        (column) => column.name === cell.columnName
      )?.width;

      const tableCell = document.createElement("td");
      tableCell.setAttribute("role", "cell");
      tableCell.style.whiteSpace = "nowrap";
      tableCell.style.overflow = "hidden";
      tableCell.setAttribute("data-pc-section", "bodycell");
      tableCell.setAttribute("data-pc-name", "bodycell");
      tableCell.setAttribute("data-p-selection-column", "false");
      tableCell.setAttribute("data-p-cell-editing", "false");

      if (cellWidth) tableCell.style.width = cellWidth;

      if (typeof cell.value === "string") tableCell.textContent = cell.value;
      else tableCell.appendChild(cell.value);

      tableRow.appendChild(tableCell);
    });

    if (onClick) tableRow.addEventListener("click", onClick);

    this.tableBody.appendChild(tableRow);
    this.rows.push({
      htmlElement: tableRow,
      cells: cells,
    });
  }

  getHTMLElement() {
    return this.tableElement;
  }

  static createTable(config: TableConfig) {
    return new TableAPI(config);
  }
}
