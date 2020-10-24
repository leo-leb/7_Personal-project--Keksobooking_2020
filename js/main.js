'use strict';

(function () {
  /**
   * Запуск титульной страницы.
   */
  window.setPassivePage();

  /**
   * Активация страницы по клику левой клавиши мыши.
   */
  window.mainPin.addEventListener(`mousedown`, function (evt) {
    if (evt.which === 1) {
      window.setActivePage();
    }
  });

  /**
   * Активация страницы по нажатию Enter в фокусе.
   */
  window.mainPin.addEventListener(`keydown`, function (evt) {
    if (evt.keyCode === 13) {
      window.setActivePage();
    }
  });
}());
