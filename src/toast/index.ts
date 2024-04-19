import loadCSS from "../css";

const toastCSS = `
.v-toast--fade-in {
    animation: fadeIn 0.15s ease-in-out forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.v-toast--fade-out {
    animation: fadeOut 0.15s ease-in-out forwards;
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
`;
interface ToastOptions {
  message: string;
  duration: number;
  position: "top" | "bottom";
  type: "info" | "success" | "warning" | "error";
}

const createToastElement = (
  message: string,
  type: string,
  position: string
): HTMLDivElement => {
  const toastElement = document.createElement("div");
  toastElement.classList.add("v-toast");
  toastElement.classList.add(`v-toast--${position}`);

  const toastItem = document.createElement("div");
  toastItem.setAttribute("role", "alert");
  toastItem.classList.add("v-toast__item");
  toastItem.classList.add(`v-toast__item--${type}`);
  toastItem.classList.add(`v-toast__item--${position}`);
  toastElement.appendChild(toastItem);

  const toastIcon = document.createElement("div");
  toastIcon.classList.add("v-toast__icon");
  toastItem.appendChild(toastIcon);

  const toastText = document.createElement("p");
  toastText.classList.add("v-toast__text");
  toastText.textContent = message;
  toastItem.appendChild(toastText);

  toastElement.classList.add("v-toast--fade-in");

  return toastElement;
};

export const showToast = (toastOptions: ToastOptions): void => {
  const { message, type, position, duration } = toastOptions;
  loadCSS({ id: "eb-toast", cssText: toastCSS });

  let toastContainer = document.querySelector(
    `.v-toast--${position}`
  ) as HTMLDivElement;

  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.classList.add("v-toast");
    toastContainer.classList.add(`v-toast--${position}`);
    document.body.appendChild(toastContainer);
  }

  const toastElement = createToastElement(message, type, position);
  toastContainer.appendChild(toastElement);

  setTimeout(() => {
    toastElement.classList.add("v-toast--fade-out");
    setTimeout(() => {
      toastElement.remove();
    }, 150);
  }, duration - 150);
};
