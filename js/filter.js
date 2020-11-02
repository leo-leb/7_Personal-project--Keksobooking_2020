'use strict';

(function () {
  let pinsLib = [];

  const mapFilterHouse = window.map.filterParent.querySelector(`#housing-type`);

  /**
   * Обновление карты пинов:
   * Очистка карты -> Массив в соответствии с фильтром -> Заполнение карты.
   */
  const updatePins = () => {
    window.pin.clear();
    const sameHouse = pinsLib.filter((pin) => {
      return pin.offer.type === mapFilterHouse.value;
    });
    window.pin.create(sameHouse, 5);
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
