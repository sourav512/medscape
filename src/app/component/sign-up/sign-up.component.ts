import { Component, ElementRef, OnInit, ViewChild, Directive } from '@angular/core';
import { BackendService } from 'src/app/config/backend.service';
import { User } from 'src/app/models/Users';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  
  constructor(private backendService:BackendService) { }
  
  showPassword: boolean = false;



  user:User = {
    firstName :"",
    lastName :"",
    email:"",
    password:"",
    dateOfBirth:"",
    city:"",
    gender:"",
    contact:"",
    imageUrl:"dfasdf",

  }
  @ViewChild('firstName') firstNameField!: ElementRef;

  signupUser(){
    console.log(this.user)
    this.backendService.signupUser(this.user).subscribe((data)=>{
      console.log(data)
    })
  }

  ngOnInit(): void {
    // this.firstName.nativeElement.focus();
  }

}
