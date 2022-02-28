import { Component, OnInit } from '@angular/core';
import { Fund } from '../funds/fund.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  profile:any = {};
  loaded:boolean = false;
  amountToSell:number = 0;
  selectedFund:Fund = {};
  total:number = 0;
  quantityAvailable:number = 0;
  confirmationMessage:string = "";
  quantityArr:number[] = [];
  ids:number[] = [];
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    let customerID = localStorage.getItem("customerID") || "";
    let sessionID = localStorage.getItem("sessionID");
    let username = localStorage.getItem("username");
    if(!customerID || !sessionID || !username){
      window.location.replace("/");
    }
    this.postService.getUserData(customerID, {sessionID, customerID, username}).subscribe((data:any) => {
      if(data){
        this.profile = data;
        console.log(this.profile);
        this.loaded = true;
      }
    })
  }
  available(incoming:number){
    this.quantityAvailable = incoming;
  }

  selectFund(fund:Fund){
    this.selectedFund = fund;
    console.log(this.selectedFund)
    this.available(0);
    this.amountToSell = 0;
    this.total = 0;
  }

  updateTotal(fund:any){
    this.total = (this.amountToSell * +fund.price.slice(1));
  }

  getArrays(){
    let Transactions = this.profile.transactions.Transactions.filter((transaction:any)=>(transaction.itemDescription===this.selectedFund.name)&&((transaction.type==="purchase")&&(transaction.quantityAvailable > 0)));
    console.log(Transactions)
    this.ids = Transactions.map((Transaction:any)=>Transaction.id);
    this.quantityArr = Transactions.map((transaction:any)=>transaction.quantityAvailable);
    console.log(this.ids);
    console.log(this.quantityArr);
  }

  sellFund(){
    this.getArrays();
    console.log({
      type: "sell",
      mutualFundId: this.selectedFund.id,
      quantity: this.amountToSell,
      quantityArr: this.quantityArr,
      id: this.ids,
      CustomerId: localStorage.getItem("customerID")
    })
    this.postService.sellFund({
      type: "sell",
      mutualFundId: this.selectedFund.id,
      quantity: this.amountToSell,
      quantityArr: this.quantityArr,
      id: this.ids,
      CustomerId: localStorage.getItem("customerID"),
      sessionID: localStorage.getItem("sessionID"),
      username: this.profile.username
    }).subscribe((res:any)=>{
      console.log(res);
      if(!res.error){
        this.confirmationMessage = `Successfully sold ${this.amountToSell} shares of ${this.selectedFund.name}. ${this.total} deposited to account.`
      }
    })
  };
}
