/*
* 
* Messy but functional.
* 
*********************************/
var abiArray = require('./abiArray.js');
require('dotenv').config();
const express = require('express');
var helmet = require('helmet');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
var ExpressBrute = require('express-brute');
var RedisStore = require('express-brute-redis');
var Web3 = require('web3');
var abi = require('ethereumjs-abi');
const hex2ascii = require('hex2ascii');

/*
*
* Ratelimit Config
*
*/
if (process.env.NODE_ENV == 'dev') {
  var store = new ExpressBrute.MemoryStore();
} else {
  var store = new RedisStore({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  });
}
var bruteforce = new ExpressBrute(store);


/*
*
* Web3 Object
*
*/
var web3 = new Web3();
web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETH));
console.log(web3.currentProvider);


/*
*
* Contract Object
*
*/
var artyContract = web3.eth.contract(abiArray);
var arty = artyContract.at(process.env.CONTRACT_ADDR);


/*
*
* Set Security Headers
*
*/
app.use(helmet({
  noCache: true
}));
app.use(helmet.hsts({
  maxAge: 2592000,
  includeSubDomains: false
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});


/*
*
* Verify Contract
*
*/
app.post('/verify', bruteforce.prevent, function (req, res, next) {

  if (!req.body.commission_id || !req.body.contract) {
    return res.status(400).end(); // Incorrect params
  }

  var contract_hash = abi.soliditySHA3(['string'],[req.body.contract]).toString('hex');
  console.log(contract_hash);
  var hash_slice = contract_hash.match(/.{1,32}/g); // because the smart contract stores the hash in 2x bytes32

  // find the commission for given ID
  var commishEvent = arty.commishEvent(
    {
      commissionID:req.body.commission_id
    },
    {
      fromBlock: 0,
      toBlock: 'latest',
      address: process.env.CONTRACT_ADDR,
    }
  );

  commishEvent.get(function(error, bc_ret) {
    if (!error) {

      if (!bc_ret[0]) {
        return res.status(400).end();
      }

      var hash1 = hex2ascii(bc_ret[0]['args']['hash1']);
      var hash2 = hex2ascii(bc_ret[0]['args']['hash2']);

      if (hash_slice[0] !== hash1 || hash_slice[1] !== hash2) {
        // contract doesn't validate
        return res.status(530).end(); // Unused status code to represent an invalid contract

      } else {
        res.json(bc_ret);
      }

    } else {
      return res.status(400).end(); // Error with input
    }
  });
  commishEvent.stopWatching();
})


/*
*
* Catch All
*
*/
app.get('/', bruteforce.prevent, function (req, res, next) {
  res.status(200).end();
})

app.listen(process.env.PORT, function() {
  console.log('Port: ' + process.env.PORT);
});