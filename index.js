var SymNetwork = require('./src/network');
var SymHelper = require('./src/helper');
var SymTx = require('./src/signer');
//var Keystore = require('./src/keystore/keystore');

var Symjs = function () {
    this.network = SymNetwork;
    this.utils = SymHelper;
    this.sigenr = SymTx;
    //this.keystore = Keystore;
};

module.exports = Symjs;
