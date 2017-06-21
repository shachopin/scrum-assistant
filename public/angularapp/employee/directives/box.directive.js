(function() {
  'use strict'
 
  angular
   .module('app.employeeitems')
   .directive('ddBox', ddBox);

  function ddBox() {
    return {
      templateUrl: '/angularapp/employee/directives/box.html',
      restrict: 'E',
      controller: BoxController,
      controllerAs: 'vm',
      bindToController: true, //without this, you have to use a $scope service in order to use parties in controller
      //bindgToController ture will make the parties property directly in this controller as this
      //notice now the $scope.parties no longer work, also in directive, you cannot just directly use {{parties}}
      scope: {
        title: '@',
        items: '=',
        rightitems: '=',
        leftitems: '=',
        members: '=' //two-way binding between this directive controller and waitListController
      }
    };
  }
  
  function BoxController($firebaseArray) {
    var vm = this;
    vm.deleteItem = deleteItem;
    vm.moveRight = moveRight;
    vm.moveLeft = moveLeft;
    vm.assignTodo = assignTodo;
    
    function deleteItem(item) {
      vm.items.$remove(item); 
    }
    
    function moveRight(item) {
      deleteItem(item);
      vm.rightitems.$add(item);   
    }
    
    function moveLeft(item) {
      deleteItem(item);
      vm.leftitems.$add(item);        
    }
    
    function assignTodo(item, assignedToWhom) {
      //console.log("Assigned to " + assignedToWhom, item);
      vm.deleteItem(item);
      
      var targetTodos = $firebaseArray(firebase.database().ref().child("users").child(assignedToWhom).child('todo').child("items"));
      targetTodos.$add(item);
    }
  }
 })();