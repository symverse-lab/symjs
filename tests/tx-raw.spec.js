import Sct20 from '../src/rpcapi/sct/sct-20';

/**
 * users.spec.js
 */
const should = require('should');
const Symjs =  require ('../index.js');
var utils = require('web3-utils');

describe('라이브러리 기능 체크', function () {
    const symjs = new Symjs();
    it('Tx Raw encode', () => {
        const pk = "e72b3b417632c71c22579a7cb255c5fddbb3cc9f05a8d253ed7582ad5ed947ba";
        //tx 데이터 작성
        var params = {
            "from":"0x00021000000000010002",
            "nonce":"1",
            "gasPrice": 5,
            "gasLimit": 41000,
            "to": "0x00000000000123456789",
            "value": 211112,
            "workNodes": ["0x00021000000000010002"],
            "chainId": 7777
        };
        //add v,r,s (tx sign)
        let tx = symjs.tx.signer(params, pk);
        let result = "0xf8708a00021000000000010002010582a0288a00000000000123456789830338a88080cb8a0002100000000001000280a023681ba38f8d7c9c735e38dbe2ed77f17b07e46bc7158728af6c3c1fe5b93efba066c733e025c56cb14a45589fd02b08f9b90909ecd98433ff23fb819b02295c54"
        //console.log(Symjs.utils.decodeRlp(tx))
        should.equal(result, tx, "tx rlp encode error")
    });


    it('SCTx Raw encode', () => {
        const pk = "e72b3b417632c71c22579a7cb255c5fddbb3cc9f05a8d253ed7582ad5ed947ba";
        //tx 데이터 작성
        var params = {
            from: "0x00021000000000010002",
            nonce:"0x3",
            gasPrice: '0x09184e72a000000',
            gasLimit: '0x271000',
            workNodes: ["0x00021000000000010002"],
            sct: true,
            input: new Sct20().create("Symverse", "SYM", "4000000000", "0x00021000000000010002").raw,
            chainId: 7777
        };
        //add v,r,s (tx sign)
        let tx = symjs.tx.signer(params, pk);
    });



    it('Citizen Tx Raw encode', () => {
        const pk = "6760890b1635d3e9a2a2205b5eaaad41d595373389707300d6624987cf3745e9";
        //tx 데이터 작성
        var params = {
            "from":"0x00020000000000010002",
            "to":"0x123456789abcde000000",
            "nonce":"0",
            "symid": "0x000036564120696a0001",
            "pubkeyhash":"0xe46ab546f699c95a00840871b8085c6a661b571f",
            "country":1,
            "vflag":1,
            "status":1,
            "credit":1,
            "role":1,
            "refcode":1,
            "value": 211112,
            "notbefore": 20180327,
            "notafter": 20190329,
            "writetime": 20180328121530,
            "chainId": 7777
        };
        //add v,r,s (tx sign)
        let tx = symjs.tx.citizenSigner(params, pk);
        let result = "0xf8918a000200000000000100028a123456789abcde000000808a000036564120696a000194e46ab546f699c95a00840871b8085c6a661b571f010101010101840133ed67840134147986125a994a04ba01a05d7f0af72877c4f6f37ae7db10d8459f53290ec25d8bd53dee181b9cf36d0889a03dccd5d3f7ebd659e42eb1119d711532bf924d3e60f464dec4571b1546e8e21f"
        should.equal(result, tx, "citizen rlp encode error")
    });

});
