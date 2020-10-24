import {Medicine} from '../shared/models/medicine.model';
import {RestApiService} from '../shared/services/rest-api.service';
import {ToastController} from '@ionic/angular';
import {Injectable} from '@angular/core';
import {interval, Subject, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class MedicineService {
    fetchedMedicines = new Subject<Medicine[]>();
    processFetchedMedicines: Medicine[];
    pillImages = [
        {src: 'assets/pills-png/pill8.PNG'},
        {src: 'assets/pills-png/pill10.PNG'},
        {src: 'assets/pills-png/pill3.PNG'},
        {src: 'assets/pills-png/pill7.PNG'},
        {src: 'assets/pills-png/pill5.PNG'},
        {src: 'assets/pills-png/pill6.PNG'},
        {src: 'assets/pills-png/pill4.PNG'},
        {src: 'assets/pills-png/pill1.PNG'},
        {src: 'assets/pills-png/pill9.PNG'},
        {src: 'assets/pills-png/pill2.PNG'},
        {src: 'assets/pills-png/pill11.PNG'}];

    intervalSub: Subscription;
    medicineDate: string;
    medicineTime: string;
    currentDate: Date;
    currentTime: string;
    currentDateConverted: string;

    constructor(private restApiService: RestApiService, private toastCtrl: ToastController, private http: HttpClient) {
        this.getMedicinesList();
        this.fetchedMedicines.subscribe(medicines => {
            if (medicines.length >= 1) {
                this.medicineDate = medicines[0].date;
                this.medicineTime = medicines[0].time;
            }
        });

        this.intervalSub = interval(1000).subscribe((func => {
            this.currentDate = new Date();
            this.currentDateConverted = this.currentDate.getDate().toString() +
                this.currentDate.getMonth().toString() +
                this.currentDate.getFullYear().toString();
            this.currentTime = this.currentDate.getHours().toString() +
                this.currentDate.getMinutes().toString() +
                this.currentDate.getSeconds().toString();
            if (this.currentDateConverted === this.medicineDate && this.medicineTime === this.currentTime) {
                this.showToast('we achieved it!!!').then();
            }
        }));
    }

    getMedicinesList() {
        this.restApiService.get('/medicine/medicines-list').subscribe(async medicines => {
            // @ts-ignore
            const DescFilteredMedicines = await this.getFilteredMedicines(medicines.result);
            // @ts-ignore
            this.fetchedMedicines.next(await this.filterDatesWise(DescFilteredMedicines));
        });
    }

    getFilteredMedicines(medicines: Medicine[]) {
        medicines.sort((a, b) => {
            const fd = a.date.toLowerCase();
            const sd = b.date.toLowerCase();
            if (fd < sd) {
                return -1;
            }
            if (fd > sd) {
                return 1;
            }
            return 0;
        });
        return medicines;
    }

    filterDatesWise(medicines: Medicine[]) {
        const firstValue = medicines[0];
        medicines.filter(res => res.date === firstValue.date)
            .sort((a, b) => {
                const fd = a.time.toLowerCase();
                const sd = b.time.toLowerCase();
                if (fd < sd) {
                    return -1;
                }
                if (fd > sd) {
                    return 1;
                }
                return 0;
        });
        return medicines;
    }

    getPillImages() {
        return this.pillImages;
    }

    addMedicineReminder(medicine: Medicine) {
        return this.restApiService.post('/medicine/add-reminder', medicine);
    }

    async showToast(message: string) {
        const toast = await this.toastCtrl.create({
            message,
            duration: 5000
        });
        await toast.present();
    }
}
