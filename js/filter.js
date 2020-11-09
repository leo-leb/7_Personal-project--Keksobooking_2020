'use strict';

(function () {
  let PINS_LIM = 5;

  let pinsLib = [];

  const mapFilterHouse = window.map.filterParent.querySelector(`#housing-type`);

  /**
   * Обновление карты пинов:
   * Очистка карты -> Массив в соответствии с фильтром -> Заполнение карты.
   */
  const getUpdatedMap = () => {
    window.map.clear();
    if (mapFilterHouse.value === `any`) {
      window.sameHouse = pinsLib;
    } else {
      window.sameHouse = pinsLib.filter((pin) => {
        return pin.offer.type === mapFilterHouse.value;
      });
    }
    window.map.fill(window.sameHouse, PINS_LIM);
  };

  /**
   * Действия при успешной загрузке данных с сервера:
   * Сохранение данных в массив -> Обновление карты.
   * @param {array} data - Массив данных, загруженных с сервера.
   */
  const successCase = (data) => {
    pinsLib = data;
    getUpdatedMap();
  };

  mapFilterHouse.addEventListener(`change`, getUpdatedMap);

  window.filter = {
    success: successCase
  };
}());
