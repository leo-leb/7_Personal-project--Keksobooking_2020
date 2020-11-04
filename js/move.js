'use strict';

(function () {
  /**
   * Подвижность главного пина.
   */
  const mainPin = window.pin.main;
  mainPin.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCoords = {
      X: evt.clientX,
      Y: evt.clientY
    };

    let dragged = false;

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      dragged = true;

      let shift = {
        X: startCoords.X - moveEvt.clientX,
        Y: startCoords.Y - moveEvt.clientY
      };

      startCoords = {
        X: moveEvt.clientX,
        Y: moveEvt.clientY
      };

      mainPin.style.top = (mainPin.offsetTop - shift.Y) + `px`;
      mainPin.style.left = (mainPin.offsetLeft - shift.X) + `px`;
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        const onClickPrevent = (clickEvt) => {
          clickEvt.preventDefault();
          mainPin.removeEventListener(`click`, onClickPrevent);
        };
        mainPin.addEventListener(`click`, onClickPrevent);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
}());
