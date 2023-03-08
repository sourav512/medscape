import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/config/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private backendService:BackendService,private router:Router) { }
  email!:string;
  password!:string;
  confirmPassword!:string;

  ngOnInit(): void {
  }

  resetPassword(){
    this.backendService.resetPassword(this.password,this.confirmPassword).subscribe((data)=>{
      alert("Password reset successful")
    })
  }

}
