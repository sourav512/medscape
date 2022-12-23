import { Component, ElementRef, OnInit, ViewChild, Directive } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  showPassword: boolean = false;
  constructor() { }
  name: string = '';
  @ViewChild('firstName') firstName!: ElementRef;

  ngOnInit(): void {
    // this.firstName.nativeElement.focus();
  }

}
