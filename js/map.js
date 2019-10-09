'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 80;
  window.mapBlock = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  window.mainPin = document.querySelector('.map__pin--main');
  var ErrorTemplate = document.querySelector('#error').content.querySelector('.error');
  var mainBlock = document.querySelector('main');

  window.errorLoad = function (errorMessage) {
    var errorModal = ErrorTemplate.cloneNode(true);
    var btnTryAgain = errorModal.querySelector('.error__button');
    errorModal.querySelector('.error__message').textContent = errorMessage;

    mainBlock.insertAdjacentElement('afterbegin', errorModal);

    document.addEventListener('keydown', onErrorEnterPress);

    btnTryAgain.addEventListener('click', function (evt) {
      evt.preventDefault();
      closeError();
    });
  };

  var onErrorEnterPress = function (evt) {
    window.util.isEnterEvent(evt, closeError);
  };

  var closeError = function () {
    document.removeEventListener('keydown', onErrorEnterPress);
    var error = document.querySelector('.error');
    error.remove();
  };

  window.calcXPin = function (xCoordinate, pinWidth) {
    return Math.round(xCoordinate - (pinWidth / 2));
  };

  window.calcYPin = function (yCoordinate, pinHeight) {
    return Math.round(yCoordinate - pinHeight);
  };

  var changeEnableStatus = function () {
    if (window.mapBlock.classList.contains('map--faded')) {
      window.mapBlock.classList.remove('map--faded');
      window.load(window.renderPins, window.errorLoad);
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
    window.util.isEnterEvent(evt, changeEnableStatus);
  });
})();
