'use strict';

let promiseToCallback = require('promise-to-callback');

/**
 * Constructs the SymRPC instance
 *
 * @method SymRPC
 * @param {Object} cprovider the eth rpc provider web3 standard..
 * @param {Object} options the options, if any
 * @returns {Object} ethrpc instance
 */
function SymRPC (cprovider, options) {
    let self = this;
    let optionsObject = options || {};

    if (!(this instanceof SymRPC)) {
        throw new Error('the SymRPC object requires the "new" flag in order to function normally (i.e. `const eth = new SymRPC(provider);`).');
    }

    self.options = Object.assign({
        jsonSpace: optionsObject.jsonSpace || 0,
        max: optionsObject.max || 9999999999999
    });
    self.idCounter = Math.floor(Math.random() * self.options.max);
    self.setProvider = function (provider) {
        if (typeof provider !== 'object') {
            throw new Error('the SymRPC object requires that the first input \'provider\' must be an object, got \'' + typeof provider + '\' (i.e. \'const eth = new SymRPC(provider);\')');
        }

        self.currentProvider = provider;
    };
    self.setProvider(cprovider);
};

/**
 * The main send async method
 *
 * @method sendAsync
 * @param {Object} payload the rpc payload object
 * @param {Function} cb the async standard callback
 * @callback {Object|Array|Boolean|String} lety result instance output
 */
SymRPC.prototype.sendAsync = function sendAsync (payload, callback) {
    let self = this;
    self.idCounter = self.idCounter % self.options.max;
    let parsedPayload = createPayload(payload, self.idCounter++);

    let promise = new Promise(function (resolve, reject) {
        self.currentProvider.sendAsync(parsedPayload, function (err, response) {
            let responseObject = response || {};
            let payloadErrorMessage;
            let payloadError;
            if (err) {
                payloadErrorMessage = String(err);
                payloadError = new Error(payloadErrorMessage);
                payloadError.value = err;
                reject(payloadError);
                return;
            } else if (responseObject.error) {
                payloadError = responseObject.error;
                reject(payloadError);
            }
            resolve(responseObject.result);
        });
    });

    if (callback) {
        // connect promise resolve handlers to callback
        return promiseToCallback(promise)(callback);
    }

    // only return promise if no callback specified
    return promise;
};

/**
 * A simple create payload method
 *
 * @method createPayload
 * @param {Object} data the rpc payload data
 * @param {String} id the rpc data payload ID
 * @returns {Object} payload the completed payload object
 */
function createPayload (data, id) {
    return Object.assign({}, {
        id: id,
        jsonrpc: '2.0',
        params: []
    }, data);
}

export default SymRPC;
