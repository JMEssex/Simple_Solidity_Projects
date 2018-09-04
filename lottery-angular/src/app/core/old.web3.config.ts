import Web3 from 'web3';

export class Web3Config {
  web3 = new Web3((<any>window).web3.currentProvider);
}
