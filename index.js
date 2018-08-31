import SymAccount from './src/symverse-desktop-keystore';
import SymNetwork from './src/symverse-network';
import * as SymHelper from './src/symverse-helper';
const utils = require('web3-utils');

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
