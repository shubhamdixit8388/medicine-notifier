import { Component, OnInit } from '@angular/core';
import {Medicine} from '../../shared/models/medicine.model';
import {MedicineService} from '../medicine.service';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {User} from '../../shared/models/user.model';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.scss'],
})
export class MedicineListComponent implements OnInit {
  availableMedicines: Medicine[];
  isLoaderShow = false;
  user: User = new User();

  constructor(private medicineService: MedicineService, private router: Router, private authService: AuthService)
  { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.isLoaderShow = true;
    this.medicineService.getMedicinesList();
    this.medicineService.fetchedMedicines.subscribe(medicines => {
      this.availableMedicines = medicines;
      this.isLoaderShow = false;
    });
  }

  addNewMedicineReminder() {
    this.router.navigate(['dashboard/add-new']).then();
  }

}
