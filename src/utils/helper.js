const secp256k1 = require('secp256k1');
const assert = require('assert');
const RLP = require('rlp');
const { SHA3 } = require('sha3');
const BN = require('bn.js');
const ethUtil = require('ethereumjs-util');
const numberToBN = require('number-to-bn');

const _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj; };

const DEFAULT_BLOCK = 'latest';
const PADDING_BLOCK = 'padding';

const isHex = (value) => {
    const hexRegEx = /([0-9]|[a-f])/gim;
    return typeof value === 'string' && (value.match(hexRegEx) || []).length === value.length;
    // return true;
};

const c10 = (value) => {
    return isHex(value) ? new BN(value, 10).toString() : value;
};

const appendHex = (str) => {
    return !isHex(str) ? '0x' + str : str;
};

const toBN = function (number) {
    try {
        return numberToBN.apply(null, arguments);
    } catch (e) {
        throw new Error(e + ' Given value: "' + number + '"');
    }
};

const hexToBN = (value) => {
    if (!value) {
        return value;
    }
    return toBN(c10(value));
};

const stringToHex = (value) => {
    if (!value || isHex(value)) {
        return value;
    }
    let hex = '';
    for (let i = 0; i < value.length; i++) {
        hex += '' + value.charCodeAt(i).toString(16);
    }
    return '0x' + hex;
};

const hexToNumber = (value) => {
    if (!value) {
        return value;
    }
    return toBN(value).toNumber();
};

const hexToNumberString = (value) => {
    if (!value) return value;
    return toBN(value).toString(10);
};

const numberToHex = (value) => {
    if (isHex(value)) {
        return value;
    }
    let number = toBN(value);
    let result = number.toString(16);
    return number.lt(new BN(0)) ? '-0x' + result.substr(1) : '0x' + result;
};

function paramsToHex (params) {
    for (let i in params) {
        if (Array.isArray(params[i])) {
            for (let j in params[i]) {
                params[i][j] = toHex(params[i][j]);
            }
        } else {
            params[i] = toHex(params[i]);
        }
    }
    return params;
}

const toHex = function (value, returnType) {
    if (isAddress(value)) {
        return returnType ? 'address' : '0x' + value.toLowerCase().replace(/^0x/i, '');
    }

    if (_.isBoolean(value)) {
        return returnType ? 'bool' : value ? '0x01' : '0x00';
    }

    if (_.isObject(value) && !isBigNumber(value) && !isBN(value)) {
        return returnType ? 'string' : utf8ToHex(JSON.stringify(value));
    }

    // if its a negative number, pass it through numberToHex
    if (_.isString(value)) {
        if (value.indexOf('-0x') === 0 || value.indexOf('-0X') === 0) {
            return returnType ? 'int256' : numberToHex(value);
        } else if (value.indexOf('0x') === 0 || value.indexOf('0X') === 0) {
            return returnType ? 'bytes' : value;
        } else if (!isFinite(value)) {
            return returnType ? 'string' : utf8ToHex(value);
        }
    }

    return returnType ? (value < 0 ? 'int256' : 'uint256') : numberToHex(value);
};

const isBigNumber = function (object) {
    return object && object.constructor && object.constructor.name === 'BigNumber';
};

const isBN = function (object) {
    return object instanceof BN ||
        (object && object.constructor && object.constructor.name === 'BN');
};

const isAddress = function (address) {
    // check if it has the basic requirements of an address
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        return false;
        // If it's ALL lowercase or ALL upppercase
    } else if (/^(0x|0X)?[0-9a-f]{40}$/.test(address) || /^(0x|0X)?[0-9A-F]{40}$/.test(address)) {
        return true;
        // Otherwise check each case
    } else {
        return checkAddressChecksum(address);
    }
};

const checkAddressChecksum = function (address) {
    // Check each case
    address = address.replace(/^0x/i, '');
    var addressHash = sha3(address.toLowerCase()).replace(/^0x/i, '');

    for (var i = 0; i < 40; i++) {
        // the nth letter should be uppercase if the nth digit of casemap is 1
        if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
            return false;
        }
    }
    return true;
};

const utf8ToHex = function (str) {
    str = utf8.encode(str);
    var hex = '';

    // remove \u0000 padding from either side
    str = str.replace(/^(?:\u0000)*/, '');
    str = str.split('').reverse().join('');
    str = str.replace(/^(?:\u0000)*/, '');
    str = str.split('').reverse().join('');

    for (var i = 0; i < str.length; i++) {
        var code = str.charCodeAt(i);
        // if (code !== 0) {
        var n = code.toString(16);
        hex += n.length < 2 ? '0' + n : n;
        // }
    }

    return '0x' + hex;
};

