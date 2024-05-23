/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  elem = null;
  #list = [];

  constructor(rows) {
    this.#list = rows || this.#list;

    this.elem = this.#render();
  }

  #templateTd(obj) {
    let row = Object.values(obj).map(value => `<td>${value}</td>`);
    row.push(`<td><button class="btn-delete">X</button></td>`);

    return row.join('\n');
  }

  #template() {
    return `
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${this.#list.map(value => `<tr>${this.#templateTd(value)}</tr>`).join('\n')}
      </tbody>
    `;
  }

  #btnClickHandler = (event) => {
    if (event.target.tagName !== 'BUTTON') {
      return;
    }
    event.target.closest('tr').remove();
  }

  #render() {
    this.elem = document.createElement('table');
    this.elem.innerHTML = this.#template();
    this.elem.addEventListener('click', this.#btnClickHandler);
    return this.elem;
  }
}
