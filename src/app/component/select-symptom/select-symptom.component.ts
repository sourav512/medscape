import { Component, ElementRef, OnInit } from '@angular/core';
import { Symptoms } from 'src/assets/symptoms'; 

@Component({
  selector: 'app-select-symptom',
  templateUrl: './select-symptom.component.html',
  styleUrls: ['./select-symptom.component.css']
})
export class SelectSymptomComponent implements OnInit {

  symptoms = Symptoms;
  selectedSymptoms:any[] = [];
  // isSelected:boolean = false;

  constructor() { }

  selectSymptom(symptomCard:any){
    // this.toggleCardColor(symptomCard);
    this.addToSelectedSymptom(symptomCard)
    this.toggleCardColor(symptomCard)
    console.log(this.selectedSymptoms);
  }
  
  addToSelectedSymptom(symptomCard:any){
    let symptomAlreadySelectedIndex = this.selectedSymptoms.findIndex(x=>x.name===symptomCard.name)
    if(symptomAlreadySelectedIndex === -1){
      this.selectedSymptoms.push(symptomCard)
    }else{
      let removedSymptom = this.selectedSymptoms.splice(symptomAlreadySelectedIndex,1)[0];
    }

    if(this.selectedSymptoms.length>5){
      let removeFirstSymptom = this.selectedSymptoms.shift();
      removeFirstSymptom.isSelected = false;
      this.toggleCardColor(removeFirstSymptom)
    }

  }

  toggleCardColor(card:any){
    if(card.isSelected){
      card.nativeElement.style.backgroundColor = '#6755ff';
      card.nativeElement.style.color = 'white'
    }else{
      card.nativeElement.style.removeProperty('background-color')
      card.nativeElement.style.removeProperty('color')
    }
  }


  ngOnInit(): void {
  }

}
