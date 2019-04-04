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

## Usage
Use the symjs object directly from the global namespace:
```javascript
console.log(symjs); // {Symverse: .., SymAccount: ...} 
// Note: SymAccount Object is available in electron.
````
Network connect(`ether`or `symworld` or `local rpc`)
```javascript
var Symverse = require('symjs').Symverse;
const symjs = new Symjs();
symjs.network.connect(network.api).then(connectedMessage => {
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
symjs.network.call.sendTransaction(datas, pk);
```

#### Keystore Create and unlock
```javascript
// Return Promise Object
const keystore = await Symjs.keystore.create("1234")

// Return Promise Object ( privateKey )
const pk = await Symjs.keystore.unlock({...keystoreObject}, "1234")
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
