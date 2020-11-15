'use strict';
(function () {
  const map = document.querySelector(`.map`);

  /**
   * Возвращает объект с расчитанными координатами элемента.
   * @param {number} width - Ширина элемента.
   * @param {number} height - Высота элемента.
   * @return {object} - Объект с координатами элемента.
   */
  const calcRealPos = (width, height) => {
    return {'X': Math.floor(map.offsetWidth / 2 - width / 2), 'Y': Math.floor(map.offsetHeight / 2 - height / 2)};
  };

  /**
   * Возвращает объект с расчитанными координатами для центра элемента.
   * @param {object} element - Исходный элемент.
   * @param {number} width - Ширина элемента.
   * @param {number} height - Высота элемента.
   * @return {object} - Объект с координатами элемента.
   */
  const calcFakePosForCircle = (element, width, height) => {
    return {'X': Math.ceil(element.X + width / 2), 'Y': Math.ceil(element.Y + height / 2)};
  };

  /**
   * Возвращает объект с расчитанными координатами для острого конца элемента.
   * @param {object} element - Исходный элемент.
   * @param {number} width - Ширина элемента.
   * @param {number} height - Высота элемента.
   * @return {object} - Объект с координатами элемента.
   */
  const calcFakePosForPin = (element, width, height) => {
    return {'X': Math.ceil(element.X + width / 2), 'Y': Math.ceil(element.Y + height)};
  };

  /**
   * Присваивает актуальные координаты исходному элементу разметки.
   * @param {object} element - Исходный элемент разметки.
   * @param {array} elementPos - Массив актуальных координат.
   */
  const setPosition = (element, elementPos) => {
    element.style.left = `${elementPos.X}px`;
    element.style.top = `${elementPos.Y}px`;
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
    const allPins = window.map.elementsParent.querySelectorAll(`button:not(.map__pin--main):not(.popup__close)`);
    allPins.forEach((element) => {
      element.remove();
    });
  };

  window.pin = {
    fill: fillPin,
    remove: removePins,
    set: setPosition,
    calcReal: calcRealPos,
    calcFakeCircle: calcFakePosForCircle,
    calcFakePin: calcFakePosForPin
  };
}());
