'use strict';

(function () {
  /**
   * Запуск титульной страницы.
   */
  window.map.setPassivePage();

  /**
   * Активация страницы по клику левой клавиши мыши.
   */
  window.pin.mainPin.addEventListener(`mousedown`, (evt) => {
    if (evt.which === 1) {
      window.map.setActivePage();
    }
  });

  /**
   * Активация страницы по нажатию Enter в фокусе.
   */
  window.pin.mainPin.addEventListener(`keydown`, (evt) => {
    if (evt.keyCode === 13) {
      window.map.setActivePage();
    }
  });
}());
