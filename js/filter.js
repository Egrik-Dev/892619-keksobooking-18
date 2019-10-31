'use strict';

(function () {
  var mapFiltersElement = document.querySelectorAll('.map__filter');
  var mapCheckboxesElement = document.querySelectorAll('.map__checkbox');
  var housingTypeElement = document.querySelector('#housing-type');
  var housingPriceElement = document.querySelector('#housing-price');
  var housingRoomsElement = document.querySelector('#housing-rooms');
  var housingGuestsElement = document.querySelector('#housing-guests');
  var filterWifiElement = document.querySelector('#filter-wifi');
  var filterDishwasherElement = document.querySelector('#filter-dishwasher');
  var filterParkingElement = document.querySelector('#filter-parking');
  var filterWasherElement = document.querySelector('#filter-washer');
  var filterElevatorElement = document.querySelector('#filter-elevator');
  var filterConditionerElement = document.querySelector('#filter-conditioner');
  var ads = [];

  var onFilterChange = window.util.debounce(function (filter) {
    filter.setAttribute('checked', 'checked');
    filteredPins();
  });

  var unchekedFilters = function () {
    mapCheckboxesElement.forEach(function (item) {
      item.removeAttribute('checked');
    });
  };

  var addFilterListener = function (filter) {
    filter.addEventListener('change', function () {
      onFilterChange(filter);
    });
  };

  var getAllFilters = function (filters) {
    filters.forEach(function (item) {
      addFilterListener(item);
    });
  };

  getAllFilters(mapFiltersElement);
  getAllFilters(mapCheckboxesElement);

  var getXhrArray = function (arr) {
    ads = arr;
    return ads;
  };

  var filteredPins = function () {
    window.card.close();
    window.pin.delPins();

    var filteredArr = ads;

    var filteredCheckbox = function (checkbox) {
      filteredArr = filteredArr.filter(function (item) {
        return checkbox.checked ? item.offer.features.includes(checkbox.value) : item;
      });
    };

    var filteredRadio = function (input, name) {
      filteredArr = filteredArr.filter(function (item) {
        return (input.value === 'any') ? item : input.value === String(item.offer[name]);
      });
    };

    filteredRadio(housingTypeElement, 'type');

    filteredArr = filteredArr.filter(function (item) {
      switch (housingPriceElement.value) {
        case 'low':
          return item.offer.price < '10000';
        case 'middle':
          return item.offer.price >= '10000' && item.offer.price <= '50000';
        case 'high':
          return item.offer.price > '50000';
        default:
          return item;
      }
    });

    filteredRadio(housingRoomsElement, 'rooms');
    filteredRadio(housingGuestsElement, 'guests');

    filteredCheckbox(filterWifiElement);
    filteredCheckbox(filterDishwasherElement);
    filteredCheckbox(filterParkingElement);
    filteredCheckbox(filterWasherElement);
    filteredCheckbox(filterElevatorElement);
    filteredCheckbox(filterConditionerElement);

    window.pin.render(filteredArr);
  };

  window.filter = {
    unchekedFilters: unchekedFilters,
    getXhrArray: getXhrArray,
  };
})();
