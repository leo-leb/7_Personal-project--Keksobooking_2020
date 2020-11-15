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

  const form = document.querySelector(`.ad-form`);
  const formChilds = form.querySelectorAll(`fieldset`);
  const formAddress = form.querySelector(`#address`);
  const formTitle = form.querySelector(`#title`);
  const formPrice = form.querySelector(`#price`);
  const formRoom = form.querySelector(`#room_number`);
  const formCapacity = form.querySelector(`#capacity`);
  const formType = form.querySelector(`#type`);
  const formTimeIn = form.querySelector(`#timein`);
  const formTimeOut = form.querySelector(`#timeout`);

  const mainPlace = document.querySelector(`main`);
  const messageTemplate = document.querySelector(`#success`).content;
  const messageItem = messageTemplate.querySelector(`.success`);
  const errorTemplate = document.querySelector(`#error`).content;
  const newItemError = errorTemplate.querySelector(`.error`);
  const errorButton = document.querySelector(`.error__button`);
  const resetButton = document.querySelector(`.ad-form__reset`);

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
  formTitle.addEventListener(`input`, () => {
    if (formTitle.validity.tooShort) {
      formTitle.setCustomValidity(`Заголовок должен состоять минимум из 30-и символов`);
    } else if (formTitle.validity.tooLong) {
      formTitle.setCustomValidity(`Заголовок должен состоять максимум из 100-а символов`);
    } else if (formTitle.validity.valueMissing) {
      formTitle.setCustomValidity(`Обязательное поле`);
    } else {
      formTitle.setCustomValidity(``);
    }
    formTitle.reportValidity();
  });

  /**
   * Устанавливаем лимит на минимальную стоимость на основе выбранного жилья.
   */
  const onPriceLimit = () => {
    let houses = Object.keys(typeOfHouse);
    let selectedType = formType[formType.selectedIndex].value;
    if (selectedType === houses[0]) {
      formPrice.min = typeOfHouse[selectedType];
      formPrice.placeholder = typeOfHouse[selectedType];
    } else if (selectedType === houses[1]) {
      formPrice.min = typeOfHouse[selectedType];
      formPrice.placeholder = typeOfHouse[selectedType];
    } else if (selectedType === houses[2]) {
      formPrice.min = typeOfHouse[selectedType];
      formPrice.placeholder = typeOfHouse[selectedType];
    } else {
      formPrice.min = typeOfHouse[selectedType];
      formPrice.placeholder = typeOfHouse[selectedType];
    }
  };

  /**
   * Обработчик на соответствие минимальной цены типу выбранного жилья.
   */
  formType.addEventListener(`change`, onPriceLimit);

  /**
   * Обработчик на ограничения по допустимой цене.
   */
  formPrice.addEventListener(`input`, () => {
    if (formPrice.validity.rangeUnderflow) {
      formPrice.setCustomValidity(`Слишком низкая стоимость`);
    } else if (formPrice.validity.rangeOverflow) {
      formPrice.setCustomValidity(`Цена должна быть не более 1 000 000`);
    } else if (formPrice.validity.valueMissing) {
      formPrice.setCustomValidity(`Обязательное поле`);
    } else {
      formPrice.setCustomValidity(``);
    }
    formPrice.reportValidity();
  });

  formPrice.addEventListener(`change`, () => {
    if (formPrice.validity.rangeUnderflow) {
      formPrice.setCustomValidity(`Слишком низкая стоимость`);
    } else if (formPrice.validity.rangeOverflow) {
      formPrice.setCustomValidity(`Цена должна быть не более 1 000 000`);
    } else if (formPrice.validity.valueMissing) {
      formPrice.setCustomValidity(`Обязательное поле`);
    } else {
      formPrice.setCustomValidity(``);
    }
    formPrice.reportValidity();
  });

  const onCheckInLimit = () => {
    formTimeOut.selectedIndex = formTimeIn.selectedIndex;
  };

  /**
   * Обработчик на соответствие время выезда времени заезда.
   */
  formTimeIn.addEventListener(`change`, onCheckInLimit);

  const onCheckOutLimit = () => {
    formTimeIn.selectedIndex = formTimeOut.selectedIndex;
  };

  /**
   * Обработчик на соответствие время заезда времени выезда.
   */
  formTimeOut.addEventListener(`change`, onCheckOutLimit);

  const onEscPressInSuccess = (evt) => window.common.escEvt(evt, removeSuccessWindow);
  const onMousePressInSuccess = (evt) => window.common.leftButtonEvt(evt, removeSuccessWindow);

  /**
   * Удаление модального окна об успешном заполнении формы.
   */
  const removeSuccessWindow = () => {
    document.querySelector(`.success`).remove();
    document.removeEventListener(`keydown`, onEscPressInSuccess);
    document.removeEventListener(`mousedown`, onEscPressInSuccess);
  };

  /**
   * Вывод модального окна об успешном заполнении формы по нажатию на главную кнопку.
   */
  const onMainButtonPress = () => {
    window.map.onPageLock();
    window.common.create(messageItem, mainPlace);
    document.addEventListener(`keydown`, onEscPressInSuccess);
    document.addEventListener(`mousedown`, onMousePressInSuccess);
  };

  const onEscPressInError = (evt) => window.common.escEvt(evt, removeErrorWindow);
  const onMousePressInError = (evt) => window.common.leftButtonEvt(evt, removeErrorWindow);

  /**
   * Удаление модального окна о неуспешном заполнении формы.
   */
  const removeErrorWindow = () => {
    document.querySelector(`.error`).remove();
    document.removeEventListener(`keydown`, onEscPressInError);
    document.removeEventListener(`mousedown`, onMousePressInError);
  };

  /**
   * Вывод модального окна о неуспешном заполнении формы по нажатию на главную кнопку.
   */

  const getErrorWindow = () => {
    if (form.checkValidity() === true) {
      window.common.create(newItemError, mainPlace);
      document.addEventListener(`keydown`, onEscPressInError);
      document.addEventListener(`mousedown`, onMousePressInError);
      errorButton.addEventListener(`mousedown`, onMousePressInError);
    } else {
      form.reportValidity();
    }
  };

  const onEnterPressInReset = (evt) => window.common.leftButtonEvt(evt, window.map.onPageLock());
  const onMousePressInReset = (evt) => window.common.enterEvt(evt, window.map.onPageLock());

  resetButton.addEventListener(`keydown`, onEnterPressInReset);
  resetButton.addEventListener(`mousedown`, onMousePressInReset);

  window.form = {
    parent: form,
    childs: formChilds,
    address: formAddress,
    title: formTitle,
    mainButtonPress: onMainButtonPress,
    getError: getErrorWindow
  };
}());
