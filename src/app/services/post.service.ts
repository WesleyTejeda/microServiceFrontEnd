import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ObserversModule } from '@angular/cdk/observers';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  masterBackendUrl = "https://protected-dusk-89362.herokuapp.com";
  transactionUrl = "https://transaction-microservice-v1.herokuapp.com";
  key = "?secretKey=pmY6WrA2oO7Vfdd4zpfz97C9aWMLELqv"
  constructor(private httpClient: HttpClient) { }

  logUserIn(input: object):Observable<any> {
    return this.httpClient.post(`${this.masterBackendUrl}/login${this.key}`, input);
  }

  signUpUser(input: object):Observable<any> {
    return this.httpClient.post(`${this.masterBackendUrl}/signup`, input);
  }

  authenticate(input: object):Observable<any>{
    return this.httpClient.post(`${this.masterBackendUrl}/auth${this.key}`, input);
  }

  getUserData(id:string, input:object){
    return this.httpClient.post(`${this.masterBackendUrl}/users/${id}`,input);
  }

  depositFunds(input:object){
    return this.httpClient.post(`${this.masterBackendUrl}/transactions/deposit`,input)
  }

  buyFund(input:object){
    return this.httpClient.post(`${this.masterBackendUrl}/purchase-fund`,input);
  }

  sellFund(input:object){
    return this.httpClient.post(`${this.masterBackendUrl}/transactions/sell`, input)
  }
}
