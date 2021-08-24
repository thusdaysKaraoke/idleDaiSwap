import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { Observable, defer } from 'rxjs';
import { tap } from 'rxjs/operators';
import { idleDai } from '../../../../ABI/idleDAI.abi';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Dai } from '../../../../ABI/DAI.abi';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  public web3: Web3;

  public account: any;

  private infuraNode: string = "https://mainnet.infura.io/v3/37288679bea04b2fbc83a18dcf477390";

  private contracts = [idleDai, Dai];

  constructor() {
    this.web3 = new Web3(this.infuraNode);
  }

  getPrice(): Observable<any> {
    let loadedContract = new this.web3.eth.Contract(idleDai.abi, idleDai.address);
    return defer(() => loadedContract.methods.getPrice().call());
  }

  getAvgAPR(): Observable<any> {
    let loadedContract = new this.web3.eth.Contract(idleDai.abi, idleDai.address);
    return defer(() => loadedContract.methods.getAvgAPR().call());
  }

  selectMetamaskAccount() {
    return defer(() => window["ethereum"].enable()).pipe(tap(account => this.account = account[0]));
  }

  getBalance(id: string) {
    return defer(() => this.loadContract(id).methods.balanceOf(this.account).call());
  }

  getDecimals(id: string) {
    return defer(() => this.loadContract(id).methods.decimals().call());
  }

  loadContract(contractId: string) {
    let contractAbi = this.contracts.find(c => c.id.toLowerCase() == contractId.toLowerCase());
    return new this.web3.eth.Contract(contractAbi.abi, contractAbi.address);
  }

  redeemToken(amount) {

  }

  mintToken(amount: number) {

  }
}
