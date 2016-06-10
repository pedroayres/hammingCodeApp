(function() {
	'use strict';

	angular.module('hammingCodeApp').controller('WelcomeCtrl', WelcomeCtrl);
	WelcomeCtrl.$inject = ['$state'];

	function WelcomeCtrl($state) {
		var self = this;
		self.goToTransmission = goToTransmission;
		self.goToVerify = goToVerify;


		function goToTransmission() {
			$state.go('app.hammingTransmission');
		}

		function goToVerify() {
			$state.go('app.hammingVerify');
		}


	}
})();