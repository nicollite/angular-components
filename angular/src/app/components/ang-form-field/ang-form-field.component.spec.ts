import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngFormFieldComponent } from './ang-form-field.component';

describe('AngFormFieldComponent', () => {
  let component: AngFormFieldComponent;
  let fixture: ComponentFixture<AngFormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngFormFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
