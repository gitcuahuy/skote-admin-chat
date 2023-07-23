import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './dashboards/default/default.component';
import {ROUTER_MODULE} from "@shared/constants/router.constant";

const routes: Routes = [
  { path: '', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DefaultComponent },
  { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },
  { path: ROUTER_MODULE.ticket, loadChildren: () => import('./ticket/ticket.module').then(m => m.TicketModule) },
  { path: ROUTER_MODULE.employees, loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
