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
            "gasLimit": 41000,
            "to":"0x00000000000123456789",
            "value": 1,
            "data": "0x0",
            //v
            //r
            //s
        };
        let rlpData = symjs.Symverse.tx.sign(params, pt);
        console.log(rlpData);
        console.log(ethers.utils.RLP.decode(rlpData))
        console.log(ethers.utils.RLP.decode("0xf86d8a000000000001bbc5800080840112a880830186a08a000000000001bbc580008829a2241af62c00008029a0323e4da17c123f91dbcd17ca4da8bfaf2613bcc8ab7bc2ab81e884feface5e74a0639ef5b19f70ff1ac9ee065437c653d0478c4e748796a0d4e43ce768cadc51a5"))
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
            "writetime": new Date().getTime() //요청 시간
            //v
            //r
            //s
        };
        let rlpData = symjs.Symverse.tx.citizenSign(params, pt);
        console.log("내꺼 인코딩", rlpData);
        console.log("내꺼 디코딩:", ethers.utils.RLP.decode(rlpData));
        let ex = "0xf87f8a3886784abcaf9f1be9808a3886784abcaf9f1be980808a3886784abcaf9f1be98094d360ef98ec6bd17623ab09d8310c9b62883076a101010101011ca0f7ea19c09e48642640bd469bb82b75349e7f5a12ec77eff3191d70fd14f90713a077425c72e24141c9998524edb7814b074cf925c0f437dc093d098d60944c9c46"
        console.log("내꺼 디코딩!!:", ethers.utils.RLP.decode(ex));
    });
});