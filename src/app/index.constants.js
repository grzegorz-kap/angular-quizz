/* global malarkey:false, moment:false */
(function() {
  'use strict';
  angular
    .module('testApp')
    .constant("PLAY_MODE", 'play')
    .constant('LEARN_MODE', 'learn')
    .constant('MODALS', {
      END_TEST_MODAL: 'app/modals/testEnd/testEnd.html'
    })

})();
