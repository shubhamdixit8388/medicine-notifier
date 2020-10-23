import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

import { AuthData } from '../shared/models/auth-data.model';
import {User} from '../shared/models/user.model';
import {Subject} from 'rxjs';
// @ts-ignore
import credentials from './credentials.json';
import {ToastController} from '@ionic/angular';
import {RestApiService} from '../shared/services/rest-api.service';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private user: User = new User();
    authChange = new Subject<boolean>();

    constructor(private router: Router, private toastCtrl: ToastController,
                private restApiService: RestApiService) {
        console.log(credentials);
    }

    signup(authData) {
        this.restApiService.post('/users/signup', authData).subscribe(result => {
            this.showToast('Successfully signup!!!').then();
            this.router.navigate(['/auth/login']);
        }, error => console.log(error));
    }
    login(authData: AuthData) {
        this.restApiService.post('/users/login', authData).subscribe(result => {
            // @ts-ignore
            this.authSuccessFully(result);
            this.showToast('Successfully logged in!!!').then();
        }, error => {
            this.showToast('Wrong credentials').then();
            this.router.navigate(['/auth/login']).then();
        });
    }
    logout() {
        localStorage.removeItem('token');
        this.authChange.next(false);
        this.showToast('Successfully Logged out!');
        this.router.navigate(['auth/login']);
    }
    getUser() {
        this.user.username = localStorage.getItem('username');
        this.user.email = localStorage.getItem('email');
        return this.user;
    }
    isAuth() {
        return localStorage.getItem('token');
    }
    authSuccessFully(user: string) {
        this.authChange.next(true);
        // @ts-ignore
        localStorage.setItem('token', user.token);
        // @ts-ignore
        localStorage.setItem('username', user.username);
        // @ts-ignore
        localStorage.setItem('email', user.email);
        this.router.navigate(['/dashboard/medicine-list']);
    }
    async showToast(message: string) {
        const toast = await this.toastCtrl.create({
            message,
            duration: 5000
        });
        toast.present();
    }
}
