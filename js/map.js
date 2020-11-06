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
  const mapElements = document.querySelector(`.map__pins`);
  const mainPin = mapElements.querySelector(`.map__pin--main`);
  const pinTemplate = document.querySelector(`#pin`).content;
  const newItemPin = pinTemplate.querySelector(`.map__pin`);
  const cardTemplate = document.querySelector(`#card`).content;
  const newItemCard = cardTemplate.querySelector(`.map__card`);

  /**
   * Блокирование страницы.
   */
  const onPageLocking = () => {
    map.classList.add(`map--faded`);
    window.form.parent.classList.add(`ad-form--disabled`);
    mapFilterChilds.forEach((element) => element.setAttribute(`disabled`, true));
    window.form.childs.forEach((element) => element.setAttribute(`disabled`, true));
    const mainPinPos = window.pin.calcLockPosition(MainPinSizes.X, MainPinSizes.Y1);
    window.pin.setPosition(mainPin, mainPinPos);
    window.form.address.value = `${mainPinPos.X}, ${mainPinPos.Y}`;
  };

  /**
   * Разблокирование страницы.
   */
  const onPageUnlocking = () => {
    map.classList.remove(`map--faded`);
    window.form.parent.classList.remove(`ad-form--disabled`);
    mapFilterChilds.forEach((element) => element.removeAttribute(`disabled`, true));
    window.form.childs.forEach((element) => element.removeAttribute(`disabled`, true));
    const mainPinPos = window.pin.calcUnlockPosition(MainPinSizes.X, MainPinSizes.Y2);
    window.pin.setPosition(mainPin, mainPinPos);
    window.form.address.value = `${mainPinPos.X}, ${mainPinPos.Y}`;
    window.server.download(window.filter.success);
    mainPin.removeEventListener(`mousedown`, onPageUnlocking);
  };

  /**
   * Используя данные исходного массива и функцию добавления в разметку новых объектов, наполняем элементы стилями и пр. инфо.
   * @param {array} array - Массив пинов.
   * @param {number} limit - Максимально допустимое количество пинов.
   */
  const fillMap = (array, limit) => {
    for (let i = 0; i < array.length && i < limit; i++) {
      window.common.create(newItemPin, mapElements);
      window.common.create(newItemCard, mapElements);
    }
    window.mapPinsAll = mapElements.querySelectorAll(`button:not(.map__pin--main):not(.popup__close)`);
    window.mapWindowsAll = mapElements.querySelectorAll(`.map__card`);
    for (let i = 0; i < array.length && i < limit; i++) {
      window.pin.fill(window.mapPinsAll[i], array[i]);
      window.card.fill(window.mapWindowsAll[i], array[i]);
    }
  };

  window.map = {
    fill: fillMap,
    locking: onPageLocking,
    unlocking: onPageUnlocking,
    allElements: mapElements,
    filterParent: mapFilterParent,
    mainPin,
    MainPinSizes
  };
}());
