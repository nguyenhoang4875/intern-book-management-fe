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
  private isLogin: boolean;
  private isAdmin: boolean;
  public currentUser: User;
  public router: Router;
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.authenticationService.currentUser.subscribe((user: User) => {
      this.currentUser = user;
    });
    const user = this.authenticationService.getUserFromLocalStorage();
    if (!user) {
      this.authenticationService.logout();
    }
  }
}
