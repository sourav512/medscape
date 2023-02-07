import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
// import symptoms as data from 'src/assets/symptoms.json'


@Component({
  selector: 'app-symptom-card',
  templateUrl: './symptom-card.component.html',
  styleUrls: ['./symptom-card.component.css']
})
export class SymptomCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() cardDetails:any = ''
  @ViewChild('card') card!:ElementRef;
  @Output() symptomSelectEvent = new EventEmitter<any>();
  isSelected:boolean = false;

  selectCard(){
    this.isSelected = !this.isSelected;
    // this.toggleCardColor();
    // console.log(this.cardDetails);
    console.log({...this.card,name:this.cardDetails.name,isSelected:this.isSelected});
    
    this.symptomSelectEvent.emit({...this.card,name:this.cardDetails.name,isSelected:this.isSelected})
  }
  
  toggleCardColor(){
    if(this.isSelected){
      this.card.nativeElement.style.backgroundColor = '#6755ff';
      this.card.nativeElement.style.color = 'white'
    }else{
      this.card.nativeElement.style.removeProperty('background-color')
      this.card.nativeElement.style.removeProperty('color')
      // this.card.nativeElement.style.backgroundColor = 'none';
      // this.card.nativeElement.style.color = 'none'
    }
  }

}
