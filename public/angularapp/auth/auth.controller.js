(function(){
  'use strict';

  angular
    .module('app.auth')  
    .controller('AuthController', AuthController);
  function AuthController($location, $firebaseAuth) {
    var vm = this;
    var firebaseAuthObject = $firebaseAuth();
    vm.user = {
      email: "",
      password: ""
    }
    vm.register = register;
    vm.login = login;
    vm.error = null;
    
    
    function register(user) {
      /*return*/ // no need to rturn as in the original code
      firebaseAuthObject.$createUserWithEmailAndPassword(user.email, user.password)
       .then(function(newUser) {
       newUser.updateProfile({
          displayName: user.name,
          photoURL: user.isscrummaster ? "scrum master" : "" //because firebaseAuthObject doesn't support custom attribute, I am hijacking photoURL to mean title
       }); //photoURL and displayName are supported natively by firebaseauthObject already

        //console.log(user); //user email has to be unique
        return vm.login(user);  //it's funny, sending email to shachopin+newaccount@gmail.com works and sends it to shachopin@gmail.com, actually shachopin+anything@gmail.com works
      }) //will now automatically log in
       .then(function() {
        //return authService.sendWelcomeEmail(user.email);
      })
       .catch(function(error) {
        console.log(error); //if you register an existing user, you will get error
        vm.error = error;
      });
    }
    
    function login(user) {
      /*return*/ // no need to rturn as in the original code
      firebaseAuthObject.$signInWithEmailAndPassword(user.email, user.password)
      .then(function(loggedInUser) {
        //console.log(loggedInUser);
        $location.path('/employee');
      })
      .catch(function(error) {
        console.log(error);     
        vm.error = error;
      });
    }
  }

})();
