'use strict';

(function () {
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var MIN_PRICE = 500;
  var MAX_PRICE = 10000;
  var TYPE_ROOM = ['palace', 'flat', 'house', 'bungalo'];
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 4;
  var MIN_QUESTS = 1;
  var MAX_QUESTS = 8;
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var MIN_X = 0;
  var BODY_WIDTH = 1200;
  var MIN_Y = 130;
  var MAX_Y = 630;

  var getRandomNum = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  window.generateAds = function (quantity) {
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
})();
