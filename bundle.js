/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
(() => {
/*!**********************!*\
  !*** ./js/common.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const ESC_KEYCODE = 27;
const ENTER_KEYCODE = 13;
const LEFT_MOUSE_BUTTON = 1;

/**
 * Выполнение функции по нажатию на Escape.
 * @param {evt} evt - Событие.
 * @param {function} action - Действие при True.
 */
const isEscEvent = (evt, action) => {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.preventDefault();
    action();
  }
};

/**
 * Выполнение функции по нажатию на Enter.
 * @param {evt} evt - Событие.
 * @param {function} action - Действие при True.
 */
const isEnterEvent = (evt, action) => {
  if (evt.keyCode === ENTER_KEYCODE) {
    evt.preventDefault();
    action();
  }
};

/**
 * Выполнение функции по нажатию на ЛКМ.
 * @param {evt} evt - Событие.
 * @param {function} action - Действие при True.
 */
const isLeftButtonEvent = (evt, action) => {
  if (evt.which === LEFT_MOUSE_BUTTON) {
    evt.preventDefault();
    action();
  }
};

/**
 * Добавление в разметку склонированного элемента.
 * @param {element} element - Шаблон элемента.
 * @param {element} place - Место вставки.
 */
const createElement = (element, place) => {
  place.appendChild(element.cloneNode(true));
};

window.common = {
  create: createElement,
  escEvt: isEscEvent,
  enterEvt: isEnterEvent,
  leftButtonEvt: isLeftButtonEvent
};

})();

(() => {
/*!************************!*\
  !*** ./js/debounce.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const DEBOUNCE_LIM = 500;

let lastTimeout;

/**
 * Установка задержки на выполнение действия.
 * @param {function} action - Действие.
 */
window.debounce = (action) => {
  if (lastTimeout) {
    window.clearTimeout(lastTimeout);
  }
  lastTimeout = window.setTimeout(action, DEBOUNCE_LIM);
};

})();

(() => {
/*!**********************!*\
  !*** ./js/server.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const ServerURL = {
  'load': `https://21.javascript.pages.academy/keksobooking`,
  'download': `https://21.javascript.pages.academy/keksobooking/data`
};

const TIME_LIM = 5000;
const StatusCode = {
  OK: 200,
  requestError: 400,
  userError: 401,
  dataError: 404
};

/**
 * Выводит окно со статусом ответа сервера при неудачной загрузке.
 * @param {string} message - Статус ответа сервера.
 */
const getErrorMessage = (message) => {
  const infoWindow = document.createElement(`div`);
  infoWindow.textContent = message;
  infoWindow.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
  infoWindow.style.position = `absolute`;
  infoWindow.style.left = 0;
  infoWindow.style.right = 0;
  infoWindow.style.fontSize = `30px`;
  document.body.insertAdjacentElement(`beforebegin`, infoWindow);
};

/**
 * Обработчик при загрузке данных с сервера.
 * @param {*} request - Запрос к серверу.
 * @param {function} onSuccess - Действие при успешной загрузке данных.
 * @param {function} onError - Действие при неуспешной загрузке данных.
 */
const serverReader = (request, onSuccess, onError) => {
  request.responseType = `json`;
  request.timeout = TIME_LIM;
  request.addEventListener(`load`, () => {
    let error;
    switch (request.status) {
      case StatusCode.OK:
        onSuccess(request.response);
        break;
      case StatusCode.requestError:
        error = `Cтатус ответа: Неверный запрос`;
        break;
      case StatusCode.userError:
        error = `Cтатус ответа: Пользователь не авторизован`;
        break;
      case StatusCode.dataError:
        error = `Cтатус ответа: Ничего не найдено`;
        break;
      default:
        error = `Cтатус ответа: ` + request.status + ` ` + request.statusText;
    }
    if (error) {
      onError(error);
    }
  });
  request.addEventListener(`error`, () => onError(`Произошла ошибка соединения`));
  request.addEventListener(`timeout`, () => onError(`Запрос не успел выполниться за ` + request.timeout + `мс`));
};

/**
 * Загрузка данных с сервера.
 * @param {*} url - Адрес сервера.
 * @param {function} onSuccess - Действие при успешной загрузке данных.
 * @param {function} onError - Действие при неуспешной загрузке данных.
 */
const downloadFromServer = (url, onSuccess, onError) => {
  let xhr = new XMLHttpRequest();
  serverReader(xhr, onSuccess, onError);
  xhr.open(`GET`, url);
  xhr.send();
};

/**
 * Загрузка данных на сервер.
 * @param {*} url - Адрес сервера.
 * @param {function} onSuccess - Действие при успешной загрузке данных.
 * @param {function} onError - Действие при неуспешной загрузке данных.
 */
const loadToServer = (url, onSuccess, onError) => {
  const form = document.querySelector(`.ad-form`);
  const formData = new FormData(form);
  let xhr = new XMLHttpRequest();
  serverReader(xhr, onSuccess, onError);
  xhr.open(`POST`, url);
  xhr.send(formData);
};

window.server = {
  url: ServerURL,
  error: getErrorMessage,
  download: downloadFromServer,
  load: loadToServer
};

})();

