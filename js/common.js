'use strict';
(function () {
  const ESC_KEYCODE = 27;
  const ENTER_KEYCODE = 13;
  const LEFT_MOUSE_BUTTON = 1;

  /**
   * Выполнение функции по нажатию на Escape.
   * @param {evt} evt - Событие.
   * @param {function} action - Действие при True.
   */
  const isEscEvent = (evt, action) => {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.preventDefault();
      action();
    }
  };

  /**
   * Выполнение функции по нажатию на Enter.
   * @param {evt} evt - Событие.
   * @param {function} action - Действие при True.
   */
  const isEnterEvent = (evt, action) => {
    if (evt.keyCode === ENTER_KEYCODE) {
      evt.preventDefault();
      action();
    }
  };

  /**
   * Выполнение функции по нажатию на ЛКМ.
   * @param {evt} evt - Событие.
   * @param {function} action - Действие при True.
   */
  const isLeftButtonEvent = (evt, action) => {
    if (evt.which === LEFT_MOUSE_BUTTON) {
      evt.preventDefault();
      action();
    }
  };

  /**
   * Добавление в разметку склонированного элемента.
   * @param {element} element - Шаблон элемента.
   * @param {element} place - Место вставки.
   */
  const createElement = (element, place) => {
    place.appendChild(element.cloneNode(true));
  };

  window.common = {
    create: createElement,
    escEvt: isEscEvent,
    enterEvt: isEnterEvent,
    leftButtonEvt: isLeftButtonEvent
  };
}());
