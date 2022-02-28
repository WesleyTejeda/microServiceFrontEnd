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
  confirmationMessage:string = "";
  constructor(private getService:GetService, private postService: PostService) { }

  ngOnInit(): void {
    this.getService.getFunds().subscribe((data:Fund[]) => {
      this.funds = data.sort((a:any, b:any) => a.id-b.id)
      this.selectedFund = this.funds[0];
      console.log(this.selectedFund)
      this.loaded = true;
    })
  }

  selectFund(fund:Fund){
    this.selectedFund = fund;
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
      }
    })
  }
}
