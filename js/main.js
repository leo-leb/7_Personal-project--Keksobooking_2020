'use strict';

const formButton = document.querySelector(`.ad-form__submit`);

/**
 * Запуск титульной страницы.
 */
window.map.onPageLock();

/**
 * Обработчик на кнопку для отправки формы.
 */
formButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  window.server.load(window.server.url.load, window.form.mainButtonPress, window.form.getError);
});
