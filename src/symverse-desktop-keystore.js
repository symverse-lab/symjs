/* eslint-disable prefer-promise-reject-errors */
import storage from 'electron-json-storage';
import keythereum from 'keythereum';
import aes256 from 'aes256';
import md5 from 'blueimp-md5';
import { machineId } from 'node-machine-id';

let defaultKeystorePath = () => {
    return storage.getDefaultDataPath() + '/' + md5('keystore');
};

let _toArray = (value) => {
    if (Array.isArray(value)) {
        return value;
    }
    return [value];
};

const SymverseKeystore = {

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

    cipher: '',
    filePath: defaultKeystorePath(),
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
                .then(dk => this.createKeystore(dk, password, listener))
                .then(keystore => {
                    if (typeof (addData) === 'object') keystore = Object.assign(keystore, addData);
                    return keystore;
                }).then((keystore) => {
                    this.import(keystore).then((fileName) => {
                        res(keystore);
                    });
                }).catch(e => {
                    rej(e);
                });
        });
    },

    /**
     * privateKey 생성
     * @param importKeystore object|array
     * @return Promise
     */
    createPrivateKey (createListener) {
        const promise = new Promise((res, rej) => {
            keythereum.create(this.privateCreateOptions, (dk) => {
                if (createListener) createListener(this.listener.PRIVATEKEY_CREATED);
                res(dk);
            });
        });
        return promise;
    },

    /**
     * keysotre 생성
     * @param dk object|array
     * @param password object|array
     * @param password createListener
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
     * keystore 가져오기
     * @param importKeystore object|array
     * @return Promise
     */
    import (importKeystore) {
        importKeystore = _toArray(importKeystore);
        return this.export().then((ownKeystore) => {
            // 기존 키 없을 경우
            if (!ownKeystore || ownKeystore.length === 0) {
                this.write(importKeystore);
            } else {
                this.write(this._mergeByAccount(ownKeystore, importKeystore));
            }
        });
    },

    /**
     * keystore 특정 address 의 데이터 수정하기
     * @param address String
     * @param updateData object
     * @return Promise
     */
    update (address, updateData) {
        this.export().then((keystoreList) => {
            if (keystoreList.length > 0) {
                let findedIndex = keystoreList.findIndex(keystore => {
                    return keystore.address === address;
                });
                console.log(address, keystoreList);
                if (findedIndex !== -1) {
                    keystoreList[findedIndex] = Object.assign({}, keystoreList[findedIndex], updateData);
                    console.log(keystoreList);
                    this.write(keystoreList);
                }
            }
        });
    },

    /**
     * local 에 보관중인 keystore 전체 내보내기
     * @return Promise
     */
    export () {
        return this.getKey().then(key => {
            return this.jsonCall(key);
        }).then(content => {
            return this.decryption(content);
        }).then(decryptionContent => {
            return JSON.parse(decryptionContent);
        }).catch(() => {
            return [];
        });
    },

    /**
     * 키스토어 파일 저장
     * @param keystore object|array
     * @return Promise
     */
    write (keystore) {
        if (!keystore) {
            return false;
        }
        keystore = _toArray(keystore);
        let fileName = md5('account');
        return this._keystoreLocalSave(fileName, keystore).then(() => {
            return fileName;
        });
    },

    /**
     * 키스토어 파일 저장
     * @param fileName string
     * @param keystore array
     * @return Promise
     */
    _keystoreLocalSave (fileName, keystoreList) {
        return new Promise((res, rej) => {
            this._encryptionKeystoreFileSave(fileName, keystoreList)
                .then(() => res());
        });
    },

    _encryptionKeystoreFileSave (fileName, keystoreList) {
        keystoreList = JSON.stringify(keystoreList);
        return this.encryption(keystoreList).then((encryptionContent) => {
            return encryptionContent;
        }).then(encryptionContent => {
            this.jsonSave(fileName, encryptionContent);
            return true;
        }).catch(e => {
            console.log(e);
        });
    },

    // 계정 잠금 해제
    unlock (keystore, passphrase) {
        return new Promise((res, rej) => {
            keythereum.recover(passphrase, keystore, privateKey => {
                res(privateKey);
            });
        });
    },
    getKey () {
        return new Promise((res, rej) => {
            this.jsonAllCall().then(obj => {
                let keys = Object.keys(obj);
                if (keys.length > 0) {
                    res(keys[0]);
                }
                rej(false);
            });
        });
    },
    // 키스토어 조건 검색
    _keystoreFindLoad (key, condition) {
        return new Promise((res, rej) => {
            this.hasJsonKey(key).then((has) => {
                if (has) {
                    this.export(key).then(keystore => {
                        let findedKeystoreContents = [];
                        for (let i in keystore) {
                            if (typeof condition === 'function' && condition(keystore[i])) {
                                findedKeystoreContents.push(keystore[i]);
                            }
                        }
                        res(findedKeystoreContents);
                    });
                } else {
                    rej('not is key = ' + key);
                }
            });
        });
    },
    // 한 keystore 파일에서 계정 merge
    _mergeByAccount (oldKeystore, newKeystore) {
        let mergeAccounts = [];
        let oldKeystoreAddressList = oldKeystore.map((keystore) => {
            return keystore.address;
        });

        for (let i in newKeystore) {
            if (oldKeystoreAddressList.indexOf(newKeystore[i].address) !== -1) {
                // TODO: 최신 데이터로 merge 필요
                continue;
            } else {
                mergeAccounts.push(newKeystore[i]);
            }
        }
        if (mergeAccounts.length > 0) {
            oldKeystore = oldKeystore.concat(mergeAccounts);
        }
        return oldKeystore;
    },

    // 암호화 모듈 호출
    getKeystoreContentEncryptionModule () {
        let cipher;
        return new Promise((res) => {
            if (this.cipher) {
                cipher = this.cipher;
                res(cipher);
            } else {
                machineId().then((id) => {
                    this.cipher = aes256.createCipher(id);
                    cipher = this.cipher;
                    res(cipher);
                });
            }
        });
    },

    // 암호화
    encryption (content) {
        return new Promise((res) => {
            this.getKeystoreContentEncryptionModule().then((cipher) => {
                res(cipher.encrypt(content));
            });
        });
    },
    // 복호화
    decryption (content) {
        return new Promise((res) => {
            this.getKeystoreContentEncryptionModule().then((cipher) => {
                res(cipher.decrypt(content));
            });
        });
    },
    // 파일 저장
    jsonSave (key, json) {
        this._jsonSetPath();
        return new Promise((res) => {
            storage.set(key, json, (error) => {
                if (error) throw error;
                res(true);
            });
        });
    },
    // 가져오기
    jsonCall (key) {
        this._jsonSetPath();
        return new Promise((res) => {
            storage.get(key, (error, data) => {
                if (error) throw error;
                res(data);
            });
        });
    },
    // 내부 데이터 가져오기
    jsonFindCall (key, idx) {
        this._jsonSetPath();
        return new Promise((res) => {
            storage.get(key, (error, data) => {
                if (error) throw error;
                res(data);
            });
        });
    },
    // 내부 데이터 가져오기
    jsonAllCall () {
        this._jsonSetPath();
        return new Promise((res) => {
            storage.getAll(function (error, data) {
                if (error) throw error;
                res(data);
            });
        });
    },
    // 파일 존제 여부
    hasJsonKey (key) {
        this._jsonSetPath();
        return new Promise((res) => {
            storage.has(key, (error, hasKey) => {
                if (error) throw error;
                if (hasKey) {
                    res(true);
                }
                res(false);
            });
        });
    },

    _jsonSetPath () {
        storage.setDataPath(this.filePath);
    }
};

export default SymverseKeystore;
