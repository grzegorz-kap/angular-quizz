(function () {
  'use strict';

  angular.module('testApp').config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/components/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('game', {
        url: '/game/:mode',
        templateUrl: 'app/components/game/game.html',
        controller: 'GameController',
        controllerAs: 'game'
      });
    $urlRouterProvider.otherwise('/');
  }
})();
