import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../service/web3.service';
import { concatMap, tap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-dai-swap',
  templateUrl: './dai-swap.component.html',
  styleUrls: ['./dai-swap.component.scss']
})
export class DaiSwapComponent implements OnInit {

  constructor(public web3: Web3Service, private decimalPipe: DecimalPipe) { }

  apr: any;

  daiBalance: any;
  idleBalance: any;

  daiDecimals: any;
  idleDecimals: any;

  depositForm: FormGroup;
  redeemForm: FormGroup;

  ngOnInit(): void {

    this.web3.getAvgAPR().subscribe(apr => this.apr = (apr / Math.pow(10, 20)));

    this.web3.getDecimals("DAI").subscribe(d => this.daiDecimals = d);

    this.web3.getDecimals("idleDAI").subscribe(d => this.idleDecimals = d);

    this.depositForm = new FormGroup({
      "amount": new FormControl(undefined)
    })

    this.redeemForm = new FormGroup({
      "amount": new FormControl(undefined)
    })

  }

  selectAccount() {
    this.web3.selectMetamaskAccount()
      .pipe(concatMap(x => this.web3.getBalance("idleDAI")), tap(tb => {

        let balance = Number(tb) * Math.pow(10, -1 * this.idleDecimals);

        this.idleBalance = balance;

        let amountControl = this.redeemForm.get("amount");
        amountControl.setValidators([Validators.min(0.01), Validators.max(balance)]);
        amountControl.setValue(this.decimalPipe.transform(balance, "1.2"));

      }),
        concatMap(y => this.web3.getBalance("DAI")), tap(db => {

          let balance = Number(db) * Math.pow(10, -1 * this.daiDecimals);

          this.daiBalance = balance;

          let amountControl = this.depositForm.get("amount");
          amountControl.setValidators([Validators.min(0.01), Validators.max(balance)]);
          amountControl.setValue(this.decimalPipe.transform(balance, "1.2"));

        })
      )
      .subscribe(x => console.log("loaded"))
  }

  deposit() {

    let amount = this.depositForm.get("amount").value * Math.pow(10, this.daiDecimals);

    this.selectAccount();
  }

  redeem() {

  }

}
