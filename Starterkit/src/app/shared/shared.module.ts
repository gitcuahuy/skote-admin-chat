import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UIModule} from './ui/ui.module';

import {WidgetModule} from './widget/widget.module';
import {TranslateModule} from "@ngx-translate/core";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {ClickOutsideModule} from "ng-click-outside";
import {SimplebarAngularModule} from "simplebar-angular";
import {NzTableModule} from "ng-zorro-antd/table";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UIModule,
    WidgetModule,
    TranslateModule,
    NgbDropdownModule,
    ClickOutsideModule,
    SimplebarAngularModule,
  ],
  exports: [
    UIModule,
    WidgetModule,
    CommonModule,
    TranslateModule,
    NzTableModule
  ]
})

export class SharedModule {
}
