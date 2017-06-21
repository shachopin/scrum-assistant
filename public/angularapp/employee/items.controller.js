(function() {
  'use strict';

  angular
    .module('app.employeeitems')
    .controller('ItemsController', ItemsController);
  
  function ItemsController($firebaseArray, user) { 
    var vm = this; 
    
    vm.members = $firebaseArray(firebase.database().ref().child("staticUserList"));
    
    var ref = firebase.database().ref().child("staticUserList");
    ref.once("value")
      .then(function(snapshot) {
        var exist = snapshot.child(user.displayName).exists();
        if (!exist) {
          $firebaseArray(firebase.database().ref().child("staticUserList").child(user.displayName)).$add(1);
        }
    });
     
    grabDataByUserDisplayName(user.displayName);
    vm.handleOptionClick = handleOptionClick;
    vm.isScrumMaster = user.photoURL === "scrum master";
 
    //utility function ///////////////////////////////////////////////
    function handleOptionClick() {
      grabDataByUserDisplayName(vm.member ? vm.member : user.displayName); //if don't select anyone, then by default create task for yourslef
    }
    
    function grabDataByUserDisplayName(displayName) {
      vm.todos = $firebaseArray(firebase.database().ref().child("users").child(displayName).child('todo').child("items"));
      vm.doings = $firebaseArray(firebase.database().ref().child("users").child(displayName).child('doing').child("items"));
      vm.dones = $firebaseArray(firebase.database().ref().child("users").child(displayName).child('done').child("items"));
    }
  }
 })();