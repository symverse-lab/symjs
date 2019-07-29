/**
 * keystore.spec.js
 */
const should = require('should');
const Symjs =  require ('../index.js');

const temp = {"address":"00020000000000010002","crypto":{"cipher":"aes-128-ctr","ciphertext":"dc297a424f69a1925cfa92aa6da21592713a05f7e9c2c6b241f3a2e228798ce8","cipherparams":{"iv":"1e19a3d8dffabff0ac17c15d1a4626e0"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"0782c8c2a38aa4ae95ae56efac98add966b36ce759d883531c2415c414960732"},"mac":"492aad1d6e9638c89d705355e0d7b3e88fcc47c785dd01adfe1426f20205de63"},"id":"f7a17ee2-772d-462d-9a78-623d6d15045e","version":3}


describe("Keystore Test", function () {
    it('Create Keystore', async() => {
        const keystore = await Symjs.keystore.create("1234")
        console.log(keystore)
    });
    it('Unlock Test', async() => {
        const pk = await Symjs.keystore.unlock(temp, "symverse321#@!_testnet")
        console.log("언락", pk.toString('hex'));
    });
});
