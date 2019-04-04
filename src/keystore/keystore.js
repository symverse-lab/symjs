var keythereum = require('./keyetherume-sha3');

var SymverseKeystore = {
    privateCreateOptions: { keyBytes: 32, ivBytes: 16 },
    keystoreCreateOptions: {
        kdf: 'scrypt',
        cipher: 'aes-128-ctr',
        kdfparams: {
            c: 262144,
            dklen: 32,
            prf: 'hmac-sha256'
        }
    },
    listener: {
        PRIVATEKEY_CREATED: 'PRIVATEKEY_CREATED',
        KEYSTORE_CREATED: 'KEYSTORE_CREATED'
    },

    /**
     * keystore 생성
     * @param password string
     * @param addData function
     * @param listener function
     * @return Promise
     */
    create (password, addData, listener) {
        return new Promise((res, rej) => {
            this.createPrivateKey(listener)
                .then(dk => {
                    return this.createKeystore(dk, password, listener);
                }).then(keystore => {
                    res(keystore);
                }).catch(e => {
                    rej(e);
                });
        });
    },

    /**
     * privateKey 생성
     * @param createListener function
     * @return Promise
     */
    createPrivateKey (createListener) {
        const promise = new Promise((res, rej) => {
            keythereum.create(this.privateCreateOptions, (dk) => {
                if (createListener) createListener(this.listener.PRIVATEKEY_CREATED);
                this.pk = dk.privateKey;
                res(dk);
            });
        });
        return promise;
    },

    /**
     * keysotre 생성
     * @param dk object|array
     * @param password object|array
     * @param createListener function
     * @return Promise
     */
    createKeystore (dk, password, createListener) {
        return new Promise((res, rej) => {
            keythereum.dump(password, dk.privateKey, dk.salt, dk.iv, this.keystoreCreateOptions, (keystore) => {
                if (createListener && createListener) {
                    createListener(this.listener.KEYSTORE_CREATED);
                }
                res(keystore);
            });
        });
    },

    /**
     * 계정 잠금 해제
     * @param keystore object
     * @param passphrase string
     * @return Promise
     */
    unlock (keystore, passphrase) {
        return new Promise((res, rej) => {
            keythereum.recover(passphrase, keystore, privateKey => {
                res(privateKey);
            });
        });
    }
};

module.exports = SymverseKeystore;
