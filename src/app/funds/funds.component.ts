import { Component, OnInit } from '@angular/core';
import { Fund } from './fund.model';
import { GetService } from '../services/get.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css']
})
export class FundsComponent implements OnInit {
  funds:Fund[] = [];
  selectedFund:Fund = {};
  amountToBuy:number = 0;
  total:number = 0;
  loaded:boolean = false;
  loggedIn:boolean = false;
  confirmationMessage:string = "";
  errorMessage:string = "";
  success:boolean = false;
  constructor(private getService:GetService, private postService: PostService) { }

  ngOnInit(): void {
    this.getService.getFunds().subscribe((data:Fund[]) => {
      this.funds = data.sort((a:any, b:any) => a.id-b.id)
      this.selectedFund = this.funds[0];
      console.log(this.selectedFund)
      this.loaded = true;
    })
    let username = localStorage.getItem("username");
    let sessionID = localStorage.getItem("sessionID");
    let customerID = localStorage.getItem("customerID") || "";
    this.postService.authenticate({username,sessionID}).subscribe((res:any) => {
      console.log(res);
      if(!res.error){
        this.loggedIn = true;
      } else {
        localStorage.removeItem("sessionID");
        localStorage.removeItem("username");
        localStorage.removeItem("customerID");
      }
    })
  }

  selectFund(fund:Fund){
    this.selectedFund = fund;
    this.confirmationMessage = "";
    this.success = false;
    this.errorMessage = "";
  }

  updateTotal(fund:any){
    this.total = this.amountToBuy * +fund.price.slice(1); 
  }

  buyFund(){
    if(this.amountToBuy <= 0){
      return
    }
    this.postService.buyFund({
      fund_id: this.selectedFund.id,
      quantity: this.amountToBuy,
      customerId: localStorage.getItem("customerID"),
      sessionID: localStorage.getItem("sessionID"),
      username: localStorage.getItem("username")
    }).subscribe((res:any) => {
      console.log(res);
      if(!res.error){
        this.confirmationMessage = "Successfully bought "+ this.amountToBuy + " shares."
        this.success = true;
      }
    })
    if(this.success === false){
      this.errorMessage = "Make sure you have enough currency in your account before purchasing this fund."
    }
  }
}
