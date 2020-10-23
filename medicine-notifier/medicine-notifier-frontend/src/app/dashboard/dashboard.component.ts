import { Component, OnInit } from '@angular/core';
import {MedicineService} from './medicine.service';
import {Medicine} from '../shared/models/medicine.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  availableMedicines: Medicine[];

  constructor(private medicineService: MedicineService, private router: Router) { }

  ngOnInit() {
    this.medicineService.getMedicinesList().subscribe(medicines => {
      console.log('medicines: ', medicines);
    }, error => console.log('Error: ', error));
  }

  addNewMedicineReminder() {
    this.router.navigate(['/add-reminder']);
  }
}
