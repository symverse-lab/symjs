const tx = require('../signer');
const helper = require('../utils/helper');

const CitizenApi = (rpc, payload) => {
    return {
        sendCitizen: (datas, pt) => {
            return rpc(payload(
                'citizen_sendRawCitizen', [tx.citizenSign(datas, pt)]
            ));
        },
        getCitizenByHash: (tx) => {
            return rpc(payload(
                'citizen_getCitizenByHash', [tx]
            ));
        },
        getRawCitizenByHash: (tx) => {
            return rpc(payload(
                'citizen_getRawCitizenByHash', [tx]
            ));
        },
        getCitizenBySymID: (symId, blockNumber) => {
            blockNumber = blockNumber || helper.DEFAULT_BLOCK;
            return rpc(payload(
                'citizen_getCitizenBySymID', [symId, blockNumber]
            ));
        },
        getRawCitizenBySymID: (symId, blockNumber) => {
            blockNumber = blockNumber || helper.DEFAULT_BLOCK;
            return rpc(payload(
                'citizen_getRawCitizenBySymID', [symId, blockNumber]
            ));
        },
        getCitizensByBlockNumber: (blockNumber) => {
            blockNumber = blockNumber || helper.DEFAULT_BLOCK;
            return rpc(payload(
                'citizen_getCitizensByBlockNumber', [blockNumber]
            ));
        },
        getCitizenCount: (blockNumber) => {
            blockNumber = blockNumber || helper.DEFAULT_BLOCK;
            return rpc(payload(
                'citizen_getCitizenCount', [blockNumber]
            ));
        },
        getBlockByHash: (blockHash, isFull) => {
            isFull = isFull || false;
            return rpc(payload(
                'citizen_getBlockByHash', [blockHash, isFull]
            ));
        },
        getBlockByNumber: (blockNumber, isFull) => {
            blockNumber = blockNumber || helper.DEFAULT_BLOCK;
            isFull = isFull || false;
            return rpc(payload(
                'citizen_getBlockByNumber', [blockNumber, isFull]
            ));
        },
        getBlockCitizenCountByHash: (blockHash) => {
            return rpc(payload(
                'citizen_getBlockCitizenCountByHash', [blockHash]
            ));
        },
        getBlockCitizenCountByNumber: (blockNumber) => {
            blockNumber = blockNumber || helper.DEFAULT_BLOCK;
            return rpc(payload(
                'citizen_getBlockCitizenCountByNumber', [blockNumber]
            ));
        },
        pendingCitizens: () => {
            return rpc(payload(
                'citizen_pendingCitizens', []
            ));
        },
        blockNumber: () => {
            return rpc(payload(
                'citizen_blockNumber', []
            ));
        }
    };
};

module.exports = CitizenApi;
