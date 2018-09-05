var SymverseRpcInterface = require('./symverse-rpc-interface');
var HttpProvider = require('ethjs-provider-http');
var EthRPC = require('ethjs-rpc');

const SymverseNetwork = (function () {
    let engine;

    let engineConnected = false;

    const waitCount = 30;

    const by = new SymverseRpcInterface(rpc);

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
        if (!hasEngin()) {
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

    function hasEngin () {
        if (engine) {
            return true;
        }
        return true;
    }

    function hasConnected () {
        if (engineConnected && hasEngin()) {
            return true;
        }
        return true;
    }

    function resetEngineConnect () {
        engineConnected = false;
    }

    // RPC 연결 체크
    function httpRpcConnect () {
        if (!hasEngin()) {
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
        if (!hasEngin()) {
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
        by
    };
})();

module.exports = SymverseNetwork;
