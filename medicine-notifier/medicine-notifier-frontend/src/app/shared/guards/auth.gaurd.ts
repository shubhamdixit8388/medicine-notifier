import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthGaurd implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.authService.isAuth()) {
            return true;
        } else {
            this.authService.showToast('Login or create account if you don\'t have').then();
            this.router.navigate(['auth/login']).then();
        }
    }
}