(() => {
/*!********************!*\
  !*** ./js/form.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const livingRules = {
  '1': `1`,
  '2': [`1`, `2`],
  '3': [`1`, `2`, `3`],
  '100': `0`,
};
const typeOfHouse = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
};

const form = document.querySelector(`.ad-form`);
const formChilds = form.querySelectorAll(`fieldset`);
const formAddress = form.querySelector(`#address`);
const formTitle = form.querySelector(`#title`);
const formPrice = form.querySelector(`#price`);
const formRoom = form.querySelector(`#room_number`);
const formCapacity = form.querySelector(`#capacity`);
const formType = form.querySelector(`#type`);
const formTimeIn = form.querySelector(`#timein`);
const formTimeOut = form.querySelector(`#timeout`);
const mainPlace = document.querySelector(`main`);
const messageTemplate = document.querySelector(`#success`).content;
const messageItem = messageTemplate.querySelector(`.success`);
const errorTemplate = document.querySelector(`#error`).content;
const newItemError = errorTemplate.querySelector(`.error`);
const errorButton = document.querySelector(`.error__button`);
const resetButton = document.querySelector(`.ad-form__reset`);

const avatarChoser = document.querySelector(`.ad-form__field input[type=file]`);
const avatarPreview = document.querySelector(`.ad-form-header__preview`);
const adPhotoChoser = document.querySelector(`#images`);
const adPhotoPreview = document.querySelector(`.ad-form__photo`);

const showInvalidInputs = function () {
  const formReq = form.querySelectorAll(`fieldset input[required]`);
  formReq.forEach(function (value) {
    value.style = `box-shadow: 0 0 15px red`;
    value.addEventListener(`input`, function () {
      if (value.checkValidity()) {
        value.style = `box-shadow: 0`;
      }
    });
  });
};

const pressFormButton = function () {
  if (window.form.parent.checkValidity()) {
    window.server.load(window.server.url.load, getSuccessWindow, getErrorWindow);
  } else {
    showInvalidInputs();
    form.reportValidity();
  }
};

const onFormButtonPressEnter = (evt) => window.common.enterEvt(evt, pressFormButton);
const onFormButtonPressLeftMouse = (evt) => window.common.leftButtonEvt(evt, pressFormButton);

/**
 * Устанавливаем лимит на допустимое количество мест в соответствии с кол-вом комнат жилья.
 */
const onGuestsLimit = () => {
  let selectedRoom = formRoom[formRoom.selectedIndex].value;
  let selectedCapacity = formCapacity[formCapacity.selectedIndex].value;
  if (livingRules[selectedRoom].includes(selectedCapacity)) {
    formCapacity.setCustomValidity(``);
  } else {
    formCapacity.setCustomValidity(`Недоступно`);
  }
};

/**
 * Обработчик на соответствие количества гостей выбранному количеству комнат.
 */
formCapacity.addEventListener(`change`, onGuestsLimit);

/**
 * Обработчик на ограничения по допустимой длине заголовка.
 */
formTitle.addEventListener(`input`, () => {
  if (formTitle.validity.tooShort) {
    formTitle.setCustomValidity(`Заголовок должен состоять минимум из 30-и символов`);
  } else if (formTitle.validity.tooLong) {
    formTitle.setCustomValidity(`Заголовок должен состоять максимум из 100-а символов`);
  } else if (formTitle.validity.valueMissing) {
    formTitle.setCustomValidity(`Обязательное поле`);
  } else {
    formTitle.setCustomValidity(``);
  }
  formTitle.reportValidity();
});

/**
 * Устанавливаем лимит на минимальную стоимость на основе выбранного жилья.
 */
const onPriceLimit = () => {
  let houses = Object.keys(typeOfHouse);
  let selectedType = formType[formType.selectedIndex].value;
  if (selectedType === houses[0]) {
    formPrice.min = typeOfHouse[selectedType];
    formPrice.placeholder = typeOfHouse[selectedType];
  } else if (selectedType === houses[1]) {
    formPrice.min = typeOfHouse[selectedType];
    formPrice.placeholder = typeOfHouse[selectedType];
  } else if (selectedType === houses[2]) {
    formPrice.min = typeOfHouse[selectedType];
    formPrice.placeholder = typeOfHouse[selectedType];
  } else {
    formPrice.min = typeOfHouse[selectedType];
    formPrice.placeholder = typeOfHouse[selectedType];
  }
};

/**
 * Обработчик на соответствие минимальной цены типу выбранного жилья.
 */
formType.addEventListener(`change`, onPriceLimit);

/**
 * Обработчик на ограничения по допустимой цене.
 */
formPrice.addEventListener(`input`, () => {
  if (formPrice.validity.rangeUnderflow) {
    formPrice.setCustomValidity(`Слишком низкая стоимость`);
  } else if (formPrice.validity.rangeOverflow) {
    formPrice.setCustomValidity(`Цена должна быть не более 1 000 000`);
  } else if (formPrice.validity.valueMissing) {
    formPrice.setCustomValidity(`Обязательное поле`);
  } else {
    formPrice.setCustomValidity(``);
  }
  formPrice.reportValidity();
});

formPrice.addEventListener(`change`, () => {
  if (formPrice.validity.rangeUnderflow) {
    formPrice.setCustomValidity(`Слишком низкая стоимость`);
  } else if (formPrice.validity.rangeOverflow) {
    formPrice.setCustomValidity(`Цена должна быть не более 1 000 000`);
  } else if (formPrice.validity.valueMissing) {
    formPrice.setCustomValidity(`Обязательное поле`);
  } else {
    formPrice.setCustomValidity(``);
  }
  formPrice.reportValidity();
});

const onCheckInLimit = () => {
  formTimeOut.selectedIndex = formTimeIn.selectedIndex;
};

/**
 * Обработчик на соответствие время выезда времени заезда.
 */
formTimeIn.addEventListener(`change`, onCheckInLimit);
const onCheckOutLimit = () => {
  formTimeIn.selectedIndex = formTimeOut.selectedIndex;
};

/**
 * Обработчик на соответствие время заезда времени выезда.
 */
formTimeOut.addEventListener(`change`, onCheckOutLimit);

const onEscPressInSuccess = (evt) => window.common.escEvt(evt, removeSuccessWindow);
const onMousePressInSuccess = (evt) => window.common.leftButtonEvt(evt, removeSuccessWindow);

/**
 * Удаление модального окна об успешном заполнении формы.
 */
const removeSuccessWindow = () => {
  document.querySelector(`.success`).remove();
  document.removeEventListener(`keydown`, onEscPressInSuccess);
  document.removeEventListener(`mousedown`, onMousePressInSuccess);
};

/**
 * Вывод модального окна об успешном заполнении формы по нажатию на главную кнопку.
 */
const getSuccessWindow = () => {
  window.map.onPageLock();
  window.common.create(messageItem, mainPlace);
  document.addEventListener(`keydown`, onEscPressInSuccess);
  document.addEventListener(`mousedown`, onMousePressInSuccess);
};

const onEscPressInError = (evt) => window.common.escEvt(evt, removeErrorWindow);
const onMousePressInError = (evt) => window.common.leftButtonEvt(evt, removeErrorWindow);

/**
 * Удаление модального окна о неуспешном заполнении формы.
 */
const removeErrorWindow = () => {
  document.querySelector(`.error`).remove();
  document.removeEventListener(`keydown`, onEscPressInError);
  document.removeEventListener(`mousedown`, onMousePressInError);
};

/**
 * Выводит окно со статусом ответа сервера при неудачной загрузке + модального окна о неуспешном заполнении формы по нажатию на главную кнопку.
 * @param {string} message - Статус ответа сервера.
 */
const getErrorWindow = () => {
  window.common.create(newItemError, mainPlace);
  document.addEventListener(`keydown`, onEscPressInError);
  document.addEventListener(`mousedown`, onMousePressInError);
  errorButton.addEventListener(`mousedown`, onMousePressInError);
};

const onEnterPressInReset = (evt) => window.common.leftButtonEvt(evt, window.map.onPageLock());
const onMousePressInReset = (evt) => window.common.enterEvt(evt, window.map.onPageLock());

resetButton.addEventListener(`keydown`, onEnterPressInReset);
resetButton.addEventListener(`mousedown`, onMousePressInReset);

/**
 * Выбор аватара для объявления.
 */
const onAvatarChose = function () {
  window.image.load(avatarChoser, avatarPreview);
};

/**
 * Выбор фото для объявления.
 */
const onPhotoChose = function () {
  window.image.load(adPhotoChoser, adPhotoPreview);
};

window.form = {
  parent: form,
  childs: formChilds,
  address: formAddress,
  title: formTitle,
  avatarChoser,
  adPhotoChoser,
  showInvalid: showInvalidInputs,
  onButtonPressEnter: onFormButtonPressEnter,
  onButtonPressLeftMouse: onFormButtonPressLeftMouse,
  onAvatarChose,
  onPhotoChose
};

})();

