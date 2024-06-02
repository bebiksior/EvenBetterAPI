import { EvenBetterAPI } from "..";
type ModalContent = {
  modalAPI: ModalAPI;
  title: string;
  content: string | HTMLElement;
};

const modalCSS = `
  .evenbetter-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999;
  }
  
  .evenbetter-modal__content {
    background-color: var(--c-bg-default);
    padding: 1rem;
    border-radius: 5px;
    width: 50%;
    max-width: 500px;
  }
  
  .evenbetter-modal__content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .evenbetter-modal__content-header-title {
    font-size: 1.1rem;
    margin: 0;
  }
  
  .evenbetter-modal__content-body {
    margin-bottom: 1rem;
  }
  
  .evenbetter-modal__content-body-text {
    font-size: 0.9rem;
    color: var(--c-fg-subtle);
    word-break: break-word;
    user-select: text !important;
    -webkit-user-select: text !important;
  
    white-space: break-spaces;
    overflow: auto;
    max-height: 40em;
  }
  
  .evenbetter-modal__content-body a {
    color: var(--c-fg-default);
  }
  
  .evenbetter-modal__content-body-close {
    background-color: var(--c-bg-subtle);
    border: 1px solid var(--c-header-cell-border);
    color: #fff;
    padding: 0.5rem;
    width: 100%;
    margin-top: 0.5rem;
    cursor: pointer;
    transition: 0.2s ease background-color;
  }
  
  .evenbetter-modal__content-body-close:hover {
    background-color: var(--c-bg-default);
  }
`;

const generateModal = ({
  modalAPI,
  title,
  content,
}: ModalContent): HTMLDivElement => {
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

  if (typeof content === "string") {
    modalBodyText.innerHTML = content;
  } else if (content instanceof HTMLElement) {
    modalBodyText.appendChild(content);
  }

  const closeButton = document.createElement("button");
  closeButton.classList.add("evenbetter-modal__content-body-close");
  closeButton.textContent = "Close";
  closeButton.addEventListener("click", modalAPI.closeModal);

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

export class ModalAPI {
  private evenBetterAPI: EvenBetterAPI;
  constructor(evenBetterAPI: EvenBetterAPI) {
    this.evenBetterAPI = evenBetterAPI;
    this.evenBetterAPI.helpers.loadCSS({
      id: "evenbetterapi-modal",
      cssText: modalCSS.toString(),
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeModal();
      }
    });
  }

  openModal({
    title,
    content,
  }: {
    title: string;
    content: string | HTMLElement;
  }): void {
    if (isModalOpen()) {
      this.closeModal();
    }

    const modal = generateModal({ modalAPI: this, title, content });
    document.body.appendChild(modal);
  }

  closeModal(): void {
    const modal = document.querySelector(".evenbetter-modal");
    modal?.remove();
  }
}
