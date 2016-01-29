(function () {
  'use strict';

  angular.module('testApp').controller('GameController', GameController);

  /** @ngInject */
  function GameController(gameService, PLAY_MODE, LEARN_MODE, MODALS, $stateParams, $location, $timeout, $modal) {
    var game = {};
    game.mode = $stateParams.mode;
    game.currentIndex = 0;
    game.current = undefined;
    game.timer = 0;

    var questions = [];
    var automaticEndRejected = false;

    game.done = function () {
      var data = {
        questions: questions,
        mode: game.mode,
        time: angular.element("#test-timer").text()
      };

      $modal.open({
        templateUrl: MODALS.END_TEST_MODAL,
        controller: 'TestEndModalController',
        controllerAs: 'vm',
        size: 'md',
        resolve: {
          test: function () {
            return data;
          }
        }
      }).result.then(function () {
        var key = gameService.storeResult({
          questions: questions,
          mode: game.mode,
          time: angular.element("#test-timer").text()
        });
        $location.url('/result/:key'.replace(':key', key));
      });
    };

    game.load = function (index) {
      if (index < questions.length) {
        game.currentIndex = index;
        game.current = questions[index];
      }
    };

    game.isFirst = function () {
      return game.currentIndex == 0;
    };

    game.isLast = function () {
      return game.currentIndex >= questions.length - 1;
    };

    game.move = function (val) {
      var newIndex = game.currentIndex + val;
      if (newIndex >= 0 && newIndex < questions.length) {
        game.currentIndex = newIndex;
        game.current = questions[game.currentIndex];
      }
    };

    function automaticMove(){
          if (PLAY_MODE == game.mode || gameService.isCorrect(game.current)) {
            $timeout(function () {
              automaticEnd();
              game.move(1);
                  }, 400);
              }
          }

    game.answered = function (answer) {
      game.current.answers.forEach(function (element) {
        element.selected = element.id == answer.id;
      });
      game.current.displayCorrect = LEARN_MODE == game.mode;
      automaticMove();
    };

    game.questionsLength = function () {
      return questions.length;
    };

    function loadQuestions() {
      var that = game;
      gameService.getQuestions('definitions', 20, game.mode).then(function (t) {
        questions = t.questions;
        that.load(0);
      });
    }

    function automaticEnd() {
      if(game.mode == PLAY_MODE && !automaticEndRejected && game.isLast()) {
        game.done();
        automaticEndRejected = true;
      }
    }

    loadQuestions();
    return game;
  }
})();

