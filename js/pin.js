'use strict';
(function () {
  const map = document.querySelector(`.map`);

  /**
   * Возвращает объект расчитанных координат исследуемого элемента для стартовой страницы.
   * @param {number} width - Ширина элемента.
   * @param {number} height - Высота элемента.
   * @return {object} - Объект с координатами элемента.
   */
  const calcLockPosition = (width, height) => {
    return {'X': Math.round(map.offsetWidth / 2 - width / 2), 'Y': Math.round(map.offsetHeight / 2 - height / 2)};
  };

  /**
   * Возвращает объект расчитанных координат исследуемого элемента для активной страницы.
   * @param {number} width - Ширина элемента.
   * @param {number} height - Высота элемента.
   * @return {object} - Объект с координатами элемента.
   */
  const calcUnlockPosition = (width, height) => {
    return {'X': Math.round(map.offsetWidth / 2 - width / 2), 'Y': Math.round(map.offsetHeight / 2 - height)};
  };

  /**
   * Присваивает актуальные координаты исходному элементу разметки.
   * @param {object} object - Исходный элемент разметки.
   * @param {array} objectPos - Массив актуальных координат.
   */
  const setPosition = (object, objectPos) => {
    object.style.left = `${objectPos.X}px`;
    object.style.top = `${objectPos.Y}px`;
  };

  /**
   * Наполнение добавленных пинов информацией с сервера.
   * @param {*} pin - Элемент разметки.
   * @param {object} cellFromLibrary - Объект загруженных данных с сервера.
   */
  const fillPin = (pin, cellFromLibrary) => {
    pin.style = `left: ${cellFromLibrary.location.x}px; top: ${cellFromLibrary.location.y}px`;
    let picture = pin.querySelector(`img`);
    picture.src = `${cellFromLibrary.author.avatar}`;
    picture.alt = `заголовок объявления`;
  };

  /**
   * Очищаем карту от пинов.
   */
  const removePins = () => {
    const mapPinsAll = window.map.allElements.querySelectorAll(`button:not(.map__pin--main)`);
    mapPinsAll.forEach((element) => {
      element.remove();
    });
  };

  window.pin = {
    fill: fillPin,
    remove: removePins,
    calcLockPosition,
    calcUnlockPosition,
    setPosition,
  };
}());
