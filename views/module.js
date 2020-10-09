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

  $scope.save = function() {

    console.log($scope.newTodo)
    if(!$scope.newTodo || $scope.newTodo.length < 1) return;
    var todo = new Todos({ name: $scope.newTodo, completed: false });
    
    todo.$save(function(){
      $scope.todos.push(todo)
      $scope.newTodo = ""       // clear textbox
    })
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