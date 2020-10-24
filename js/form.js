'use strict';

let livingRules = {
  '1': `1`,
  '2': [`1`, `2`],
  '3': [`1`, `2`, `3`],
  '100': `0`,
};

const formParent = document.querySelector(`.ad-form`);
const formChilds = formParent.querySelectorAll(`fieldset`);
const formAddress = formParent.querySelector(`#address`);
const formRoom = formParent.querySelector(`#room_number`);
const formCapacity = formParent.querySelector(`#capacity`);

/**
 * Ограничиваем допустимое количество мест в соответствии с количеством комнат жилья.
 */
const setGuestsLimit = function () {
  let selectedRoom = formRoom[formRoom.selectedIndex].value;
  let selectedCapacity = formCapacity[formCapacity.selectedIndex].value;
  if (livingRules[selectedRoom].includes(selectedCapacity)) {
    formCapacity.setCustomValidity(``);
  } else {
    formCapacity.setCustomValidity(`Недоступно`);
  }
};
