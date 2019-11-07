import Methods from '../methods';

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

let sct40 = (function () {
    let type = 40;

    return {
        create: function (name, symbol, TotalCPoint, ownerSymId) {
            return new SctFormat(type, 0, [name, symbol, TotalCPoint, ownerSymId]);
        },

        createItem: function (items) {
            return new SctFormat(type, 1, items);
        },

        transfer: function (to, index) {
            return new SctFormat(type, 2, [to, index]);
        },

        transferFrom: function (from, to, index) {
            return new SctFormat(type, 3, [from, to, index]);
        },

        approve: function (to, index) {
            return new SctFormat(type, 4, [to, index]);
        },
        couponUse: function (index) {
            return new SctFormat(type, 5, [index]);
        },
        couponPause: function (index) {
            return new SctFormat(type, 6, [index]);
        },
        couponUnPause: function (index) {
            return new SctFormat(type, 7, [index]);
        },
        transferOwner: function (newOwner) {
            return new SctFormat(type, 8, [newOwner]);
        }
    };
})();

export default sct40;
