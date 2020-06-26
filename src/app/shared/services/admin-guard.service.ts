import { IRole } from "./../model/user.model";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: "root",
})
export class AdminGuardService implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.getUserFromLocalStorage();
    let isValid = false;
    if (currentUser) {
      currentUser.roles.forEach((role: IRole) => {
        if (role.name.localeCompare("ROLE_ADMIN") == 0) {
          isValid = true;
          return;
        }
      });
    }
    if (isValid) {
      return true;
    } else {
      this.router.navigate(["login"]);
      return false;
    }
  }
}
