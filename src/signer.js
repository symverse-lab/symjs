var helper = require('./helper');
var CitizenTx = require('./tx-citizen');
var SymverseTx = require('./tx-transaction');
var EthereumTx = require('ethereumjs-tx');

function etherSigner (params, pt) {
    params = helper.paramsToHex(params);
    const tx = new EthereumTx(params);
    const p = Buffer.from(pt, 'hex');
    tx.sign(p);
    let serializedTx = tx.serialize();
    return '0x' + serializedTx.toString('hex');
}

function signer (params, pk) {
    params = helper.paramsToHex(params);
    const tx = new SymverseTx(params);
    tx.sign(Buffer.from(pk, 'hex'));
    return '0x' + tx.serialize().toString('hex');
}

function citizenSigner (params, pk) {
    params = helper.paramsToHex(params);
    const ctx = new CitizenTx(params);
    ctx.sign(Buffer.from(pk, 'hex'));
    return '0x' + ctx.serialize().toString('hex');
}

module.exports = {
    etherSigner,
    signer,
    citizenSigner
};
