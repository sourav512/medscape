import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/config/backend.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private backendService: BackendService) { }
  email!: string;

  forgotPassword() {
    this.backendService.forgotPassword(this.email).subscribe((data) => {
      console.log(data)
    })
  }

  ngOnInit(): void {
  }

}
