// NOTE: Use `node deploy.js` to deploy this to the rinkbey network.

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile.js');

require('dotenv').config()

const provider = new HDWalletProvider(
  process.env.MNEMONIC,
  process.env.ENDPOINT
);

const web3 = new Web3(provider);

const deploy = async () => {

  const accounts = await web3.eth.getAccounts();
  const balance = await web3.eth.getBalance(accounts[0])

  console.log('Attempting to deploy from account', accounts[0]);
  console.log('Accounts[0] balance:', balance);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: `0x${bytecode}` })
    .send({ from: accounts[0] })

    console.log(interface);
    console.log('Contract deployed to', result.options.address);
  };
deploy();

// Attempting to deploy from account 0xcE54119fB3344891458c670b15802C8eE422C9d3
// Accounts[0] balance: 18750705685000000000
// [{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pickWinner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPlayers","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"enter","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]
// Contract deployed to 0x43e144561b22A034eD87CcdD62d37f25398A9B22
