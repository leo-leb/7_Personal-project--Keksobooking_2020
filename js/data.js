'use strict';

(function () {
  /**
   * Возвращает индекс случайного элемента массива.
   * @param {array} array - Исходный массив.
   * @return {number} - Индекс.
   */
  const randomValue = (array) => {return Math.ceil(Math.random() * array.length);};

  /**
   * Возвращает случайный элемент массива.
   * @param {array} array - Исходный массив.
   * @return {string} - Случайный элемент исходного массива.
   */
  const randomParameter = (array) => {return array[Math.floor(Math.random() * array.length)];};

  /**
   * Создаем массив случайной длины из произвольных объектов исходного массива.
   * @param {array} array - Исходный массив.
   * @return {array} - Массив случайной длины.
   */
  const randomArray = (array) => {
    let temporaryArray = [];
    for (let i = 0; i < randomValue(array); i++) {
      let someValue = randomParameter(array);
      if (temporaryArray.includes(someValue) !== true) {
        temporaryArray.push(someValue);
      }
    }
    return temporaryArray;
  };

  window.data = {
    randomParameter: randomParameter,
    randomArray: randomArray
  };
}());
