'use strict';

var TYPE_ROOM = ['palace', 'flat', 'house', 'bungalo'];
var MAP_TYPE_ROOM = {
  PALACE: 'Дворец',
  FLAT: 'Квартира',
  HOUSE: 'Дом',
  BUNGALO: 'Бунгало',
};
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
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var BODY_WIDTH = 1200;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 80;
var MIN_PRICE = 500;
var MAX_PRICE = 10000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 4;
var MIN_QUESTS = 1;
var MAX_QUESTS = 8;
var MIN_X = 0;
var MIN_Y = 130;
var MAX_Y = 630;
var QUANTITY_PINS = 8;
var ENTER_KEYCODE = 13;
var ads = [];
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var mapBlock = document.querySelector('.map');
var blockMapPins = mapBlock.querySelector('.map__pins');
var allFieldSet = document.querySelectorAll('fieldset');
var mainPin = document.querySelector('.map__pin--main');
var allFilters = document.querySelectorAll('.map__filter');
var form = document.querySelector('.ad-form');
var address = document.querySelector('#address');
var roomNumber = document.querySelector('[name="rooms"]');
var capacity = document.querySelector('[name="capacity"]');

var calcStartPin = function () {
  var x = parseInt(mainPin.style.left, 10);
  var y = parseInt(mainPin.style.top, 10);
  return x + ', ' + y;
};

address.setAttribute('value', calcStartPin());

var calcXPin = function (xCoordinate, pinWidth) {
  return Math.round(xCoordinate - (pinWidth / 2));
};

var calcYPin = function (yCoordinate, pinHeight) {
  return Math.round(yCoordinate - pinHeight);
};

var makeDisabledForm = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    var elem = arr[i];
    elem.setAttribute('disabled', 'disabled');
  }
};

var makeEnabledForm = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    var elem = arr[i];
    elem.removeAttribute('disabled');
  }
};

makeDisabledForm(allFieldSet);
makeDisabledForm(allFilters);

var changeEnableStatus = function () {
  if (ads.length === 0) {
    mapBlock.classList.remove('map--faded');
    ads = generateAds(QUANTITY_PINS);
    renderPins(ads);
    var firstCard = createCard(ads[0]);
    blockMapPins.after(firstCard);
    makeEnabledForm(allFieldSet);
    makeEnabledForm(allFilters);
    form.classList.remove('ad-form--disabled');
    address.value = calcXPin(parseInt(mainPin.style.left, 10), MAIN_PIN_WIDTH) + ', ' + calcYPin(parseInt(mainPin.style.top, 10), -MAIN_PIN_HEIGHT);
  }
};

var getRandomNum = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var generateAds = function (quantity) {
  var array = [];

  for (var i = 0; i < quantity; i++) {
    var obj = {
      author: {
        avatar: 'img/avatars/user' + '0' + (i + 1) + '.png'
      },

      offer: {
        title: 'Сдаётся супер-пупер помещение',
        features: FEATURES.slice(getRandomNum(0, FEATURES.length - 1)),
        photos: PHOTOS.slice(getRandomNum(0, PHOTOS.length - 1)),
        price: getRandomNum(MIN_PRICE, MAX_PRICE),
        type: TYPE_ROOM[getRandomNum(0, TYPE_ROOM.length - 1)],
        rooms: getRandomNum(MIN_ROOMS, MAX_ROOMS),
        guests: getRandomNum(MIN_QUESTS, MAX_QUESTS),
        checkin: CHECKIN[getRandomNum(0, CHECKIN.length - 1)],
        checkout: CHECKOUT[getRandomNum(0, CHECKOUT.length - 1)],
        description: 'Всё очень здорово, берите не пожалеете!'
      },

      location: {
        x: getRandomNum(MIN_X, BODY_WIDTH),
        y: getRandomNum(MIN_Y, MAX_Y)
      }};

    obj.offer.address = obj.location.x + ', ' + obj.location.y;

    array.push(obj);
  }
  return array;
};

var createPin = function (arrItem) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = calcXPin(arrItem.location.x, PIN_WIDTH) + 'px';
  pinElement.style.top = calcYPin(arrItem.location.y, PIN_HEIGHT) + 'px';
  pinElement.querySelector('img').src = arrItem.author.avatar;
  pinElement.querySelector('img').alt = arrItem.offer.title;

  return pinElement;
};

var createCard = function (arrItem) {
  var cardElement = cardTemplate.cloneNode(true);
  var blockFeatures = cardElement.querySelector('.popup__features');
  var blockPhotos = cardElement.querySelector('.popup__photos');
  var photoElement = cardElement.querySelector('.popup__photo');

  cardElement.querySelector('.popup__title').textContent = arrItem.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = arrItem.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = arrItem.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = MAP_TYPE_ROOM[arrItem.offer.type.toUpperCase()];
  cardElement.querySelector('.popup__text--capacity').textContent = arrItem.offer.rooms + ' комнаты для ' + arrItem.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrItem.offer.checkin + ', выезд до ' + arrItem.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = arrItem.offer.description;
  cardElement.querySelector('.popup__avatar').src = arrItem.author.avatar;

  blockFeatures.innerHTML = '';
  for (var i = 0; i < arrItem.offer.features.length; i++) {
    var newFeature = document.createElement('li');
    newFeature.classList.add('popup__feature');
    newFeature.classList.add('popup__feature--' + arrItem.offer.features[i]);
    blockFeatures.append(newFeature);
  }

  blockPhotos.innerHTML = '';
  for (var j = 0; j < arrItem.offer.photos.length; j++) {
    var photoTemplate = photoElement.cloneNode(true);
    blockPhotos.append(photoTemplate);
    var allPhotos = cardElement.querySelectorAll('.popup__photo');
    var popupPhoto = allPhotos[j];
    popupPhoto.src = arrItem.offer.photos[j];
  }

  return cardElement;
};

var renderPins = function (arr) {
  var pin = document.querySelectorAll('.map__pin');
  if (pin.length === 1) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < arr.length; j++) {
      fragment.appendChild(createPin(arr[j]));
    }
    blockMapPins.appendChild(fragment);
  }
};

mainPin.addEventListener('mousedown', function () {
  changeEnableStatus();
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    changeEnableStatus();
  }
});

var addRoomsValidity = function (select) {
  select.addEventListener('change', function () {
    roomNumber.setCustomValidity(ROOMS_CAPACITY_MAP[roomNumber.value].guests.includes(capacity.value) ? '' : ROOMS_CAPACITY_MAP[roomNumber.value].errorText);
  });
};

addRoomsValidity(roomNumber);
addRoomsValidity(capacity);
