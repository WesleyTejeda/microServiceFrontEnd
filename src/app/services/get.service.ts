import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetService {
  transactionUrl = "https://transaction-microservice-v1.herokuapp.com";
  constructor(private httpClient: HttpClient) { }

  //Transaction Service
  getTransactionProfile(id: number):Observable<any>{
    return this.httpClient.get(`${this.transactionUrl}/customers/${id}`);
  }

  // getTransactionUsername():Observable<any>{
  //   return this.httpClient.get(`${this.transactionUrl}/`)
  // }
}