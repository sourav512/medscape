import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-template-reference-variable',
  templateUrl: './template-reference-variable.component.html',
  styleUrls: ['./template-reference-variable.component.scss']
})
export class TemplateReferenceVariableComponent implements OnInit {

  @ViewChild('inputBox') inputBox!: ElementRef;

  isPassword: Boolean = false;

  constructor() {

  }
  logData(e: any) {
    console.log(e)
    this.isPassword ? this.inputBox.nativeElement.type = "password" : this.inputBox.nativeElement.type = "text";
  }
  focusElement() {
    this.inputBox.nativeElement.focus();
  }
  ngOnInit(): void {
    this.inputBox.nativeElement.focus();
  }


}
