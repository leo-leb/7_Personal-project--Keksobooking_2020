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
  const fillMap = () => {
    let mapPin = newItemPin.cloneNode(true);
    mapPins.appendChild(mapPin);
    let mapWindow = newItemWindow.cloneNode(true);
    mapPins.appendChild(mapWindow);
  };

  /**
   * Очищаем карту от пинов.
   */
  const clearMap = () => {
    const mapPinsAll = mapPins.querySelectorAll(`button:not(.map__pin--main)`);
    const mapWindowsAll = mapPins.querySelectorAll(`article`);
    mapPinsAll.forEach((element) => {
      element.remove();
    });
    mapWindowsAll.forEach((element) => {
      element.remove();
    });
  };

  /**
   * Используя данные исходного массива и функцию добавления в разметку новых объектов, наполняем элементы стилями и пр. инфо.
   * @param {array} array - Массив пинов.
   * @param {number} limit - Максимально допустимое количество пинов.
   */
  const createPins = (array, limit) => {
    for (let i = 0; i < limit; i++) {
      newItemPin.style = `left: ${array[i].location.x}px; top: ${array[i].location.y}px`;
      let picture = newItemPin.querySelector(`img`);
      picture.src = `${array[i].author.avatar}`;
      picture.alt = `заголовок объявления`;

      let title = newItemWindow.querySelector(`.popup__title`);
      title.textContent = array[i].offer.title;

      let address = newItemWindow.querySelector(`.popup__text--address`);
      address.textContent = array[i].offer.address;

      let price = newItemWindow.querySelector(`.popup__text--price`);
      price.textContent = `${array[i].offer.price}₽/ночь`;

      let type = newItemWindow.querySelector(`.popup__type`);
      type.textContent = array[i].offer.type;

      let rooms = newItemWindow.querySelector(`.popup__text--capacity`);
      rooms.textContent = `${array[i].offer.rooms} комнаты для ${array[i].offer.guests} гостей`;

      let time = newItemWindow.querySelector(`.popup__text--time`);
      time.textContent = `Заезде после ${array[i].offer.checkin}, выезд до ${array[i].offer.checkout}`;

      let features = newItemWindow.querySelector(`.popup__features`);
      features.textContent = array[i].offer.features;

      let description = newItemWindow.querySelector(`.popup__description`);
      description.textContent = array[i].offer.description;

      let photos = newItemWindow.querySelector(`.popup__photos`);
      let photo = photos.querySelector(`.popup__photo`);
      photo.src = `${array[i].offer.photos[0]}`;

      for (let j = 1; j < array[i].offer.photos.length; j++) {
        const pic = photos.querySelector(`img`);
        let photoClone = pic.cloneNode(true);
        photos.appendChild(photoClone);
        photo.src = `${array[i].offer.photos[j]}`;
      }

      let avatar = newItemWindow.querySelector(`.popup__avatar`);
      avatar.src = `${array[i].author.avatar}`;

      fillMap();
    }
  };

  window.pin = {
    main: mapPins.querySelector(`.map__pin--main`),
    clear: clearMap,
    create: createPins
  };
}());
