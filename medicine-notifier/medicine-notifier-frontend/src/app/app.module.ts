import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MedicineService} from './dashboard/medicine.service';
import {DashboardModule} from './dashboard/dashboard.module';
import {RestApiService} from './shared/services/rest-api.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpConfigInterceptor} from './shared/interceptor/http-config.interceptor';

@NgModule({
  declarations: [
      AppComponent,
      LoginComponent,
      SignupComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
      ReactiveFormsModule,
      DashboardModule,
      HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      MedicineService, RestApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
