'use strict';

(function () {
  /**
   * Подвижность главного пина.
   */
  const mainPin = window.map.mainPin;

  const onMouseDown = (evt) => {
    evt.preventDefault();

    let startCoords = {
      X: evt.clientX,
      Y: evt.clientY
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

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
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  mainPin.addEventListener(`mousedown`, onMouseDown);
}());
