import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { WEB3 } from './core/web3.config';
import Web3 from 'web3';
import { Provider } from 'web3/types';

import { Lottery } from './lottery/lottery';
import { LotteryService } from './shared/lottery.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  lotteryModel = new Lottery();
  lotteryContract;

  manager: string;

  constructor(@Inject(WEB3) protected web3: Web3, public lotteryService: LotteryService) {
    console.log('constructor web3:', web3);
    web3.eth.getAccounts().then(console.log);
  }
  async ngOnInit() {
    // await this.web3.eth.net.getId()
    //   .then(id => console.log(`You are connected on ${this.getNet(id)}`));
    if ('enable' in (this.web3.currentProvider as Provider)) {
      // TODO: Learn what type I need to put in for `.enable()` to function.
      await (this.web3.currentProvider as any).enable();
        // .then((id) => console.log(`You are connected on ${this.getNet(id)}`));
      // await console.log('currentProvider:', (this.web3.currentProvider));
    }
  }

  async ngAfterViewInit() {
    console.log('LOTTERY:', this.lotteryModel);
    this.lotteryContract = new this.web3.eth.Contract(this.lotteryModel.abi, this.lotteryModel.address);

    console.log('lotteryContract:', this.lotteryContract);

    const manager = await this.lotteryContract.methods.manager().call();
    const players: string[] = await this.lotteryContract.methods.getPlayers().call();
    const balance = await this.web3.eth.getBalance(this.lotteryContract.options.address);

    this.lotteryService.manager = manager;
    this.lotteryService.players = players;
    this.lotteryService.balance = balance.toString();
  }

  private getNet(id: number): string {
    const networks = {
      1: 'mainnet',
      3: 'ropsten',
      4: 'rinkeby',
      42: 'koven'
    }
    return networks[id];
  }
}
