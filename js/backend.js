'use strict';

(function () {
  var SUCCESS_STATUS = 200;
  var ONE_SECOND = 1000;
  var TEN_SECONDS = 10000;
  var MESSAGE_GET = 'Ошибка получения данных!';

  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', 'https://js.dump.academy/keksobooking/data');

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onLoad(xhr.response);
      } else {
        onError(MESSAGE_GET + ' Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError(MESSAGE_GET + ' Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError(MESSAGE_GET + ' Запрос не успел выполниться за: ' + (xhr.timeout / ONE_SECOND) + ' сек.');
    });

    xhr.timeout = TEN_SECONDS;

    xhr.send();
  };
})();
