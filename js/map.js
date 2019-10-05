'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 80;
  var QUANTITY_PINS = 8;
  var ENTER_KEYCODE = 13;
  var mapBlock = document.querySelector('.map');
  var ads = [];
  window.blockMapPins = mapBlock.querySelector('.map__pins');
  var form = document.querySelector('.ad-form');
  window.mainPin = document.querySelector('.map__pin--main');

  window.calcXPin = function (xCoordinate, pinWidth) {
    return Math.round(xCoordinate - (pinWidth / 2));
  };

  window.calcYPin = function (yCoordinate, pinHeight) {
    return Math.round(yCoordinate - pinHeight);
  };

  var changeEnableStatus = function () {
    if (ads.length === 0) {
      mapBlock.classList.remove('map--faded');
      ads = window.generateAds(QUANTITY_PINS);
      window.renderPins(ads);
      var firstCard = window.createCard(ads[0]);
      window.blockMapPins.after(firstCard);
      window.makeEnabledForm(window.allFieldSet);
      window.makeEnabledForm(window.allFilters);
      form.classList.remove('ad-form--disabled');
      window.address.value = window.calcXPin(parseInt(window.mainPin.style.left, 10), MAIN_PIN_WIDTH) + ', ' + window.calcYPin(parseInt(window.mainPin.style.top, 10), -MAIN_PIN_HEIGHT);
    }
  };

  window.mainPin.addEventListener('mousedown', function () {
    changeEnableStatus();
  });

  window.mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      changeEnableStatus();
    }
  });
})();
