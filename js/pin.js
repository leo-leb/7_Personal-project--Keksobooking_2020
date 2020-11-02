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
   * Очищаем карту от пинов.
   */
  const clearMap = () => {
    const mapPinsAll = mapPins.querySelectorAll(`button:not(.map__pin--main)`);
    for (let mapPin of mapPinsAll) {
      mapPins.removeChild(mapPin);
    }
  };

  /**
   * Используя данные исходного массива и функцию добавления в разметку новых объектов, наполняем элементы стилями и пр. инфо.
   * @param {array} array - Массив пинов.
   * @param {number} limit - Максимально допустимое количество пинов.
   */
  const createPins = (array, limit) => {
    for (let i = 0; i < limit; i++) {
      newItemPin.style = `left: ${array[i].location.x}px; top: ${array[i].location.y}px`;
      let picture = newItemPin.querySelector(`img`);
      picture.src = `${array[i].author.avatar}`;
      picture.alt = `заголовок объявления`;
      fillMap();
    }
  };

  window.pin = {
    main: mapPins.querySelector(`.map__pin--main`),
    clear: clearMap,
    create: createPins
  };
}());
