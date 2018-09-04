var SymNetwork = require('./src/symverse-network');
var SymHelper = require('./src/symverse-helper');
var utils = require('web3-utils');
var SymDesktopKeystore = require('./src/symverse-desktop-keystore');

var Symjs = function () {
    this.version = '0.1';
    this.network = SymNetwork;
    this.utils = SymHelper;
    this.etherUtils = utils;
};

module.exports = {
    Symverse: new Symjs(),
    SymAccount: SymDesktopKeystore
};
