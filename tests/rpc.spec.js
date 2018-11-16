/**
 * rpc.spec.js
 */
const should = require('should');
const symjs =  require ('../index.js');

const Symverse = symjs.Symverse;

describe('라이브러리 기능 체크', function () {
    it(' RPC 기본 통신', () => {
        Symverse.network.connect("http://13.209.136.11:8001").then(function(result){
            console.log(result,"연결")
        }).catch(function(err) {
            console.log(err, "에러")
        })
        Symverse.network.sym.by.clientVersion().then((version) => {
            console.log("노드 체크", version);
        }).catch(e =>{
        });

        const rpc = Symverse.network.eth.by;

        rpc.clientVersion().then((version) => {
            console.log("노드 체크", version);
        }).catch(e =>{
        });
    });
});