import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.modal = null;
    this.productElements = null;
    this.countElement = null;
    this.productPriceElement = null;
    this.totalPriceElement = null;
    this.submitBtnElement = null;
    this.formElement = null;
    this.modalBody = null;
    this.changeQuantity = '';

    this.addEventListeners();
  }


  addProduct(product) {
    if (!product) {
      return;
    }

    const productIndex = this.findProductIndex(product.id);

    if (productIndex > -1) {
      this.cartItems[productIndex].count++;
    } else {
      this.cartItems.push({product, count: 1});
    }

    this.onProductUpdate(this.cartItems[productIndex]);
  }


  updateProductCount(productId, amount) {
    const productIndex = this.findProductIndex(productId);

    if (productIndex === -1) {
      return;
    }

    this.cartItems[productIndex].count += amount;

    if (this.cartItems[productIndex].count === 0) {
      this.cartItems.splice(productIndex, 1);
    } else {
      this.onProductUpdate(this.cartItems[productIndex]);
    }
  }


  isEmpty() {
    return this.cartItems.length === 0;
  }


  getTotalCount() {
    return this.cartItems.reduce((summ, cartItem) => summ += cartItem.count, 0);
  }


  getTotalPrice() {
    return this.cartItems.reduce((summ, cartItem) => summ += cartItem.product.price * cartItem.count, 0);
  }


  findProductIndex(productId) {
    return this.cartItems.findIndex(cartItem => cartItem.product.id === productId);
  }


  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus" data-change-quantity="minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus" data-change-quantity="plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }


  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }


  createSuccessElement() {
    return createElement(`
    <div class="modal__body-inner">
      <p>
        Order successful! Your order is being cooked :) <br>
        We’ll notify you about delivery time shortly.<br>
        <img src="/assets/images/delivery.gif">
      </p>
    </div>
    `);
  }


  createCartBody() {
    const bodyContainer = document.createElement('div');

    if (this.cartItems.length) {
      for (let cartItem of this.cartItems) {
        bodyContainer.append(this.renderProduct(cartItem.product, cartItem.count));
      }
      bodyContainer.append(this.renderOrderForm());
    } else {
      bodyContainer.append(this.createSuccessElement());
    }

    return bodyContainer;
  }


  destroyCartListeners() {
    this.productElements.forEach(product => product.removeEventListener('click', this.productElementClickHandler));
    this.formElement.removeEventListener('submit', this.onSubmit);
  }


  productElementClickHandler = (event) => {
    const product = event.target.closest('.cart-product');

    if (!product) {
      return;
    }

    const cartItemIndex = this.findProductIndex(product.dataset.productId);
    const cartItem = this.cartItems[cartItemIndex];
    this.countElement = product.querySelector('.cart-counter__count');
    this.productPriceElement = product.querySelector('.cart-product__price');
    this.totalPriceElement = document.querySelector('.cart-buttons__info-price');

    if (event.target.closest('[data-change-quantity]')) {
      this.changeQuantity = event.target.closest('[data-change-quantity]').dataset.changeQuantity;

      if (this.changeQuantity === 'plus') {
        this.updateProductCount(product.dataset.productId, 1);
      } else {
        this.updateProductCount(product.dataset.productId, -1);
      }
    }

    if (cartItem.count === 0) {
      this.productElements[cartItemIndex].remove();
      this.productElements = document.querySelectorAll('.cart-product');
    }

    if (this.isEmpty()) {
      this.destroyCartListeners();
      this.modal.close();
    }

    this.onProductUpdate(cartItem);
  };


  createCartListeners() {
    this.productElements.forEach(product => product.addEventListener('click', this.productElementClickHandler));
    this.formElement.addEventListener('submit', this.onSubmit);
  }


  renderModal() {
    this.modal = new Modal();

    this.modal.open();
    this.modal.setTitle('Your order');
    const modalBody = this.createCartBody();
    this.modal.setBody(modalBody);

    this.productElements = modalBody.querySelectorAll('.cart-product');
    this.submitBtnElement = modalBody.querySelector('.cart-buttons__button.btn-group__button.button');
    this.formElement = modalBody.querySelector('.cart-form');
    this.modalBody = this.modal.bodyElement;
    this.createCartListeners();
  }


  onProductUpdate(cartItem) {
    if (this.countElement && this.productPriceElement && this.totalPriceElement) {
      this.countElement.textContent = cartItem.count;
      this.productPriceElement.textContent = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
      this.totalPriceElement.textContent = `€${this.getTotalPrice().toFixed(2)}`;
    }

    this.cartIcon.update(this);
  }


  onSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(this.formElement);

    const promiseResponse = fetch('https://httpbin.org/post', {
      body: formData,
      method: 'POST',
    });

    promiseResponse
      .then((response) => {
        if (response.ok) {
          this.submitBtnElement.classList.remove('is-loading');
          this.cartItems = [];
          this.modal.setTitle('Success!');
          this.modal.textContent = '';
          this.modal.setBody(this.createCartBody());
          this.cartIcon.update(this);
          this.destroyCartListeners();
        }
      })
      .catch(() => {
        console.error(error);
      });
  };


  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}