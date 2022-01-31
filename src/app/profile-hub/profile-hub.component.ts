import { Component, OnInit } from '@angular/core';
import { GetService } from '../services/get.service';

@Component({
  selector: 'app-profile-hub',
  templateUrl: './profile-hub.component.html',
  styleUrls: ['./profile-hub.component.css']
})
export class ProfileHubComponent implements OnInit {
  profile = {
    username: "",
    name: "",
    Transactions: [
      {
        type: "",
        amount: 0,
        pricePerUnit: 0,
        quantity: 0,
        itemDescription: "",
        createdAt: ""
      }
    ],
    Wallet: {
      currencyAmount: 0
    }
  }
  constructor(private getService: GetService) { }

  ngOnInit(): void {
    this.getService.getTransactionProfile(1).subscribe(data => {
      if(data){
        this.profile = data;
      }
      console.log(this.profile);
    })
  }

}
