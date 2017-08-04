angular.module('Curve')
	.factory('Settings', function SettingsFactory(Session, User, Client, $q, Notification, Contract, Payee, Release, Track, Work, SalesTemplate, SalesFile, Cost, Statement){
		return{
			getSettings: function(settings){
				settings = {};
				settings.distributionChannels = [];
				settings.configurations = [];
				settings.priceCategories = [];
				settings.costTypes = [];			
				if(Session.id && Session.userType == 'client'){
					return $q(function(resolve, reject) {
						User.get(Session.id, function(response) {
							if(response.status == 200) {
								settings.user = response.data;
								if (settings.user.clientId){
									Client.get(settings.user.clientId, function(response) {
										if(response.status == 200) {
											settings.distributionChannels = response.data.distributionChannels;
											settings.configurations = response.data.configurations;
											settings.priceCategories = response.data.priceCategories;
											settings.costTypes = response.data.costTypes;
											resolve(settings);
										} else {
											Notification.error('Error loading client, please try again or contact support');
											reject('Error loading client, please try again or contact support');
										}
									});					
								}
							} else {
								Notification.error('Error loading user, please try again or contact support');
								reject('Error loading client, please try again or contact support');
							}
						});			
					});
				}
			},
			getContracts: function(contracts){
				contracts = [];
				return $q(function(resolve, reject) {
					Contract.all(contracts, function(response) {
						if(response.status == 200) {
							contracts = response.data;
							resolve(contracts);
						} else {
							Notification.error(response.data.message);
						}
					});	
				});		
			},
			getPayees: function(payees){
				payees = [];
				return $q(function(resolve, reject) {
					Payee.all(payees, function(response) {
						if(response.status == 200) {
							payees = response.data.payees;
							resolve(payees);
						} else {
							Notification.error(response.data.message);
						}
					});	
				});		
			},
			getReleases: function(releases){
				releases = [];
				return $q(function(resolve, reject) {
					Release.all(releases, function(response) {
						if(response.status == 200) {
							releases = response.data;
							resolve(releases);
						} else {
							Notification.error(response.data.message);
						}
					});	
				});		
			},
			getTracks: function(tracks){
				tracks = [];
				return $q(function(resolve, reject) {
					Track.all(tracks, function(response) {
						if(response.status == 200) {
							tracks = response.data;
							resolve(tracks);
						} else {
							Notification.error(response.data.message);
						}
					});	
				});		
			},
			getWorks: function(works){
				works = [];
				return $q(function(resolve, reject) {
					Work.all(works, function(response) {
						if(response.status == 200) {
							works = response.data;
							resolve(works);
						} else {
							Notification.error(response.data.message);
						}
					});	
				});		
			},
			getTemplates: function(templates){
				templates = [];
				return $q(function(resolve, reject) {
					SalesTemplate.all(templates, function(response) {
						if(response.status == 200) {
							templates = response.data.salesTemplates;
							resolve(templates);
						} else {
							Notification.error(response.data.message);
						}
					});	
				});	
			},
			getSalesFiles: function(salesFiles){
				salesFiles = [];
				return $q(function(resolve, reject) {
					SalesFile.all(salesFiles, function(response) {
						if(response.status == 200) {
							salesFiles = response.data.salesFiles;
							resolve(salesFiles);
						} else {
							Notification.error(response.data.message);
						}
					});	
				});	
			},
			getCosts: function(costs){
				costs = [];
				return $q(function(resolve, reject) {
					Cost.all(costs, function(response) {
						if(response.status == 200) {
							costs = response.data.costs;
							resolve(costs);
						} else {
							Notification.error(response.data.message);
						}
					});	
				});	
			},
			getStatements: function(statements){
				statements = [];
				return $q(function(resolve, reject) {
					Statement.all(statements, function(response) {
						if(response.status == 200) {
							statements = response.data.statements;
							resolve(statements);
						} else {
							Notification.error(response.data.message);
						}
					});	
				});	
			}
		}
	}); 