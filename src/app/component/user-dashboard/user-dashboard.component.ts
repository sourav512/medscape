import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/config/backend.service';
import { PageService } from 'src/app/config/page.service';
import { User } from 'src/app/models/Users';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  user!:User;
  image!:string;
  constructor(private pageService : PageService,private backendService : BackendService,private router : Router) { }

  ngOnInit (){
    this.backendService.getUserDetail().subscribe((data:any)=>{
      this.user = data.body.user
      this.image = data.body.user.photo
      console.log(data);
    })
    
  }

  logOutUser(){
    this.backendService.logOut().subscribe((data)=>{
      console.log(data);
      
    });
    this.pageService.isUserLoggedIn.next(false)
    this.router.navigateByUrl('/login')
  }
  

}
