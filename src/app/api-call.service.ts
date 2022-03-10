import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private http:HttpClient) { }
  public getdata(){
    return this.http.get('https://jsonplaceholder.typicode.com/posts/1');
  }
  public postData(obj:Object){
    return this.http.post('http://localhost:3000/data',obj)
  }
}
