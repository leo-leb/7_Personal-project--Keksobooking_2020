'use strict';

(function () {
  const PIN_X = 65;
  const PIN_Y_START = 65;
  const PIN_Y_ACTIVE = 82;

  const map = document.querySelector(`.map`);
  const mapFilterParent = map.querySelector(`.map__filters`);
  const mapFilterChilds = mapFilterParent.querySelectorAll(`.map__filter`);

  /**
   * Возвращает массив расчитанных координат исследуемого объекта для стартовой страницы.
   * @param {number} width - Ширина объекта.
   * @param {number} height - Высота объекта.
   * @return - Массив координат объекта.
   */
  const calcPositionStart = function (width, height) {
    return [Math.round(map.offsetWidth / 2 - width / 2), Math.round(map.offsetHeight / 2 - height / 2)];
  };

  /**
   * Возвращает массив расчитанных координат исследуемого объекта для активной страницы.
   * @param {number} width - Ширина объекта.
   * @param {number} height - Высота объекта.
   * @return - Массив координат объекта.
   */
  const calcPositionActive = function (width, height) {
    return [Math.round(map.offsetWidth / 2 - width / 2), Math.round(map.offsetHeight / 2 - height)];
  };

  /**
   * Присваивает актуальные координаты исходному элементу разметки.
   * @param {*} object - Исходный элемент разметки.
   * @param {array} objectPos - Массив актуальных координат.
   */
  const setPosition = function (object, objectPos) {
    object.style.left = `${objectPos[0]}px`;
    object.style.top = `${objectPos[1]}px`;
  };

    /**
   * Деактивация страницы.
   */
  const setPassivePage = function () {
    mapFilterChilds.forEach(element => element.setAttribute(`disabled`, true));
    window.form.formChilds.forEach(element => element.setAttribute(`disabled`, true));
    const mainPinPos = calcPositionStart(PIN_X, PIN_Y_START);
    setPosition(window.pin.mainPin, mainPinPos);
    window.form.formAddress.value = `${mainPinPos[0]}, ${mainPinPos[1]}`;
  }

  /**
   * Активация страницы.
   */
  const setActivePage = function () {
    map.classList.remove(`map--faded`);
    window.form.formParent.classList.remove(`ad-form--disabled`);
    mapFilterChilds.forEach(element => element.removeAttribute(`disabled`, true));
    window.form.formChilds.forEach(element => element.removeAttribute(`disabled`, true));
    const mainPinPos = calcPositionActive(PIN_X, PIN_Y_ACTIVE);
    setPosition(window.pin.mainPin, mainPinPos);
    window.form.formAddress.value = `${mainPinPos[0]}, ${mainPinPos[1]}`;
  }

  window.map = {
    setPassivePage: setPassivePage,
    setActivePage: setActivePage
  };
}());
