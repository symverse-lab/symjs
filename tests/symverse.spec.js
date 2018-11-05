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
        let ex = "0xf8848a000000000001c91d72008a000000000001c91d7200808a000000000001c91d720094bb2d9a64cc25014834faef09f0df9ca415ba8c910101800101845bda96a626a018bcfe200f1eba6b5f8b61ee8be3c7e43465946bcf883e93815154f79b72b020a07ef7ca64dfa1b2e4d86bbb288619780af40b4798cb0fe75345f5151fcc6de338"
        let ex1 = [
            '0x00000000000184c9de00',
            '0x00000000000184c9de00',
            '0x1',
            '0x00000000000184c9de00',
            '0x45e0f486346dddce7f25cad3aad7073783daf404',
            '0x01',
            '0x01',
            '0x',
            '0x01',
            '0x01',
            '0x0166cdcd5fc1',

            '0x21',
            '0x5ea918fb3506cb91a028e60a8ca4890f5ccf7e83ca2d6aa99f34f91ea911778a',
            '0x3517b85bb56e2439725ab0d5c45e3f77a0043e3dfd07a437596104f750527148' ];
        let encode = ethers.utils.RLP.encode(ex1);
    });
});