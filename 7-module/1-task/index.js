import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  elem = null;
  #categories = [];

  constructor(categories) {
    this.#categories = categories || this.#categories;
    this.#render();
  }

  #createButtons() {
    return `
    <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    `;
  }

  #createLinkElement(dataElem) {
    const slide = createElement(`
      <a href="#" class="ribbon__item" data-id="${dataElem.id}">${dataElem.name}</a>
    `);
    return slide;
  }

  #createRibbon() {
    let ribbonInner = document.createElement('div');
    ribbonInner.classList.add('ribbon__inner');

    let ribbon = this.#categories.map(category => this.#createLinkElement(category));
    ribbon[0].classList.add('ribbon__item_active');
    ribbonInner.append(...ribbon);

    return ribbonInner;
  }

  #initScroll() {
    let ribbon = this.elem.querySelector('.ribbon__inner');
    let arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    let arrowRight = this.elem.querySelector('.ribbon__arrow_right');

    if (ribbon.scrollLeft === 0) {
      arrowLeft.classList.remove('ribbon__arrow_visible');
    }

    arrowLeft.addEventListener('click', () => {
      ribbon.scrollBy(-350, 0);
    });

    arrowRight.addEventListener('click', () => {
      ribbon.scrollBy(350, 0);
    });

    ribbon.addEventListener('scroll', () => {
      let scrollWidth = ribbon.scrollWidth;
      let scrollLeft = ribbon.scrollLeft;
      let clientWidth = ribbon.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft === 0) {
        arrowLeft.classList.remove('ribbon__arrow_visible');
      } else if (scrollLeft !== 0 && !arrowLeft.matches('.ribbon__arrow_visible')) {
        arrowLeft.classList.add('ribbon__arrow_visible');
      }

      if (scrollRight === 0) {
        arrowRight.classList.remove('ribbon__arrow_visible');
      } else if (scrollRight !== 0 && !arrowRight.matches('.ribbon__arrow_visible')) {
        arrowRight.classList.add('ribbon__arrow_visible');
      }
    });
  }

  #choiceProduct() {
    let products = this.elem.querySelectorAll('.ribbon__item');

    this.elem.addEventListener('click', (e) => {
      if (e.target.matches('.ribbon__item')) {
        products.forEach(product => {
          if (product.matches('.ribbon__item_active')) {
            product.classList.remove('ribbon__item_active');
          }
        });

        e.preventDefault();
        e.target.classList.add('ribbon__item_active');

        const event = new CustomEvent('ribbon-select', {
          detail: e.target.dataset.id,
          bubbles: true
        });

        this.elem.dispatchEvent(event);
      }
    });
  }

  #render() {
    this.elem = document.createElement('div');
    this.elem.classList.add('ribbon');

    this.elem.insertAdjacentHTML('beforeend', this.#createButtons());
    this.elem.querySelector('.ribbon__arrow_left').insertAdjacentElement('afterEnd', this.#createRibbon());

    this.#initScroll();
    this.#choiceProduct();

    return this.elem;
  }
}