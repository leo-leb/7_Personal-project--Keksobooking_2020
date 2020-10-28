'use strict';
(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const STATUS_CODE = {
    OK: 200
  };

  window.upload = (onSuccess) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === STATUS_CODE.OK) {
        onSuccess(xhr.response);
      } else {
        const infoWindow = document.createElement(`div`);
        infoWindow.textContent = `Статус ответа: ` + xhr.status + ` ` + xhr.statusText;
        infoWindow.style.color = `red`;
        document.body.insertAdjacentElement(`afterend`, infoWindow);
      }
    });

    xhr.open(`GET`, URL);
    xhr.send();
  };
}());
