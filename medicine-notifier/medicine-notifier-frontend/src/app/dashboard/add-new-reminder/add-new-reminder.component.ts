import { Component, OnInit } from '@angular/core';
import {Medicine} from '../../shared/models/medicine.model';
import {MedicineService} from '../medicine.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ReminderTime} from '../../shared/models/reminder-time.model';

@Component({
  selector: 'app-add-new-reminder',
  templateUrl: './add-new-reminder.component.html',
  styleUrls: ['./add-new-reminder.component.scss'],
})
export class AddNewReminderComponent implements OnInit {

  addReminderForm: FormGroup;
  medicine = new Medicine();
  medicineReminder = new ReminderTime();
  pillImages: { src: string }[];
  time: any;
  startDate: any;
  endDate: any;
  isLoaderShow = false;

  constructor(private medicineService: MedicineService) { }

  ngOnInit() {

    this.addReminderForm = new FormGroup({
      name: new FormControl('', {validators: Validators.required}),
      description: new FormControl('', {validators: [Validators.required]}),
      time: new FormControl(undefined, {validators: [Validators.required]}),
      startDate: new FormControl(undefined, {validators: Validators.required}),
      endDate: new FormControl(undefined, {validators: [Validators.required]})
    });
    this.pillImages = this.medicineService.getPillImages();
  }

  addImage(src: string) {
      this.medicine.shapeImgUrl = src;
  }


  addReminder() {
    if (this.addReminderForm.valid) {
      this.medicine.isActive = true;
      this.medicine.status = 'in-progress';
      this.medicine.name = this.addReminderForm.get('name').value;
      this.medicine.description = this.addReminderForm.get('description').value;
      this.medicine.startDate = this.addReminderForm.get('startDate').value;
      this.medicine.endDate = this.addReminderForm.get('endDate').value;

      /*this.medicineReminder.time = this.addReminderForm.get('time').value;
      this.medicineReminder.medicineId = this.addReminderForm.get('time').value;*/
      this.isLoaderShow = true;
      this.medicineService.addMedicineReminder(this.medicine).subscribe(result => {
        this.medicineService.showToast('Reminder added!!!').then();
        this.isLoaderShow = false;
      }, error => {
        this.medicineService.showToast('Failed to add reminder').then();
        this.isLoaderShow = false;
      });
    }
  }
}
