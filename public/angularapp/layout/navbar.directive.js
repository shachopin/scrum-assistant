(function() {
  'use strict';
  
  angular
    .module('app.layout')
    .directive('ddNavbar', ddNavbar);
  
  function ddNavbar() {
    return {
      templateUrl: '/angularapp/layout/navbar.html',
      restrict: 'E',
      scope: {},
      controller: NavbarController,
      controllerAs: "vm"
    };
  }
  
  function NavbarController($location, $firebaseAuth) {
    var vm = this;
    vm.username = null;
    vm.isLoggedIn = isLoggedIn;
    vm.notOnAppPage = notOnAppPage;
    vm.logout = logout;
    var firebaseAuthObject = $firebaseAuth();
    
    function logout() {
      //partyService.reset(); //to fix the permission error after enforced by adding security rules
      firebaseAuthObject.$signOut();
      $location.path("/");
    }
    
    function isLoggedIn() {
      if (firebaseAuthObject.$getAuth()) {
        vm.username = firebaseAuthObject.$getAuth().displayName;
        return true;
      }
      //return firebaseAuthObject.$getAuth(); //if loggedin will return user object, if not return null
    }
    
    function notOnAppPage() {
      return $location.path() !== "/employee";
    }
    
  }
})();