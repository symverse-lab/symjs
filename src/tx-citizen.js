'use strict';

import helper from './utils/helper';
import BN from 'bn.js';

function _classCallCheck (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

let ethUtil = require('ethereumjs-util');
let fees = require('ethereum-common/params.json');

// secp256k1n/2
let N_DIV_2 = new BN('7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0', 16);

/**
 * Creates a new transaction object.
 *
 * @example
 * let rawTx = {
 *   nonce: '00',
 *   gasPrice: '09184e72a000',
 *   gasLimit: '2710',
 *   to: '0000000000000000000000000000000000000000',
 *   value: '00',
 *   data: '7f7465737432000000000000000000000000000000000000000000000000000000600057',
 *   v: '1c',
 *   r: '5e1d3a76fbf824220eafc8c79ad578ad2b67d01b0c2425eb1f1347e8f50882ab',
 *   s: '5bd428537f05f9830e93792f90ea6a3e2d1ee84952dd96edbae9f658f831ab13'
 * };
 * let tx = new Transaction(rawTx);
 *
 * @class
 * @param {Buffer | Array | Object} data a transaction can be initiailized with either a buffer containing the RLP serialized transaction or an array of buffers relating to each of the tx Properties, listed in order below in the exmple.
 *
 * Or lastly an Object containing the Properties of the transaction like in the Usage example.
 *
 * For Object and Arrays each of the elements can either be a Buffer, a hex-prefixed (0x) String , Number, or an object with a toBuffer method such as Bignum
 *
 * @property {Buffer} raw The raw rlp encoded transaction
 * @param {Buffer} data.from nonce number
 * @param {Buffer} data.to transaction gas limit
 * @param {Buffer} data.nonce transaction gas price
 * @param {Buffer} data.symid to the to address
 * @param {Buffer} data.pubkeyhash the amount of ether sent
 * @param {Buffer} data.pubkeyhash the amount of ether sent
 * @param {Buffer} data.pubkeyhash the amount of ether sent
 * @param {Buffer} data.pubkeyhash the amount of ether sent
 * @param {Buffer} data.pubkeyhash the amount of ether sent
 * @param {Buffer} data.pubkeyhash the amount of ether sent
 * @param {Buffer} data.pubkeyhash the amount of ether sent
 * @param {Buffer} data.v EC signature parameter
 * @param {Buffer} data.r EC signature parameter
 * @param {Buffer} data.s EC recovery ID
 * @param {Number} data.chainId EIP 155 chainId - mainnet: 1, ropsten: 3
 * */

let CitizenTransaction = (function () {
    function CitizenTransaction (data) {
        _classCallCheck(this, CitizenTransaction);
        data = data || {};
        let fields = [{
            name: 'from',
            allowZero: true,
            length: 10,
            default: Buffer.from([])
        }, {
            name: 'to',
            allowZero: true,
            length: 10,
            default: Buffer.from([])
        }, {
            name: 'nonce',
            allowLess: true,
            default: Buffer.from([])
        }, {
            name: 'symId',
            allowZero: true,
            length: 10,
            default: Buffer.from([])
        }, {
            name: 'aKeyPubH',
            length: 32,
            allowLess: true,
            default: Buffer.from([])
        }, {
            name: 'vFlag',
            allowZero: true,
            default: Buffer.from([])
        }, {
            name: 'country',
            allowZero: true,
            default: Buffer.from([])
        }, {
            name: 'status',
            allowZero: true,
            default: Buffer.from([])
        }, {
            name: 'credit',
            allowLess: true,
            default: Buffer.from([])
        }, {
            name: 'role',
            allowZero: true,
            default: Buffer.from([])
        }, {
            name: 'refCode',
            allowZero: true,
            default: Buffer.from([])
        }, {
            name: 'writetime',
            allowZero: true,
            default: Buffer.from([])
        }, {
            name: 'v',
            default: Buffer.from([])
        }, {
            name: 'r',
            length: 32,
            allowZero: true,
            allowLess: true,
            default: Buffer.from([])
        }, {
            name: 's',
            length: 32,
            allowZero: true,
            allowLess: true,
            default: Buffer.from([])
        }];

        /**
         * Returns the rlp encoding of the transaction
         * @method serialize
         * @return {Buffer}
         * @memberof Transaction
         * @name serialize
         */
        // attached serialize
        helper.defineProperties(this, fields, data);

        /**
         * @property {Buffer} from (read only) sender address of this transaction, mathematically derived from other parameters.
         * @name from
         * @memberof Transaction
         */
        Object.defineProperty(this, 'from', {
            enumerable: true,
            configurable: true,
            get: this.getSenderAddress.bind(this)
        });

        // calculate chainId from signature
        let sigV = ethUtil.bufferToInt(this.v);
        let chainId = sigV;
        if (chainId < 0) chainId = 0;

        // set chainId
        this._chainId = chainId || data.chainId || 0;
        this._homestead = true;
    }

    /**
     * If the tx's `to` is to the creation address
     * @return {Boolean}
     */

    CitizenTransaction.prototype.toCreationAddress = function toCreationAddress () {
        return this.to.toString('hex') === '';
    };

    /**
     * Computes a sha3-256 hash of the serialized tx
     * @param {Boolean} [includeSignature=true] whether or not to inculde the signature
     * @return {Buffer}
     */

    CitizenTransaction.prototype.hash = function hash (includeSignature) {
        if (includeSignature === undefined) includeSignature = true;

        let items = void 0;
        if (includeSignature) {
            items = this.raw;
        } else {
            if (this._chainId > 0) {
                let raw = this.raw.slice();
                this.v = this._chainId;
                this.r = 0;
                this.s = 0;
                items = this.raw;
                this.raw = raw;
            } else {
                items = this.raw.slice(0, 6);
            }
        }

        // create hash
        return helper.rlphash(items);
    };

    /**
     * returns the public key of the sender
     * @return {Buffer}
     */

    CitizenTransaction.prototype.getChainId = function getChainId () {
        return this._chainId;
    };

    /**
     * returns the sender's address
     * @return {Buffer}
     */

    // CitizenTransaction.prototype.getSenderAddress = function getSenderAddress () {
    //     if (this._from) {
    //         return this._from;
    //     }
    //     let pubkey = this.getSenderPublicKey();
    //     this._from = helper.publicToAddress(pubkey);
    //     return this._from;
    // };

    /**
     * returns the public key of the sender
     * @return {Buffer}
     */

    CitizenTransaction.prototype.getSenderPublicKey = function getSenderPublicKey () {
        if (!this._senderPubKey || !this._senderPubKey.length) {
            if (!this.verifySignature()) throw new Error('Invalid Signature');
        }
        return this._senderPubKey;
    };

    /**
     * Determines if the signature is valid
     * @return {Boolean}
     */

    CitizenTransaction.prototype.verifySignature = function verifySignature () {
        let msgHash = this.hash(false);
        // All transaction signatures whose s-value is greater than secp256k1n/2 are considered invalid.
        if (this._homestead && new BN(this.s).cmp(N_DIV_2) === 1) {
            return false;
        }

        try {
            let v = ethUtil.bufferToInt(this.v);
            if (this._chainId > 0) {
                v -= this._chainId * 2 + 8;
            }
            this._senderPubKey = ethUtil.ecrecover(msgHash, v, this.r, this.s);
        } catch (e) {
            return false;
        }

        return !!this._senderPubKey;
    };

    /**
     * sign a transaction with a given a private key
     * @param {Buffer} privateKey
     */

    CitizenTransaction.prototype.sign = function sign (privateKey) {
        let msgHash = this.hash(false);
        let sig = ethUtil.ecsign(msgHash, privateKey);
        sig.v = sig.v - 27;
        Object.assign(this, sig);
    };

    /**
     * The amount of gas paid for the data in this tx
     * @return {BN}
     */

    CitizenTransaction.prototype.getDataFee = function getDataFee () {
        let data = this.raw[5];
        let cost = new BN(0);
        for (let i = 0; i < data.length; i++) {
            data[i] === 0 ? cost.iaddn(fees.txDataZeroGas.v) : cost.iaddn(fees.txDataNonZeroGas.v);
        }
        return cost;
    };

    /**
     * the minimum amount of gas the tx must have (DataFee + TxFee + Creation Fee)
     * @return {BN}
     */

    CitizenTransaction.prototype.getBaseFee = function getBaseFee () {
        let fee = this.getDataFee().iaddn(fees.txGas.v);
        if (this._homestead && this.toCreationAddress()) {
            fee.iaddn(fees.txCreation.v);
        }
        return fee;
    };

    /**
     * the up front amount that an account must have for this transaction to be valid
     * @return {BN}
     */

    CitizenTransaction.prototype.getUpfrontCost = function getUpfrontCost () {
        return new BN(this.gasLimit).imul(new BN(this.gasPrice)).iadd(new BN(this.value));
    };

    /**
     * validates the signature and checks to see if it has enough gas
     * @param {Boolean} [stringError=false] whether to return a string with a dscription of why the validation failed or return a Bloolean
     * @return {Boolean|String}
     */

    CitizenTransaction.prototype.validate = function validate (stringError) {
        let errors = [];
        if (!this.verifySignature()) {
            errors.push('Invalid Signature');
        }

        if (this.getBaseFee().cmp(new BN(this.gasLimit)) > 0) {
            errors.push(['gas limit is too low. Need at least ' + this.getBaseFee()]);
        }

        if (stringError === undefined || stringError === false) {
            return errors.length === 0;
        } else {
            return errors.join(' ');
        }
    };

    return CitizenTransaction;
}());

export default CitizenTransaction;
