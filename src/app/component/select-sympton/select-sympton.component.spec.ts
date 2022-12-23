import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSymptonComponent } from './select-sympton.component';

describe('SelectSymptonComponent', () => {
  let component: SelectSymptonComponent;
  let fixture: ComponentFixture<SelectSymptonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSymptonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectSymptonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
