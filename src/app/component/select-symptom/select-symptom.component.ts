import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Symptoms } from 'src/assets/symptoms';

@Component({
  selector: 'app-select-symptom',
  templateUrl: './select-symptom.component.html',
  styleUrls: ['./select-symptom.component.css']
})
export class SelectSymptomComponent implements OnInit {

  symptoms = Symptoms;
  selectedSymptoms: any[] = [];
  @ViewChild('info') infoRef!: ElementRef;
  // isSelected:boolean = false;

  constructor() { }

  selectSymptom(symptomCard: any) {
    this.addToSelectedSymptom(symptomCard)
    this.toggleCardColor(symptomCard)
  }

  addToSelectedSymptom(symptomCard: any) {
    let symptomAlreadySelectedIndex = this.selectedSymptoms.findIndex(x => x.name === symptomCard.name)    
    if (symptomAlreadySelectedIndex === -1) {
      this.selectedSymptoms.push(symptomCard);
      symptomCard.isSelected = true;
    } else {
      this.selectedSymptoms.splice(symptomAlreadySelectedIndex, 1)[0];
      symptomCard.isSelected = false;
    }

    if (this.selectedSymptoms.length > 5) {
      this.infoRef.nativeElement.style.color = 'red';
      this.infoRef.nativeElement.style.fontSize = '1.2rem';
      setTimeout(() => { 
        this.infoRef.nativeElement.style.removeProperty('color') 
        this.infoRef.nativeElement.style.removeProperty('font-size') 
    }, 2000)
      let removeFirstSymptom = this.selectedSymptoms.shift();
      removeFirstSymptom.isSelected = false;
      console.log(this.selectedSymptoms)
      this.toggleCardColor(removeFirstSymptom);


    }
  }


  toggleCardColor(card: any) {
    if (card.isSelected) {
      card.nativeElement.style.backgroundColor = '#6755ff';
      card.nativeElement.style.color = 'white'
    } else {
      card.nativeElement.style.removeProperty('background-color')
      card.nativeElement.style.removeProperty('color')
    }
  }


  ngOnInit(): void {
  }

}
