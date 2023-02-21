import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/Users'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(private http: HttpClient,private router:Router) { }

  private url: string = "http://localhost:3000/api/v1/"

  loginUser(email:string,password:string){
    return this.http.post(this.url + 'user/login',{email,password},{observe: 'response', withCredentials: true});
  }

  signupUser(user: User) {
    return this.http.post(this.url + 'user/signup', user)
  }

  forgotPassword(email: string) {
    return this.http.post(this.url + 'user/forgot', { email })
  }

  resetPassword(password:string,confirmPassword:string){
    return this.http.post(this.url +'user/password/reset/' +this.router.url.split('/')[2],{password,confirmPassword})
  }
}

