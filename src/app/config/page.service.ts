import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {User} from '../models/Users'
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  isUserLoggedIn= new Subject<boolean>;
  user!:any;
  constructor(private backendService : BackendService) {
    this.backendService.getUserDetail().subscribe((data:any)=>{
      this.user = data.body.user;
    })
   }

  getUserDetail():any{
    return this.user;
  }

  loadUserDetail(){
    this.backendService.getUserDetail().subscribe((data:any)=>{
      this.user = data.body.user
    })
  }

  setUserDetail(user:any){
    this.user = user
  }
}
