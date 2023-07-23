import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TicketRoutingModule} from './ticket-routing.module';
import {SharedModule} from "@shared/shared.module";
import { ConfigApprovalComponent } from './config-approval/config-approval.component';
import { TicketTypeComponent } from './ticket-type/ticket-type.component';
import { TicketReasonComponent } from './ticket-reason/ticket-reason.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';


@NgModule({
  declarations: [
    ConfigApprovalComponent,
    TicketTypeComponent,
    TicketReasonComponent,
    TicketListComponent
  ],
  imports: [
    CommonModule,
    TicketRoutingModule,
    SharedModule
  ]
})
export class TicketModule {
}
