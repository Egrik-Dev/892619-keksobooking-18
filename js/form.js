'use strict';

(function () {
  window.allFilters = document.querySelectorAll('.map__filter');
  window.allFieldSet = document.querySelectorAll('fieldset');
  var address = document.querySelector('#address');
  var roomNumber = document.querySelector('[name="rooms"]');
  var capacity = document.querySelector('[name="capacity"]');
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

  var makeDisabledForm = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      var elem = arr[i];
      elem.setAttribute('disabled', 'disabled');
    }
  };

  makeDisabledForm(window.allFieldSet);
  makeDisabledForm(window.allFilters);

  var calcStartPin = function () {
    var x = parseInt(window.mainPin.style.left, 10);
    var y = parseInt(window.mainPin.style.top, 10);
    return x + ', ' + y;
  };

  address.setAttribute('value', calcStartPin());

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
})();
