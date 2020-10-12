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

const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

const randomValue = function (array) {
  return Math.ceil(Math.random() * array.length);
};

const randomParameter = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

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

const fillMap = function () {
  let mapPin = newItemPin.cloneNode(true);
  mapPins.appendChild(mapPin);
};

const createPins = function () {
  for (let i = 0; i < library.length; i++) {
    newItemPin.style = `left: ${library[i].location.x + OFFSET_X}px; top: ${library[i].location.y + OFFSET_Y}px`;
    let picture = newItemPin.querySelector(`img`);
    picture.src = `${library[i].author.avatar}`;
    picture.alt = `заголовок объявления`;
    fillMap();
  }
};

let library = createLib();
createPins();
