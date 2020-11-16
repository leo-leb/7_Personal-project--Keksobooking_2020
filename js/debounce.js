'use strict';

const DEBOUNCE_LIM = 500;

let lastTimeout;

/**
 * Установка задержки на выполнение действия.
 * @param {function} action - Действие.
 */
window.debounce = (action) => {
  if (lastTimeout) {
    window.clearTimeout(lastTimeout);
  }
  lastTimeout = window.setTimeout(action, DEBOUNCE_LIM);
};
