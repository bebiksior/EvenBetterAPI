import type { EvenBetterAPI } from "..";

const cssText = `
.eb-select {
    background-image: url(data:image/svg+xml;charset=US-ASCII,%3Csvg%20viewBox%3D%220%20-4.5%2020%2020%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20fill%3D%22%23ffffff%22%3E%3Cg%20id%3D%22SVGRepo_bgCarrier%22%20stroke-width%3D%220%22%3E%3C%2Fg%3E%3Cg%20id%3D%22SVGRepo_tracerCarrier%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C%2Fg%3E%3Cg%20id%3D%22SVGRepo_iconCarrier%22%3E%20%3Ctitle%3Earrow_down%20%5B%23ffffff%5D%3C%2Ftitle%3E%20%3Cdesc%3ECreated%20with%20Sketch.%3C%2Fdesc%3E%20%3Cdefs%3E%20%3C%2Fdefs%3E%20%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%3Cg%20id%3D%22Dribbble-Light-Preview%22%20transform%3D%22translate%28-220.000000%2C%20-6684.000000%29%22%20fill%3D%22%23ffffff%22%3E%20%3Cg%20id%3D%22icons%22%20transform%3D%22translate%2856.000000%2C%20160.000000%29%22%3E%20%3Cpath%20d%3D%22M164.292308%2C6524.36583%20L164.292308%2C6524.36583%20C163.902564%2C6524.77071%20163.902564%2C6525.42619%20164.292308%2C6525.83004%20L172.555873%2C6534.39267%20C173.33636%2C6535.20244%20174.602528%2C6535.20244%20175.383014%2C6534.39267%20L183.70754%2C6525.76791%20C184.093286%2C6525.36716%20184.098283%2C6524.71997%20183.717533%2C6524.31405%20C183.328789%2C6523.89985%20182.68821%2C6523.89467%20182.29347%2C6524.30266%20L174.676479%2C6532.19636%20C174.285736%2C6532.60124%20173.653152%2C6532.60124%20173.262409%2C6532.19636%20L165.705379%2C6524.36583%20C165.315635%2C6523.96094%20164.683051%2C6523.96094%20164.292308%2C6524.36583%22%20id%3D%22arrow_down-%5B%23ffffff%5D%22%3E%20%3C%2Fpath%3E%20%3C%2Fg%3E%20%3C%2Fg%3E%20%3C%2Fg%3E%20%3C%2Fg%3E%3C%2Fsvg%3E);
    background-repeat: no-repeat;
    background-position: right 0.7rem top 50%;
    background-size: 0.65rem auto;
    width: 100%;
    height: var(--c-space-10);
    border-radius: var(--c-border-radius-2) 0px 0px var(--c-border-radius-2) !important;
    border: var(--c-border-width-1) solid var(--c-border-default);
    background-color: var(--c-bg-default);
    color: var(--c-fg-default);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 0 0.5em;
}
`;

export interface SelectOption {
  value: string;
  label: string;
}

export function createSelect(
  evenBetterAPI: EvenBetterAPI,
  options: SelectOption[]
): HTMLSelectElement {
  evenBetterAPI.helpers.loadCSS({ id: "eb-select", cssText: cssText });

  const select = document.createElement("select") as HTMLSelectElement;
  select.classList.add("eb-select");

  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option.value;
    optionElement.textContent = option.label;
    select.appendChild(optionElement);
  });

  return select;
}
