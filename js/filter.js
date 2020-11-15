'use strict';

(function () {
  let PINS_LIM = 5;
  let ANY = `any`;

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
  const filterHandler = () => {
    window.map.clear();
    let pinsOnMap = filterData(pinsLib);
    window.debounce(window.map.fill(pinsOnMap, PINS_LIM));
    // window.setTimeout(function () {
    //   window.map.fill(pinsOnMap, PINS_LIM);
    // }, 5000);
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
  formFiltersParent.addEventListener(`change`, filterHandler);

  window.filter = {
    success: successCase
  };
}());
