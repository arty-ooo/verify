# Arty Verify

This repository contains code similar to what powers Arty’s commission verification service. You can verify commissions yourself with this code. Setup should be pretty self-explanatory, this code has been tested with `Node.js 8 LTS` and `geth JSON-RPC`

You'll need a `.env` file with the following configuration (edit as necessary):

```
NODE_ENV=dev
PORT=8000
ETH="http://localhost:8545"
CONTRACT_ADDR=0x341F74eb0889Ca81Ed5183E098775c8E6838ecfc
REDIS_HOST="127.0.0.1"
REDIS_PORT=6379
```

### Returns HTTP Codes


```
200 = Contract validated - see JSON content
400 = Invalid input parameters
530 = Contract did not validate
```

## Issues

If you identify an issue/bug in code used by Arty please report it to us as a new GitHub issue or via one of the contact methods provided in the footer of the website. We will do our best to address any issues you raise. If you find a security related issue, please see below.

## Security

We are thankful to the developers and researchers who have identified and responsibly disclosed security vulnerabilities in our code. If you identify a security vulnerability in Arty’s code, we ask you to please report it to the contact information here: https://arty.ooo/.well-known/security.txt Please do not disclose details of a vulnerability until getting permission from us.