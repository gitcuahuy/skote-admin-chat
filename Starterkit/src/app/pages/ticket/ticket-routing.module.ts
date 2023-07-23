import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ROUTER_PATH} from "@shared/constants/router.constant";
import {TicketListComponent} from "./ticket-list/ticket-list.component";
import {AuthGuard} from "@core/guards/auth.guard";
import {TicketTypeComponent} from "./ticket-type/ticket-type.component";
import {ConfigApprovalComponent} from "./config-approval/config-approval.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ROUTER_PATH.ticket.list,
  },
  // danh sách ticket
  {
    path: ROUTER_PATH.ticket.list,
    component: TicketListComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: []
    }
  },
  // Thiết lập loại don tu
  {
    path: ROUTER_PATH.ticket.ticketType,
    component: TicketTypeComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: []
    }
  },
  // Thiết lập Quy trinh duyet don
  {
    path: ROUTER_PATH.ticket.configApproval,
    component: ConfigApprovalComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: []
    }
  },
  // Thiết lập lý do duyet don
  {
    path: ROUTER_PATH.ticket.ticketReason,
    component: ConfigApprovalComponent,
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
export class TicketRoutingModule {
}
