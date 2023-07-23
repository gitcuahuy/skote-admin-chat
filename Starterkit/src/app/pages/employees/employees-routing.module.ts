import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ROUTER_PATH} from "@shared/constants/router.constant";
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {AuthGuard} from "@core/guards/auth.guard";
import {PermissionSettingListComponent} from "./permission-setting-list/permission-setting-list.component";
import {NotificationConfigrationComponent} from "./notification-configration/notification-configration.component";
import {LeaveManagerListComponent} from "./leave-manager-list/leave-manager-list.component";
import {EmployeeDetailComponent} from "./employee-list/employee-detail/employee-detail.component";
import {EmployeeUpdateComponent} from "./employee-list/employee-update/employee-update.component";

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  //  danh sách nhân viên
  {
    path: ROUTER_PATH.employees.listEmployee,
    component: EmployeeListComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: []
    }
  },
  // Thông tin chi tiết nhân viên
  {
    path: ROUTER_PATH.employees.employeeDetail,
    component: EmployeeDetailComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: []
    }
  },
  // Cập nhật thông tin nhân viên
  {
    path: ROUTER_PATH.employees.employeeUpdate,
    component: EmployeeUpdateComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: []
    }
  },
  //  quản lý phn quyèn
  {
    path: ROUTER_PATH.employees.permissionSetting,
    component: PermissionSettingListComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: []
    }
  },
  //  quản lý nghỉ php
  {
    path: ROUTER_PATH.employees.leaveManager,
    component: LeaveManagerListComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: []
    }
  },
  {
    path: ROUTER_PATH.employees.notificationSetting,
    component: NotificationConfigrationComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: []
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule {
}
