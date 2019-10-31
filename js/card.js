'use strict';

(function () {
  var MAP_TYPE_ROOM = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало',
  };
  var blockFiltersElement = document.querySelector('.map__filters-container');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var createCard = function (arrItem) {
    var cardElement = cardTemplate.cloneNode(true);
    var featuresElement = cardElement.querySelector('.popup__features');
    var photosElement = cardElement.querySelector('.popup__photos');
    var photoElement = cardElement.querySelector('.popup__photo');

    cardElement.querySelector('.popup__title').textContent = arrItem.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = arrItem.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = arrItem.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = MAP_TYPE_ROOM[arrItem.offer.type.toUpperCase()];
    cardElement.querySelector('.popup__text--capacity').textContent = arrItem.offer.rooms + ' комнаты для ' + arrItem.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrItem.offer.checkin + ', выезд до ' + arrItem.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = arrItem.offer.description;
    cardElement.querySelector('.popup__avatar').src = arrItem.author.avatar;

    featuresElement.innerHTML = '';
    for (var i = 0; i < arrItem.offer.features.length; i++) {
      var newFeatureElement = document.createElement('li');
      newFeatureElement.classList.add('popup__feature');
      newFeatureElement.classList.add('popup__feature--' + arrItem.offer.features[i]);
      featuresElement.append(newFeatureElement);
    }

    photosElement.innerHTML = '';
    for (var j = 0; j < arrItem.offer.photos.length; j++) {
      var photoTemplate = photoElement.cloneNode(true);
      photosElement.append(photoTemplate);
      var allPhotosElement = cardElement.querySelectorAll('.popup__photo');
      var popupPhoto = allPhotosElement[j];
      popupPhoto.src = arrItem.offer.photos[j];
    }

    return cardElement;
  };

  var renderCard = function (arrItem) {
    var currentCard = createCard(arrItem);
    var btnClosecardElement = currentCard.querySelector('.popup__close');
    onClickBtnClose(btnClosecardElement);
    blockFiltersElement.before(currentCard);
    document.addEventListener('keydown', onCardEscPress);
  };

  var onClickBtnClose = function (close) {
    close.addEventListener('click', function () {
      window.pin.delActivePin();
      closeCard();
    });
  };

  var onCardEscPress = function (evt) {
    window.util.isEscEvent(evt, closeCard);
    window.pin.delActivePin();
  };

  var closeCard = function () {
    var cardElement = document.querySelector('.map__card');

    if (cardElement) {
      cardElement.remove();
    }

    document.removeEventListener('keydown', onCardEscPress);
  };

  window.card = {
    render: renderCard,
    close: closeCard,
  };
})();
