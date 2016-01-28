(function () {
  'use strict';

  angular.module('testApp').controller('ResultController', ResultController);

  /** @ngInject */
  function ResultController($stateParams, $location, gameService) {
    var vm = this;
    var data = gameService.readResult($stateParams.key);

    vm.questions = [];
    vm.score = 0;
    vm.total = 0;

    function init() {
      if (data) {
        vm.questions = data.questions;
        vm.score = gameService.computeResult(data.questions);
        vm.total = data.questions.length;
        vm.questions.forEach(function (q) {
          q.displayCorrect = true;
        });
      } else {
        $location.url('/');
      }
    }

    init();
    return vm;
  }
})();

