'use strict';

const X_MIN = 0;
const X_MAX = 1200;
const Y_MIN = 130;
const Y_MAX = 630;

const mainPin = window.map.mainPin;

const onMouseDown = (evt) => {
  evt.preventDefault();
  window.startCoords = {
    X: evt.clientX,
    Y: evt.clientY
  };

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();
    let shift = {
      X: window.startCoords.X - moveEvt.clientX,
      Y: window.startCoords.Y - moveEvt.clientY
    };
    window.startCoords = {
      X: moveEvt.clientX,
      Y: moveEvt.clientY
    };
    let actualPos = {
      x: mainPin.offsetLeft - shift.X,
      y: mainPin.offsetTop - shift.Y
    };
    let limitPos = {
      x: Math.round(actualPos.x + window.map.MainPinSizes.X / 2),
      y: Math.round(actualPos.y + window.map.MainPinSizes.Y2)
    };
    if (X_MIN <= limitPos.x && limitPos.x <= X_MAX && Y_MIN <= limitPos.y && limitPos.y <= Y_MAX) {
      mainPin.style.top = actualPos.y + `px`;
      mainPin.style.left = actualPos.x + `px`;
      window.form.address.value = `${limitPos.x}, ${limitPos.y}`;
    }
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
