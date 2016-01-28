(function () {
  'use strict';

  angular.module('testApp').controller('GameController', GameController);

  /** @ngInject */
  function GameController($stateParams, gameService, PLAY_MODE, $location) {
    var game = {};
    game.mode = $stateParams.mode;
    game.currentIndex = 0;
    game.current = undefined;
    game.complated = false;
    game.timer = 0;

    var answered = [];
    var questions = [];

    game.done = function () {
      var confirmed = confirm("Zakończyć test?");
      if(confirmed) {
        var key = gameService.storeResult({questions: questions, mode: game.mode});
        $location.url('/result/:key'.replace(':key', key));
      }
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
      if (game.currentIndex + val >= 0 && game.currentIndex + val < questions.length) {
        game.currentIndex += val;
      }
      game.current = questions[game.currentIndex];
    };

    game.answered = function (answer) {
      game.current.answers.forEach(function (element) {
        element.selected = element.id == answer.id;
      });
      checkIfCompleted();
      if (PLAY_MODE == game.mode || gameService.isCorrect(game.current)) {
        game.move(1);
      } else {
        game.current.displayCorrect = true;
      }
    };

    game.questionsLength = function () {
      return questions.length;
    };

    game.isAnswerCorrect = function (a) {
      return game.current.displayCorrect && a.selected == a.correct;
    };

    function loadQuestions() {
      var that = game;
      gameService.getQuestions('definitions', 20).then(function (t) {
        questions = t.questions;
        that.load(0);
      });
    }

    function checkIfCompleted() {
      if ($.inArray(game.current.id, answered) == -1) {
        answered.push(game.current.id);
      }
      game.complated = answered.length == questions.length;
    }

    loadQuestions();

    return game;
  }
})();

