import { UserStorageService } from "./../../../../shared/services/user-storage.service";
import { UserDetail } from "./../../../../shared/model/user-detail.model";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/shared/services/authentication.service";
import { User } from "src/app/shared/model/user.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  public isLogin: boolean;
  public isAdmin: boolean;
  public currentUser: User;
  public userDetail: UserDetail = new UserDetail();
  public router: Router;
  public isCollapsed = false;
  constructor(
    private authenticationService: AuthenticationService,
    private userStorageService: UserStorageService
  ) {}

  ngOnInit() {
    this.authenticationService.currentUser.subscribe((user: User) => {
      this.currentUser = user;
    });
    const user = this.authenticationService.getUserFromLocalStorage();
    if (!user) {
      this.authenticationService.logout();
    } else {
      this.userStorageService
        .getUserById(user.id)
        .subscribe((response: UserDetail) => {
          this.userDetail = response;
        });
    }
    this.isAdmin = this.authenticationService.isAdminRole();
  }
}
