import loadCSS from "../css";

type ModalContent = {
  title: string;
  content: string;
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

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

const generateModal = ({ title, content }: ModalContent): HTMLDivElement => {
  loadCSS({ id: "evenbetterapi-modal", cssText: modalCSS });

  const modal = document.createElement("div");
  modal.classList.add("evenbetter-modal");

  modal.innerHTML = `
      <div class="evenbetter-modal__content">
        <div class="evenbetter-modal__content-header">
          <h2 class="evenbetter-modal__content-header-title"></h2>
        </div>
        <div class="evenbetter-modal__content-body">
          <p class="evenbetter-modal__content-body-text"></p>
          <button class="evenbetter-modal__content-body-close">
            Close
          </button>
        </div>
      </div>
    `;

  const modalTitle = modal.querySelector(
    ".evenbetter-modal__content-header-title"
  );
  if (!modalTitle) {
    throw new Error("Modal title not found");
  }

  modalTitle.textContent = title;

  const modalBody = modal.querySelector(".evenbetter-modal__content-body-text");
  if (!modalBody) {
    throw new Error("Modal body not found");
  }

  modalBody.innerHTML = content;

  modal.setAttribute("data-modal-title", title);

  modal
    .querySelector(".evenbetter-modal__content-body-close")
    ?.addEventListener("click", closeModal);

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
