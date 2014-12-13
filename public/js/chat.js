(function() {
	var storage = {};
	storage.messages = [];

	var app = angular.module('chat', []);

	app.controller('chatController', function($scope) {
		var socket, _messages;

		this.messages = [];
		storage.messages = this.messages;
		socket = io();

		socket.on('broadcast', function(user, message) {
			storage.messages.push({
				who: user,
				message:  message,
				date: new Date()
			});

			$scope.$apply(function() {
				$('.panel-post-status').animate({
					scrollTop: $(document).height()
				}, "slow");
			});
		});

		this.submit = function() {
			socket.emit('broadcast', 'Nam Vo Hoai', this.PostContent);
			this.PostContent = '';
		};
	});

	app.directive('postComment', function() {
		return {
			scope: {
				who: '@',
				message: '@',
				date: '@'
			},
			replace: true,
			restrict: 'E',
			templateUrl: 'template/comment.html'
		}
	})

	app.directive('ngEnter', function() {
		return function(scope, element, attribute) {
			element.bind('keydown keypress', function(event) {
				if (event.which == 13) {
					scope.$apply(function() {
						scope.$eval(attribute.ngEnter);
					});

					event.preventDefault();
				}
			});
		};
	});
})();