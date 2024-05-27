export default class Modal {
  constructor() {
    this.#createModal();
  }

  #createModal() {
    this.modal = document.createElement('div');
    this.modal.classList.add('modal');

    this.modal.insertAdjacentHTML('afterbegin', this.#createModalTemplate());

    this.#closeModalClick();
    this.#closeModalEsc();
  }

  #createModalTemplate() {
    const modalTemplate = `
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title">
          Вот сюда нужно добавлять заголовок
        </h3>
      </div>

      <div class="modal__body">
        A сюда нужно добавлять содержимое тела модального окна
      </div>
    </div>
    `;

    return modalTemplate;
  }

  open() {
    document.body.insertAdjacentElement('afterbegin', this.modal);
    document.body.classList.add('is-modal-open');
  }

  setTitle(modalTitle) {
    const title = this.modal.querySelector('.modal__title');
    title.textContent = modalTitle;
  }

  setBody(node) {
    const modalBody = this.modal.querySelector('.modal__body');

    modalBody.textContent = '';
    modalBody.insertAdjacentElement('afterbegin', node);
  }

  close() {
    this.modal.remove();
    document.body.classList.remove('is-modal-open');
    document.body.removeEventListener('keydown', this.#deleteKeydownHandler);
  }

  #closeModalClick() {
    this.modal.querySelector('.modal__close').addEventListener('click', () => {
      this.modal.remove();
      document.body.classList.remove('is-modal-open');
      document.body.removeEventListener('keydown', this.#deleteKeydownHandler);
    });
  }

  #deleteKeydownHandler(e) {
    if (e.code === 'Escape') {
      this.modal.remove();
      document.body.classList.remove('is-modal-open');
      document.body.removeEventListener('keydown', this.#deleteKeydownHandler);
    }
  }

  #closeModalEsc() {
    document.body.addEventListener('keydown', this.#deleteKeydownHandler.bind(this));
  }
}