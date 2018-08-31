import SymAccount from './symverse-desktop-keystore';
import SymNetwork from './symverse-network';
import * as SymHelper from './symverse-helper';
var utils = require('web3-utils');

const SymverseModule = () => {
    this.version = '0.1';
    this.network = SymNetwork;
    this.utils = SymHelper;
    this.etherUtils = utils;
};

const Symverse = new SymverseModule();

export {
    SymAccount,
    Symverse
};
