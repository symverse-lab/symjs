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
        approve: function (to, amount) {
            return new SctFormat(type, 3, [to, amount]);
        },
        decreaseApprove: function (to, amount) {
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
        transferOwner: function (newOwner) {
            return new SctFormat(type, 9, [newOwner]);
        }
    };
})();

export default sct20;
