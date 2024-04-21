import loadCSS from "../css";
import modalCSS from "./modal.css";

type ModalContent = {
  title: string;
  content: string;
};

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

const generateModal = ({ title, content }: ModalContent): HTMLDivElement => {
  loadCSS({ id: "evenbetterapi-modal", cssText: modalCSS.toString() });

  const modal = document.createElement("div");
  modal.classList.add("evenbetter-modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("evenbetter-modal__content");

  const modalContentHeader = document.createElement("div");
  modalContentHeader.classList.add("evenbetter-modal__content-header");

  const modalTitle = document.createElement("h2");
  modalTitle.classList.add("evenbetter-modal__content-header-title");
  modalTitle.textContent = title;

  modalContentHeader.appendChild(modalTitle);

  const modalContentBody = document.createElement("div");
  modalContentBody.classList.add("evenbetter-modal__content-body");

  const modalBodyText = document.createElement("p");
  modalBodyText.classList.add("evenbetter-modal__content-body-text");
  modalBodyText.textContent = content;

  const closeButton = document.createElement("button");
  closeButton.classList.add("evenbetter-modal__content-body-close");
  closeButton.textContent = "Close";
  closeButton.addEventListener("click", closeModal);

  modalContentBody.appendChild(modalBodyText);
  modalContentBody.appendChild(closeButton);

  modalContent.appendChild(modalContentHeader);
  modalContent.appendChild(modalContentBody);

  modal.appendChild(modalContent);

  modal.setAttribute("data-modal-title", title);

  return modal;
};


const isModalOpen = (): boolean => {
  return document.querySelector(".evenbetter-modal") !== null;
};

export const closeModal = (): void => {
  const modal = document.querySelector(".evenbetter-modal");
  modal?.remove();
};

export const openModal = ({ title, content }: ModalContent): void => {
  if (isModalOpen()) {
    closeModal();
  }

  const modal = generateModal({ title, content });
  document.body.appendChild(modal);
};
