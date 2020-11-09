'use strict';

(function () {
  window.formButton = document.querySelector(`.ad-form__submit`);

  /**
   * Запуск титульной страницы.
   */
  window.map.locking();

  const onMainPinEnterPress = (evt) => {
    window.common.isEnterEvent(evt, window.map.unlocking);
  };

  /**
   * Активация страницы по клику мыши и Enter.
   */
  window.map.mainPin.addEventListener(`mousedown`, window.map.unlocking);
  window.map.mainPin.addEventListener(`keydown`, onMainPinEnterPress);

  window.formButton.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    window.server.load();
  });

// window.server.load();
}());
