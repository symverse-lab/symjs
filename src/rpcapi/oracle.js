const helper = require('../utils/helper');

const OracleMethod = (rpc, payload) => {
    return {
        // sendOracle: (oracleRaw, pk) => {
        //     return rpc(payload(
        //         'citizen_sendRawCitizen', []
        //     ));
        // },
        sendOracleJSON: (symId, jsonString) => {
            return rpc(payload(
                'oracle_sendOracleJSON', [symId, jsonString]
            ));
        },
        getOracleByHash: (hash) => {
            return rpc(payload(
                'oracle_getOracleByHash', [hash]
            ));
        },
        getRawOracleByHash: (hash) => {
            return rpc(payload(
                'oracle_getRawOracleByHash', [hash]
            ));
        },
        getOracleCount: (symId, blockNumber) => {
            blockNumber = blockNumber || helper.DEFAULT_BLOCK;
            return rpc(payload(
                'oracle_getOracleCount', [symId, blockNumber]
            ));
        },
        pendingOracles: () => {
            return rpc(payload(
                'oracle_pendingOracles', []
            ));
        },
        getBlockByHash: (blockHash, isFull) => {
            isFull = isFull || false;
            return rpc(payload(
                'oracle_getBlockByHash', [blockHash, isFull]
            ));
        },
        getBlockByNumber: (blockNumber, isFull) => {
            blockNumber = blockNumber || helper.DEFAULT_BLOCK;
            isFull = isFull || false;
            return rpc(payload(
                'oracle_getBlockByNumber', [blockNumber, isFull]
            ));
        },
        blockNumber: () => {
            return rpc(payload(
                'oracle_blockNumber', []
            ));
        }
    };
};

module.exports = OracleMethod;
