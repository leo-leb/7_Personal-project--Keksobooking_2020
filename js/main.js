'use strict';

(function () {
  const formButton = document.querySelector(`.ad-form__submit`);

  /**
   * Запуск титульной страницы.
   */
  window.map.onPageLock();

  /**
   * Обработчик на кнопку для отправки формы.
   */
  formButton.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    window.server.load(window.server.URL.load, window.form.mainButtonPress, window.form.getError);
  });
}());
