let SymNetwork = require('./src/network');
let SymHelper = require('./src/helper');
let SymTx = require('./src/signer');
let Keystore = require('./src/keystore/keystore');

let SymJs = function () {
    this.network = SymNetwork;
    this.utils = SymHelper;
    this.sigenr = SymTx;
    this.keystore = Keystore;
};

SymJs.keystore = Keystore;
SymJs.utils = SymHelper;

module.exports = SymJs;
