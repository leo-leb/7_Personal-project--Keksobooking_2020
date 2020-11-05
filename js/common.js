'use strict';
(function () {
  /**
   * Добавление в разметку склонированного элемента.
   * @param {*} element - Шаблон элемента.
   * @param {*} place - Место вставки.
   */
  const createElement = (element, place) => {
    place.appendChild(element.cloneNode(true));
  };

  window.common = {
    create: createElement
  };
}());
