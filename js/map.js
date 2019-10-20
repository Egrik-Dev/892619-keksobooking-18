'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 75;
  var MAX_RIGHT_PIN = 1200 - (MAIN_PIN_WIDTH / 2);
  var MAX_LEFT_PIN = 0 - (MAIN_PIN_WIDTH / 2);
  var MAX_BOTTOM_PIN = 630 - MAIN_PIN_HEIGHT;
  var MAX_TOP_PIN = 55;
  var METHOD_GET = 'GET';
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  window.mapBlock = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  window.mainPin = document.querySelector('.map__pin--main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  window.mainBlock = document.querySelector('main');
  window.ads = [];

  window.successLoad = function (arr) {
    window.ads = arr;
    window.renderPins(window.ads);
  };

  window.errorLoad = function (errorMessage) {
    var errorModal = errorTemplate.cloneNode(true);
    var btnTryAgain = errorModal.querySelector('.error__button');
    errorModal.querySelector('.error__message').textContent = errorMessage;

    window.mainBlock.insertAdjacentElement('afterbegin', errorModal);

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
    window.changeDisableStatus();
    var error = document.querySelector('.error');
    error.remove();
  };

  window.calcXPin = function (xCoordinate, pinWidth) {
    return Math.round(xCoordinate - (pinWidth / 2));
  };

  window.calcYPin = function (yCoordinate, pinHeight) {
    return Math.round(yCoordinate - pinHeight);
  };

  var returnMainPin = function () {
    window.mainPin.style.left = '570px';
    window.mainPin.style.top = '375px';
  };

  var changeEnableStatus = function () {
    if (window.mapBlock.classList.contains('map--faded')) {
      window.mapBlock.classList.remove('map--faded');
      window.ajax(METHOD_GET, URL_LOAD, window.successLoad, window.errorLoad);
      window.makeEnabledForm(window.allFieldSet);
      window.makeEnabledForm(window.allFilters);
      form.classList.remove('ad-form--disabled');
    }
  };

  window.changeDisableStatus = function () {
    window.mapBlock.classList.add('map--faded');
    window.makeDisabledForm(window.allFieldSet);
    window.makeDisabledForm(window.allFilters);
    form.classList.add('ad-form--disabled');
    form.reset();

    window.delPins();

    var card = document.querySelector('.map__card');
    if (card) {
      window.closeCard();
    }

    returnMainPin();

    window.address.value = window.calcStartPin();
  };

  var setAdress = function () {
    window.address.value = 'x: ' + window.calcXPin(parseInt(window.mainPin.style.left, 10), -MAIN_PIN_WIDTH) + ', y: ' + window.calcYPin(parseInt(window.mainPin.style.top, 10), -MAIN_PIN_HEIGHT);
  };

  var movingPin = function (evt) {
    var startCords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCords.x - moveEvt.clientX,
        y: startCords.y - moveEvt.clientY
      };

      startCords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinCoord = {
        x: window.mainPin.offsetLeft - shift.x,
        y: window.mainPin.offsetTop - shift.y
      };

      window.mainPin.style.top = pinCoord.y + 'px';
      window.mainPin.style.left = pinCoord.x + 'px';

      setAdress();

      if (pinCoord.x < MAX_LEFT_PIN) {
        window.mainPin.style.left = MAX_LEFT_PIN + 'px';
      }

      if (pinCoord.x > MAX_RIGHT_PIN) {
        window.mainPin.style.left = MAX_RIGHT_PIN + 'px';
      }

      if (pinCoord.y < MAX_TOP_PIN) {
        window.mainPin.style.top = MAX_TOP_PIN + 'px';
      }

      if (pinCoord.y > MAX_BOTTOM_PIN) {
        window.mainPin.style.top = MAX_BOTTOM_PIN + 'px';
      }
    };

    var onMouseUp = function () {
      setAdress();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.mainPin.addEventListener('mousedown', function (evt) {
    changeEnableStatus();
    movingPin(evt);
  });

  window.mainPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, changeEnableStatus);
  });
})();
