/**
 * users.spec.js
 */
const should = require('should');
const symjs =  require ('../index.js');
var ethers = require('ethers');

describe('라이브러리 기능 체크', function () {

    it('버전 체크', () => {
        symjs.Symverse.version.should.be.equal('0.0.0-beta3');
    });

    it('일반 트랜젝션', () => {
        const pt = "1be4e194a09ae22094d3f1affe41020be64b0e38595145623ecbfcdd6dc259f9";
        var params = {
            "from":"0x00000000000123456789",  // "0" 10개 + 본인의 SymId (20자리)
            "nonce":"0x0",
            "gasPrice": 1,
            "gasLimit": 21000,
            "to":"0x00000000000123456789",
            "value": 1,
            "data": "0x0",
            "chainId": -1
            //v
            //r
            //s
        };
        let rlpData = symjs.Symverse.tx.sign(params, pt);
        console.log(rlpData);
        console.log(ethers.utils.RLP.decode(rlpData))
    });

    it('시티즌 트랜젝션', () => {
        const pt = "1be4e194a09ae22094d3f1affe41020be64b0e38595145623ecbfcdd6dc259f9";
        var params = {
            "from":"0x00000000000123456789",  // "0" 10개 + 본인의 SymId (20자리)
            "to":"0x00000000000123456789", // // 받을 노드 ( 20자리 )
            "nonce":"0x1",
            "symid":"0x00000000000123456789", // "0" 10개 + 본인의 SymId (20자리)
            "pubkeyhash":"0xd360ef98ec6bd17623ab09d8310c9b62883076a1", // 본인의 address
            "country":"0x1",  //국가
            "status":"0x1", //상태
            "credit": "0x0", //신용
            "role":"0x2", //계정 룰 ( 1: CA 인증용 / 2. 일반 거래용 )
            "org":"0x1", //dapp 기관
            "writetime": 1540342998 //요청 시간
            //v
            //r
            //s
        };
        let rlpData = symjs.Symverse.tx.citizenSign(params, pt);
        console.log(rlpData);
        console.log(ethers.utils.RLP.decode(rlpData))
    });
});