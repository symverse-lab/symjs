/**
 * rpc.spec.js
 */
const should = require('should');
const SymJs =  require ('../index.js');

const localRpcHost = "http://112.172.172.60:8001"

describe("RPC API Call", function () {
    const symjs = new SymJs();
    const tempPk = "e72b3b417632c71c22579a7cb255c5fddbb3cc9f05a8d253ed7582ad5ed947ba";
    symjs.network.connect(localRpcHost)

    it('clientVersion', async () => {
        symjs.network.connect(localRpcHost)
        let result = await symjs.network.call.clientVersion()
        console.log(result)
        result.should.not.throw();
    });

    it('getBalance', async () => {
        let result = await symjs.network.call.getBalance("0x00021000000000010002")
        console.log(symjs.utils.toHug(result), result)
        result.should.not.throw();
    });

    it('accounts', async () => {
        let result = await symjs.network.call.accounts()
        console.log(result)
        result.should.not.throw();
    });

    it('getTransactionCount', async () => {
        let result = await symjs.network.call.getTransactionCount("0x00021000000000010002", "padding")
        console.log(result)
        result.should.not.throw();
    });

    it('getBlockTransactionCountByHash', async () => {
        let result = await symjs.network.call.getBlockTransactionCountByHash("0x42f6b128a527177f5afe2f93a33d531fe3b495f78241f2ac24050429507adc0e")
        console.log(result)
        result.should.not.throw();
    });

    it('getBlockByHash', async () => {
        let result = await symjs.network.call.getBlockByHash("0x42f6b128a527177f5afe2f93a33d531fe3b495f78241f2ac24050429507adc0e", true)
        console.log(result)
        result.should.not.throw();

        symjs.network.connectWait()
    });
});
