angular.module('Curve')
	.factory('Settings', function SettingsFactory(Session, User, Client){
		return{
			getDistributionChannels: function(settings, callback){
				settings = {};
				settings.distributionChannels = [];
				if(Session.id && Session.userType == 'client'){
					User.get(Session.id, function(response) {
						if(response.status == 200) {
							settings.user = response.data;
							if (settings.user.clientId){
								Client.get(settings.user.clientId, function(response) {
									if(response.status == 200) {
										settings.distributionChannels = response.data.distributionChannels;
									} else {
										Notification.error('Error loading client, please try again or contact support');
									}
								});					
							}
						} else {
							Notification.error('Error loading user, please try again or contact support');
						}
					});			
				}
			},
			getConfigurations: function(settings, callback){
				settings.configurations = [];

			},
			getPriceCategories: function(settings, callback){
				settings.priceCategories = [];

			}
		}
	});