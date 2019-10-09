'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var blockMapPins = window.mapBlock.querySelector('.map__pins');

  var createPin = function (arrItem) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = window.calcXPin(arrItem.location.x, PIN_WIDTH) + 'px';
    pinElement.style.top = window.calcYPin(arrItem.location.y, PIN_HEIGHT) + 'px';
    pinElement.querySelector('img').src = arrItem.author.avatar;
    pinElement.querySelector('img').alt = arrItem.offer.title;

    return pinElement;
  };

  window.renderPins = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      var ad = arr[i];
      var pin = createPin(arr[i]);
      onClickPin(pin, ad);
      blockMapPins.appendChild(pin);
    }
  };

  var onClickPin = function (pin, ad) {
    pin.addEventListener('click', function () {
      activePin(pin);
      window.card = document.querySelector('.map__card');
      if (!window.card) {
        window.renderCard(ad);
      } else if (window.card && ad.offer.title !== window.card.querySelector('.popup__title').textContent) {
        window.closeCard();
        window.renderCard(ad);
      }
    });
  };

  var activePin = function (pin) {
    var currentActivePin = blockMapPins.querySelector('.map__pin--active');
    if (currentActivePin) {
      currentActivePin.classList.remove('map__pin--active');
    }
    pin.classList.add('map__pin--active');
  };
})();
