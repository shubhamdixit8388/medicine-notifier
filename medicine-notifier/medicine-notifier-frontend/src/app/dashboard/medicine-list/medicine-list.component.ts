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
  isLoaderShow = false;

  constructor(private medicineService: MedicineService, private router: Router) { }

  ngOnInit() {
    this.isLoaderShow = true;
    this.medicineService.getMedicinesList().subscribe(medicines => {
      // @ts-ignore
      this.availableMedicines = medicines.result;
      this.isLoaderShow = false;
    }, error => console.log('Error: ', error));
  }

  addNewMedicineReminder() {
    this.router.navigate(['dashboard/add-new']);
  }

}
