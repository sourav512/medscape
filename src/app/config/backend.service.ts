import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  signupUser(user: any) {
    return this.http.post(this.url + 'user/signup', user)
  }

  forgotPassword(email: string) {
    return this.http.post(this.url + 'user/forgot', { email })
  }

  resetPassword(password:string,confirmPassword:string){
    return this.http.post(this.url +'user/password/reset/' +this.router.url.split('/')[2],{password,confirmPassword})
  }

  logOut(){
    return this.http.get(this.url + 'user/logout',{observe: 'response', withCredentials: true})
  }

  predictDisease(symptom:string[]){
    let body = {
      "s1":symptom[0],
      "s2":symptom[1],
      "s3":symptom[2],
      "s4":symptom[3],
      "s5":symptom[4]
    }
    return this.http.post(this.url + "np/getDisease",body,{observe: 'response', withCredentials: true})
  }

}

