import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/config/backend.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName:string = '';
  password:string = '';

  constructor(private backendService:BackendService,private router : Router) { }
  showPassword!: boolean;
  ngOnInit(): void {
  }

  loginUser(){
    this.backendService.loginUser(this.userName,this.password).subscribe((data)=>{
      if(data.status === 200){
        this.router.navigateByUrl('/predict')
      }
    })
  }

}
