let helper = require('../../utils/helper');

function SctFormat (type, method, params) {
    this.type = type;
    this.method = method;
    this.params = params;
}

SctFormat.prototype.raw = function () {
    let sct = [this.type, this.method, helper.paramsToHex(this.params)];
    return helper.encodeRlp(sct).toString('hex');
};

let sct20 = (function () {
    let type = 20;

    return {
        create: function (name, symbol, totalSupply, ownerSymId) {
            return new SctFormat(type, 0, [name, symbol, totalSupply, ownerSymId]);
        },

        transfer: function (from, quantity) {
            return new SctFormat(type, 1, [from, quantity]);
        },

        transferFrom: function (from, to, quantity) {
            return new SctFormat(type, 2, [from, to, quantity]);
        },

        allowance: function (from, quantity) {
            return new SctFormat(type, 3, [from, quantity]);
        },

        mint: function (from, quantity) {
            return new SctFormat(type, 4, [from, quantity]);
        },

        burn: function (from, quantity) {
            return new SctFormat(type, 5, [from, quantity]);
        },

        pause: function () {
            return new SctFormat(type, 6, []);
        },

        unpause: function () {
            return new SctFormat(type, 7, []);
        }
    };
})();

module.exports = sct20;
