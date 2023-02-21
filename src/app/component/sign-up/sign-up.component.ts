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
  @ViewChild('profilePhoto') profilePhoto!: ElementRef;
  file!:File;

  signupUser(){
    console.log(this.user)
    this.backendService.signupUser(this.user).subscribe((data)=>{
      console.log(data)
    })
  }

  ngOnInit(): void {
    // this.firstName.nativeElement.focus();
  }

  previewImage:any = "../../../assets/undraw_pic_profile_re_7g2h.svg"

 async fileSelected(event:any){
    this.file = event.target.files[0]
    let reader = new FileReader();
    reader.readAsDataURL(this.file)
    reader.onload =async (data:any)=>{
      this.profilePhoto.nativeElement.src =await data.target.result
      this.profilePhoto.nativeElement.style.border = "3px solid #6c63ff"
    }
    console.log(this.file);
    
  }
}
