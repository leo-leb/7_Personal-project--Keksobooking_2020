'use strict';

const OFFSET_X = 200;
const OFFSET_Y = 400;
const LIB_SIZE = 7;
const PIN_X = 65;
const PIN_Y_START = 65;
const PIN_Y_ACTIVE = 82;

let libType = [`palace`, `flat`, `house`, `bungalow`];
let libCheck = [`12:00`, `13:00`, `14:00`];
let libFeatures = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
let libPhotos = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
// let livingRules = {
//   '1 комната': `для 1 гостя`,
//   '2 комнаты': [`для 1 гостя`, `для 2 гостей`],
//   '3 комнаты': [`для 1 гостя`, `для 2 гостей`, `для 3 гостей`],
//   '100 комнат': `не для гостей`,
// };
let livingRules = {
  '1': `1`,
  '2': [`1`, `2`],
  '3': [`1`, `2`, `3`],
  '100': `0`,
};

const mapPins = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content;
const newItemPin = pinTemplate.querySelector(`.map__pin`);
const mainPin = mapPins.querySelector(`.map__pin--main`);
const formParent = document.querySelector(`.ad-form`);
const formChilds = formParent.querySelectorAll(`fieldset`); // ---
const formAddress = formParent.querySelector(`#address`);
const formRoom = formParent.querySelector(`#room_number`);
const formCapacity = formParent.querySelector(`#capacity`);

const map = document.querySelector(`.map`);
const mapFilterParent = map.querySelector(`.map__filters`);
const mapFilterChilds = mapFilterParent.querySelectorAll(`.map__filter`);

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
 * Присваивает активное состояние всем дочерним элементам исходного массива.
 * @param {array} array - Исходный массив.
 */
// const setActiveCondition = function (array) {
//   for (let i = 0; i < array.length; i++) {
//     array[i].removeAttribute(`disabled`, true);
//   }
// };

/**
 * Присваивает неактивное состояние всем дочерним элементам исходного массива.
 * @param {array} array - Исходный массив.
 */
// const setPassiveCondition = function (array) {
//   for (let i = 0; i < array.length; i++) {
//     array[i].setAttribute(`disabled`, true);
//   }
// };

/**
 * Деактивация страницы.
 */
const setPassivePage = function () {
  // setPassiveCondition(mapFilterChilds);
  mapFilterChilds.forEach(function (element) {element.setAttribute('disabled', true)});
  // setPassiveCondition(formChilds);
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
  // setActiveCondition(mapFilterChilds);
  mapFilterChilds.forEach(function (element) {element.removeAttribute('disabled', true)});
  // setActiveCondition(formChilds);
  formChilds.forEach(function (element) {element.removeAttribute('disabled', true)});
  const mainPinPos = calcPositionActive(PIN_X, PIN_Y_ACTIVE);
  setPosition(mainPin, mainPinPos);
  formAddress.value = mainPinPos[0] + `, ` + mainPinPos[1];
};

setPassivePage();

/**
 * Активация страницы по клику левой клавиши мыши.
 */
mainPin.addEventListener(`mousedown`, function (evt) {
  if (evt.which === 1) {
    setActivePage();
  }
});

/**
 * Активация страницы по нажатию Enter в фокусе.
 */
mainPin.addEventListener(`keydown`, function (evt) {
  if (evt.keyCode === 13) {
    setActivePage();
  }
});

/**
 * Возвращает индекс случайного элемента массива.
 * @param {array} array - Исходный массив.
 * @return {number} - Индекс.
 */
const randomValue = function (array) {
  return Math.ceil(Math.random() * array.length);
};

/**
 * Возвращает случайный элемент массива.
 * @param {array} array - Исходный массив.
 * @return {string} - Случайный элемент исходного массива.
 */
const randomParameter = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * Создаем массив случайной длины из произвольных объектов исходного массива.
 * @param {array} array - Исходный массив.
 * @return {array} - Массив случайной длины.
 */
const randomArray = function (array) {
  let temporaryArray = [];
  for (let i = 0; i < randomValue(array); i++) {
    let someValue = randomParameter(array);
    if (temporaryArray.includes(someValue) !== true) {
      temporaryArray.push(someValue);
    }
  }
  return temporaryArray;
};

/**
 * Создаем массив случайных объектов.
 * @return {array} - Массив случайных объектов.
 */
const createLib = function () {
  let array = [];
  for (let i = 0; i <= LIB_SIZE; i++) {
    array[i] = {'author': {}, 'offer': {}, 'location': {}};
    array[i].author = {
      'avatar': `../img/avatars/user0${i + 1}.png`
    };
    array[i].location = {
      'x': Math.ceil(Math.random() * 100),
      'y': Math.ceil(Math.random() * 100)
    };
    array[i].offer = {
      'title': ` `,
      'address': array[i].location[`x`].toString() + `, ` + array[i].location[`y`].toString(),
      'price': ` `,
      'type': randomParameter(libType),
      'rooms': ` `,
      'guests': ` `,
      'checkin': randomParameter(libCheck),
      'checkout': randomParameter(libCheck),
      'features': randomArray(libFeatures),
      'description': ` `,
      'photos': randomArray(libPhotos)
    };
  }
  return array;
};

/**
 * Копируем template и добавляем в разметку - в блок "map__pins".
 */
const fillMap = function () {
  let mapPin = newItemPin.cloneNode(true);
  mapPins.appendChild(mapPin);
};

/**
 * Используя данные исходного массива и функцию добавления в разметку новых объектов, наполняем элементы стилями и пр. инфо.
 * @param {array} array - Исходный массив.
 */
const createPins = function (array) {
  for (let i = 0; i < array.length; i++) {
    newItemPin.style = `left: ${array[i].location.x + OFFSET_X}px; top: ${array[i].location.y + OFFSET_Y}px`;
    let picture = newItemPin.querySelector(`img`);
    picture.src = `${array[i].author.avatar}`;
    picture.alt = `заголовок объявления`;
    fillMap();
  }
};

/**
 * Ограничиваем допустимое количество мест в соответствии с количеством комнат жилья.
 */
const setGuestsLimit = function () {
  let selectedRoom = formRoom[formRoom.selectedIndex].value;
  let selectedCapacity = formCapacity[formCapacity.selectedIndex].value;
  if (livingRules[selectedRoom].includes(selectedCapacity)) {
    formCapacity.setCustomValidity(``);
  } else {
    formCapacity.setCustomValidity(`Недоступно`);
  }
};

formCapacity.addEventListener(`change`, function () {
  setGuestsLimit();
});

// let library = createLib();
// createPins(library);
