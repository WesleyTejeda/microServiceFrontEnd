import { Component, OnInit } from '@angular/core';
import { Fund } from './fund.model';
import { GetService } from '../services/get.service';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css']
})
export class FundsComponent implements OnInit {
  funds:Fund[] = [];
  constructor(private getService:GetService) { }

  ngOnInit(): void {
    this.getService.getFunds().subscribe(data => {
      this.funds = data.sort((a:any, b:any) => a.id-b.id)
    })
  }

}
