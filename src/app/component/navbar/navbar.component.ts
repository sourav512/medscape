import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/config/backend.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // isUserLoggedIn:boolean = false;

  constructor(private router : Router, private backendService : BackendService) { }

  ngOnInit(): void {
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
    this.router.navigateByUrl('/login')
  }

}
