# Symverse Wallet JavaScript API
###### It provides json rpc communication interface and development library with ethereum, symworld, local rpc.
###### npm url path: [https://www.npmjs.com/package/symjs]

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
console.log(symjs); // {Symverse: .., SymAccount: ...} 
// Note: SymAccount Object is available in electron.
````
Network connect(`ether`or `symworld` or `local rpc`)
```javascript
const sjs = new symjs();
sjs.network.connect("http://localhost:8001").then(connectedMessage => {
    console.log(connectedMessage, 'connect success...')
}).catch(e => {
    // connected fail...
})
```

There you go, now you can use it:
```javascript
// Return Promise Object By Json RPC   
sjs.network.call.getBalance(address); 
sjs.network.call.clientVersion();
sjs.network.call.sendTransaction(datas, pk);
```

sct api call:
```javascript
// Return Promise Object By Json RPC   
let constract = await sjs.network.call.sct.getContract("0x4523ad7875a9c41e9629")
let account = await sjs.network.call.sct.getContractAccount("0x4523ad7875a9c41e9629", "0x4523ad7875a9c41e9629")
```

#### Keystore Create and unlock
```javascript
// Return Promise Object
const keystore = await symjs.keystore.create("1234")

// Return Promise Object ( privateKey )
const pk = await symjs.keystore.unlock({...keystoreObject}, "1234")
```

#### Eslint
```javascript
npm run lint
```

#### Testing (mocha)
```javascript
npm run test
```


## Contact
<https://www.symverse.com/><br> Please contact us on this page.
