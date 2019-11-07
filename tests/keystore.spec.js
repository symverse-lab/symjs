/**
 * keystore.spec.js
 */
import should  from 'should';
import SymJs from  '../index.js';

describe("Keystore Test", function () {
    it('Create Keystore', async() => {
        const keystore = await SymJs.keystore.create("1234")
        console.log(keystore)
    });
    it('Unlock Test', async() => {
        const temp = {"address":"00021000000000010002","crypto":{"cipher":"aes-128-ctr","ciphertext":"ef9fbb32eb35be8a5cec80966adae0e702b95684789111ea9bb4b8baf3f6764b","cipherparams":{"iv":"b20ebf80c8dee5774c7a43daf9f53c90"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"8cc972a0167c5e0eb790ecde0fbb25195e9d86f8efb5bc30f04cec3f40d7e345"},"mac":"ebc768cbae6bb9e2f6aedf4aff7e38e04b68763cf958af9b42f055abaea11efc"},"id":"5a98b468-6f3d-4375-a9b7-033d6cba996e","version":3}
        const pk = await SymJs.keystore.unlock(temp, "1234")
        console.log(pk.toString('hex'))
    });
});
