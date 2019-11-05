'use strict';

(function () {
  var MIN_PRICE = '10000';
  var MAX_PRICE = '50000';
  var formFiltersElement = document.querySelector('.map__filters');
  var housingTypeElement = document.querySelector('#housing-type');
  var housingPriceElement = document.querySelector('#housing-price');
  var housingRoomsElement = document.querySelector('#housing-rooms');
  var housingGuestsElement = document.querySelector('#housing-guests');
  var ads = [];

  var onFormChange = window.util.debounce(function () {
    filteredPins();
  });

  formFiltersElement.addEventListener('change', onFormChange);

  window.getXhrArray = function (arr) {
    ads = arr;
    return ads;
  };

  var filteredPins = function () {
    window.card.close();
    window.pin.delPins();

    var filteredArr = ads;

    var getFilteredItems = function (item, type, name) {
      return (type.value === 'any') ? item : type.value === String(item.offer[name]);
    };

    var getPriceItem = function (item) {
      switch (housingPriceElement.value) {
        case 'low':
          return item.offer.price < MIN_PRICE;
        case 'middle':
          return item.offer.price >= MIN_PRICE && item.offer.price <= MAX_PRICE;
        case 'high':
          return item.offer.price > MAX_PRICE;
        default:
          return item;
      }
    };

    var filteredRadio = function () {
      filteredArr = filteredArr.filter(function (item) {
        return getFilteredItems(item, housingTypeElement, 'type') && getPriceItem(item) && getFilteredItems(item, housingRoomsElement, 'rooms') && getFilteredItems(item, housingGuestsElement, 'guests');
      });
    };

    var isFeatuesThere = function (currentValue) {
      filteredArr = filteredArr.filter(function (item) {
        return item.offer.features.includes(currentValue);
      });
    };

    var filteredCheckbox = function () {
      var checkboxesCheckedElement = document.querySelectorAll('.map__checkbox:checked');
      if (checkboxesCheckedElement.length !== 0) {
        var checkedFeatures = [];
        checkboxesCheckedElement.forEach(function (item) {
          checkedFeatures.push(item.value);
        });
        checkedFeatures.some(isFeatuesThere);
      }
    };

    filteredRadio();
    filteredCheckbox();

    window.pin.render(filteredArr);
  };
})();
