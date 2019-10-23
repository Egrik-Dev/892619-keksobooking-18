'use strict';

(function () {
  var ROOMS_CAPACITY_MAP = {
    '1': {
      'guests': ['1'],
      'errorText': '1 комната для 1 гостя'
    },
    '2': {
      'guests': ['1', '2'],
      'errorText': '2 комнаты для 1 или 2 гостей'
    },
    '3': {
      'guests': ['1', '2', '3'],
      'errorText': '3 комнаты для 1, 2 или 3 гостей'
    },
    '100': {
      'guests': ['0'],
      'errorText': '100 комнат не для гостей'
    },
  };
  var METHOD_POST = 'POST';
  var URL_SAVE = 'https://js.dump.academy/keksobooking';
  window.allFilters = document.querySelectorAll('.map__filter');
  window.allFieldSet = document.querySelectorAll('fieldset');
  var address = document.querySelector('#address');
  var roomNumber = document.querySelector('[name="rooms"]');
  var capacity = document.querySelector('[name="capacity"]');
  var housingType = document.querySelector('#type');
  var price = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var form = document.querySelector('.ad-form');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  window.makeDisabledForm = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      var elem = arr[i];
      elem.setAttribute('disabled', 'disabled');
    }
  };

  window.makeDisabledForm(window.allFieldSet);
  window.makeDisabledForm(window.allFilters);

  window.calcStartPin = function () {
    var x = parseInt(window.mainPin.style.left, 10);
    var y = parseInt(window.mainPin.style.top, 10);
    return x + ', ' + y;
  };

  address.setAttribute('value', window.calcStartPin());

  window.makeEnabledForm = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      var elem = arr[i];
      elem.removeAttribute('disabled');
    }
  };

  var addRoomsValidity = function (select) {
    select.addEventListener('change', function () {
      roomNumber.setCustomValidity(ROOMS_CAPACITY_MAP[roomNumber.value].guests.includes(capacity.value) ? '' : ROOMS_CAPACITY_MAP[roomNumber.value].errorText);
    });
  };

  addRoomsValidity(roomNumber);
  addRoomsValidity(capacity);

  var changeMinPrice = function () {
    switch (housingType.value) {
      case 'bungalo':
        price.min = '0';
        price.placeholder = '0';
        break;
      case 'flat':
        price.min = '1000';
        price.placeholder = '1000';
        break;
      case 'house':
        price.min = '5000';
        price.placeholder = '5000';
        break;
      case 'palace':
        price.min = '10000';
        price.placeholder = '10000';
        break;
    }
  };

  housingType.addEventListener('change', changeMinPrice);

  var changeTime = function (select) {
    select.addEventListener('change', function () {
      timeIn.value = select.value;
      timeOut.value = select.value;
    });
  };

  changeTime(timeIn);
  changeTime(timeOut);

  var closeSuccess = function () {
    document.removeEventListener('keydown', onSuccessEscPress);
    document.removeEventListener('click', closeSuccess);
    var blockSuccess = document.querySelector('.success');
    blockSuccess.remove();
  };

  var onSuccessEscPress = function (evt) {
    window.util.isEscEvent(evt, closeSuccess);
  };

  var successSave = function () {
    var successModal = successTemplate.cloneNode(true);
    window.changeDisableStatus();

    window.mainBlock.insertAdjacentElement('afterbegin', successModal);

    document.addEventListener('keydown', onSuccessEscPress);
    document.addEventListener('click', closeSuccess);
  };

  form.addEventListener('submit', function (evt) {
    window.ajax(METHOD_POST, URL_SAVE, successSave, window.errorLoad, new FormData(form));
    evt.preventDefault();
  });
})();
