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
        self.checkBit = checkBit;

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
            var vet = [];
            var sum = 0;
            for(i = 0; i < (matrizToArray.length / bitLength); i++) {
                for(j = 0; j < bitLength; j++) {
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

                sum = vet.reduce(function(a, b) {
                    return a + b;
                }, 0);

                aux = 0;
                vet = [];
            }


            var bitString = newBit.toString().split(',').join('');
            return bitString;
        }

        function checkBit(code) {
            var code_len = code.length;
            var numberVerifyBits = Math.ceil(Math.sqrt(code_len));
            var positionCheckBits = [];
            for(var i = 0; i < numberVerifyBits; i++) {
                positionCheckBits.push(Math.pow(2, i));
            }

            var idxBit = [];
            var idxNum = [];
            for(i = 1; i <= code_len; i++) {
                if(positionCheckBits.indexOf(i) > -1) {
                    idxBit.push(i);
                } else {
                    idxNum.push(i);
                }
            }
            var indexes = {
                'bit': idxBit,
                'num': idxNum
            };
            var checkBits = calcVerifyBits(indexes);

            var positionCheckBit = [];
            indexes.bit.forEach(function(value, index) {
                positionCheckBit[index] = [];
                checkBits.forEach(function(bvalue, bindex) {
                    if(bvalue.indexOf(value) > -1) {
                        positionCheckBit[index].push(code[bvalue.reduce(add, 0) - 1]);
                    }
                });
                positionCheckBit[index].unshift(code[value - 1]);
            });

            //Passo 5: Verificação do código de Hamming
            var confirmResult = [];
            positionCheckBit.forEach(function(value, index) {
                for(var i = 0; i < value.length; i++) value[i] = +value[i];
                var count = 0;
                var start = 0;
                while(start < value.length) {
                    if(value.indexOf(1, start) > -1) {
                        count++;
                        start = value.indexOf(1, start);
                    }
                    start++;
                }
                if(count % 2 == 0) {
                    confirmResult.push(0);
                } else {
                    confirmResult.push(1);
                }
            });
            var result = confirmResult.reverse().join('').toString();
            var resultInt = parseInt(result.replace(',', ''), 2);
            var error = false;
            if(resultInt == 0) {
                return 'OK';
            } else {
                var result_code = '';
                for(i = 0; i < code_len; i++) {
                    if(i != resultInt - 1) {
                        result_code += code[i];
                        console.log(code[i]);
                    } else {
                        if(indexes.bit.indexOf(resultInt) > -1) {
                            
                            error = true;
                            break;
                        } else {
                            result_code += (!(code[i] & 1) & 1).toString();
                        }
                    }
                }
                if(!error) {
                    return resultInt;
                } 
                return 'OK';

            }
        }

        function calcVerifyBits(elem) {
            var idxBitLen = elem.bit.length;
            var bitsVerified = [];
            var sum = 0;
            var temp = [];
            for(var i = 0; i < elem.num.length; i++) {
                temp = [];
                for(var j = idxBitLen; --j >= 0;) {
                    if(elem.num[i] > elem.bit[j]) {
                        temp.push(elem.bit[j]);
                        sum = temp.reduce(add, 0);
                        if(sum == elem.num[i]) {
                            //bitsVerified.push(temp);
                            bitsVerified[i] = temp;
                        } else if(sum > elem.num[i]) {
                            temp.pop();
                        }
                    }
                }
            }
            return bitsVerified;
        }

        function add(a, b) {
            return a + b;
        }
    }

})();