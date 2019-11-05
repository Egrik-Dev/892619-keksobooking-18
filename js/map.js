'use strict';

(function () {
  var MAP_WIDTH = 1200;
  var MAP_HEIGHT = 630;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 75;
  var MAX_RIGHT_PIN = MAP_WIDTH - (MAIN_PIN_WIDTH / 2);
  var MAX_LEFT_PIN = 0 - (MAIN_PIN_WIDTH / 2);
  var MAX_BOTTOM_PIN = MAP_HEIGHT - MAIN_PIN_HEIGHT;
  var MAX_TOP_PIN = 55;
  var METHOD_GET = 'GET';
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var mapBlockElement = document.querySelector('.map');
  var filterFormElement = document.querySelector('.map__filters');
  var mainPinElement = document.querySelector('.map__pin--main');
  var mainBlockElement = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var successLoad = function (arr) {
    window.pin.render(arr);
    window.getXhrArray(arr);
  };

  var errorLoad = function (errorMessage) {
    var errorModal = errorTemplate.cloneNode(true);
    var btnTryagainElement = errorModal.querySelector('.error__button');
    errorModal.querySelector('.error__message').textContent = errorMessage;

    mainBlockElement.insertAdjacentElement('afterbegin', errorModal);

    document.addEventListener('keydown', onErrorEnterPress);

    btnTryagainElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      onErrorClick();
    });
  };

  var onErrorEnterPress = function (evt) {
    window.util.isEnterEvent(evt, onErrorClick);
  };

  var onErrorClick = function () {
    document.removeEventListener('keydown', onErrorEnterPress);
    changeDisableStatus();
    var errorElement = document.querySelector('.error');
    errorElement.remove();
  };

  var calcXPin = function (xCoordinate, pinWidth) {
    return Math.round(xCoordinate - (pinWidth / 2));
  };

  var calcYPin = function (yCoordinate, pinHeight) {
    return Math.round(yCoordinate - pinHeight);
  };

  var returnMainPin = function () {
    mainPinElement.style.left = '570px';
    mainPinElement.style.top = '375px';
  };

  var changeEnableStatus = function () {
    if (mapBlockElement.classList.contains('map--faded')) {
      mapBlockElement.classList.remove('map--faded');
      window.ajax(METHOD_GET, URL_LOAD, successLoad, errorLoad);
      window.form.makeEnabledForm(window.form.allFieldSet);
      window.form.makeEnabledForm(window.form.allFilters);
      window.form.formElement.classList.remove('ad-form--disabled');
    }
  };

  var changeDisableStatus = function () {
    mapBlockElement.classList.add('map--faded');
    window.form.makeDisabledForm(window.form.allFieldSet);
    window.form.makeDisabledForm(window.form.allFilters);
    window.form.formElement.classList.add('ad-form--disabled');
    window.form.delUserPhotos();
    window.form.formElement.reset();
    filterFormElement.reset();

    window.card.close();

    window.pin.delPins();

    returnMainPin();

    window.form.address.value = window.form.calcStartPin();
  };

  var setAdress = function () {
    window.form.address.value = calcXPin(parseInt(mainPinElement.style.left, 10), -MAIN_PIN_WIDTH) + ', ' + calcYPin(parseInt(mainPinElement.style.top, 10), -MAIN_PIN_HEIGHT);
  };

  var movingPin = function (evt) {
    function Coords(x, y) {
      this.x = x;
      this.y = y;
    }

    var startCords = new Coords(evt.clientX, evt.clientY);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = new Coords(startCords.x - moveEvt.clientX, startCords.y - moveEvt.clientY);
      startCords = new Coords(moveEvt.clientX, moveEvt.clientY);
      var pinCoord = new Coords(mainPinElement.offsetLeft - shift.x, mainPinElement.offsetTop - shift.y);

      mainPinElement.style.top = pinCoord.y + 'px';
      mainPinElement.style.left = pinCoord.x + 'px';

      setAdress();

      if (pinCoord.x < MAX_LEFT_PIN) {
        mainPinElement.style.left = MAX_LEFT_PIN + 'px';
      }

      if (pinCoord.x > MAX_RIGHT_PIN) {
        mainPinElement.style.left = MAX_RIGHT_PIN + 'px';
      }

      if (pinCoord.y < MAX_TOP_PIN) {
        mainPinElement.style.top = MAX_TOP_PIN + 'px';
      }

      if (pinCoord.y > MAX_BOTTOM_PIN) {
        mainPinElement.style.top = MAX_BOTTOM_PIN + 'px';
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

  mainPinElement.addEventListener('mousedown', function (evt) {
    changeEnableStatus();
    movingPin(evt);
  });

  mainPinElement.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, changeEnableStatus);
  });

  window.map = {
    mapBlock: mapBlockElement,
    mainPin: mainPinElement,
    mainBlock: mainBlockElement,
    errorLoad: errorLoad,
    calcXPin: calcXPin,
    calcYPin: calcYPin,
    changeDisableStatus: changeDisableStatus,
  };
})();
