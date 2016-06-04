(function() {
    'use strict';

    angular.module('hammingCodeApp').controller('HammingCtrl', HammingCtrl);
    HammingCtrl.$inject = ['HammingService'];

    function HammingCtrl(HammingService) {
        var self = this;
        self.getBitValidated = getBitValidated;
        self.bitValidated = '';
        self.inputBit = '1010';

        function getBitValidated() {
            self.showBitChecked = true;
            self.bitValidated = HammingService.calculateBitCheck(self.inputBit);
            return HammingService.calculateBitCheck(self.inputBit);;
        }


    }
})();
