'use strict';

(function () {
  var SUCCESS_STATUS = 200;
  var ONE_SECOND = 1000;
  var TEN_SECONDS = 10000;

  window.ajax = function (method, url, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open(method, url);

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Произошла ошибка! Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за: ' + (xhr.timeout / ONE_SECOND) + ' сек.');
    });

    xhr.timeout = TEN_SECONDS;

    xhr.send(data);
  };
})();
