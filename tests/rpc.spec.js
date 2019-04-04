/**
 * rpc.spec.js
 */

const should = require('should');
const Symjs =  require ('../index.js');

describe("RPC API Call", function () {
    const symjs = new Symjs();
    const tempPk = "e72b3b417632c71c22579a7cb255c5fddbb3cc9f05a8d253ed7582ad5ed947ba";

    it(' RPC connect', async () => {
        await symjs.network.connect("http://localhost:8001")
        var result = await symjs.network.call.warrant.getWarrantBlockByNumber("0x2", true)
    });

    it(' Sct20 create', async () => {
        await symjs.network.connect("http://localhost:8001")
        const constract = await symjs.network.call.sct.getContract("0x4523ad7875a9c41e9629")
        console.log(constract)
    });

});
