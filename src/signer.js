const helper = require('./utils/helper');
const CitizenTx = require('./tx-citizen');
const SymverseTx = require('./tx-transaction');

function sign (params, pk) {
    params = helper.paramsToHex(params);
    const tx = new SymverseTx(params);
    tx.sign(Buffer.from(pk, 'hex'));
    return '0x' + tx.serialize().toString('hex');
}

function citizenSign (params, pk) {
    params = helper.paramsToHex(params);
    const ctx = new CitizenTx(params);
    ctx.sign(Buffer.from(pk, 'hex'));
    return '0x' + ctx.serialize().toString('hex');
}

export default {
    sign,
    citizenSign
};
