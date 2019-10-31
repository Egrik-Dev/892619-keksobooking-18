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
  var FILE_TYPES = ['gif', 'jpg', 'png', 'jpeg'];
  var allFiltersElement = document.querySelectorAll('.map__filter');
  var allFieldSetElement = document.querySelectorAll('fieldset');
  var addressElement = document.querySelector('#address');
  var roomNumberElement = document.querySelector('[name="rooms"]');
  var capacityElement = document.querySelector('[name="capacity"]');
  var housingTypeElement = document.querySelector('#type');
  var priceElement = document.querySelector('#price');
  var timeInElement = document.querySelector('#timein');
  var timeOutElement = document.querySelector('#timeout');
  var formElement = document.querySelector('.ad-form');
  var prewievAvatarElement = document.querySelector('.ad-form-header__preview img');
  var avatarChoserElement = document.querySelector('#avatar');
  var roomsChoserElement = document.querySelector('#images');
  var resetElement = document.querySelector('.ad-form__reset');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  var makeDisabledForm = function (arr) {
    arr.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
  };

  var makeEnabledForm = function (arr) {
    arr.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };

  var delUserPhotos = function () {
    prewievAvatarElement.src = 'img/muffin-grey.svg';
    var roomsPhotosElement = document.querySelectorAll('.ad-form__photo');
    if (roomsPhotosElement) {
      roomsPhotosElement.forEach(function (item) {
        item.remove();
      });
    }
  };

  makeDisabledForm(allFieldSetElement);
  makeDisabledForm(allFiltersElement);

  var calcStartPin = function () {
    var x = parseInt(window.map.mainPin.style.left, 10);
    var y = parseInt(window.map.mainPin.style.top, 10);
    return x + ', ' + y;
  };

  addressElement.setAttribute('value', calcStartPin());

  var addRoomsValidity = function (select) {
    select.addEventListener('change', function () {
      roomNumberElement.setCustomValidity(ROOMS_CAPACITY_MAP[roomNumberElement.value].guests.includes(capacityElement.value) ? '' : ROOMS_CAPACITY_MAP[roomNumberElement.value].errorText);
    });
  };

  resetElement.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.map.changeDisableStatus();
  });

  addRoomsValidity(roomNumberElement);
  addRoomsValidity(capacityElement);

  var changeMinPrice = function () {
    switch (housingTypeElement.value) {
      case 'bungalo':
        priceElement.min = '0';
        priceElement.placeholder = '0';
        break;
      case 'flat':
        priceElement.min = '1000';
        priceElement.placeholder = '1000';
        break;
      case 'house':
        priceElement.min = '5000';
        priceElement.placeholder = '5000';
        break;
      case 'palace':
        priceElement.min = '10000';
        priceElement.placeholder = '10000';
        break;
    }
  };

  housingTypeElement.addEventListener('change', changeMinPrice);

  var changeTime = function (select) {
    select.addEventListener('change', function () {
      timeInElement.value = select.value;
      timeOutElement.value = select.value;
    });
  };

  changeTime(timeInElement);
  changeTime(timeOutElement);

  var closeSuccess = function () {
    document.removeEventListener('keydown', onSuccessEscPress);
    document.removeEventListener('click', closeSuccess);
    var blockSuccessElement = document.querySelector('.success');
    blockSuccessElement.remove();
  };

  var onSuccessEscPress = function (evt) {
    window.util.isEscEvent(evt, closeSuccess);
  };

  var successSave = function () {
    var successModalElement = successTemplate.cloneNode(true);
    window.map.changeDisableStatus();

    window.map.mainBlock.insertAdjacentElement('afterbegin', successModalElement);

    document.addEventListener('keydown', onSuccessEscPress);
    document.addEventListener('click', closeSuccess);
  };

  formElement.addEventListener('submit', function (evt) {
    window.ajax(METHOD_POST, URL_SAVE, successSave, window.map.errorLoad, new FormData(formElement));
    evt.preventDefault();
  });

  var createPhotoPrewiev = function () {
    var divElement = document.createElement('div');
    divElement.className = 'ad-form__photo';
    var imgElement = document.createElement('img');
    imgElement.setAttribute('src', 'img/muffin-grey.svg');
    imgElement.setAttribute('alt', 'Фото помещения');
    imgElement.setAttribute('width', '40');
    imgElement.setAttribute('height', '44');
    divElement.append(imgElement);
    var roomUploadElement = document.querySelector('.ad-form__upload');
    roomUploadElement.after(divElement);
    return imgElement;
  };

  var addLoadListener = function (reader, choser) {
    reader.addEventListener('load', function () {
      if (choser === roomsChoserElement) {
        var prewievRooms = createPhotoPrewiev();
        prewievRooms.src = reader.result;
      } else {
        prewievAvatarElement.src = reader.result;
      }
    });
  };

  var loadPhoto = function (choser) {
    for (var i = 0; i < choser.files.length; i++) {
      var file = choser.files[i];

      if (file) {
        var fileName = file.name.toLowerCase();
      }

      var matches = FILE_TYPES.some(function (item) {
        return fileName.endsWith(item);
      });

      if (matches) {
        var reader = new FileReader();

        reader.readAsDataURL(file);

        addLoadListener(reader, choser);
      }
    }
  };

  avatarChoserElement.addEventListener('change', function () {
    loadPhoto(avatarChoserElement);
  });

  roomsChoserElement.addEventListener('change', function () {
    loadPhoto(roomsChoserElement);
  });

  window.form = {
    allFilters: allFiltersElement,
    allFieldSet: allFieldSetElement,
    address: addressElement,
    formElement: formElement,
    makeDisabledForm: makeDisabledForm,
    makeEnabledForm: makeEnabledForm,
    delUserPhotos: delUserPhotos,
    calcStartPin: calcStartPin,
  };
})();
