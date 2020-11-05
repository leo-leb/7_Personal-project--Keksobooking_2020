'use strict';

(function () {
  /**
   * Запуск титульной страницы.
   */
  window.map.locking();

  /**
   * Активация страницы по клику мыши и Enter.
   */
  window.map.mainPin.addEventListener(`mousedown`, window.map.unlocking);
  window.map.mainPin.addEventListener(`keydown`, (evt) => {
    if (evt.keyCode === 13) {
      window.map.unlocking();
    }
  });
}());
