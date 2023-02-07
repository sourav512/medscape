import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/config/backend.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName:string = '';
  password:string = '';

  constructor(private backendService:BackendService) { }
  showPassword!: boolean;
  ngOnInit(): void {
  }

  loginUser(){
    this.backendService.loginUser(this.userName,this.password).subscribe((data)=>{
      console.log(data)
    })
  }

}
