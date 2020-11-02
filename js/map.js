'use strict';

(function () {
  const MainPinSizes = {
    'X': 65,
    'Y1': 65,
    'Y2': 82
  };

  const map = document.querySelector(`.map`);
  const mapFilterParent = map.querySelector(`.map__filters`);
  const mapFilterChilds = mapFilterParent.querySelectorAll(`.map__filter`);

  /**
   * Возвращает массив расчитанных координат исследуемого объекта для стартовой страницы.
   * @param {number} width - Ширина объекта.
   * @param {number} height - Высота объекта.
   * @return {array} - Массив координат объекта.
   */
  const calcPositionStart = (width, height) => {
    return {'X': Math.round(map.offsetWidth / 2 - width / 2), 'Y': Math.round(map.offsetHeight / 2 - height / 2)};
  };

  /**
   * Возвращает массив расчитанных координат исследуемого объекта для активной страницы.
   * @param {number} width - Ширина объекта.
   * @param {number} height - Высота объекта.
   * @return {array} - Массив координат объекта.
   */
  const calcPositionActive = (width, height) => {
    return {'X': Math.round(map.offsetWidth / 2 - width / 2), 'Y': Math.round(map.offsetHeight / 2 - height)};
  };

  /**
   * Присваивает актуальные координаты исходному элементу разметки.
   * @param {*} object - Исходный элемент разметки.
   * @param {array} objectPos - Массив актуальных координат.
   */
  const setPosition = (object, objectPos) => {
    object.style.left = `${objectPos.X}px`;
    object.style.top = `${objectPos.Y}px`;
  };

  /**
   * Деактивация страницы.
   */
  const setPassivePage = () => {
    map.classList.add(`map--faded`);
    window.form.parent.classList.add(`ad-form--disabled`);
    mapFilterChilds.forEach((element) => element.setAttribute(`disabled`, true));
    window.form.childs.forEach((element) => element.setAttribute(`disabled`, true));
    const mainPinPos = calcPositionStart(MainPinSizes.X, MainPinSizes.Y1);
    setPosition(window.pin.main, mainPinPos);
    window.form.address.value = `${mainPinPos.X}, ${mainPinPos.Y}`;
  };

  /**
   * Активация страницы.
   */
  const setActivePage = () => {
    map.classList.remove(`map--faded`);
    window.form.parent.classList.remove(`ad-form--disabled`);
    mapFilterChilds.forEach((element) => element.removeAttribute(`disabled`, true));
    window.form.childs.forEach((element) => element.removeAttribute(`disabled`, true));
    const mainPinPos = calcPositionActive(MainPinSizes.X, MainPinSizes.Y2);
    setPosition(window.pin.main, mainPinPos);
    window.form.address.value = `${mainPinPos.X}, ${mainPinPos.Y}`;
    window.load.download(window.filter.success);
  };

  window.map = {
    passivePage: setPassivePage,
    activePage: setActivePage,
    filterParent: mapFilterParent
  };
}());
