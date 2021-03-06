(function() {
  'use strict';

  angular
    .module('app', [
//       // Angular modules.
       'ngRoute',

//       // Third party modules.
       'firebase',

//       //Cutom module
        'app.employeeitems',
        'app.auth',
//       'app.core',
        'app.landing',
        'app.layout',
//       'app.waitList'
    ])
    .config(configFunction)
    .run(runFunction); //run is for running any code;
  
  
   function configFunction($routeProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });
   }
  
   function runFunction($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
      if (error === "AUTH_REQUIRED") {
        $location.path("/");
      }    
   });
  }
  
  
  
 })();