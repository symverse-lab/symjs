import * as helper from './symverse-helper';
const EthereumTx = require('ethereumjs-tx');
var utils = require('web3-utils');

class SymverseTx {
    sign (params, pt) {
        params.value = helper.toWei(params.value);
        if (!params.hasOwnProperty('nonce')) {
            params.nonce = '0x00';
        }
        for (let i in params) {
            params[i] = utils.toHex(params[i]);
        }
        // nonce: '0x00'
        const tx = new EthereumTx(params);
        const p = Buffer.from(pt, 'hex');
        tx.sign(p);
        let serializedTx = tx.serialize();
        return '0x' + serializedTx.toString('hex');
    }
}

export default new SymverseTx();
