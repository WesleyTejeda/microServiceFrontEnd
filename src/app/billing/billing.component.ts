import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  profile:any = {};
  loaded:boolean = false;
  depositAmount:number = 0;
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
        this.profile.transactions.Transactions.sort((a:any, b:any) => a.createdAt - b.createdAt).reverse();
        console.log(this.profile);
        this.loaded = true;
      }
    })
  }

  dateFix(date:Date){
    return new Date(date);
  }

  deposit(){
    if(this.depositAmount <= 0){
      return
    }
    console.log({
      type: "deposit",
      amount: this.depositAmount,
      username: this.profile.username,
      CustomerId: this.profile.customer_id,
      sessionID: localStorage.getItem("sessionID")
    })
    this.postService.depositFunds({
      type: "deposit",
      amount: this.depositAmount,
      username: this.profile.username,
      CustomerId: this.profile.customer_id,
      sessionID: localStorage.getItem("sessionID")
    }).subscribe(() => this.ngOnInit());
  }
}
