import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Disease } from 'src/assets/disease';

@Component({
  selector: 'app-disease-detail',
  templateUrl: './disease-detail.component.html',
  styleUrls: ['./disease-detail.component.css']
})
export class DiseaseDetailComponent implements OnInit {

  constructor(private router : Router) { }

  diseaseArray:any[] = Disease;

  diseaseToShow:any;

  ngOnInit(): void {
    let disease = decodeURI(this.router.url).split('/').slice(-1)[0];
    console.log(this.diseaseArray.find(x => x.name.includes(disease)))
    this.diseaseToShow = this.diseaseArray.find(x => x.name.includes(disease))
    this.diseaseToShow.specialist.replaceAll('@','<br>')
  }

  backToPredict(){
    this.router.navigateByUrl('/predict')
  }

  showMoreDetails(){
    // window.location.href =this.diseaseToShow.search
    window.open(this.diseaseToShow.search, '_blank');
  }

}
