'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MAX_RENDER_PINS = 5;
  var mapPinsElement = window.map.mapBlock.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPin = function (arrItem) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = window.map.calcXPin(arrItem.location.x, PIN_WIDTH) + 'px';
    pinElement.style.top = window.map.calcYPin(arrItem.location.y, PIN_HEIGHT) + 'px';
    pinElement.querySelector('img').src = arrItem.author.avatar;
    pinElement.querySelector('img').alt = arrItem.offer.title;

    return pinElement;
  };

  var renderPins = function (arr) {
    var slicedArray = arr.slice(0, MAX_RENDER_PINS);

    slicedArray.forEach(function (item) {
      var ad = item;
      var pin = createPin(item);
      onClickPin(pin, ad);
      mapPinsElement.appendChild(pin);
    });
  };

  var onClickPin = function (pin, ad) {
    pin.addEventListener('click', function () {
      activePin(pin);
      var cardElement = document.querySelector('.map__card');
      if (!cardElement) {
        window.card.render(ad);
      } else if (cardElement && ad.offer.title !== cardElement.querySelector('.popup__title').textContent) {
        window.card.close();
        window.card.render(ad);
      }
    });
  };

  var delActivePin = function () {
    var activePinElement = document.querySelector('.map__pin--active');
    activePinElement.classList.remove('map__pin--active');
  };

  var activePin = function (pin) {
    var currentActivepinElement = mapPinsElement.querySelector('.map__pin--active');
    if (currentActivepinElement) {
      delActivePin();
    }

    pin.classList.add('map__pin--active');
  };

  var delPins = function () {
    var allPinsElement = document.querySelectorAll('.map__pin');

    allPinsElement.forEach(function (item) {
      if (!item.classList.contains('map__pin--main')) {
        item.remove();
      }
    });
  };

  window.pin = {
    render: renderPins,
    delPins: delPins,
    delActivePin: delActivePin,
  };
})();
