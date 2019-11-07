import SymNetwork from './src/network';
import helper from './src/utils/helper';
import signer from './src/signer';
import Keystore from './src/keystore/keystore';
import sct from './src/rpcapi/sct';

class SymJs {
    constructor () {
        this.network = SymNetwork;
        this.utils = helper;
        this.signer = signer;
        this.param = sct;
    }
};

SymJs.utils = helper;
SymJs.keystore = Keystore;
SymJs.param = sct;

export default SymJs;
