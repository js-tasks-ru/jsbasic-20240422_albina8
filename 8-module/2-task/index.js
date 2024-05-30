import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  elem = null;
  #products = [];

  constructor(products) {
    this.#products = products || this.#products;
    this.filters = {};

    this.elem = this.#createElem();
    this.cardsContainer = this.elem.querySelector('.products-grid__inner');

    this.#createListCards(this.#products);
  }

  #updateFiltersObject(filterData) {
    for (let key in filterData) {
      this.filters[key] = filterData[key];
    }
  }

  updateFilter(filters) {
    this.#updateFiltersObject(filters);

    const filteredProducts = this.#products.filter(product => {
      if (this.filters.noNuts && product.nuts) {
        return false;
      }

      if (this.filters.vegeterianOnly && !product.vegeterian) {
        return false;
      }

      if (this.filters.maxSpiciness && product.spiciness > this.filters.maxSpiciness) {
        return false;
      }

      if (this.filters.category && product.category !== this.filters.category) {
        return false;
      }

      return true;
    });

    this.cardsContainer.textContent = '';
    this.#createListCards(filteredProducts);
  }

  #createCard(product) {
    let card = new ProductCard(product);

    return card.elem;
  }

  #createListCards(products) {
    let cards = products.map(product => this.#createCard(product));
    this.cardsContainer.append(...cards);

    return this.cardsContainer;
  }

  #createTemplate() {
    return `
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
    `;
  }

  #createElem() {
    this.elem = createElement(this.#createTemplate());

    return this.elem;
  }
}