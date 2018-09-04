import { Component, OnInit, Inject } from '@angular/core';
import { WEB3 } from './core/web3.config';
import Web3 from 'web3';
// import { HttpProvider, IpcProvider, WebsocketProvider, Provider } from 'web3/providers';
import { Provider } from 'web3/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(@Inject(WEB3) private web3: Web3) {
    console.log('constructor web3:', web3.version);
    web3.eth.getAccounts().then(console.log)
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
