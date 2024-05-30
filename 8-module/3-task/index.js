export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) {
      return;
    }

    const productIndex = this.#findProductIndex(product.id);

    if (productIndex > -1) {
      this.cartItems[productIndex].count++;
    } else {
      this.cartItems.push({product, count: 1});
    }

    this.onProductUpdate(this.cartItems[productIndex]);
  }

  updateProductCount(productId, amount) {
    const productIndex = this.#findProductIndex(productId);

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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }

  #findProductIndex(productId) {
    return this.cartItems.findIndex(cartItem => cartItem.product.id === productId);
  }
}