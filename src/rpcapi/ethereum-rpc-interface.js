var helper = require('../symverse-helper');
var tx = require('../symverse-tx');

const SymverseRpcInterface = function  () {
    this.rpc = {};
    const _this = this;
    const defaultBlock = 'latest';

    const initRpc = function (arg) {
        let args = Array.prototype.slice.call(arg);
        if (args.length < 0) {
            throw new Error('network error arg 0 ');
        }
        _this.rpc = args[0];
    };

    const payload = (method, params) => {
        let output = { method };
        if (params) output.params = params;
        return output;
    };

    this.clientVersion = () => {
        return _this.rpc(payload(
            'web3_clientVersion'
        ));
    };

    this.getBalance = (address) => {
        return _this.rpc(payload(
            'eth_getBalance', [address, defaultBlock]
        ), helper.hexToNumberString);
    };

    this.getTransactionCount = (address) => {
        return _this.rpc(payload(
            'eth_getTransactionCount', [address, defaultBlock]
        ), helper.hexToNumberString);
    };

    this.sendTransaction = (datas, pt) => {
        return _this.rpc(payload(
            'eth_sendRawTransaction', [tx.sign(datas, pt)]
        ));
    };

    this.sendEtherTransaction = (datas, pt) => {
        return _this.rpc(payload(
            'eth_sendRawTransaction', [tx.etherSign(datas, pt)]
        ));
    };

    this.getTransactionByHash = (tx) => {
        return _this.rpc(payload(
            'eth_getTransactionByHash', [tx]
        ));
    };

    this.getTransactionReceipt = (tx) => {
        return _this.rpc(payload(
            'eth_getTransactionReceipt', [tx]
        ));
    };

    initRpc(arguments);
};

module.exports = SymverseRpcInterface;
