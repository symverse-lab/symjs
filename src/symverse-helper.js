const BN = require('bn.js');
const numberToBN = require('number-to-bn');

const isHex = (value) => {
    const hexRegEx = /([0-9]|[a-f])/gim;
    return typeof value === 'string' && (value.match(hexRegEx) || []).length === value.length;
    // return true;
};

const c10 = function (value) {
    return isHex(value) ? new BN(value, 10).toString() : value;
};

const appendHex = function (str) {
    return !isHex(str) ? '0x' + str : str;
};

let toBN = function (number) {
    try {
        return numberToBN.apply(null, arguments);
    } catch (e) {
        throw new Error(e + ' Given value: "' + number + '"');
    }
};

const hexToBN = function (value) {
    if (!value) {
        return value;
    }

    return toBN(c10(value));
};

const hexToNumber = function (value) {
    if (!value) {
        return value;
    }

    return toBN(value).toNumber();
};

const hexToNumberString = function (value) {
    if (!value) return value;
    return toBN(value).toString(10);
};

const numberToHex = (value) => {
    if (!value || isHex(value)) {
        return value;
    }

    let number = toBN(value);
    let result = number.toString(16);

    return number.lt(new BN(0)) ? '-0x' + result.substr(1) : '0x' + result;
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

const toWei = (balance) => {
    return balance * Math.pow(10, 18);
};

module.exports = {
    isHex,
    appendHex,
    c10,
    toBN,
    hexToBN,
    hexToNumber,
    hexToNumberString,
    numberToHex,
    toWei,
    toUnit
};
