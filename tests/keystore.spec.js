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
        const temp = {"address":"00020000000000010002","crypto":{"cipher":"aes-128-ctr","ciphertext":"30468512e2b8df3f45531531fdff9a2fcaef33b76c4bd06f79ef1b985407e4c5","cipherparams":{"iv":"2c187eddfb5b00c1e81521e7f785e9d9"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"391ccada4b6a69bc07271b28f5e992178cbe92f8f6f5bdc09a61c3dbaa868a91"},"mac":"8d29358158dfde6f656a44f6f81cbcfc425ae7f2c6b39267f25bbfe8e46f0e20"},"id":"5ab33640-b6bb-4a68-8f05-227781329c21","version":3}
        const pk = await SymJs.keystore.unlock(temp, "1234")
        console.log(pk.toString('hex'))
    });
});
