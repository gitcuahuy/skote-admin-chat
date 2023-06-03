import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFormValidateComponent } from './ngx-form-validate.component';

describe('NgxFormValidateComponent', () => {
  let component: NgxFormValidateComponent;
  let fixture: ComponentFixture<NgxFormValidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxFormValidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFormValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
