import { Component, ElementRef, OnInit, ViewChild, Directive } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/config/backend.service';
import { User } from 'src/app/models/Users';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  
  constructor(private backendService:BackendService, private router :  Router) { }
  
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
    photo:"",
    image:File,
  }

  @ViewChild('firstName') firstNameField!: ElementRef;
  @ViewChild('profilePhoto') profilePhoto!: ElementRef;
  file!:File;
  formData: FormData = new FormData();

  async signupUser(){
    this.formData.append('body',JSON.stringify(this.user)); 
    this.backendService.signupUser(this.formData).subscribe((data:any)=>{
      if(data.status === 200){  
        this.router.navigateByUrl('/login')
      }
      console.log(data)
    })
    this.formData = new FormData()
  }
  
  ngOnInit(): void {
    // this.firstName.nativeElement.focus();
  }
  
  previewImage:any = "../../../assets/undraw_pic_profile_re_7g2h.svg"
  
  async fileSelected(event:any){
    this.file = event.target.files[0];    
    await this.formData.append('photo', this.file,this.file.name);
    let reader = new FileReader();
    reader.readAsDataURL(this.file)
    reader.onload =async (data:any)=>{
      this.profilePhoto.nativeElement.src =await data.target.result
      this.profilePhoto.nativeElement.style.border = "3px solid #6c63ff"
    }
  }
}
