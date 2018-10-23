/**
 * users.spec.js
 */
const should = require('should');
const symjs =  require ('../index.js');
var ethers = require('ethers');

describe('테스트', function () {

    it('should return the statusCode 200', () => {
        symjs.Symverse.version.should.be.equal('0.0.0-beta3');
    });

    it('should return user array', () => {

        const pt = "1be4e194a09ae22094d3f1affe41020be64b0e38595145623ecbfcdd6dc259f9";
        var params = {
            "from":"0x00000000000123456789",
            "to":"0x00000000000123456789",
            "nonce":"0x00",
            "symid":"0x00000000000123456789",
            "pubkeyhash":"0xd360ef98ec6bd17623ab09d8310c9b62883076a1",
            "country":"0x1",
            "status":"0x1",
            "credit":"0x1",
            "role":"0x2",
            "org":"0x1",
            "writetime":"2018-10-20T17:13:40Z"
        };
        let rlpData = symjs.Symverse.tx.citizenSign(params, pt);
        console.log(rlpData);
        console.log(ethers.utils.RLP.decode(rlpData))

    });
});