'use strict';
(function () {
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
   * @param {*} action - Действие для выполнения истинного условия.
   */
  const checkExist = (element, array, action) => {
    if (array.length !== 0) {
      action;
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
   * @param {*} block - Элемент разметки.
   * @param {object} cellFromLibrary - Объект загруженных данных с сервера.
   */
  const fillCard = (block, cellFromLibrary) => {
    let title = block.querySelector(`.popup__title`);
    checkExist(title, cellFromLibrary.offer.title, fillTextContent(title, cellFromLibrary.offer.title));

    let address = block.querySelector(`.popup__text--address`);
    checkExist(address, cellFromLibrary.offer.address, fillTextContent(address, cellFromLibrary.offer.address));

    let type = block.querySelector(`.popup__type`);
    checkExist(type, cellFromLibrary.offer.type, fillTextContent(type, typeOfHouse[cellFromLibrary.offer.type]));

    let description = block.querySelector(`.popup__description`);
    checkExist(description, cellFromLibrary.offer.description, fillTextContent(description, cellFromLibrary.offer.description));

    let price = block.querySelector(`.popup__text--price`);
    checkExist(price, cellFromLibrary.offer.price, price.textContent = `${cellFromLibrary.offer.price}₽/ночь`);

    let rooms = block.querySelector(`.popup__text--capacity`);
    checkExist(rooms, cellFromLibrary.offer.rooms, rooms.textContent = `${cellFromLibrary.offer.rooms} комнаты для ${cellFromLibrary.offer.guests} гостей`);

    let time = block.querySelector(`.popup__text--time`);
    checkExist(time, cellFromLibrary.offer.checkin, time.textContent = `Заезде после ${cellFromLibrary.offer.checkin}, выезд до ${cellFromLibrary.offer.checkout}`);

    let avatar = block.querySelector(`.popup__avatar`);
    checkExist(avatar, cellFromLibrary.author.avatar, avatar.src = `${cellFromLibrary.author.avatar}`);

    let features = block.querySelector(`.popup__features`);
    let featuresList = features.querySelectorAll(`.popup__feature`);
    if (cellFromLibrary.offer.features.length !== 0) {
      for (let i = 0; i < cellFromLibrary.offer.features.length; i++) {
        if (cellFromLibrary.offer.features.includes(featuresLib[i]) === false) {
          featuresList[i].remove();
        }
      }
    } else {
      features.remove();
    }

    let photos = block.querySelector(`.popup__photos`);
    let photo = photos.querySelector(`.popup__photo`);
    if (cellFromLibrary.offer.photos.length !== 0) {
      photo.src = `${cellFromLibrary.offer.photos[0]}`;
      for (let j = 1; j < cellFromLibrary.offer.photos.length; j++) {
        window.common.create(photo, photos);
        photo.src = `${cellFromLibrary.offer.photos[j]}`;
      }
    } else {
      photos.remove();
    }
  };

  /**
   * Очищаем карту от карточек.
   */
  const removeCards = () => {
    const allCards = window.map.allElements.querySelectorAll(`article`);
    allCards.forEach((element) => {
      element.remove();
    });
  };

  /**
   * Скрываем все карточки.
   */
  const hideCards = () => {
    const allCards = window.map.allElements.querySelectorAll(`article`);
    allCards.forEach((element) => {
      element.style.display = `none`;
    });
  };

  window.card = {
    fill: fillCard,
    remove: removeCards,
    hide: hideCards
  };
}());
