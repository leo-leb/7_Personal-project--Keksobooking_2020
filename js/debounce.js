'use strict';

(function () {
  const DEBOUNCE_LIM = 5000;

  let lastTimeout;

  /**
   * Установка задержки на выполнение действия.
   * @param {function} action - Действие.
   */
  window.debounce = function (action) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(action, DEBOUNCE_LIM);
  };
}());
