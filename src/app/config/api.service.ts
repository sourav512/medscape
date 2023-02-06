import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }

  private url: string = "http://localhost:3000/api/v1/"

  loginUser(email:string,password:string){
    return this.http.post(this.url + 'user/login',{email,password});
  }
}