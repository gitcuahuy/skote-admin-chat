import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveManagerListComponent } from './leave-manager-list.component';

describe('LeaveManagerListComponent', () => {
  let component: LeaveManagerListComponent;
  let fixture: ComponentFixture<LeaveManagerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveManagerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveManagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
