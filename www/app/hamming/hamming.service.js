(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name motomakerApp.HammingService
     * @description Service responsible for manage all the information related to the accordion
     */

    angular.module('hammingCodeApp').service('HammingService', HammingService);
    HammingService.$inject = [];

    function HammingService() {
        var self = this;
        self.calculateBitCheck = calculateBitCheck;

        function calculateBitCheck(bit) {
            var bitVerification = 0;
            var bitValue = bit;
            var bitLength = bitValue.length;

            for(var i = 0; i < bitLength; i++) {
                if(Math.pow(2, i) >= bitLength + i + 1) {
                    bitVerification = i;
                    break;
                }
            }

            // Descobrir posição do bit de verificação
            var newBit = [];
            var joinNormalBit = 0;
            var matriz = [];
            for(i = 0; i < bitVerification; i++) {
                newBit[Math.pow(2, i)] = 'x';
            }

            for(i = 1; i <= bitLength + bitVerification; i++) {
                if(newBit[i] == undefined) {
                    newBit[i] = bitValue[joinNormalBit];
                    joinNormalBit++;
                }
            }
            newBit.shift();

            var x = 0;
            var k = 0;
            for(i = 0; i < newBit.length; i++) {
                matriz[i] = [];
                if(newBit[i] != 'x') {
                    k = 0;
                    for(var j = bitVerification - 1; j >= 0 || k < i; j--) {
                        if(i + 1 >= k + Math.pow(2, j)) {
                            k += Math.pow(2, j);
                            matriz[i - x][j] = 1;
                        } else {
                            matriz[i - x][j] = 0;
                        }
                    }
                } else {
                    x++;
                }
            }

            var aux = 0;
            var matrizToArray = [];
            for(i = 0; i < matriz.length; i++) {
                for(j = 0; j < matriz[i].length; j++) {
                    if(matriz[i][j] == 1) {
                        aux ^= bitValue[i];
                    }
                    matrizToArray.push(matriz[i][j]);
                }

            }

            aux = 0;
            for(i = 0; i < (matrizToArray.length / bitLength); i++) {
                for(j=0; j < bitLength; j++) {
                    if(matrizToArray[bitVerification * j + i] === 1) {
                        aux ^= bitValue[j];
                    }
                }
                for(k = 0; k < newBit.length; k++) {
                    if(newBit[k] === 'x') {
                        newBit[k] = aux;
                        break;
                    }
                }
                aux = 0;
            }


            var bitString = newBit.toString().split(',').join('');
            return bitString;
        }
    }

})();