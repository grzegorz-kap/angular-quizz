(function () {
  'use strict';
  angular.module('testApp').factory('utilsService', utilsService);

  /** @ngInject */
  function utilsService() {
    return {
      shuffle: shuffle
    };

    function shuffle(array) {
      for (var i = array.length - 1; i > 0; i -= 1) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    }

  }
})();
