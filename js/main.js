'use strict';

const formButton = document.querySelector(`.ad-form__submit`);

/**
 * Запуск титульной страницы.
 */
window.map.onPageLock();

/**
 * Обработчик на отмену действий формы по-умолчанию при попытке отправки.
 */
window.form.parent.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
});

/**
 * Обработчик на кнопку для отправки формы.
 */
formButton.addEventListener(`keydown`, window.form.onButtonPressEnter);
formButton.addEventListener(`mousedown`, window.form.onButtonPressLeftMouse);
