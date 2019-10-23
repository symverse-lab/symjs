/**
 * keystore.spec.js
 */
const should = require('should');
const SymJs =  require ('../index.js');

describe("Keystore Test", function () {
    it('Create Keystore', async() => {
        const keystore = await SymJs.keystore.create("1234")
        console.log(keystore)
    });
    it('Unlock Test', async() => {
        const temp = {"address":"00021000000000010002","crypto":{"cipher":"aes-128-ctr","ciphertext":"bf53196065fcba9bf969d6588b46ad54a45bcdf0e2db755967367de7a298e3c4","cipherparams":{"iv":"1d6cfedd1e95d08f4b461029f764b5a6"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"e38705bef79bfdb29637954b5ff00e50cac35c4a1659642bb1f5c83a9983fbed"},"mac":"f98c3684766c03f746d1a41f04a366fe5f52a5d02c73f64ae3cf1069ad71dc93"},"id":"21b5d7f8-31dc-4e3f-abad-ae1fd7938877","version":3}
        const pk = await SymJs.keystore.unlock(temp, "1234")
        console.log(pk.toString('hex'))
    });
});
