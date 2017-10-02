(function() {
  'use strict'
 
  angular
   .module('app.employeeitems')
   .directive('ddForm', ddForm);

  function ddForm() {
    return {
      templateUrl: 'employee/directives/form.html',
      restrict: 'E',
      controller: FormController,
      controllerAs: 'vm',
      bindToController: true, //without this, you have to use a $scope service in order to use parties in controller
      //bindgToController ture will make the parties property directly in this controller as this
      //notice now the $scope.parties no longer work, also in directive, you cannot just directly use {{parties}}
      scope:{
        member: '=',
        items: "="
      }
    };
  }
  
  function FormController() {
    var vm = this;
    vm.showForm = false;
    vm.addTodo = addTodo;
    vm.toggleForm = toggleForm;
    
    function addTodo() {
      var newTodo = {
        priority: vm.todo.priority,
        title: vm.todo.title
      };
      vm.items.$add(newTodo);
      vm.todo = {};
    }
    
    function toggleForm() {
      if (vm.showForm) {
        vm.showForm = false;
      } else {
        vm.showForm = true;
      }
    }
  }
 })();