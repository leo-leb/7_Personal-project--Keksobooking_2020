'use strict';
(function () {
  const mapPins = document.querySelector(`.map__pins`);
  const pinTemplate = document.querySelector(`#pin`).content;
  const newItemPin = pinTemplate.querySelector(`.map__pin`);
  const windowTemplate = document.querySelector(`#card`).content;
  const newItemWindow = windowTemplate.querySelector(`.map__card`);

  /**
   * Копируем template и добавляем в разметку - в блок "map__pins".
   */
  const createElement = function (source, place) {
    place.appendChild(source.cloneNode(true));
  };

  const fillPin = function (pin, cellFromLibrary) {
    pin.style = `left: ${cellFromLibrary.location.x}px; top: ${cellFromLibrary.location.y}px`;
    let picture = pin.querySelector(`img`);
    picture.src = `${cellFromLibrary.author.avatar}`;
    picture.alt = `заголовок объявления`;
  };

  // features, photos

  const fillWindow = function (window, cellFromLibrary) {
    let title = window.querySelector(`.popup__title`);
    title.textContent = cellFromLibrary.offer.title;

    let address = window.querySelector(`.popup__text--address`);
    address.textContent = cellFromLibrary.offer.address;

    let price = window.querySelector(`.popup__text--price`);
    price.textContent = `${cellFromLibrary.offer.price}₽/ночь`;

    let type = window.querySelector(`.popup__type`);
    type.textContent = cellFromLibrary.offer.type;

    let rooms = window.querySelector(`.popup__text--capacity`);
    rooms.textContent = `${cellFromLibrary.offer.rooms} комнаты для ${cellFromLibrary.offer.guests} гостей`;

    let time = window.querySelector(`.popup__text--time`);
    time.textContent = `Заезде после ${cellFromLibrary.offer.checkin}, выезд до ${cellFromLibrary.offer.checkout}`;

    let description = window.querySelector(`.popup__description`);
    description.textContent = cellFromLibrary.offer.description;

    let avatar = window.querySelector(`.popup__avatar`);
    avatar.src = `${cellFromLibrary.author.avatar}`;

    let features = window.querySelector(`.popup__features`);
    // let featuresList = features.querySelectorAll(`.popup__feature`);
    // if (cellFromLibrary.offer.features.length !== 0) {
    //   for (let i = 0; i < featuresList.length; i++) {
    //     if (cellFromLibrary.offer.features[i] === false) {
    //       featuresList[i].style.display = `none`;
    //     }
    //   }
    // } else {
    //   features.style.display = `none`;
    // }

    let photos = window.querySelector(`.popup__photos`);
    let photo = photos.querySelector(`.popup__photo`);
    // if (cellFromLibrary.offer.photos.length !== 0 {
    //   photo.src = `${cellFromLibrary.offer.photos[0]}`;
    //   for (let j = 1; j < cellFromLibrary.offer.photos.length; j++) {
    //     createElement(photo, photos);
    //     photo.src = `${cellFromLibrary.offer.photos[j]}`;
    //   }
    // } else {
    //   photos.style.display = `none`;
    // }

    photo.src = `${cellFromLibrary.offer.photos[0]}`;

    for (let j = 1; j < cellFromLibrary.offer.photos.length; j++) {
      createElement(photo, photos);
      photo.src = `${cellFromLibrary.offer.photos[j]}`;
    }
  };

  /**
   * Используя данные исходного массива и функцию добавления в разметку новых объектов, наполняем элементы стилями и пр. инфо.
   * @param {array} array - Массив пинов.
   * @param {number} limit - Максимально допустимое количество пинов.
   */
  const fillMap = (array, limit) => {
    for (let i = 0; i < array.length && i < limit; i++) {
      createElement(newItemPin, mapPins);
      createElement(newItemWindow, mapPins);
    }
    window.mapPinsAll = mapPins.querySelectorAll(`button:not(.map__pin--main):not(.popup__close)`);
    window.mapWindowsAll = mapPins.querySelectorAll(`.map__card`);
    for (let i = 0; i < array.length && i < limit; i++) {
      fillPin(window.mapPinsAll[i], array[i]);
      fillWindow(window.mapWindowsAll[i], array[i]);
    }
  };

  /**
   * Очищаем карту от пинов.
   */
  const clearPins = () => {
    const mapPinsAll = mapPins.querySelectorAll(`button:not(.map__pin--main)`);
    mapPinsAll.forEach((element) => {
      element.remove();
    });
  };

  const clearWindows = () => {
    const mapWindowsAll = mapPins.querySelectorAll(`article`);
    mapWindowsAll.forEach((element) => {
      element.remove();
    });
  };

  window.pin = {
    main: mapPins.querySelector(`.map__pin--main`),
    fill: fillMap,
    clearP: clearPins,
    clearW: clearWindows
    // mapP: mapPins,
  };
}());
