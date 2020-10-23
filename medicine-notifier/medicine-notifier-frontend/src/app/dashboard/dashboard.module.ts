import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {AddNewReminderComponent} from './add-new-reminder/add-new-reminder.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {IonicModule} from '@ionic/angular';
import {MedicineListComponent} from './medicine-list/medicine-list.component';
import {HeaderComponent} from './header/header.component';
import {HttpClientModule} from "@angular/common/http";
import {SignupComponent} from "../auth/signup/signup.component";
import {LoaderComponent} from "../shared/components/loader/loader.component";

@NgModule({
    declarations: [
        DashboardComponent,
        AddNewReminderComponent,
        MedicineListComponent,
        HeaderComponent,
        LoaderComponent
    ],
    entryComponents: [],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        DashboardRoutingModule,
        IonicModule,
        HttpClientModule
    ],
    providers: []
})
export class DashboardModule {}
