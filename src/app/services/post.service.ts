import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  userURL = "";
  transactionURL = "https://transaction-microservice-v1.herokuapp.com";
  constructor(private httpClient: HttpClient) { }

  //USER Posts
  logUserIn(input: object):Observable<any> {
    return this.httpClient.post(`${this.userURL}`, input);
  }

  signUpUser(input: object):Observable<any> {
    return this.httpClient.post(`${this.userURL}`, input);
  }

  //Transaction Posts
  initializeCustomer(input: object):Observable<any> {
    return this.httpClient.post(`${this.transactionURL}/customers/create`, input);
  }

  initializeWallet(input: object):Observable<any> {
    return this.httpClient.post(`${this.transactionURL}/wallets/create`, input);
  }

  createTransaction(input: object):Observable<any> {
    return this.httpClient.post(`${this.transactionURL}/transactions/create`, input);
  }
}
