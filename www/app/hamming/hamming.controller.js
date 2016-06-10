(function() {
    'use strict';

    angular.module('hammingCodeApp').controller('HammingCtrl', HammingCtrl);
    HammingCtrl.$inject = ['HammingService'];

    function HammingCtrl(HammingService) {
        var self = this;
        self.getBitValidated = getBitValidated;
        self.showMessageVerify = showMessageVerify;
        self.showBitVerify = showBitVerify;
        self.getBitCheck = getBitCheck;
        self.bitValidated = '';
        self.inputBit = '';
        self.bitCheck = 'INIT';

        function getBitValidated() {
            self.showBitChecked = true;
            self.bitValidated = HammingService.calculateBitCheck(self.inputBit);
            return HammingService.calculateBitCheck(self.inputBit);;
        }

        function getBitCheck() {
            self.bitCheck = HammingService.checkBit(self.inputBit);
        }

        function showMessageVerify() {
            return self.bitCheck === 'OK';
        }

        function showBitVerify() {
            return self.bitCheck !== 'OK' && self.bitCheck !== 'INIT';
        }

    }
})();
