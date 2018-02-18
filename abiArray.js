var abiArray = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "commissionID",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "internalID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "hash1",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "hash2",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "status",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "effort",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "commencement",
        "type": "uint256"
      }
    ],
    "name": "commishEvent",
    "type": "event"
  }
];

module.exports = abiArray;