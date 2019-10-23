/**
 * users.spec.js
 */
const should = require('should');
const SymJs =  require ('../index.js');
const helper = require('../src/helper');

describe('계약 기능 체크', function () {
    const symjs = new SymJs();
    it('Contract', () => {
        let abi = [
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "name",
                        "type": "int256"
                    }
                ],
                "name": "YouName",
                "outputs": [
                    {
                        "name": "",
                        "type": "int256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "Hi",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }
        ]
        // Smart contract EVM bytecode as hex
        let code = '0x608060405234801561001057600080fd5b50610139806100206000396000f3fe60806040526004361061003b576000357c0100000000000000000000000000000000000000000000000000000000900480639a6e22f714610040575b600080fd5b34801561004c57600080fd5b506100556100d0565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561009557808201518184015260208101905061007a565b50505050905090810190601f1680156100c25780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60606040805190810160405280600681526020017fec9588eb8595000000000000000000000000000000000000000000000000000081525090509056fea165627a7a72305820e2647a5407f14fb566ca70f280fe2fa4d633a5b0d2b216df657c44a1eac2da570029';
        let TestContract = Contract(abi);
        TestContract.options.data = code
        TestContract.deploy().send({
            from: '0x1234567890123456789012345678901234567891',
            gas: 1500000,
            gasPrice: '30000000000000'
        })
        .then((newContractInstance) => {
            console.log(newContractInstance.options.address) // instance with the new contract address
        });
    });

    it('Tx Raw decode', () => {
    });

});
