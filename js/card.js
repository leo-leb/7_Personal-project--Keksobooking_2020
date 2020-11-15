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
      for (let j = 1; j < data.offer.photos.length; j++) {
        window.common.create(photo, photos);
        photo.src = `${data.offer.photos[j]}`;
      }
    } else {
      photos.remove();
    }
  };

  /**
   * Очищаем карту от карточек.
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
}());
