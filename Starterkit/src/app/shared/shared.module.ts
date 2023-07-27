import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UIModule} from './ui/ui.module';

import {WidgetModule} from './widget/widget.module';
import {TranslateModule} from "@ngx-translate/core";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {ClickOutsideModule} from "ng-click-outside";
import {SimplebarAngularModule} from "simplebar-angular";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzPipesModule} from "ng-zorro-antd/pipes";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NZ_I18N, vi_VN} from "ng-zorro-antd/i18n";


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
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzDropDownModule,
    NzPipesModule,
    NzFormModule,
    NzInputModule,
    NzDatePickerModule,
  ],

})

export class SharedModule {
}
