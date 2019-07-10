'use strict';

// Модуль util.js
(function () {
  window.util = {
    getRandom: function (array) {
      var index = Math.floor(Math.random() * array.length);

      return array[index];
    }
  };
})();
