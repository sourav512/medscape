import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/config/backend.service';
import { PageService } from 'src/app/config/page.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName:string = '';
  password:string = '';
  wrongPassword:boolean = false;

  constructor(private backendService:BackendService,private router : Router,private pageService : PageService) { }
  showPassword!: boolean;
  ngOnInit(): void {
  }

  loginUser(){
    this.backendService.loginUser(this.userName,this.password).subscribe((data)=>{
      if(data.status === 200){
        this.pageService.isUserLoggedIn.next(true)
        this.router.navigateByUrl('/predict')
      }
      if(data.status === 401){
        this.wrongPassword = true;
      }
      console.log(this.wrongPassword);
    },
      (error) => {this.wrongPassword = true}
    )
  }

}
