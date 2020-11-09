'use strict';
(function () {
  const ESC_KEYCODE = 27;
  const ENTER_KEYCODE = 13;

  const isEscEvent = (evt, action) => {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.preventDefault();
      action();
    }
  };

  const isEnterEvent = (evt, action) => {
    if (evt.keyCode === ENTER_KEYCODE) {
      evt.preventDefault();
      action();
      window.map.locking();
    }
  };

  /**
   * Добавление в разметку склонированного элемента.
   * @param {*} element - Шаблон элемента.
   * @param {*} place - Место вставки.
   */
  const createElement = (element, place) => {
    place.appendChild(element.cloneNode(true));
  };

  window.common = {
    create: createElement,
    isEscEvent,
    isEnterEvent
  };
}());
