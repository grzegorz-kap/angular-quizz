(function () {
  'use strict';
  angular.module('testApp').controller('LearnEndModalController', LearnEndModalController);

  /** @ngInject */
  function LearnEndModalController($modalInstance, $location) {
    var vm = this;
    vm.ok = function() {
      $location.url('/');
      $modalInstance.close({});
    };

    vm.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
    return vm;
  }
})();
