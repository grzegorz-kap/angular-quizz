(function () {
  'use strict';

  angular.module('testApp').controller('GameController', GameController);

  /** @ngInject */
  function GameController($scope, $log, $stateParams, gameService) {
    $scope.mode = $stateParams.mode;
    $scope.currentIndex = 0;
    $scope.current = undefined;

    var questions = [];

    $scope.load = function(index) {
      if(index < questions.length) {
        $scope.currentIndex = index;
        $scope.current = questions[index];
      }
    };

    $scope.questionsLength = function() {
      return questions.length;
    };

    function loadQuestions() {
      gameService.getQuestions('definitions', 20).then(function (t) {
        questions = t.questions;
        $scope.load(0);
      });
    }

    loadQuestions();
  }
})();

