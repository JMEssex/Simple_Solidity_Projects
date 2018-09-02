const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);

const { interface, bytecode } = require('../compile.js');

require('events').EventEmitter.defaultMaxListeners = 0;
let accounts;
let lottery;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the contract
  lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: 1000000 });
});

describe('Lottery Contract', () => {
  it('deploys a contract', () => {
    assert.ok(lottery.options.address)
  });

  it('allows one account to enter', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('1', 'finney')
    });

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    })

    assert.equal(accounts[0], players[0]);
    assert.equal(1, players.length);
  });

  it('allows multiple accounts to enter', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('1', 'finney')
    });

    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei('1', 'finney')
    });

    await lottery.methods.enter().send({
      from: accounts[2],
      value: web3.utils.toWei('1', 'finney')
    });

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    })

    assert.equal(accounts[0], players[0]);
    assert.equal(accounts[1], players[1]);
    assert.equal(accounts[2], players[2]);
    assert.equal(3, players.length);
  });

  it('requires a minimum amount of ether to enter', async () => {
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: 200
      });
      assert(false)
    } catch (err) {
      assert(err);
    }
  });

  it('only allows manager to call pickWinner', async () => {
    try {
      await lottery.methods.pickWinner().send({
        from: accounts
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it('sends money to the winner and resets the players array', async () => {
    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei('5', "finney")
    });

    const initialBalance = await web3.eth.getBalance(accounts[1]);
    await lottery.methods.pickWinner().send({ from: accounts[0] });
    const finalBalance = await web3.eth.getBalance(accounts[1]);
    const difference = finalBalance - initialBalance;

    const players = await lottery.methods.getPlayers().call();
    const resetValue = await web3.eth.getBalance(lottery.options.address);

    assert(difference == web3.utils.toWei('5', 'finney'));

    assert.equal(0, players.length);
    assert.equal(0, resetValue);
  });
});
