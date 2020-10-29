'use strict';

(function () {
  window.mapFilterHouse = window.map.mapFilterParent.querySelector(`#housing-type`);

  window.mapFilterHouse.addEventListener(`change`, () => window.updatePins());
}());
