import helper from '../../utils/helper';

function SctFormat (type, method, params) {
    this.type = type;
    this.method = method;
    this.params = params;
}

SctFormat.prototype.raw = function () {
    let sct = [helper.paramsToHex(this.type), helper.paramsToHex(this.method), helper.paramsToHex(this.params)];
    return helper.encodeRlp(sct).toString('hex');
};

let sct20 = (function () {
    let type = 20;

    return {
        create: function (name, symbol, totalSupply, ownerSymId) {
            return new SctFormat(type, 0, [name, symbol, totalSupply, ownerSymId]);
        },

        transfer: function (to, amount) {
            return new SctFormat(type, 1, [to, amount]);
        },

        transferFrom: function (from, to, amount) {
            return new SctFormat(type, 2, [from, to, amount]);
        },

        allowance: function (to, amount) {
            return new SctFormat(type, 3, [to, amount]);
        },

        decreaseAllowance: function (to, amount) {
            return new SctFormat(type, 4, [to, amount]);
        },

        mint: function (to, amount) {
            return new SctFormat(type, 5, [to, amount]);
        },

        burn: function (to, amount) {
            return new SctFormat(type, 6, [to, amount]);
        },
        pause: function () {
            return new SctFormat(type, 7, []);
        },
        unpause: function () {
            return new SctFormat(type, 8, []);
        },
        transferOwner: function () {
            return new SctFormat(type, 9, []);
        },
        lockTransfer: function (to, amount, lockAmount) {
            return new SctFormat(type, 10, [to, amount, lockAmount]);
        },
        unlockAmount: function (to, amount) {
            return new SctFormat(type, 11, [to, amount]);
        },
        restoreLockAmount: function (to, amount) {
            return new SctFormat(type, 12, [to, amount]);
        },
        addLockAmount: function (amount) {
            return new SctFormat(type, 13, [amount]);
        },
        subLockAmount: function (to, amount) {
            return new SctFormat(type, 14, [amount]);
        },
        AccountLock: function (to, amount) {
            return new SctFormat(type, 15, [amount]);
        },
        AccountUnLock: function (to, amount) {
            return new SctFormat(type, 16, [amount]);
        },
    };
})();

export default sct20;
