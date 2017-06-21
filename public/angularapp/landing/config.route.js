(function() {
  'use strict';
  
  angular
    .module('app.landing')
    .config(configFunction);

  //configFunction.$inject = ['$routeProvider']; //from angulr-route.js  // this line not necessary

  function configFunction($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/angularapp/landing/landing.html'
    });
  }
})();