(function () {
  'use strict';

  angular.module('testApp').directive('question', question);

  /** @ngInject */
  function question() {
    return {
      restrict: 'E',
      templateUrl: 'app/shared/question/question.html',
      scope: {
        question: '=',
        selectCallback: '='
      },
      controller: QuestionController,
      controllerAs: 'vm',
      bindToController: true
    };

    /** @ngInject */
    function QuestionController() {
      var vm = this;
      vm.clicked = function (answer) {
        if (vm.selectCallback) {
          vm.selectCallback(answer);
        }
      };
      vm.showMistake = function (a) {
        return vm.question.displayCorrect && a.correct && !a.selected;
      };
      vm.showCorrect = function (a) {
        return vm.question.displayCorrect && a.correct && a.selected;
      };
      return vm;
    }
  }
})();
