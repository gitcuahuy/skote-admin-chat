import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationConfigrationComponent } from './notification-configration.component';

describe('NotificationConfigrationComponent', () => {
  let component: NotificationConfigrationComponent;
  let fixture: ComponentFixture<NotificationConfigrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationConfigrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationConfigrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
