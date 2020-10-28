'use strict';
(function () {
  const mapPins = document.querySelector(`.map__pins`);
  const pinTemplate = document.querySelector(`#pin`).content;
  const newItemPin = pinTemplate.querySelector(`.map__pin`);

  /**
   * Копируем template и добавляем в разметку - в блок "map__pins".
   */
  const fillMap = () => {
    let mapPin = newItemPin.cloneNode(true);
    mapPins.appendChild(mapPin);
  };

  /**
   * Используя данные исходного массива и функцию добавления в разметку новых объектов, наполняем элементы стилями и пр. инфо.
   * @param {array} array - Исходный массив.
   */
  const createPins = (array) => {
    for (let i = 0; i < array.length; i++) {
      newItemPin.style = `left: ${array[i].location.x}px; top: ${array[i].location.y}px`;
      let picture = newItemPin.querySelector(`img`);
      picture.src = `${array[i].author.avatar}`;
      picture.alt = `заголовок объявления`;
      fillMap();
    }
  };

  window.pin = {
    mainPin: mapPins.querySelector(`.map__pin--main`),
    createPins
  };
}());
