'use strict';

(function () {
  let pinsLib = [];

  const mapFilterHouse = window.map.filterParent.querySelector(`#housing-type`);

  /**
   * Обновление карты пинов:
   * Очистка карты -> Массив в соответствии с фильтром -> Заполнение карты.
   */
  const updatePins = () => {
    window.pin.clearP();
    window.pin.clearW();
    if (mapFilterHouse.value === `any`) {
      window.sameHouse = pinsLib;
    } else {
      window.sameHouse = pinsLib.filter((pin) => {
        return pin.offer.type === mapFilterHouse.value;
      });
    }
    window.pin.fill(window.sameHouse, 5);
  };

  /**
   * Действия при успешной загрузке данных с сервера:
   * Сохранение данных в массив -> Обновление карты.
   * @param {array} data - Массив данных, загруженных с сервера.
   */
  const successCase = (data) => {
    pinsLib = data;
    updatePins();
  };

  mapFilterHouse.addEventListener(`change`, () => updatePins());

  window.filter = {
    success: successCase
  };
}());

// window.pinsList = window.pin.mapP.querySelectorAll(`.map__pin`);
// const someFunction = (object) => {
//   window.avatar = object.querySelector(`img`);
//   let foundObject = window.sameHouse.filter((element) => {
//     return element.author.avatar === avatar;
//   });
//   window.pin.createW(foundObject);
// };
// window.mapPin.addEventListener(`mousedown`, someFunction(window.mapPin));
