import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private router : Router){}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot):boolean {
    let token = document.cookie.split("=")[1];
    if(!token){
      this.router.navigateByUrl("/login")
      return false
    }
    return true
  }
  
}
