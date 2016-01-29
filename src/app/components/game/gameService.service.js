(function () {
  'use strict';
  angular.module('testApp').factory('gameService', gameService);

  /** @ngInject */
  function gameService($log, $http, utilsService, LEARN_MODE) {
    var storedResults = {};

    return {
      getQuestions: getQuestions,
      computeResult: computeResult,
      isCorrect: isCorrect,
      storeResult: storeResult,
      readResult: readResult,
      countAnswered: countAnswered
    };

    function getQuestions(mode, limit, playMode) {
      return $http.get('assets/questions/:mode.json'.replace(':mode', mode))
        .then(success)
        .catch(failed);

      function success(response) {
        utilsService.shuffle(response.data.questions);
        if (playMode != LEARN_MODE) {
          response.data.questions = response.data.questions.slice(0, limit);
        }
        return response.data;
      }

      function failed(error) {
        $log.error('Failed to download questions from server.\n' + angular.toJson(error.data, true));
      }
    }

    function countAnswered(questions) {
      var count = 0;
      questions.forEach(function (q) {
        for (var i = 0; i < q.answers.length; i++) {
          if (q.answers[i].selected) {
            count += 1;
            break;
          }
        }
      });
      return count;
    }

    function storeResult(data) {
      var key = new Date().getTime().toString();
      storedResults[key] = data;
      return key;
    }

    function readResult(key) {
      return storedResults[key];
    }

    function computeResult(questions) {
      var points = 0;
      questions.forEach(function (question) {
        points += isCorrect(question) ? 1 : 0;
      });
      return points;
    }

    function isCorrect(question) {
      var correct = true;
      question.answers.forEach(function (answer) {
        correct = correct && answer.selected == answer.correct;
      });
      return correct;
    }
  }
})();
