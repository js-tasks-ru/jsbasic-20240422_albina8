export default class ProductCard {
  elem = null;
  #card = {};

  constructor(product) {
    this.#card = product || this.#card;
    this.elem = this.#render();
  }

  #template() {
    return `
      <div class="card__top" id=${this.#card.id}>
        <img src='/assets/images/products/${this.#card.image}' class="card__image" alt="product">
        <span class="card__price">€${(this.#card.price).toFixed(2)}</span>
      </div>
      <div class="card__body">
        <div class="card__title">${this.#card.name}</div>
        <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      <div class = "card__body">`;
  }

  #productClick = () => {
    const event = new CustomEvent('product-add', {
      bubbles: true,
      detail: this.#card.id,
    });
    this.elem.querySelector('.card__button').dispatchEvent(event);
  }

  #render() {
    this.elem = document.createElement("div");
    this.elem.classList.add('card');
    this.elem.innerHTML = this.#template();
    this.elem.querySelector('.card__button').addEventListener('click', this.#productClick);
    return this.elem;
  }
}