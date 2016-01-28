(function () {
  'use strict';
  angular.module('testApp').factory('gameService', gameService);

  /** @ngInject */
  function gameService($log, $http, utilsService) {

    return {
      getQuestions: getQuestions,
      computeResult: computeResult,
      isCorrect: isCorrect
    };

    function getQuestions(mode, limit) {
      return $http.get('assets/questions/:mode.json'.replace(':mode', mode))
        .then(success)
        .catch(failed);

      function success(response) {
        shuffleAndLimit(response.data, limit);
        return response.data;
      }

      function failed(error) {
        $log.error('Failed to download questions from server.\n' + angular.toJson(error.data, true));
      }
    }

    function computeResult(questions) {
      var points = 0;
      questions.forEach(function(question) {
        points += isCorrect(question) ? 1 : 0;
      });
      return points;
    }

    function isCorrect(question) {
      var correct = true;
      question.answers.forEach( function(answer) {
        correct = correct && answer.selected == answer.correct;
      });
      return correct;
    }

    function shuffleAndLimit(data, limit) {
      utilsService.shuffle(data.questions);
      data.questions = data.questions.slice(0, limit);
    }
  }
})();
