angular.module('Curve')
	.config(function($routeProvider){
		$routeProvider.when('/', {
			templateUrl: '/angular/templates/home/index.html'
			//controller: 'homeController',
			//controllerAs: 'homeCtrl'
		})
		.when('/clients', {
			templateUrl: '/angular/templates/clients/index.html'
		})
		.when('/clients/:id/edit', {
			templateUrl: '/angular/templates/clients/edit.html'
		})
		.when('/payees', {
			templateUrl: '/angular/templates/payees/index.html'
		})
		.when('/payees/:id/edit', {
			templateUrl: '/angular/templates/payees/edit.html'
		})
		.when('/contracts', {
			templateUrl: '/angular/templates/contracts/index.html'
		})
		.when('/contracts/:id/edit', {
			templateUrl: '/angular/templates/contracts/edit.html'
		})
		.when('/campaigns', {
			templateUrl: '/angular/templates/campaigns/index.html'
		})
		.when('/campaigns/:id/edit', {
			templateUrl: '/angular/templates/campaigns/edit.html'
		})
		.when('/releases', {
			templateUrl: '/angular/templates/releases/index.html'
		})
		.when('/releases/:id/edit', {
			templateUrl: '/angular/templates/releases/edit.html'
		})
		.when('/tracks', {
			templateUrl: '/angular/templates/tracks/index.html'
		})
		.when('/tracks/:id/edit', {
			templateUrl: '/angular/templates/tracks/edit.html'
		})
		.when('/works', {
			templateUrl: '/angular/templates/works/index.html'
		})
		.when('/works/:id/edit', {
			templateUrl: '/angular/templates/works/edit.html'
		})
		.when('/mechanicals', {
			templateUrl: '/angular/templates/mechanicals/index.html'
		})
		.when('/mechanical/:id/edit', {
			templateUrl: '/angular/templates/mechanicals/edit.html'
		})
		.when('/sales', {
			templateUrl: '/angular/templates/sales/index.html'
		})
		.when('/sales/:id/edit', {
			templateUrl: '/angular/templates/sales/edit.html'
		})
		.when('/costs', {
			templateUrl: '/angular/templates/costs/index.html'
		})
		.when('/costs/:id/edit', {
			templateUrl: '/angular/templates/costs/edit.html'
		})
		.when('/periods', {
			templateUrl: '/angular/templates/periods/index.html'
		})
		.when('/periods/:id/edit', {
			templateUrl: '/angular/templates/periods/edit.html'
		})
		.when('/statements', {
			templateUrl: '/angular/templates/statements/index.html'
		})
		.when('/statements/:id/edit', {
			templateUrl: '/angular/templates/statements/edit.html'
		})
		.when('/reports', {
			templateUrl: '/angular/templates/reports/index.html'
		})
		.when('/reports/:id/edit', {
			templateUrl: '/angular/templates/reports/edit.html'
		})
		.otherwise({ redirectTo: '/' })
	});