(() => {
/*!*******************!*\
  !*** ./js/pin.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


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

})();

(() => {
/*!********************!*\
  !*** ./js/card.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const featuresLib = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const typeOfHouse = {
  'bungalow': `Бунгало`,
  'flat': `Квартира`,
  'house': `Дом`,
  'palace': `Дворец`,
};

/**
 * Проверка на наличие данных.
 * @param {element} element - Элемент разметки.
 * @param {*} array - Объект загруженных данных с сервера.
 * @param {function} action - Действие при True.
 */
const checkExist = (element, array, action) => {
  if (array.length !== 0) {
    const runAction = () => {
      return action;
    };
    runAction();
  } else {
    element.remove();
  }
};

/**
 * Заполнение текстового содержания элемента разметки в соответствии с серверными данными.
 * @param {element} element - Элемент разметки.
 * @param {*} array - Объект загруженных данных с сервера.
 */
const fillTextContent = (element, array) => {
  element.textContent = array;
};

/**
 * Наполнение добавленных карточек информацией с сервера.
 * @param {element} card - Элемент разметки.
 * @param {object} data - Объект загруженных данных с сервера.
 */
const fillCard = (card, data) => {
  let title = card.querySelector(`.popup__title`);
  checkExist(title, data.offer.title, fillTextContent(title, data.offer.title));
  let address = card.querySelector(`.popup__text--address`);
  checkExist(address, data.offer.address, fillTextContent(address, data.offer.address));
  let type = card.querySelector(`.popup__type`);
  checkExist(type, data.offer.type, fillTextContent(type, typeOfHouse[data.offer.type]));
  let description = card.querySelector(`.popup__description`);
  checkExist(description, data.offer.description, fillTextContent(description, data.offer.description));
  let price = card.querySelector(`.popup__text--price`);
  checkExist(price, data.offer.price, price.textContent = `${data.offer.price}₽/ночь`);
  let rooms = card.querySelector(`.popup__text--capacity`);
  checkExist(rooms, data.offer.rooms, rooms.textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`);
  let time = card.querySelector(`.popup__text--time`);
  checkExist(time, data.offer.checkin, time.textContent = `Заезде после ${data.offer.checkin}, выезд до ${data.offer.checkout}`);
  let avatar = card.querySelector(`.popup__avatar`);
  checkExist(avatar, data.author.avatar, avatar.src = `${data.author.avatar}`);
  let features = card.querySelector(`.popup__features`);
  let featuresList = features.querySelectorAll(`.popup__feature`);
  if (data.offer.features.length !== 0) {
    for (let i = 0; i < data.offer.features.length; i++) {
      if (data.offer.features.includes(featuresLib[i]) === false) {
        featuresList[i].remove();
      }
    }
  } else {
    features.remove();
  }
  let photos = card.querySelector(`.popup__photos`);
  let photo = photos.querySelector(`.popup__photo`);
  if (data.offer.photos.length !== 0) {
    photo.src = `${data.offer.photos[0]}`;
    let fragment = document.createDocumentFragment();
    for (let j = 1; j < data.offer.photos.length; j++) {
      window.common.create(photo, fragment);
      photo.src = `${data.offer.photos[j]}`;
    }
    photos.appendChild(fragment);
  } else {
    photos.remove();
  }
};

/**
 * Очищаем карту от карточек
 */
const removeCards = () => {
  const allCards = window.map.elementsParent.querySelectorAll(`.map__card`);
  allCards.forEach((element) => {
    element.remove();
  });
};

/**
 * Скрываем все карточки.
 */
const hideCards = () => {
  const allCards = window.map.elementsParent.querySelectorAll(`.map__card`);
  allCards.forEach((element) => {
    element.style.display = `none`;
  });
};

window.card = {
  fill: fillCard,
  remove: removeCards,
  hide: hideCards
};

})();

(() => {
/*!**********************!*\
  !*** ./js/filter.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const PINS_LIM = 5;
const ANY = `any`;

let pinsLib;

const formFiltersParent = document.querySelector(`.map__filters`);
const filtersList = Array.from(formFiltersParent.children);

const priceRules = {
  'low': {
    start: 0,
    end: 10000
  },
  'middle': {
    start: 10000,
    end: 50000
  },
  'high': {
    start: 50000,
    end: Infinity
  }
};

const filterRules = {
  'housing-type': (data, filter) => {
    return filter.value === data.offer.type;
  },
  'housing-rooms': (data, filter) => {
    return filter.value === data.offer.rooms.toString();
  },
  'housing-guests': (data, filter) => {
    return filter.value === data.offer.guests.toString();
  },
  'housing-price': (data, filter) => {
    return data.offer.price >= priceRules[filter.value].start && data.offer.price < priceRules[filter.value].end;
  },
  'housing-features': (data, filter) => {
    const featuresList = Array.from(filter.querySelectorAll(`input[type="checkbox"]:checked`));
    return featuresList.every((element) => {
      return data.offer.features.some((feature) => {
        return feature === element.value;
      });
    });
  }
};

/**
 * Фильтрация данных, полученных с сервера.
 * @param {array} data - Массив данных, загруженных с сервера.
 * @return {array} - Массив отфильтрованных данных.
 */
const filterData = (data) => {
  return data.filter((item) => {
    return filtersList.every((element) => {
      return (element.value === ANY) ? true : filterRules[element.id](item, element);
    });
  });
};

/**
 * Обновление карты в соответствии с выбранными критериями фильтрации.
 */
const onMapFilter = () => {
  window.map.clear();
  let pinsOnMap = filterData(pinsLib);
  window.debounce(() => window.map.fill(pinsOnMap, PINS_LIM));
};

/**
 * Действия при успешной загрузке данных с сервера - сохранение серверных данных в массив и обновление карты.
 * @param {array} data - Массив данных, загруженных с сервера.
 */
const successCase = (data) => {
  pinsLib = data;
  let pinsOnMap = filterData(pinsLib);
  window.map.fill(pinsOnMap, PINS_LIM);
};

/**
 * Обработчик на обновление карты при изменении критериев фильтрации.
 */
formFiltersParent.addEventListener(`change`, onMapFilter);

window.filter = {
  success: successCase
};

})();

(() => {
/*!*********************!*\
  !*** ./js/image.js ***!
  \*********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const loadImage = (from, to) => {
  const file = from.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some(function (it) {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener(`load`, function () {
      if (to.querySelector(`img`) === null) {
        const photo = document.createElement(`img`);
        photo.src = reader.result;
        photo.alt = `Фото объявления`;
        photo.style = `width: 65px; height: 65px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)`;
        to.style.position = `relative`;
        to.appendChild(photo);
      } else {
        const photo = to.querySelector(`img`);
        photo.src = reader.result;
      }
    });
    reader.readAsDataURL(file);
  }
};

window.image = {
  load: loadImage
};

})();

(() => {
/*!*******************!*\
  !*** ./js/map.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const MainPinSizes = {
  'X': 65,
  'Y1': 65,
  'Y2': 82
};

const map = document.querySelector(`.map`);
const mapFilterParent = map.querySelector(`.map__filters`);
const mapFilterChilds = mapFilterParent.children;
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
  window.map.clear();
  window.form.parent.reset();
  mapFilterParent.reset();
  map.classList.add(`map--faded`);
  window.form.parent.classList.add(`ad-form--disabled`);
  [].forEach.call(mapFilterChilds, (elem) => elem.setAttribute(`disabled`, true));
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
  [].forEach.call(mapFilterChilds, (elem) => elem.removeAttribute(`disabled`, true));
  window.form.childs.forEach((element) => element.removeAttribute(`disabled`, true));
  const mainPinFakePos = window.pin.calcFakePin(mainPinRealPos, MainPinSizes.X, MainPinSizes.Y2);
  window.form.address.value = `${mainPinFakePos.X}, ${mainPinFakePos.Y}`;
  window.server.download(window.server.url.download, window.filter.success, window.server.error);
  mainPin.removeEventListener(`mousedown`, onMainPinMousePress);
  mainPin.removeEventListener(`keydown`, onMainPinEnterPress);
  window.form.avatarChoser.addEventListener(`change`, window.form.onAvatarChose);
  window.form.adPhotoChoser.addEventListener(`change`, window.form.onPhotoChose);
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
    const onCardHide = () => {
      someCard.style.display = `none`;
      document.removeEventListener(`keydown`, onCardEscPress);
    };
    const onCardEscPress = (evt) => {
      window.common.escEvt(evt, onCardHide);
    };
    const onCardShow = () => {
      window.card.hide();
      someCard.style.display = `block`;
      closeCard.addEventListener(`click`, onCardHide);
      document.addEventListener(`keydown`, onCardEscPress);
    };
    somePin.addEventListener(`click`, onCardShow);
  }
};

/**
 * Очистка карты от всех элементов.
 */
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

})();

(() => {
/*!********************!*\
  !*** ./js/move.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const X_MIN = 0;
const X_MAX = 1200;
const Y_MIN = 130;
const Y_MAX = 630;

const mainPin = window.map.mainPin;

const onMouseDown = (evt) => {
  evt.preventDefault();
  window.startCoords = {
    X: evt.clientX,
    Y: evt.clientY
  };

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();
    let shift = {
      X: window.startCoords.X - moveEvt.clientX,
      Y: window.startCoords.Y - moveEvt.clientY
    };
    window.startCoords = {
      X: moveEvt.clientX,
      Y: moveEvt.clientY
    };
    let actualPos = {
      x: mainPin.offsetLeft - shift.X,
      y: mainPin.offsetTop - shift.Y
    };
    let limitPos = {
      x: Math.round(actualPos.x + window.map.MainPinSizes.X / 2),
      y: Math.round(actualPos.y + window.map.MainPinSizes.Y2)
    };
    if (X_MIN <= limitPos.x && limitPos.x <= X_MAX && Y_MIN <= limitPos.y && limitPos.y <= Y_MAX) {
      mainPin.style.top = actualPos.y + `px`;
      mainPin.style.left = actualPos.x + `px`;
      window.form.address.value = `${limitPos.x}, ${limitPos.y}`;
    }
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();
    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
};

mainPin.addEventListener(`mousedown`, onMouseDown);

})();

(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const formButton = document.querySelector(`.ad-form__submit`);

/**
 * Запуск титульной страницы.
 */
window.map.onPageLock();

/**
 * Обработчик на отмену действий формы по-умолчанию при попытке отправки.
 */
window.form.parent.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
});

/**
 * Обработчик на кнопку для отправки формы.
 */
formButton.addEventListener(`keydown`, window.form.onButtonPressEnter);
formButton.addEventListener(`mousedown`, window.form.onButtonPressLeftMouse);

})();

/******/ })()
;