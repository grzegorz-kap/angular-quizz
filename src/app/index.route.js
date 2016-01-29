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
        url: '/game/:mode/:questionMode',
        templateUrl: 'app/components/game/game.html',
        controller: 'GameController',
        controllerAs: 'game'
      })
      .state('result', {
        url: '/result/:key',
        templateUrl: 'app/components/result/result.html',
        controller: 'ResultController',
        controllerAs: 'vm'
      });
    $urlRouterProvider.otherwise('/');
  }
})();
