/**
 * rpc.spec.js
 */

const should = require('should');
const SymJs =  require ('../index.js');

describe("SymJs", function () {

    it('Object Type', async () => {
        const symjs = new SymJs() || {}
        console.log(symjs )
        console.log(SymJs.keystore )
    });


});
