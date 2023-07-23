import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionSettingListComponent } from './permission-setting-list.component';

describe('PermissionSettingListComponent', () => {
  let component: PermissionSettingListComponent;
  let fixture: ComponentFixture<PermissionSettingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionSettingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionSettingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
