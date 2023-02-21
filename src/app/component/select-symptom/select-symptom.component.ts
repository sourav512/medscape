import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/config/backend.service';
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

  constructor(private backendService : BackendService,private router : Router) { }

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

  predictDisease(){
    let symptoms:any = [];
    this.selectedSymptoms.forEach(item => symptoms.push(item.name))
    // console.log(symptoms);
    this.backendService.predictDisease(symptoms).subscribe((data)=>{
      console.log(data)
      let predictedDisease:any = data.body
      this.router.navigateByUrl('/disease/'+ predictedDisease.response)
    })
  }
  ngOnInit(): void {
  }

}
