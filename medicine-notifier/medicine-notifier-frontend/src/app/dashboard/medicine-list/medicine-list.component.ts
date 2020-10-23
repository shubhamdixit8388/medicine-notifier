import { Component, OnInit } from '@angular/core';
import {Medicine} from '../../shared/models/medicine.model';
import {MedicineService} from '../medicine.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.scss'],
})
export class MedicineListComponent implements OnInit {
  availableMedicines: Medicine[];

  constructor(private medicineService: MedicineService, private router: Router) { }

  ngOnInit() {
    this.availableMedicines = this.medicineService.getMedicinesList();
  }

  addNewMedicineReminder() {
    this.router.navigate(['dashboard/add-new']);
  }

}
