import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmployeesRoutingModule} from './employees-routing.module';
import {SharedModule} from "@shared/shared.module";
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {PermissionSettingListComponent} from './permission-setting-list/permission-setting-list.component';
import {LeaveManagerListComponent} from './leave-manager-list/leave-manager-list.component';
import {NotificationConfigrationComponent} from './notification-configration/notification-configration.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import { EmployeeDetailComponent } from './employee-list/employee-detail/employee-detail.component';
import { EmployeeUpdateComponent } from './employee-list/employee-update/employee-update.component';
import {NzDropDownModule} from "ng-zorro-antd/dropdown";


@NgModule({
  declarations: [
    EmployeeListComponent,
    PermissionSettingListComponent,
    LeaveManagerListComponent,
    NotificationConfigrationComponent,
    EmployeeDetailComponent,
    EmployeeUpdateComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    SharedModule,
    NzIconModule,
    NzDropDownModule,
  ]
})
export class EmployeesModule {
}
