(function() {
	'use strict';
	
	angular
		.module('app', ['ngRoute', 'ui.bootstrap'])
		.config(config);
	
		config.$inject = ['$routeProvider'];
		
		function config($routeProvider) {
			$routeProvider
		        .when('/', {
		            templateUrl: 'view/dash.html',
		            controller: 'DashCtrl',
		            controllerAs: 'dash'
		        })
		        .when('/add', {
		            templateUrl: 'view/add.html',
		            controller: 'AddCtrl',
		            controllerAs: 'add'
		        })
		        .when('/edit/:qtdID', {
	                templateUrl: 'view/edit.html',
	                controller: 'EditCtrl',
	                controllerAs: 'edit'
	            })
	            .when('/graphic', {
	                templateUrl: 'view/graphic.html',
	                controller: 'GraphicCtrl',
	                controllerAs: 'graphic'
	            })
		        .otherwise({
			        redirectTo: '/'
			    });
		}

}());