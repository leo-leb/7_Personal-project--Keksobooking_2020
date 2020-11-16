'use strict';

const ServerURL = {
  'load': `https://21.javascript.pages.academy/keksobooking`,
  'download': `https://21.javascript.pages.academy/keksobooking/data`
};

const TIME_LIM = 5000;
const StatusCode = {
  OK: 200,
  requestError: 400,
  userError: 401,
  dataError: 404
};

/**
 * Выводит окно со статусом ответа сервера при неудачной загрузке.
 * @param {string} message - Статус ответа сервера.
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
  request.responseType = `json`;
  request.timeout = TIME_LIM;
  request.addEventListener(`load`, () => {
    let error;
    switch (request.status) {
      case StatusCode.OK:
        onSuccess(request.response);
        break;
      case StatusCode.requestError:
        error = `Cтатус ответа: Неверный запрос`;
        break;
      case StatusCode.userError:
        error = `Cтатус ответа: Пользователь не авторизован`;
        break;
      case StatusCode.dataError:
        error = `Cтатус ответа: Ничего не найдено`;
        break;
      default:
        error = `Cтатус ответа: ` + request.status + ` ` + request.statusText;
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
  serverReader(xhr, onSuccess, onError);
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
  xhr.open(`POST`, url);
  xhr.send(formData);
};

window.server = {
  url: ServerURL,
  error: getErrorMessage,
  download: downloadFromServer,
  load: loadToServer
};
