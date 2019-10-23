'use strict';

(function () {
  var mapFilters = document.querySelectorAll('.map__filter');
  var mapCheckboxes = document.querySelectorAll('.map__checkbox');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var filterWifi = document.querySelector('#filter-wifi');
  var filterDishwasher = document.querySelector('#filter-dishwasher');
  var filterParking = document.querySelector('#filter-parking');
  var filterWasher = document.querySelector('#filter-washer');
  var filterElevator = document.querySelector('#filter-elevator');
  var filterConditioner = document.querySelector('#filter-conditioner');

  window.onChangeFilter = window.util.debounce(function (filter) {
    filter.setAttribute('checked', 'checked');
    filteredPins();
  });

  var addFilterListener = function (filter) {
    filter.addEventListener('change', function () {
      window.onChangeFilter(filter);
    });
  };

  var getAllFilters = function (filters) {
    for (var i = 0; i < filters.length; i++) {
      var filter = filters[i];
      addFilterListener(filter);
    }
  };

  getAllFilters(mapFilters);
  getAllFilters(mapCheckboxes);

  var filteredPins = function () {
    window.delPins();
    if (window.currentCard) {
      window.closeCard();
    }
    var filteredArr = window.ads;

    var filteredCheckbox = function (checkbox) {
      filteredArr = filteredArr.filter(function (item) {
        if (checkbox.checked) {
          return item.offer.features.includes(checkbox.value);
        } else {
          return item;
        }
      });
    };

    var filteredRadio = function (input, name) {
      filteredArr = filteredArr.filter(function (item) {
        if (input.value === 'any') {
          return item;
        } else {
          return input.value === item.offer[name];
        }
      });
    };

    filteredRadio(housingType, 'type');

    filteredArr = filteredArr.filter(function (item) {
      if (housingPrice.value === 'low') {
        return item.offer.price < '10000';
      }
      if (housingPrice.value === 'middle') {
        return (item.offer.price >= '10000' && item.offer.price <= '50000');
      }
      if (housingPrice.value === 'high') {
        return (item.offer.price > '50000');
      }

      return item;
    });

    filteredRadio(housingRooms, 'rooms');
    filteredRadio(housingGuests, 'guests');

    filteredCheckbox(filterWifi);
    filteredCheckbox(filterDishwasher);
    filteredCheckbox(filterParking);
    filteredCheckbox(filterWasher);
    filteredCheckbox(filterElevator);
    filteredCheckbox(filterConditioner);

    window.renderPins(filteredArr);
  };
})();
