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

A minified, browserified file `dist/symjs.min.js` is included for use in the browser. Including this file simply attaches the `symjs` object to window:
```$xslt
<script src='dist/symjs.min.js'></script>
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
sym.network.call.getBalance(address); 
sym.network.call.clientVersion();
sym.network.call.sendTransaction(raw, pk);
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

#### Keystore Create and Unlock
```javascript
// Return Promise Object
const keystore = await symjs.keystore.create("1234") // input passphrase

// Return Promise Object ( privateKey )
const privateKey = await symjs.keystore.unlock(keystore, "1234")
```


## Contact
<https://www.symverse.com/><br> Please contact us on this page.
