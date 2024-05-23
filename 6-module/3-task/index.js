import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  elem = null;
  #slides = [];

  constructor(slides) {
    this.#slides = slides || this.#slides;
    this.elem = this.#render();
  }

  #template() {

    return `
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner">

      ${this.#slides.map((slide) => {
      return `
            <div class="carousel__slide" data-id=${slide.id}>
              <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
              <div class="carousel__caption">
                <span class="carousel__price">€${(slide.price).toFixed(2)}</span>
                <div class="carousel__title">${slide.name}</div>
                <button type="button" class="carousel__button">
                  <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                </button>
               </div>
            </div>`;
    }).join('')}
    </div>`;
  }

  #carousel = () => {
  let btnNext = this.elem.querySelector(".carousel__arrow_right");
  let btnPrev = this.elem.querySelector(".carousel__arrow_left");
  let carousel = this.elem.querySelector(".carousel__inner");
  
  let currentSlide = 1;
  btnPrev.style.display = 'none';

  btnNext.onclick = () => {
    btnPrev.style.display = '';
    let width = this.elem.querySelector(".carousel__slide").offsetWidth;
    carousel.style.transform = `translateX(-${width*currentSlide}px)`;
    currentSlide++;
    if(currentSlide === this.#slides.length)
      btnNext.style.display = 'none';
  }

  btnPrev.onclick = () => {
    btnNext.style.display = '';
    let width = this.elem.querySelector(".carousel__slide").offsetWidth;
    currentSlide--; 
    console.log(currentSlide)
    carousel.style.transform = `translateX(-${width*currentSlide-width}px)`;       
    if(currentSlide === 1)
      btnPrev.style.display = 'none';
  }
}

  #productClick = (e) => {
    const buttons = this.elem.querySelectorAll(".carousel__button");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const slideId = button.closest('.carousel__slide').dataset.id;

        const event = new CustomEvent('product-add', {
          bubbles: true,
          detail: slideId,
        });

        button.dispatchEvent(event);
      });
    });
  };

  #render() {
    this.elem = document.createElement('div');
    this.elem.classList.add('carousel');
    this.elem.innerHTML = this.#template();

    this.#productClick();

    this.#carousel();
    return this.elem;
  }
}