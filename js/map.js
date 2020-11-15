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
  const mapElementsParent = document.querySelector(`.map__pins`);
  const mainPin = mapElementsParent.querySelector(`.map__pin--main`);
  const mainPinRealPos = window.pin.calcReal(MainPinSizes.X, MainPinSizes.Y1);
  const pinTemplate = document.querySelector(`#pin`).content;
  const newItemPin = pinTemplate.querySelector(`.map__pin`);
  const cardTemplate = document.querySelector(`#card`).content;
  const newItemCard = cardTemplate.querySelector(`.map__card`);

  const onMainPinEnterPress = (evt) => window.common.enterEvt(evt, onPageUnlocking);
  const onMainPinMousePress = (evt) => window.common.leftButtonEvt(evt, onPageUnlocking);

  /**
   * Блокирование страницы.
   */
  const onPageLocking = () => {
    map.classList.add(`map--faded`);
    window.form.parent.classList.add(`ad-form--disabled`);
    mapFilterChilds.forEach((element) => element.setAttribute(`disabled`, true));
    window.form.childs.forEach((element) => element.setAttribute(`disabled`, true));
    window.pin.set(mainPin, mainPinRealPos);
    const mainPinFakePos = window.pin.calcFakeCircle(mainPinRealPos, MainPinSizes.X, MainPinSizes.Y1);
    window.form.address.value = `${mainPinFakePos.X}, ${mainPinFakePos.Y}`;
    mainPin.addEventListener(`mousedown`, onMainPinMousePress);
    mainPin.addEventListener(`keydown`, onMainPinEnterPress);
  };

  /**
   * Разблокирование страницы.
   */
  const onPageUnlocking = () => {
    map.classList.remove(`map--faded`);
    window.form.parent.classList.remove(`ad-form--disabled`);
    mapFilterChilds.forEach((element) => element.removeAttribute(`disabled`, true));
    window.form.childs.forEach((element) => element.removeAttribute(`disabled`, true));
    const mainPinFakePos = window.pin.calcFakePin(mainPinRealPos, MainPinSizes.X, MainPinSizes.Y2);
    window.form.address.value = `${mainPinFakePos.X}, ${mainPinFakePos.Y}`;
    window.server.download(window.server.URL.download, window.filter.success, window.server.error);
    mainPin.removeEventListener(`mousedown`, onMainPinMousePress);
    mainPin.removeEventListener(`keydown`, onMainPinEnterPress);
  };

  /**
   * Используя данные исходного массива и функцию добавления в разметку новых объектов, наполняем элементы стилями и пр. инфо.
   * @param {array} array - Массив пинов.
   * @param {number} limit - Максимально допустимое количество пинов.
   */
  const fillMap = (array, limit) => {
    for (let i = 0; i < array.length && i < limit; i++) {
      window.common.create(newItemPin, mapElementsParent);
      window.common.create(newItemCard, mapElementsParent);
    }
    const allPins = mapElementsParent.querySelectorAll(`button:not(.map__pin--main):not(.popup__close)`);
    const allCards = mapElementsParent.querySelectorAll(`.map__card`);
    window.card.hide();
    for (let i = 0; i < array.length && i < limit; i++) {
      let somePin = allPins[i];
      let someCard = allCards[i];
      let closeCard = someCard.querySelector(`.popup__close`);
      window.pin.fill(somePin, array[i]);
      window.card.fill(someCard, array[i]);
      const hideCard = () => {
        someCard.style.display = `none`;
        document.removeEventListener(`keydown`, onCardEscPress);
      };
      const onCardEscPress = (evt) => {
        window.common.escEvt(evt, hideCard);
      };
      const showCard = () => {
        window.card.hide();
        someCard.style.display = `block`;
        closeCard.addEventListener(`click`, hideCard);
        document.addEventListener(`keydown`, onCardEscPress);
      };
      somePin.addEventListener(`click`, showCard);
    }
  };

  const clearMap = () => {
    window.pin.remove();
    window.card.remove();
  };

  window.map = {
    elementsParent: mapElementsParent,
    mainPin,
    MainPinSizes,
    clear: clearMap,
    fill: fillMap,
    onPageLock: onPageLocking
  };
}());
