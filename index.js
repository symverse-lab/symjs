var SymNetwork = require('./src/symverse-network');
var SymHelper = require('./src/symverse-helper');
var SymTx = require('./src/symverse-tx');
var utils = require('web3-utils');
var SymDesktopKeystore = require('./src/symverse-desktop-keystore');

var Symjs = function () {
    this.version = '0.0.0-beta3';
    this.network = SymNetwork;
    this.utils = SymHelper;
    this.etherUtils = utils;
    this.tx = SymTx;
};

module.exports = {
    Symverse: new Symjs(),
    SymAccount: SymDesktopKeystore
};
