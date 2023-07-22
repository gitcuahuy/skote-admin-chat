import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';

import {environment} from '@environment/environment';

import {NgbAccordionModule, NgbModule, NgbNavModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';

import {ExtrapagesModule} from './extrapages/extrapages.module';

import {LayoutsModule} from './layouts/layouts.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {initFirebaseBackend} from './authUtils';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ErrorInterceptor} from '@core/helpers/error.interceptor';
import {JwtInterceptor} from '@core/helpers/jwt.interceptor';
import {FakeBackendInterceptor} from '@core/helpers/fake-backend';
import {AvatarModule} from "ngx-avatar";
import {FormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
// import {ToastrModule} from "ngx-toastr";

if (environment.defaultauth === 'firebase') {
  initFirebaseBackend(environment.firebaseConfig);
} else {
  // tslint:disable-next-line: no-unused-expression
  FakeBackendInterceptor;
}

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

const avatarColors = ["#FFB6C1", "#2c3e50", "#95a5a6", "#f39c12", "#1abc9c"];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    LayoutsModule,
    AppRoutingModule,
    ExtrapagesModule,
    CarouselModule,
    NgbAccordionModule,
    NgbNavModule,
    NgbTooltipModule,
    ScrollToModule.forRoot(),
    NgbModule,
    AvatarModule.forRoot({
      colors: avatarColors
    }),
    BrowserModule,
    FormsModule,
    ToastrModule.forRoot({timeOut: 10000}), // ToastrModule added
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    // {provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true},
  ],
})
export class AppModule {
}
