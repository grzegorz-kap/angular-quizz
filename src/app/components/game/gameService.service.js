(function () {
  'use strict';
  angular.module('testApp').factory('gameService', gameService);

  /** @ngInject */
  function gameService($log, $http, utilsService) {

    return {
      getQuestions: getQuestions
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

    function shuffleAndLimit(data, limit) {
      utilsService.shuffle(data.questions);
      data.questions = data.questions.slice(0, limit);
    }
  }
})();
