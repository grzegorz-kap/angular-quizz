(function () {
  'use strict';

  angular.module('testApp').controller('TestEndModalController', TestEndModalController);

  /** @ngInject */
  function TestEndModalController($modalInstance, test, gameService) {
    var vm = this;
    vm.answeredCount = gameService.countAnswered(test.questions);
    vm.questionsCount = test.questions.length;
    vm.missingCount = vm.questionsCount - vm.answeredCount;
    vm.time = test.time;

     vm.ok = function() {
      $modalInstance.close({});
    };

    vm.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    vm.questionWordPlural = function(number) {
      if (number == 1) {
        return 'pytanie';
      } else if (number >= 2 && number <= 4) {
        return 'pytania';
      } else {
        return 'pytań'
      }
    };

    return vm;
  }
})();

