var helper = require('./symverse-helper');
var SymverseCitizenTx = require('./symverse-citizen-tx');
var EthereumTx = require('./symverse-transaction-tx');
var utils = require('web3-utils');

var SymverseTx = function () {

    function sign (params, pt) {
        params.value = helper.toWei(params.value);
        if (!params.hasOwnProperty('nonce')) {
            params.nonce = '0x0';
        }
        for (let i in params) {
            params[i] = utils.toHex(params[i]);
        }
        const tx = new EthereumTx(params);
        const p = Buffer.from(pt, 'hex');
        tx.sign(p);
        let serializedTx = tx.serialize();
        return '0x' + serializedTx.toString('hex');
    }

    function citizenSign (params, pt){
        for (let i in params) {
            params[i] = utils.toHex(params[i]);
        }
        const tx = new SymverseCitizenTx(params);
        const p = Buffer.from(pt, 'hex');
        tx.sign(p);
        let serializedTx = tx.serialize();
        return '0x' + serializedTx.toString('hex');
    }

    return {
        sign,
        citizenSign
    };
};

module.exports = SymverseTx();
