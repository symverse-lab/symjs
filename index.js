import SymNetwork from './src/network' ;
import helper from './src/utils/helper';
import SymTx from './src/signer';
import Keystore from './src/keystore/keystore';

let SymJs = () => {
    this.network = SymNetwork;
    this.utils = helper;
    this.sigenr = SymTx;
};

SymJs.keystore = Keystore;
SymJs.utils = helper;

export default SymJs;
