import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LotteryService {

  manager: string;
  players: string[] = [];
  balance = '0'

  constructor() { }
}
