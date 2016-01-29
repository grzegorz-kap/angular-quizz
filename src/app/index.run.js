(function() {
  'use strict';
  angular.module('testApp').run(runBlock);

  /** @ngInject */
  function runBlock($rootScope, $log, PLAY_MODE, LEARN_MODE) {
    $rootScope.PLAY_MODE = PLAY_MODE;
    $rootScope.LEARN_MODE = LEARN_MODE;
    $log.debug('runBlock end');
  }
})();
