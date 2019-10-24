
/**
 * users.spec.js
 */
const should = require('should');
const SymJs =  require ('../index.js');

describe('라이브러리 기능 체크', function () {
    const symjs = new SymJs();
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
        let tx = symjs.sigenr.sign(params, pk);
        let result = "0xf8708a00021000000000010002010582a0288a00000000000123456789830338a88080cb8a0002100000000001000280a023681ba38f8d7c9c735e38dbe2ed77f17b07e46bc7158728af6c3c1fe5b93efba066c733e025c56cb14a45589fd02b08f9b90909ecd98433ff23fb819b02295c54"
        //console.log(SymJs.utils.decodeRlp(tx))
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
            chainId: 7777
        };
        //add v,r,s (tx sign)
        let tx = symjs.sigenr.sign(params, pk);
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

    it('ggggggg', () => {
        let list = {
            "0x0002c7daf74c6c120002":"0x51A0C26cFe1D29edEd04CEe6Ee2FE5cF7b8cFB5C",
            "0x0002c7DaF74C6aA20002":"0x80b8a2a29C4464258B66dC7017898aB32Ef0A7f7", //세종
            "0x0002c7Daf74C6aB20002":"0xFD47f3BC0146f84E6D7bC81e795E8FFbE7453645"  //세종

            //Testnet
            // "0x0002c7daf74c6c120002":"0x51A0C26cFe1D29edEd04CEe6Ee2FE5cF7b8cFB5C",
            // "0x00021000000000300002":"0x16A89eB8Ebb1d77D72a538e9a277C862A7eF2E9a",
            // "0x00021000000000330002":"0x23365d1E4d3c347BF1CD87F4801c092caf508Ac1",
            // "0x00021000000000350002":"0xAE967E86b7dee5D4B474504EaEe38929Fdf72d28",
            // "0x00021000000000360002":"0xC7E6B13fDE66952f88a5415296100684334EE42C",
            // "0x00021000000000260002":"0xf944A9C20670E963C6CceEEe360b37014CfF030B",
            // "0x00021000000000270002":"0x5Ba71d55f738dBFF5Be97C86BC4806c0f23b611D",
            // "0x00021000000000290002":"0x2C4c0aCdD138f6f16AC6F6a5270a3730e2d2BbF3",
            // "0x00021000000000320002":"0x8c0173ceF6026E2F4dc3Ba93db99e859B9d52C2c",
            // "0x00021000000000340002":"0x3aC9D16951b662988Ee530aF208DE6F75B020037",
            // "0x00021000000000280002":"0x48Dc8EcFBEA4A42714b605644A9546D9289d4FB6",
            // "0x00021000000000310002":"0x2E3b12602a6bcD612559b349DF6118369540A8c3",
            // "0x0002c7DaF74C6aA20002":"0x80b8a2a29C4464258B66dC7017898aB32Ef0A7f7", //세종
            // "0x0002c7Daf74C6aB20002":"0xFD47f3BC0146f84E6D7bC81e795E8FFbE7453645"  //세종
        }
        let rawList = []
        //const pk = "f85e4a56c5129804076c0bbdebf0c127c1cfc5fbe99f8e9dad534971df4527d2";
        const pk = "a53ded421dacc2310a1ed443f2ce8261f5583be3bca944787a1d4039b1b67357";
        for (var i in list){
            var params = {
                "from":"0x00020000000000010002",
                "to":  "0x00000000000000000001",
                "nonce":"0",
                "symid": i,
                "pubkeyhash": list[i],
                "country": null,
                "vflag":1,
                "status": 1,
                "credit":1,
                "role":1,
                "refcode":1,
                "chainId": 3
            };
            let tx = symjs.sigenr.citizenSign(params, pk);
            rawList.push(tx)
        }
        //tx 데이터 작성
        //add v,r,s (tx sign)
        console.log(rawList)
    });

});
