
/**
 * users.spec.js
 */
import should from 'should';
import SymJs from '../index.js';

describe('Transaction raw Test Cases', function () {
    const symjs = new SymJs();
    const pk = "1a43aa399cb2efe186317e0b09f4a7ef88b83cff05089b145709881bf4db3a20";

    it('Tx Raw encode', () => {
        //tx 데이터 작성
        let params = {
            "from":"0x00021000000000010002",
            "nonce": 210,
            "gasPrice": 1000000000000,
            "gasLimit": 41000,
            "to": "0x00021000000000020002",
            "value": 5,
            "workNodes": ["0x00021000000000010002"],
            "chainId": 7777
        };
        let tx = symjs.signer.sign(params, pk);
        let result = "0xf86f8a0002100000000001000281d30582a0288a00021000000000020002058080cb8a000210000000000100028080a0a53295f69d7ec386096031184202b2500f360739c21418f9f74c6c46be872927a066f5cbf2137f8cdd48ea2e87fd7021467b6426f85f52dff586ea780c3ed9357d"
        console.log(SymJs.utils.decodeRlp(tx))
        should.equal(result, tx, "tx rlp encode error")
    });

    it('SCTx Raw encode', () => {
        //tx 데이터 작성
        let params = {
            from: "0x00021000000000010002",
            nonce: 214,
            gasPrice: '0x09184e72a000000',
            gasLimit: '0x271000',
            workNodes: ["0x00021000000000010002"],
            type: 1,
            input: "0x"+symjs.param.sct20.create("HI","asd", 12323, "0x00021000000000010002").raw(),
            chainId: 7777
        };
        let tx = symjs.signer.sign(params, pk);
        console.log(tx, SymJs.utils.decodeRlp(tx))
    });

    it('Citizen Tx Raw encode', () => {
        //Devnet
        const pk = "a53ded421dacc2310a1ed443f2ce8261f5583be3bca944787a1d4039b1b67357";
        //tx 데이터 작성
        var params = {
            "from":"0x00020000000000010002",
            "to":  "0x00000000000000000001",
            "nonce":"0",
            "symid": "0x000036564120696a0001",
            "pubkeyhash":"0xe46ab546f699c95a00840871b8085c6a661b571f",
            "country":0,
            "vflag":1,
            "status": 1,
            "credit":1,
            "role":1,
            "refcode":1,
            "writetime": 1563129385,
            "chainId": 3
        };
        //add v,r,s (tx sign)
        let tx = symjs.sigenr.citizenSign(params, pk);
        console.log(tx)
        let result = "0xf8678a000200000000000100028a00000000000000000001808080800001010180845d2b762901a081e693e8710f5041cb8d47c5b223e264e97296c6030695d2e96e8f092179f59da001d9bf1943b8fc1c7461f45a18557bf1e4c0412f14b6007152aeff69465df957"
        should.equal(result, tx, "citizen rlp encode error")
    });
});
