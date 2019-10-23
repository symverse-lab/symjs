let helper = require('../helper');
let tx = require('../signer');
let SctParams = require('./sct');

const Methods = function () {
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
    // ============== web3 ============== //
    this.clientVersion = () => {
        return _this.rpc(payload(
            'web3_clientVersion'
        ));
    };
    // ============== sym ============== //
    this.getBalance = (address) => {
        return _this.rpc(payload(
            'sym_getBalance', [address, defaultBlock]
        ), helper.hexToNumberString);
    };
    this.accounts = () => {
        return _this.rpc(payload(
            'sym_accounts'
        ));
    };
    this.getTransactionCount = (address) => {
        return _this.rpc(payload(
            'sym_getTransactionCount', [address, defaultBlock]
        ), helper.hexToNumberString);
    };
    this.getTransactionByHash = (tx) => {
        return _this.rpc(payload(
            'sym_getTransactionByHash', [tx]
        ));
    };
    this.getTransactionReceipt = (tx) => {
        return _this.rpc(payload(
            'sym_getTransactionReceipt', [tx]
        ));
    };
    this.sendTransaction = (datas, pt) => {
        return _this.rpc(payload(
            'sym_sendRawTransaction', [tx.sign(datas, pt)]
        ));
    };
    // ============== citizen ============== //
    this.citizen = {
        sendCitizen: (datas, pt) => {
            return _this.rpc(payload(
                'citizen_sendRawCitizen', [tx.citizenSign(datas, pt)]
            ));
        },
        getCitizenByHash: (tx) => {
            return _this.rpc(payload(
                'citizen_getCitizenByHash', [tx]
            ));
        },
        getRawCitizenByHash: (tx) => {
            return _this.rpc(payload(
                'citizen_getRawCitizenByHash', [tx]
            ));
        },
        getCitizenBySymID: (symId) => {
            return _this.rpc(payload(
                'citizen_getCitizenBySymID', [symId, defaultBlock]
            ));
        },
        getRawCitizenBySymID: (symId) => {
            return _this.rpc(payload(
                'citizen_getRawCitizenBySymID', [symId, defaultBlock]
            ));
        },
        getCitizenCount: () => {
            return _this.rpc(payload(
                'citizen_getCitizenCount', []
            ));
        },
        pendingCitizens: () => {
            return _this.rpc(payload(
                'citizen_pendingCitizens', []
            ));
        },
        blockNumber: () => {
            return _this.rpc(payload(
                'citizen_blockNumber', []
            ));
        },
        // getBlock: (number, isFull) => {
        //     if (typeof isFull === 'undefined') {
        //         isFull = false;
        //     }
        //     return _this.rpc(payload(
        //         'citizen_getBlock', [number, isFull]
        //     ));
        // },
    };

    // ============== warrant ============== //

    this.warrant = {
        blockNumber: () => {
            return _this.rpc(payload(
                'warrant_blockNumber', []
            ));
        },
        // getBlock: (number, isFull) => {
        //     if (typeof isFull === 'undefined') {
        //         isFull = true;
        //     }
        //     return _this.rpc(payload(
        //         'warrant_getBlock', [number, isFull]
        //     ));
        // },
    };

    // ============== sct ============== //

    this.sct = {
        params: SctParams,
        getContract: (csymid) => {
            return _this.rpc(payload(
                'sct_getContract', [csymid, defaultBlock]
            ));
        },
        getContractAccount: (csymid, symid) => {
            return _this.rpc(payload(
                'sct_getContractAccount', [csymid, symid, defaultBlock]
            ));
        },
        getContractItem: (csymid, number) => {
            return _this.rpc(payload(
                'sct_getContractItem', [csymid, number, defaultBlock]
            ));
        },
        getContractItemsByCategory: (csymid, groupNumber) => {
            return _this.rpc(payload(
                'sct_getContractItemsByCategory', [csymid, groupNumber, defaultBlock]
            ));
        },
        getAllowance: (csymid, owner, spender) => {
            return _this.rpc(payload(
                'sct_getAllowance', [csymid, owner, spender, defaultBlock]
            ));
        }
    };
    initRpc(arguments);
};

module.exports = Methods;