const toUnit = (balance, unit, decimal) => {
    function unitConvert (uint) {
        switch (uint) {
            case 'tether':
                return 30;
            case 'gether':
                return 27;
            case 'mether':
                return 24;
            case 'kether':
                return 21;
            case 'ether':
                return 18;
            case 'milliether':
                return 15;
            case 'microether':
                return 12;
            case 'picoether':
                return 6;
            case 'femtoether':
                return 3;
            default:
                return 0;
        }
    }
    const pow = unitConvert(unit);

    if (!decimal) { decimal = 2; }

    return Math.floor(balance / Math.pow(10, pow) * (Math.pow(10, decimal))) / (Math.pow(10, decimal));
};

const toHug = (balance) => {
    return balance * Math.pow(10, 18);
};

const rlphash = (datas) => {
    return sha3(encodeRlp(datas));
};

const encodeRlp = (datas) => {
    return RLP.encode(datas);
};

const decodeRlp = (raw) => {
    return RLP.decode(raw);
};

const sha3 = (datas) => {
    const hash = new SHA3(256);
    return hash.update(datas).digest();
};

const publicToAddress = (pubKey, sanitize) => {
    pubKey = exports.toBuffer(pubKey);
    if (sanitize && pubKey.length !== 64) {
        pubKey = secp256k1.publicKeyConvert(pubKey, false).slice(1);
    }
    assert(pubKey.length === 64);
    // Only take the lower 160bits of the hash
    return sha3(pubKey).slice(-20);
};

/**
 * Defines properties on a `Object`. It make the assumption that underlying data is binary.
 * @param {Object} self the `Object` to define properties on
 * @param {Array} fields an array fields to define. Fields can contain:
 * * `name` - the name of the properties
 * * `length` - the number of bytes the field can have
 * * `allowLess` - if the field can be less than the length
 * * `allowEmpty`
 * @param {*} data data to be validated against the definitions
 */
const defineProperties = (self, fields, data) => {
    self.raw = [];
    self._fields = [];
    // attach the `toJSON`
    self.toJSON = function (label) {
        if (label) {
            let obj = {};
            self._fields.forEach(function (field) {
                obj[field] = '0x' + self[field].toString('hex');
            });
            return obj;
        }
        return ethUtil.baToJSON(this.raw);
    };

    self.serialize = function serialize () {
        return RLP.encode(self.raw);
    };

    fields.forEach(function (field, i) {
        self._fields.push(field.name);
        function getter () {
            return self.raw[i];
        }
        function setter (v) {
            if (Array.isArray(v)) {
                for (let i in v) {
                    v[i] = ethUtil.toBuffer(v[i]);
                }
            } else {
                v = ethUtil.toBuffer(v);
                if (v.toString('hex') === '00' && !field.allowZero) {
                    v = Buffer.allocUnsafe(0);
                }
                if (field.allowLess && field.length) {
                    v = ethUtil.stripZeros(v);
                    assert(field.length >= v.length, 'The field ' + field.name + ' must not have more ' + field.length + ' bytes');
                } else if (!(field.allowZero && v.length === 0) && field.length) {
                    assert(field.length === v.length, 'The field ' + field.name + ' must have byte length of ' + field.length);
                }
            }
            self.raw[i] = v;
        }
        Object.defineProperty(self, field.name, {
            enumerable: true,
            configurable: true,
            get: getter,
            set: setter
        });
        if (field.default) {
            self[field.name] = field.default;
        }
        // attach alias
        if (field.alias) {
            Object.defineProperty(self, field.alias, {
                enumerable: false,
                configurable: true,
                set: setter,
                get: getter
            });
        }
    });
    // if the constuctor is passed data
    if (data) {
        if (typeof data === 'string') {
            data = Buffer.from(ethUtil.stripHexPrefix(data), 'hex');
        }
        if (Buffer.isBuffer(data)) {
            data = RLP.decode(data);
        }
        if (Array.isArray(data)) {
            if (data.length > self._fields.length) {
                throw new Error('wrong number of fields in data');
            }
            // make sure all the items are buffers
            data.forEach(function (d, i) {
                self[self._fields[i]] = ethUtil.toBuffer(d);
            });
        } else if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
            let keys = Object.keys(data);
            fields.forEach(function (field) {
                if (keys.indexOf(field.name) !== -1) self[field.name] = data[field.name];
                if (keys.indexOf(field.alias) !== -1) self[field.alias] = data[field.alias];
            });
        } else {
            throw new Error('invalid data');
        }
    }
};

export default {
    DEFAULT_BLOCK,
    PADDING_BLOCK,
    isHex,
    appendHex,
    c10,
    toBN,
    hexToBN,
    hexToNumber,
    hexToNumberString,
    paramsToHex,
    stringToHex,
    numberToHex,
    toHug,
    toUnit,
    rlphash,
    sha3,
    encodeRlp,
    decodeRlp,
    defineProperties,
    publicToAddress
};
