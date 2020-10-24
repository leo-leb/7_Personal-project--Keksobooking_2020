'use strict';
(function () {
  let livingRules = {
    '1': `1`,
    '2': [`1`, `2`],
    '3': [`1`, `2`, `3`],
    '100': `0`,
  };

  window.formParent = document.querySelector(`.ad-form`);
  window.formChilds = window.formParent.querySelectorAll(`fieldset`);
  window.formAddress = window.formParent.querySelector(`#address`);
  const formRoom = window.formParent.querySelector(`#room_number`);
  const formCapacity = window.formParent.querySelector(`#capacity`);

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

  /**
   * Обработчик на соответствие количества гостей выбранному количеству комнат.
   */
  formCapacity.addEventListener(`change`, function () {
    setGuestsLimit();
  });
}());
