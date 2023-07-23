import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigApprovalComponent } from './config-approval.component';

describe('ConfigApprovalComponent', () => {
  let component: ConfigApprovalComponent;
  let fixture: ComponentFixture<ConfigApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
