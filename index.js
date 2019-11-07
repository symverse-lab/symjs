import SymNetwork from './src/network';
import helper from './src/utils/helper';
import signer from './src/signer';
import Keystore from './src/keystore/keystore';

class SymJs {
    constructor () {
        this.network = SymNetwork;
        this.utils = helper;
        this.signer = signer;
    }
};

SymJs.utils = helper;
SymJs.keystore = Keystore;

export default SymJs;
