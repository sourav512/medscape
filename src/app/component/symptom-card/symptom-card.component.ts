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
  @Input() isSelected!:boolean;
  @ViewChild('card') card!:ElementRef;
  @Output() symptomSelectEvent = new EventEmitter<any>();

  selectCard(){
    this.symptomSelectEvent.emit({...this.card,name:this.cardDetails.name,isSelected:this.isSelected})
  }
}
