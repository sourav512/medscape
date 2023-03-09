import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BackendService } from 'src/app/config/backend.service';
import { PageService } from 'src/app/config/page.service';
import { User } from 'src/app/models/Users';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private isUserLoggedInSub!:Subscription;
  loggedIn!:boolean;
  imageURL!:string;

  constructor(private router : Router, private backendService : BackendService,private pageService : PageService) { }

  ngOnInit(): void {
    this.pageService.isUserLoggedIn.subscribe(isLoggedIn => this.loggedIn = isLoggedIn);
    this.backendService.getUserDetail().subscribe((data:any)=>{
      this.imageURL = data.body.user.photo
      console.log(data);
      
    })
  }


  goToAboutUs(){
    this.router.navigateByUrl('/aboutUs')
  }
  goToPredict(){
    this.router.navigateByUrl('/predict')
  }
  goToUserDashboard(){
    this.router.navigateByUrl('/dashboard')
  }

  logOutUser(){
    this.backendService.logOut().subscribe((data)=>{
      console.log(data);
      
    });
    this.pageService.isUserLoggedIn.next(false)
    this.router.navigateByUrl('/login')
  }
  

}
