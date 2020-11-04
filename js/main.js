'use strict';

(function () {
  /**
   * Запуск титульной страницы.
   */
  window.map.passivePage();

  /**
   * Активация страницы по клику левой клавиши мыши.
   */
  window.pin.main.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();
    if (evt.which === 1) {
      window.map.activePage();
    }
  }, {once: true});

  // mainPin.addEventListener(`mousedown`, window.map.activePage());
  // mainPin.removeEventListener(`mousedown`, window.map.activePage);

  /**
   * Активация страницы по нажатию Enter в фокусе.
   */
  window.pin.main.addEventListener(`keydown`, (evt) => {
    if (evt.keyCode === 13) {
      window.map.activePage();
    }
  }, {once: true});
}());
