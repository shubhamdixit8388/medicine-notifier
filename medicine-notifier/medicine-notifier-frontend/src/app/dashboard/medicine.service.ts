import {Medicine} from '../shared/models/medicine.model';
import {RestApiService} from "../shared/services/rest-api.service";
import {ToastController} from "@ionic/angular";
import {Injectable} from "@angular/core";

@Injectable()
export class MedicineService {
    medicines: Medicine[] = [
        { id: '123', name: 'abc', description: 'This is content, without any paragraph or header tags,\n' +
                '    within an ion-card-content element.', startDate: new Date(), endDate: new Date(),
        shapeImgUrl: 'sdasdas', isActive: true, status: 'completed'},
        { id: '123', name: 'abc', description: 'This is content, without any paragraph or header tags,\n' +
                '    within an ion-card-content element.', startDate: new Date(), endDate: new Date(),
        shapeImgUrl: 'sdasdas', isActive: true, status: 'completed'},
        { id: '123', name: 'abc', description: 'This is content, without any paragraph or header tags,\n' +
                '    within an ion-card-content element.', startDate: new Date(), endDate: new Date(),
        shapeImgUrl: 'sdasdas', isActive: true, status: 'completed'},
        { id: '123', name: 'abc', description: 'This is content, without any paragraph or header tags,\n' +
                '    within an ion-card-content element.', startDate: new Date(), endDate: new Date(),
        shapeImgUrl: 'sdasdas', isActive: true, status: 'completed'},
        { id: '123', name: 'abc', description: 'This is content, without any paragraph or header tags,\n' +
                '    within an ion-card-content element.', startDate: new Date(), endDate: new Date(),
        shapeImgUrl: 'sdasdas', isActive: true, status: 'completed'},
        { id: '123', name: 'abc', description: 'This is content, without any paragraph or header tags,\n' +
                '    within an ion-card-content element.', startDate: new Date(), endDate: new Date(),
        shapeImgUrl: 'sdasdas', isActive: true, status: 'completed'},
        { id: '123', name: 'abc', description: 'This is content, without any paragraph or header tags,\n' +
                '    within an ion-card-content element.', startDate: new Date(), endDate: new Date(),
        shapeImgUrl: 'sdasdas', isActive: true, status: 'completed'},
    ];

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

    constructor(private restApiService: RestApiService, private toastCtrl: ToastController) {
    }

    getMedicinesList() {
        return this.medicines;
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
