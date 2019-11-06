import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const isLoggedIn = this.authService.isLoggedIn();
    console.log('canActivate', isLoggedIn);
    return isLoggedIn;


    /*
    if (isLoggedIn) {
      this.router.navigate(['/chat']);
      return true;
    }
    else {
      this.router.navigate(['/login']);
    }

      return false;
      */
    }

  
}
