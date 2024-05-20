function hideSelf() {
  const button = document.querySelector(".hide-self-button");

  function click() {
    button.hidden = true;
    }
    button.addEventListener('click', () => click())
}
