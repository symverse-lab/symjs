# Symverse Wallet JavaScript API
###### It provides json rpc communication interface and development library with symworld, keystore, local rpc.
###### npm: https://www.npmjs.com/package/symjs

## Installation
#### Node.js
```javascript
npm i symjs
```

#### Yarn
```javascript
yarn add symjs
```

A minified, browserified file `dist/symjs.js` is included for use in the browser. Including this file simply attaches the `symjs` object to window:
```$xslt
<script src='dist/symjs.js'></script>
```

## Usage
Use the symjs object directly from the global namespace:
```javascript
console(SymJs)  // {keystore: ..., utils: ...} 

const symjs = new SymJs();
console.log(symjs); // {network: ..., keystore: .., utils: ..., signer: ...} 
````
Network connect(`symverse rpc`)
```javascript
const symjs = new SymJs();
symjs.network.connect("http://localhost:8001").then(connectedMessage => {
    console.log(connectedMessage, 'connect success...')
}).catch(e => {
    // connected fail...
})
```

There you go, now you can use it:
```javascript
// Return Promise Object By Json RPC   
symjs.network.call.getBalance(address); 
symjs.network.call.clientVersion();
```

-  Make Transaction Raw example:

```javascript
let privateKey = "1a43aa399cb2efe186317e0b09f4a7ef88b83cff05089b145709881bf4db3a20"
let params = {
    "from":"0x00021000000000010002",
    "nonce": 210,
    "gasPrice": 1000000000000,
    "gasLimit": 41000,
    "to": "0x00021000000000020002",
    "value": 5,
    "workNodes": ["0x00021000000000010002"],
    "chainId": 7777 //require
};
// Return Promise Object By Json RPC   
symjs.network.call.sendTransaction(params, privateKey);
```

-  Citizen api call example: 

```javascript
// Return Promise Object By Json RPC   
let citizenInfo = await sym.network.call.citizen.getCitizenBySymID("0x00021000000000010002")
let count = await sym.network.call.citizen.getCitizenCount()
```

-  Warrant api call example: 

```javascript
// Return Promise Object By Json RPC   
let blockNumber = await sym.network.call.warrant.blockNumber()
```

-  Sct api call example: 

```javascript
// Return Promise Object By Json RPC   
let constract = await sym.network.call.sct.getContract("0x4523ad7875a9c41e9629")
let account = await sym.network.call.sct.getContractAccount("0x4523ad7875a9c41e9629", "0x00021000000000010002")
```

## Contact
<https://www.symverse.com/><br> Please contact us on this page.
