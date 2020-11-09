'use strict';
(function () {
  let livingRules = {
    '1': `1`,
    '2': [`1`, `2`],
    '3': [`1`, `2`, `3`],
    '100': `0`,
  };

  const typeOfHouse = {
    'bungalow': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000,
  };

  const formParent = document.querySelector(`.ad-form`);
  const formChilds = formParent.querySelectorAll(`fieldset`);
  const formAddress = formParent.querySelector(`#address`);
  const formTitle = formParent.querySelector(`#title`);
  const formPrice = formParent.querySelector(`#price`);
  const formRoom = formParent.querySelector(`#room_number`);
  const formCapacity = formParent.querySelector(`#capacity`);
  const formType = formParent.querySelector(`#type`);
  const formTimeIn = formParent.querySelector(`#timein`);
  const formTimeOut = formParent.querySelector(`#timeout`);

  /**
   * Устанавливаем лимит на допустимое количество мест в соответствии с количеством комнат жилья.
   */
  const onGuestsLimit = () => {
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
  formCapacity.addEventListener(`change`, onGuestsLimit);

  /**
   * Обработчик на ограничения по допустимой длине заголовка.
   */
  formTitle.addEventListener(`invalid`, function () {
    if (formTitle.validity.tooShort) {
      formTitle.setCustomValidity(`Заголовок должен состоять минимум из 30-и символов`);
    } else if (formTitle.validity.tooLong) {
      formTitle.setCustomValidity(`Заголовок должен состоять максимум из 100-а символов`);
    } else if (formTitle.validity.valueMissing) {
      formTitle.setCustomValidity(`Обязательное поле`);
    } else {
      formTitle.setCustomValidity(``);
    }
  });


  /**
   * Устанавливаем лимит на минимальную стоимость на основе выбранного жилья.
   */
  const priceMinLimit = () => {
    let houses = Object.keys(typeOfHouse);
    let selectedType = formType[formType.selectedIndex].value;
    if (selectedType === houses[0]) {
      formPrice.min = typeOfHouse[houses[0]];
      formPrice.placeholder = typeOfHouse[houses[0]];
    } else if (selectedType === houses[1]) {
      formPrice.min = typeOfHouse[houses[1]];
      formPrice.placeholder = typeOfHouse[houses[1]];
    } else if (selectedType === houses[2]) {
      formPrice.min = typeOfHouse[houses[2]];
      formPrice.placeholder = typeOfHouse[houses[2]];
    } else {
      formPrice.min = typeOfHouse[houses[3]];
      formPrice.placeholder = typeOfHouse[houses[3]];
    }
  };

  /**
   * Обработчик на соответствие минимальной цена типу выбранного жилья.
   */
  formType.addEventListener(`change`, priceMinLimit);

  /**
   * Обработчик на ограничения по допустимой цене.
   */
  formPrice.addEventListener(`invalid`, function () {
    if (formPrice.validity.rangeUnderflow) {
      formPrice.setCustomValidity(`Слишком низкая стоимость`);
    } else if (formPrice.validity.rangeOverflow) {
      formPrice.setCustomValidity(`Цена должна быть не более 1 000 000`);
    } else if (formPrice.validity.valueMissing) {
      formPrice.setCustomValidity(`Обязательное поле`);
    } else {
      formPrice.setCustomValidity(``);
    }
  });

  const setCheckIn = () => {
    formTimeOut.selectedIndex = formTimeIn.selectedIndex;
  };

  /**
   * Обработчик на соответствие время выезда времени заезда.
   */
  formTimeIn.addEventListener(`change`, setCheckIn);

  const setCheckOut = () => {
    formTimeIn.selectedIndex = formTimeOut.selectedIndex;
  };


  /**
   * Обработчик на соответствие время заезда времени выезда.
   */
  formTimeOut.addEventListener(`change`, setCheckOut);

  window.form = {
    parent: formParent,
    childs: formChilds,
    address: formAddress
  };
}());
