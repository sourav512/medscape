import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BackendService } from 'src/app/config/backend.service';
import { PageService } from 'src/app/config/page.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private isUserLoggedInSub!:Subscription;
  loggedIn!:boolean

  constructor(private router : Router, private backendService : BackendService,private pageService : PageService) { }

  ngOnInit(): void {
    this.pageService.isUserLoggedIn.subscribe(isLoggedIn => this.loggedIn = isLoggedIn)
  }


  goToAboutUs(){
    this.router.navigateByUrl('/aboutUs')
  }
  goToPredict(){
    this.router.navigateByUrl('/predict')
  }

  logOutUser(){
    this.backendService.logOut().subscribe((data)=>{
      console.log(data);
      
    });
    this.pageService.isUserLoggedIn.next(false)
    this.router.navigateByUrl('/login')
  }
  

}
