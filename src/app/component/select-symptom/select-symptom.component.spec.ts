import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSymptomComponent } from './select-symptom.component';

describe('SelectSymptomComponent', () => {
  let component: SelectSymptomComponent;
  let fixture: ComponentFixture<SelectSymptomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSymptomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectSymptomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
