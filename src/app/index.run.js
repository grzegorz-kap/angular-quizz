(function() {
  'use strict';
  angular.module('testApp').run(runBlock);

  /** @ngInject */
  function runBlock($log) {
    $log.debug('runBlock end');
  }

})();
