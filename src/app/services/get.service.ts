import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetService {
  masterBackendUrl = "https://protected-dusk-89362.herokuapp.com";
  constructor(private httpClient: HttpClient) { }


  getFunds(): Observable<any> {
    return this.httpClient.get(`${this.masterBackendUrl}/mutual-funds`);
  }

}