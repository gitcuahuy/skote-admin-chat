import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmployeesRoutingModule} from './employees-routing.module';
import {SharedModule} from "@shared/shared.module";
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {PermissionSettingListComponent} from './permission-setting-list/permission-setting-list.component';
import {LeaveManagerListComponent} from './leave-manager-list/leave-manager-list.component';
import {NotificationConfigrationComponent} from './notification-configration/notification-configration.component';
import {NzTableModule} from "ng-zorro-antd/table";


@NgModule({
  declarations: [
    EmployeeListComponent,
    PermissionSettingListComponent,
    LeaveManagerListComponent,
    NotificationConfigrationComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    SharedModule,
  ]
})
export class EmployeesModule {
}
