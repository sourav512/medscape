import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName:string = '';
  password:string = '';

  constructor() { }
  showPassword!: boolean;
  ngOnInit(): void {
  }

  checkUser(userName:string,password:string){
    if(userName==="test@test.com" && password==="test123"){
      location.replace("http://localhost:4200/symptom")
    }else{
      alert("enter correct password")
    }
    console.log("password")
  }

}
