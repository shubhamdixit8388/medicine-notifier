import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MedicineListComponent} from './medicine-list/medicine-list.component';
import {AddNewReminderComponent} from './add-new-reminder/add-new-reminder.component';

const routes: Routes = [
    {
        path: 'medicine-list',
        component: MedicineListComponent,
    },
    {
        path: 'add-new',
        component: AddNewReminderComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class DashboardRoutingModule{}
