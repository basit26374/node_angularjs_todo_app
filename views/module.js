angular.module('app', ['ngRoute', 'ngResource'])

//---------------
// Services
//---------------

.factory('Todos', ['$resource', function($resource){
  return $resource('/todos/:id', null, {
    'update': { method:'PUT' }
  });
}])

.controller('TodoController', ['$scope','Todos', function ($scope, Todos) {

  $scope.todos = Todos.query();
  $scope.editing = []

  $scope.save = function() {

    if(!$scope.newTodo || $scope.newTodo.length < 1) return;
    var todo = new Todos({ name: $scope.newTodo, completed: false });
    
    todo.$save(function(){
      $scope.todos.push(todo)
      $scope.newTodo = ""       // clear textbox
    })
  }

  $scope.remove = function(index) {
    var todo = $scope.todos[index];
    Todos.remove({id: todo._id}, function() {
      $scope.todos.splice(index, 1);
    });
  }

  $scope.edit = function(index) {
    $scope.editing[index] = angular.copy($scope.todos[index]);
  }

  $scope.cancel = function(index) {
    $scope.todos[index] = angular.copy($scope.editing[index]); // Put previous data into todos
    $scope.editing[index] = false;
  }
}])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/todos.html',
        controller: 'TodoController'
      })

    //   .when('/:id', {
    //     templateUrl: '/todoDetails.html',
    //     controller: 'TodoDetailCtrl'
    //  });
  }]);