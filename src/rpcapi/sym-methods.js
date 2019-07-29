var helper = require('../helper');
var tx = require('../signer');
var SctParams = require('./sct')

const SymMethods = function () {
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
    },
    this.accounts = () => {
        return _this.rpc(payload(
            'sym_accounts'
        ));
    },
    this.getTransactionCount = (address) => {
        return _this.rpc(payload(
            'sym_getTransactionCount', [address, defaultBlock]
        ), helper.hexToNumberString);
    },
    this.getTransactionByHash = (tx) => {
        return _this.rpc(payload(
            'sym_getTransactionByHash', [tx]
        ));
    },
    this.getTransactionReceipt = (tx) => {
        return _this.rpc(payload(
            'sym_getTransactionReceipt', [tx]
        ));
    },
    this.sendTransaction = (datas, pt) => {
        return _this.rpc(payload(
            'sym_sendRawTransaction', [tx.sign(datas, pt)]
        ));
    };
    // ============== citizen ============== //
    this.citizen = {
        sendCitizen: (datas, pt) => {
            return _this.rpc(payload(
                'sym_sendRawCitizen', [tx.citizenSign(datas, pt)]
            ));
        },
        getCitizenByHash: (tx) => {
            return _this.rpc(payload(
                'sym_getCitizenByHash', [tx]
            ));
        },
        getRawCitizenByHash: (tx) => {
            return _this.rpc(payload(
                'sym_getRawCitizenByHash', [tx]
            ));
        },
        getCitizenBySymID: (symId) => {
            return _this.rpc(payload(
                'sym_getCitizenBySymID', [symId]
            ));
        },
        getRawCitizenBySymID: (symId) => {
            return _this.rpc(payload(
                'sym_getRawCitizenBySymID', [symId]
            ));
        },
        getCitizens: () => {
            return _this.rpc(payload(
                'sym_getCitizens', []
            ));
        },
        getCitizenStatus: (symId) => {
            return _this.rpc(payload(
                'sym_getCitizenStatus', [symId]
            ));
        },
        getCitizenCountFromPool: () => {
            return _this.rpc(payload(
                'sym_getCitizenCountFromPool', []
            ));
        },
        getCitizenCountFromDb: () => {
            return _this.rpc(payload(
                'sym_getCitizenCountFromDb', []
            ));
        },
        pendingCitizens: () => {
            return _this.rpc(payload(
                'sym_pendingCitizens', []
            ));
        },
        citizenBlockNumber: () => {
            return _this.rpc(payload(
                'sym_citizenBlockNumber', []
            ));
        },
        getCitizenBlockByNumber: (number, isFull) => {
            if (typeof isFull === 'undefined') {
                isFull = true;
            }
            return _this.rpc(payload(
                'sym_getCitizenBlockByNumber', [number, isFull]
            ));
        },
        getCitizenBlockByHash: (hash, isFull) => {
            if (typeof isFull === 'undefined') {
                isFull = true;
            }
            return _this.rpc(payload(
                'sym_getCitizenBlockByHash', [hash, isFull]
            ));
        },
        getIssuer: (symId) => {
            return _this.rpc(payload(
                'sym_getIssuer', [symId]
            ));
        },
        getCitizenRole: (symId) => {
            return _this.rpc(payload(
                'sym_getCitizenRole', [symId]
            ));
        }
    };

    // ============== warrant ============== //

    this.warrant = {
        warrantBlockNumber: () => {
            return _this.rpc(payload(
                'warrant_warrantBlockNumber', []
            ));
        },
        getWarrantBlockByHash: (hash, isFull) => {
            if (typeof isFull === 'undefined') {
                isFull = true;
            }
            return _this.rpc(payload(
                'warrant_getWarrantBlockByHash', [hash, isFull]
            ));
        },
        getWarrantBlockByNumber: (number, isFull) => {
            if (typeof isFull === 'undefined') {
                isFull = true;
            }
            return _this.rpc(payload(
                'warrant_getWarrantBlockByNumber', [number, isFull]
            ));
        },
        getWarrantsByBlockHash: (hash, isFull) => {
            if (typeof isFull === 'undefined') {
                isFull = true;
            }
            return _this.rpc(payload(
                'warrant_getWarrantsByBlockHash', [hash, isFull]
            ));
        },
        getWarrantsByBlockNumber: (number, isFull) => {
            if (typeof isFull === 'undefined') {
                isFull = true;
            }
            return _this.rpc(payload(
                'warrant_getWarrantsByBlockNumber', [number, isFull]
            ));
        }
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

module.exports = SymMethods;
