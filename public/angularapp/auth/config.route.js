(function() {
  'use strict';
  
  angular
    .module('app.auth')
    .config(configFunction);

  function configFunction($routeProvider) {
    $routeProvider
    .when('/register', {
      templateUrl: '/angularapp/auth/register.html',
      controller: 'AuthController',
      controllerAs: 'vm'
    })
    .when('/login', {
      templateUrl: '/angularapp/auth/login.html',
      controller: 'AuthController',
      controllerAs: 'vm'
    });
  }
})();