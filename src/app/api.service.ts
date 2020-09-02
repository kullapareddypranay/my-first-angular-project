import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  getDetails(){
    return this.http.get('https://api.covid19india.org/data.json')
  }
  getDailyCases(){
    return this.http.get('https://api.covid19india.org/v4/data.json')
  }
}
