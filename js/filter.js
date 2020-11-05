'use strict';

(function () {
  let pinsLib = [];

  const mapFilterHouse = window.map.filterParent.querySelector(`#housing-type`);

  /**
   * Обновление карты пинов:
   * Очистка карты -> Массив в соответствии с фильтром -> Заполнение карты.
   */
  const onMapUpdate = () => {
    window.pin.remove();
    window.card.remove();
    if (mapFilterHouse.value === `any`) {
      window.sameHouse = pinsLib;
    } else {
      window.sameHouse = pinsLib.filter((pin) => {
        return pin.offer.type === mapFilterHouse.value;
      });
    }
    window.map.fill(window.sameHouse, 5);
  };

  /**
   * Действия при успешной загрузке данных с сервера:
   * Сохранение данных в массив -> Обновление карты.
   * @param {array} data - Массив данных, загруженных с сервера.
   */
  const successCase = (data) => {
    pinsLib = data;
    onMapUpdate();
  };

  mapFilterHouse.addEventListener(`change`, onMapUpdate);

  window.filter = {
    success: successCase
  };
}());
