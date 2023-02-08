import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymptomCardComponent } from './symptom-card.component';

describe('SymptomCardComponent', () => {
  let component: SymptomCardComponent;
  let fixture: ComponentFixture<SymptomCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SymptomCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SymptomCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
