'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var createPin = function (arrItem) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = window.calcXPin(arrItem.location.x, PIN_WIDTH) + 'px';
    pinElement.style.top = window.calcYPin(arrItem.location.y, PIN_HEIGHT) + 'px';
    pinElement.querySelector('img').src = arrItem.author.avatar;
    pinElement.querySelector('img').alt = arrItem.offer.title;

    return pinElement;
  };

  window.renderPins = function (arr) {
    var pin = document.querySelectorAll('.map__pin');
    if (pin.length === 1) {
      var fragment = document.createDocumentFragment();
      for (var j = 0; j < arr.length; j++) {
        fragment.appendChild(createPin(arr[j]));
      }
      window.blockMapPins.appendChild(fragment);
    }
  };
})();

