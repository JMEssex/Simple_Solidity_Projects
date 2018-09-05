export class Lottery {
  address = '0x43e144561b22A034eD87CcdD62d37f25398A9B22';

  abi = [{
    constant: true,
    inputs: [],
    name: 'manager',
    outputs: [{
      name: '',
      type: 'address'
    }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  }, {
    constant: false,
    inputs: [],
    name: 'pickWinner',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  }, {
    constant: true,
    inputs: [],
    name: 'getPlayers',
    outputs: [{
      name: '',
      type: 'address[]'
    }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  }, {
    constant: false,
    inputs: [],
    name: 'enter',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function'
  }, {
    constant: true,
    inputs: [{
      name: '',
      type: 'uint256'
    }],
    name: 'players',
    outputs: [{
      name: '',
      type: 'address'
    }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  }, {
    inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  }]
}
