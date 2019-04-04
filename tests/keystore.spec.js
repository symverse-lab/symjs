/**
 * keystore.spec.js
 */
const should = require('should');
const Symjs =  require ('../index.js');

const temp = {"address":"00020000000000010002","crypto":{"cipher":"aes-128-ctr","ciphertext":"2292f82bd00424d6983e0d90016f855ee72adf8e7ea2a103ce60f289c998d4e8","cipherparams":{"iv":"91a39791dd34ca83dd93138645e21899"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"75f3b7ac7df2f8189392bd5eb1f0d13393e4eddd347a6cea6e36599f775a7fe9"},"mac":"16a61518f169c17a3c96b513234c4f05b1a9e248f8594cf646e100bf1065dae5"},"id":"63302c20-514f-4093-8ec0-f826842943bb","version":3}

describe("Keystore Test", function () {
    it('Create Keystore', async() => {
        const keystore = await Symjs.keystore.create("1234")
        console.log(keystore)
    });
    it('Unlock Test', () => {
        Symjs.keystore.unlock(temp, "1234").then(pk => {
            console.log(pk.toString('hex'));
        })
    });
});
