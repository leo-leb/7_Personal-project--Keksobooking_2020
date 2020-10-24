'use strict';

/**
 * Активация страницы по клику левой клавиши мыши.
 */
setPassivePage();

/**
 * Активация страницы по клику левой клавиши мыши.
 */
mainPin.addEventListener(`mousedown`, function (evt) {
  if (evt.which === 1) {
    setActivePage();
  }
});

/**
 * Активация страницы по нажатию Enter в фокусе.
 */
mainPin.addEventListener(`keydown`, function (evt) {
  if (evt.keyCode === 13) {
    setActivePage();
  }
});

/**
 * Обработчик на соответствие количества гостей выбранному количеству комнат.
 */
formCapacity.addEventListener(`change`, function () {
  setGuestsLimit();
});
