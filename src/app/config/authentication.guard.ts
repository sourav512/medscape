import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PageService } from './page.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private router : Router,private pageService : PageService){}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot):boolean {
    let token = document.cookie.split("=")[1];
    if(!token){
      this.pageService.isUserLoggedIn.next(false)
      this.router.navigateByUrl("/login")
      return false
    }
    return true
  }
  
}
