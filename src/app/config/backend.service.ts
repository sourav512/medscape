import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/Users'
@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(private http: HttpClient) { }

  private url: string = "http://localhost:3000/api/v1/"

  loginUser(email:string,password:string){
    return this.http.post(this.url + 'user/login',{email,password},{observe: 'response', withCredentials: true});
  }

  signupUser(user:User){
    return this.http.post(this.url + 'user/signup',user)
  }
}
