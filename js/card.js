'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var MAP_TYPE_ROOM = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало',
  };

  window.createCard = function (arrItem) {
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
})();
