'use strict';
(function () {
  const URL = {
    'load': `https://21.javascript.pages.academy/keksobooking`,
    'download': `https://21.javascript.pages.academy/keksobooking/data`
  };

  /**
   * Возвращает объект с расчитанными координатами элемента.
   * @param {string} message - Ширина элемента.
   */
  const getErrorMessage = (message) => {
    const infoWindow = document.createElement(`div`);
    infoWindow.textContent = message;
    infoWindow.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    infoWindow.style.position = `absolute`;
    infoWindow.style.left = 0;
    infoWindow.style.right = 0;
    infoWindow.style.fontSize = `30px`;
    document.body.insertAdjacentElement(`beforebegin`, infoWindow);
  };

  /**
   * Обработчик при загрузке данных с сервера.
   * @param {*} request - Запрос к серверу.
   * @param {function} onSuccess - Действие при успешной загрузке данных.
   * @param {function} onError - Действие при неуспешной загрузке данных.
   */
  const serverReader = (request, onSuccess, onError) => {
    request.addEventListener(`load`, () => {
      let error;
      switch (request.status) {
        case 200:
          onSuccess(request.response);
          break;
        case 400:
          error = `Неверный запрос`;
          break;
        case 401:
          error = `Пользователь не авторизован`;
          break;
        case 404:
          error = `Ничего не найдено`;
          break;
        default:
          error = `Cтатус ответа: : ` + request.status + ` ` + request.statusText;
      }
      if (error) {
        onError(error);
      }
    });
    request.addEventListener(`error`, () => onError(`Произошла ошибка соединения`));
    request.addEventListener(`timeout`, () => onError(`Запрос не успел выполниться за ` + request.timeout + `мс`));
  };

  /**
   * Загрузка данных с сервера.
   * @param {*} url - Адрес сервера.
   * @param {function} onSuccess - Действие при успешной загрузке данных.
   * @param {function} onError - Действие при неуспешной загрузке данных.
   */
  const downloadFromServer = (url, onSuccess, onError) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    serverReader(xhr, onSuccess, onError);
    xhr.timeout = 1000;
    xhr.open(`GET`, url);
    xhr.send();
  };

  /**
   * Загрузка данных на сервер.
   * @param {*} url - Адрес сервера.
   * @param {function} onSuccess - Действие при успешной загрузке данных.
   * @param {function} onError - Действие при неуспешной загрузке данных.
   */
  const loadToServer = (url, onSuccess, onError) => {
    const form = document.querySelector(`.ad-form`);
    const formData = new FormData(form);
    let xhr = new XMLHttpRequest();
    serverReader(xhr, onSuccess, onError);
    xhr.timeout = 1000;
    xhr.open(`POST`, url);
    xhr.send(formData);
  };

  window.server = {
    URL,
    error: getErrorMessage,
    download: downloadFromServer,
    load: loadToServer
  };
}());
