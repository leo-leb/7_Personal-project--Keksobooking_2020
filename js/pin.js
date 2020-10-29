'use strict';
(function () {
  const LIB_LIMIT = 5;

  const mapPins = document.querySelector(`.map__pins`);
  const pinTemplate = document.querySelector(`#pin`).content;
  const newItemPin = pinTemplate.querySelector(`.map__pin`);

  let pinsLib = [];

  /**
   * Копируем template и добавляем в разметку - в блок "map__pins".
   */
  const fillMap = () => {
    let mapPin = newItemPin.cloneNode(true);
    mapPins.appendChild(mapPin);
  };

  /**
   * Очищаем карту от пинов.
   */
  const clearMap = () => {
    const mapPinsAll = mapPins.querySelectorAll(`.map__pin`);
    for (let mapPin of mapPinsAll) {
      if (mapPin.className === `map__pin`) {
        mapPins.removeChild(mapPin);
      }
    }
  };

  /**
   * Используя данные исходного массива и функцию добавления в разметку новых объектов, наполняем элементы стилями и пр. инфо.
   * @param {array} array - Исходный массив.
   */
  const createPins = (array) => {
    for (let i = 0; i < LIB_LIMIT; i++) {
      newItemPin.style = `left: ${array[i].location.x}px; top: ${array[i].location.y}px`;
      let picture = newItemPin.querySelector(`img`);
      picture.src = `${array[i].author.avatar}`;
      picture.alt = `заголовок объявления`;
      fillMap();
    }
  };

  window.updatePins = () => {
    clearMap();
    const sameHouse = pinsLib.filter((pin) => {
      return pin.offer.type === window.mapFilterHouse.value;
    });
    createPins(sameHouse);
  };

  const successCase = (data) => {
    pinsLib = data;
    window.updatePins();
  };

  window.pin = {
    mainPin: mapPins.querySelector(`.map__pin--main`),
    successCase
  };
}());
