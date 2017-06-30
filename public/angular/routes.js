angular.module('Curve')
	.config(function($routeProvider){
		$routeProvider.when('/', {
			templateUrl: '/angular/templates/home/index.html',
			//controller: 'homeController',
			//controllerAs: 'homeCtrl'
		})
		.when('/clients', {
			templateUrl: '/angular/templates/clients/index.html',
			controller: 'clientsController',
			controllerAs: 'clientsCtrl'
		})
		.when('/clients/:id/edit', {
			templateUrl: '/angular/templates/clients/edit.html',
			controller: 'clientEditController',
			controllerAs: 'clientEditCtrl'
		})
		.when('/clients/new', {
			templateUrl: '/angular/templates/clients/edit.html',
			controller: 'clientEditController',
			controllerAs: 'clientEditCtrl'
		})
		.when('/campaigns', {
			templateUrl: '/angular/templates/campaigns/index.html',
			controller: 'campaignsController',
			controllerAs: 'campaignsCtrl'
		})
		.when('/campaigns/:id/edit', {
			templateUrl: '/angular/templates/campaigns/edit.html',
			controller: 'campaignEditController',
			controllerAs: 'campaignCtrl'
		})
		.when('/campaigns/new', {
			templateUrl: '/angular/templates/campaigns/edit.html',
			controller: 'campaignEditController',
			controllerAs: 'campaignCtrl'
		})
		.when('/releases', {
			templateUrl: '/angular/templates/releases/index.html',
			controller: 'releasesController',
			controllerAs: 'releasesCtrl'
		})
		.when('/releases/:id/edit', {
			templateUrl: '/angular/templates/releases/edit.html',
			controller: 'releaseEditController',
			controllerAs: 'releaseCtrl'
		})
		.when('/releases/new', {
			templateUrl: '/angular/templates/releases/edit.html',
			controller: 'releaseEditController',
			controllerAs: 'releaseCtrl'
		})
		.when('/tracks', {
			templateUrl: '/angular/templates/tracks/index.html',
			controller: 'tracksController',
			controllerAs: 'tracksCtrl'
		})
		.when('/tracks/:id/edit', {
			templateUrl: '/angular/templates/tracks/edit.html',
			controller: 'trackEditController',
			controllerAs: 'trackCtrl'
		})
		.when('/tracks/new', {
			templateUrl: '/angular/templates/tracks/edit.html',
			controller: 'trackEditController',
			controllerAs: 'trackCtrl'
		})
		.when('/works', {
			templateUrl: '/angular/templates/works/index.html',
			controller: 'worksController',
			controllerAs: 'worksCtrl'
		})
		.when('/works/:id/edit', {
			templateUrl: '/angular/templates/works/edit.html',
			controller: 'workEditController',
			controllerAs: 'workCtrl'
		})
		.when('/works/new', {
			templateUrl: '/angular/templates/works/edit.html',
			controller: 'workEditController',
			controllerAs: 'workCtrl'
		})
		.when('/payees', {
			templateUrl: '/angular/templates/payees/index.html',
			controller: 'payeesController',
			controllerAs: 'payeesCtrl'
		})
		.when('/payees/:id/edit', {
			templateUrl: '/angular/templates/payees/edit.html',
			controller: 'payeeEditController',
			controllerAs: 'payeeCtrl'
		})
		.when('/payees/new', {
			templateUrl: '/angular/templates/payees/edit.html',
			controller: 'payeeEditController',
			controllerAs: 'payeeCtrl'
		})
		.when('/contracts', {
			templateUrl: '/angular/templates/contracts/index.html',
			controller: 'contractsController',
			controllerAs: 'contractsCtrl'
		})
		.when('/contracts/:id/edit', {
			templateUrl: '/angular/templates/contracts/edit.html',
			controller: 'contractEditController',
			controllerAs: 'contractCtrl'
		})
		.when('/contracts/new', {
			templateUrl: '/angular/templates/contracts/edit.html',
			controller: 'contractEditController',
			controllerAs: 'contractCtrl'
		})
		.when('/costs', {
			templateUrl: '/angular/templates/costs/index.html',
			controller: 'costsController',
			controllerAs: 'costsCtrl'
		})
		.when('/costs/:id/edit', {
			templateUrl: '/angular/templates/costs/edit.html',
			controller: 'costEditController',
			controllerAs: 'costCtrl'
		})
		.when('/costs/new', {
			templateUrl: '/angular/templates/costs/edit.html',
			controller: 'costEditController',
			controllerAs: 'costCtrl'
		})
		.when('/mechanicals', {
			templateUrl: '/angular/templates/mechanicals/index.html'
		})
		.when('/mechanical/:id/edit', {
			templateUrl: '/angular/templates/mechanicals/edit.html'
		})
		.when('/sales', {
			templateUrl: '/angular/templates/sales-files/index.html',
			controller: 'salesFileController',
			controllerAs: 'salesFileCtrl'
		}) 
		.when('/sales/:id/edit', {
			templateUrl: '/angular/templates/sales-files/sales-import.html',
			controller: 'salesImportController',
			controllerAs: 'salesImportCtrl'
		})
		.when('/sales/import', {
			templateUrl: '/angular/templates/sales-files/sales-import.html',
			controller: 'salesImportController',
			controllerAs: 'salesImportCtrl'
		})
		.when('/sales/:id/ingest', {
			templateUrl: '/angular/templates/sales-files/sales-ingest.html',
			controller: 'salesIngestController',
			controllerAs: 'salesIngestCtrl'
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
		.when('/settings', {
			templateUrl: '/angular/templates/settings/index.html',
			controller: 'settingsController',
			controllerAs: 'settingsCtrl'
		})
		.when('/templates', {
			templateUrl: '/angular/templates/sales-templates/index.html',
			controller: 'salesTemplatesController',
			controllerAs: 'salesTemplatesCtrl'
		})
		.when('/templates/:id/edit', {
			templateUrl: '/angular/templates/sales-templates/edit.html',
			controller: 'salesTemplateEditController',
			controllerAs: 'salesTemplateCtrl'
		})
		.when('/templates/new', {
			templateUrl: '/angular/templates/sales-templates/edit.html',
			controller: 'salesTemplateEditController',
			controllerAs: 'salesTemplateCtrl'
		})
		.when('/unmapped', {
			templateUrl: '/angular/templates/sales-files/sales-unmapped.html',
			controller: 'salesUnmappedController',
			controllerAs: 'salesUnmappedCtrl'
		})
		.otherwise({ redirectTo: '/' })
	});