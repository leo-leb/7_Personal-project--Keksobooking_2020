'use strict';
(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const URL2 = `https://21.javascript.pages.academy/keksobooking`;
  const StatusCode = {
    OK: 200
  };

  /**
   * Загрузка данных с сервера.
   * @param {function} onSuccess - Функция для истинного условия.
   */
  const download = (onSuccess) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    const onServerLoading = () => {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        const infoWindow = document.createElement(`div`);
        infoWindow.textContent = `Статус ответа: ` + xhr.status + ` ` + xhr.statusText;
        infoWindow.style.color = `red`;
        document.body.insertAdjacentElement(`afterend`, infoWindow);
      }
    };

    xhr.addEventListener(`load`, onServerLoading);
    xhr.open(`GET`, URL);
    xhr.send();
  };

  const load = () => {
    const form = document.querySelector(`.ad-form`);
    const formData = new FormData(form);
    let request = new XMLHttpRequest();
    const onServerLoading = () => {
      if (request.status === StatusCode.OK) {
        window.map.clear();
        window.map.locking();
      } else {
        const infoWindow = document.createElement(`div`);
        infoWindow.textContent = `Статус ответа: ` + request.status + ` ` + request.statusText;
        infoWindow.style.color = `red`;
        document.body.insertAdjacentElement(`afterend`, infoWindow);
      }
    };
    request.addEventListener(`load`, onServerLoading);
    request.open(`POST`, URL2);
    request.send(formData);
  };

  window.server = {
    download,
    load
  };
}());
