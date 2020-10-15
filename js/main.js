'use strict';

const OFFSET_X = 200;
const OFFSET_Y = 400;
const LIB_SIZE = 7;

let libType = [`palace`, `flat`, `house`, `bungalow`];
let libCheck = [`12:00`, `13:00`, `14:00`];
let libFeatures = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
let libPhotos = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

const mapPins = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content;
const newItemPin = pinTemplate.querySelector(`.map__pin`);
const mainPin = mapPins.querySelector(`.map__pin--main`);
const formParent = document.querySelector(`.ad-form`);
const formChilds = formParent.querySelectorAll(`fieldset`);

const map = document.querySelector(`.map`);
const mapFilterParent = map.querySelector(`.map__filters`);
const mapFilterChilds = mapFilterParent.children;

/**
 * Присваивает неактивное состояние всем дочерним элементам исходного массива.
 * @param {array} array - Исходный массив.
 */
const setPassiveCondition = function (array) {
  for (let i = 0; i < array.length; i++) {
    array[i].setAttribute(`disabled`, true);
  }
};

/**
 * Присваивает активное состояние всем дочерним элементам исходного массива.
 * @param {array} array - Исходный массив.
 */
const setActiveCondition = function (array) {
  for (let i = 0; i < array.length; i++) {
    array[i].removeAttribute(`disabled`, true);
  }
};

/**
 * Деактивация страницы.
 */
const setPassivePage = function () {
  setPassiveCondition(mapFilterChilds);
  setPassiveCondition(formChilds);
};

/**
 * Активация страницы.
 */
const setActivePage = function () {
  map.classList.remove(`map--faded`);
  formParent.classList.remove(`ad-form--disabled`);
  setActiveCondition(mapFilterChilds);
  setActiveCondition(formChilds);
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

// let library = createLib();
// createPins(library);
