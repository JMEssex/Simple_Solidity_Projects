import { Component, OnInit, Inject } from '@angular/core';
import { WEB3 } from './core/web3.config';
import Web3 from 'web3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(@Inject(WEB3) private web3: Web3) {
    console.log('constructor web3:', web3);
    console.log('constructor WEB3:', WEB3);
  }
  ngOnInit() {
    console.log('ngOninit:', WEB3);
  }
}
