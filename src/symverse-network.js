var SymverseRpcInterface = require('./rpcapi/symverse-rpc-interface');
var ethereumRpcInterface = require('./rpcapi/ethereum-rpc-interface');
var HttpProvider = require('ethjs-provider-http');
var EthRPC = require('ethjs-rpc');


const SymverseNetwork = (function () {
    let engine = {};
    let engineConnected = false;
    const waitCount = 30;

    const eth = { by : new ethereumRpcInterface(rpc)};
    const sym = { by : new SymverseRpcInterface(rpc)};

    // RPC 연결
    function connect (url) {
        setHttpProvider(url);
        return httpRpcConnect();
    }

    // RPC 연결 시도
    function connectWait (url, wait) {
        setHttpProvider(url);
        return waithttpRpcConnect(wait);
    }

    // rpc 기본 통신
    function rpc (payload, result) {
        if (!hasEngine()) {
            throw new Error(`setHttpProvider를 통해 연결할 url 를 등록해주시기 바랍니다.`);
        }
        return new Promise((resolve, reject) => {
            engine.sendAsync(payload, (e, output) => {
                if (e) {
                    reject(e);
                } else {
                    if (typeof result === 'function') {
                        output = result(output);
                    }
                    resolve(output);
                }
            });
        });
    }

    function setHttpProvider (url) {
        resetEngineConnect();
        engine = new EthRPC(new HttpProvider(url));
    }

    function hasEngine () {
        if ( Object.keys(engine).length > 0) {
            return true;
        }
        return false;
    }

    function hasConnected () {
        if (engineConnected && hasEngine()) {
            return true;
        }
        return true;
    }

    function resetEngineConnect () {
        engineConnected = false;
    }

    // RPC 연결 체크
    function httpRpcConnect () {
        if (!hasEngine()) {
            throw new Error(`setHttpProvider를 통해 연결할 url 를 등록해주시기 바랍니다.`);
        }
        return new Promise((resolve, reject) => {
            rpc({ method: 'web3_clientVersion' }).then((version) => {
                engineConnected = true;
                resolve(message(true, version));
            }).catch(err => {
                reject(message(false, err));
            });
        });
    }

    // RPC URL 연결 지속 체크
    function waithttpRpcConnect (listening) {
        if (!hasEngine()) {
            throw new Error(`setHttpProvider를 통해 연결할 url 를 등록해주시기 바랍니다.`);
        }
        return new Promise((resolve, reject) => {
            const retry = (n) => {
                rpc({ method: 'web3_clientVersion' }).then((version) => {
                    engineConnected = true;
                    resolve(message(true, version));
                }).catch(err => {
                    if (n > 0) {
                        if (listening && typeof listening === 'function') listening(n);
                        setTimeout(() => retry(n - 1), 3000);
                    } else {
                        reject(message(false, err));
                    }
                });
            };
            retry(waitCount);
        });
    }

    function message (result, message) {
        return { result, message };
    }

    return {
        connect,
        connectWait,
        hasConnected,
        rpc,
        eth,
        sym
    };
})();

module.exports = SymverseNetwork;
