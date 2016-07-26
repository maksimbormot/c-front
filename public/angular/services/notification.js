angular.module('Curve')
	.factory('Notification', function NotificationFactory() {
		return {
			success: function(message) {
				$('body').pgNotification({
		      style: 'bar',
		      message: message,
		      position: 'top',
		      timeout: 2500,
		      type: 'success'
		    }).show();
			},
			warning: function(message) {
				$('body').pgNotification({
		      style: 'bar',
		      message: message,
		      position: 'top',
		      timeout: 2500,
		      type: 'warning'
		    }).show();
			},
			error: function(message) {
				$('body').pgNotification({
		      style: 'bar',
		      message: message,
		      position: 'top',
		      timeout: 2500,
		      type: 'error'
		    }).show();
			}
		}
	});