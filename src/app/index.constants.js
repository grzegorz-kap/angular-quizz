(function() {
  'use strict';
  angular
    .module('testApp')
    .constant("PLAY_MODE", 'play')
    .constant('LEARN_MODE', 'learn')
    .constant('MODALS', {
      END_TEST_MODAL: 'app/modals/testEnd/testEnd.html',
      END_LEARN_MODAL: 'app/modals/learnEnd/learnEnd.html'
    })
})();
