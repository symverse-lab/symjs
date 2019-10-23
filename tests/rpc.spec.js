/**
 * rpc.spec.js
 */

const should = require('should');
const SymJs =  require ('../index.js');

describe("RPC API Call", function () {
    const symjs = new SymJs();
    const tempPk = "e72b3b417632c71c22579a7cb255c5fddbb3cc9f05a8d253ed7582ad5ed947ba";

    it(' RPC connect', async () => {
        symjs.network.connect("http://localhost:8001")
        let result = await symjs.network.call.citizen.blockNumber()
        console.log(result)
    });

    it(' SCT API ', async () => {
        await symjs.network.connect("http://localhost:8001")
        let constract = await symjs.network.call.sct.getContract("0x4523ad7875a9c41e9629")
        console.log(constract)
    });

    it(' Citizen API ', async () => {
        await symjs.network.connect("http://localhost:8001")
        let citizenInfo = await symjs.network.call.citizen.getCitizenBySymID("0x00021000000000010002")
        console.log(citizenInfo)
    });

});
