import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree  } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { Observable } from 'rxjs';
import { UserService } from '../shared/services/user.service';

@Injectable({
  providedIn: 'root',
})




export class AuthGuard {
  constructor(private authService: AuthService, private UserService: UserService,
    private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.authService.getUserIdByEmail().subscribe(id => {
      this.authService.getIsAuthenticated(id).subscribe(check => {
        if (check) {
          console.log(id + " " + check);
          return true;
        } else {
          console.log("Не авторизован!!!! " + check);
          this.router.navigate(['/auth/login']);
          return false;
        }
      })

    })
    return true;

  }
}
