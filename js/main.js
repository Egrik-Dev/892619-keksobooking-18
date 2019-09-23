var TYPE_ROOM = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var advTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapBlock = document.querySelector('.map');
var blockMapPins = mapBlock.querySelector('.map__pins');
var body = getComputedStyle(document.body);
var pinWidth = 50;
var pinHeight = 70;

var getRandomNum = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var generateRandomArr = function (arr) {
  var newArr = [];

  for (var currentNum = 0; currentNum < arr.length; currentNum++) {
    var num = getRandomNum(currentNum, arr.length - 1);
    newArr.push(arr[num]);
    currentNum = num;
  }

  return newArr;
}

var generateAds = function (quantity) {
  var ads = [];

  for (var i = 0; i < quantity; i++) {
    ads.push({
      author: {
        avatar: 'img/avatars/user' + '0' + (i + 1) + '.png'
      },

      offer: {
        title: 'Сдаётся супер-пупер помещение',
        price: getRandomNum(500, 10000),
        type: TYPE_ROOM[getRandomNum(0, TYPE_ROOM.length - 1)],
        rooms: getRandomNum(1, 4),
        guests: getRandomNum(1, 8),
        checkin: CHECKIN[getRandomNum(0, CHECKIN.length - 1)],
        checkout: CHECKOUT[getRandomNum(0, CHECKOUT.length - 1)],
        description: 'Всё очень здорово, берите не пожалеете!'
      },

      location: {
        x: getRandomNum(0, parseInt(body.maxWidth)),
        y: getRandomNum(130, 630)
      }})

    ads[i].offer.address = ads[i].location.x + ', ' + ads[i].location.y;
    ads[i].offer.features = generateRandomArr(FEATURES);
    ads[i].offer.photos = generateRandomArr(PHOTOS);
  }

  return ads;
}

var ads = generateAds(8);
console.log(ads);

mapBlock.classList.remove('map--faded');

var createAdv = function (arrItem) {
  var advElement = advTemplate.cloneNode(true);

  advElement.style.left = arrItem.location.x - (pinWidth / 2) + 'px';
  advElement.style.top = arrItem.location.y - pinHeight + 'px';
  advElement.querySelector('img').src = arrItem.author.avatar;
  advElement.querySelector('img').alt = arrItem.offer.title;

  return advElement;
};

var renderAds = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < arr.length; j++) {
    fragment.appendChild(createAdv(arr[j]));
  }
  blockMapPins.appendChild(fragment);
};

renderAds(ads);
