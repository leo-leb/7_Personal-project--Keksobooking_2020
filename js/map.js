'use strict';

const map = document.querySelector(`.map`);
const mapFilterParent = map.querySelector(`.map__filters`);
const mapFilterChilds = mapFilterParent.querySelectorAll(`.map__filter`);

const mainPin = mapPins.querySelector(`.map__pin--main`);

/**
 * Возвращает массив расчитанных координат исследуемого объекта для стартовой страницы.
 * @param {number} width - Ширина объекта.
 * @param {number} height - Высота объекта.
 * @return {array} - Массив координат объекта.
 */
const calcPositionStart = function (width, height) {
  const array = [Math.round(map.offsetWidth / 2 - width / 2).toString(), Math.round(map.offsetHeight / 2 - height / 2).toString()];
  return array;
};

/**
 * Возвращает массив расчитанных координат исследуемого объекта для активной страницы.
 * @param {number} width - Ширина объекта.
 * @param {number} height - Высота объекта.
 * @return {array} - Массив координат объекта.
 */
const calcPositionActive = function (width, height) {
  const array = [Math.round(map.offsetWidth / 2 - width / 2).toString(), Math.round(map.offsetHeight / 2 - height).toString()];
  return array;
};

/**
 * Присваивает актуальные координаты исходному элементу разметки.
 * @param {*} object - Исходный элемент разметки.
 * @param {array} objectPos - Массив актуальных координат.
 */
const setPosition = function (object, objectPos) {
  object.style.left = objectPos[0] + `px`;
  object.style.top = objectPos[1] + `px`;
};

/**
 * Деактивация страницы.
 */
const setPassivePage = function () {
  mapFilterChilds.forEach(function (element) {element.setAttribute('disabled', true)});
  formChilds.forEach(function (element) {element.setAttribute('disabled', true)});
  const mainPinPos = calcPositionStart(PIN_X, PIN_Y_START);
  setPosition(mainPin, mainPinPos);
  formAddress.value = mainPinPos[0] + `, ` + mainPinPos[1];
};

/**
 * Активация страницы.
 */
const setActivePage = function () {
  map.classList.remove(`map--faded`);
  formParent.classList.remove(`ad-form--disabled`);
  mapFilterChilds.forEach(function (element) {element.removeAttribute('disabled', true)});
  formChilds.forEach(function (element) {element.removeAttribute('disabled', true)});
  const mainPinPos = calcPositionActive(PIN_X, PIN_Y_ACTIVE);
  setPosition(mainPin, mainPinPos);
  formAddress.value = mainPinPos[0] + `, ` + mainPinPos[1];
};
