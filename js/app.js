var todoApp = angular.module('todoApp', []);

todoApp
	.config(function($interpolateProvider){
	    $interpolateProvider.startSymbol('<%').endSymbol('%>');
	})
	.controller('todosController', function($scope, $scope){
		window.scope = $scope;
		if(angular.isDefined(localStorage.todos)) {
			$scope.todos = angular.fromJson(localStorage.getItem('todos'));
		} else {
			$scope.todos = [];
			localStorage.setItem('todos', angular.toJson($scope.todos));
		}

		$scope.finishedTodos = function(){
			var doneTodos = [];
			angular.forEach($scope.todos, function(todo, key){
				if(todo.done === true) doneTodos.push(todo);						
			});
			return doneTodos;
		}

		$scope.reset = function(){
			$scope.name = '';
			$scope.description = '';
			$scope.todoForm.$setPristine();			
		}

		$scope.filteredTodos = $scope.todos;
		$scope.searchText = '';
		$scope.name = '';
		$scope.description = '';
		$scope.showAddForm = false;
		$scope.tasks = {
			0     : ' tasks',
			one   : ' task',
			other : ' tasks'
		}

		$scope.addForm = function(){
			$scope.showAddForm = true;
			$scope.$broadcast('add', null);	
		}

		$scope.hideForm = function(){
			$scope.showAddForm = false;
			$scope.reset();
		}

		$scope.delete = function(todo){
			var index = $scope.todos.indexOf(todo);
			$scope.showAddForm = false;
			$scope.todos.splice(index, 1);
			localStorage.setItem('todos', angular.toJson($scope.todos));			
			$scope.reset();
		}

		$scope.edit = function(todo){
			var index = $scope.todos.indexOf(todo);
			$scope.showAddForm = true;
			$scope.name = $scope.todos[index].name;
			$scope.description = $scope.todos[index].description;			
			$scope.$broadcast('edit', index);
		}					

		$scope.check = function(todo){
			var index = $scope.todos.indexOf(todo);
			$scope.todos[index].done = $scope.todos[index].done == true ? false : true;
			localStorage.setItem('todos', angular.toJson($scope.todos));
		}

		$scope.$on('edit', function(event, args){
			var index = args;
			$scope.submit = function(){
				if($scope.todoForm.$valid)
				{
					$scope.todos[index] = {
						name        : $scope.name,
						description : $scope.description,
						date        : (new Date()).getTime(),
						done        : $scope.todos[index].done
					};

					localStorage.setItem('todos', angular.toJson($scope.todos));

					$scope.showAddForm = false;
					$scope.reset();					
				}
				else
				{
					$scope.todoForm.$setDirty();
				}				
			}
		});

		$scope.$on('add', function(event, args){
			$scope.submit = function(){
				if($scope.todoForm.$valid)
				{
					newTodo = {
						name        : $scope.name,
						description : $scope.description,
						date        : (new Date()).getTime(),
						done        : false
					};
					$scope.todos.push(newTodo);

					localStorage.setItem('todos', angular.toJson($scope.todos));

					$scope.showAddForm = false;
					$scope.reset();					
				}
				else
				{
					$scope.todoForm.$setDirty();
				}				
			}
		});
	})
	.filter('doneTodos', function() {
		return function(input, attr){
			var dTodos = [];
			angular.forEach(input, function(value, key){
				if(value.done === true) dTodos.push(value);						
			});
			return attr === 'len' ? dTodos.length : dTodos;			
		}
	})
	.directive('sortArrow', function() {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				element.on('click', function(event){
					if(element.hasClass('sortUp')) {
						angular.element('th').removeClass('sortUp sortDown');
						element.addClass('sortDown');
					} else if(element.hasClass('sortDown')) {
						angular.element('th').removeClass('sortUp sortDown');
						element.addClass('sortUp');
					} else {
						angular.element('th').removeClass('sortUp sortDown');
						element.addClass('sortDown');
					}
				})				
			}
		}
	});