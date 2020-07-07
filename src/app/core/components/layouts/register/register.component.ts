import { AuthenticationService } from "./../../../../shared/services/authentication.service";
import { Component, OnInit } from "@angular/core";
import { UserDetail } from "src/app/shared/model/user-detail.model";
import { UserStorageService } from "src/app/shared/services/user-storage.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  userDetail: UserDetail = new UserDetail();

  constructor(
    private userStorageService: UserStorageService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSaveUser() {
    this.userStorageService
      .addUser(this.userDetail)
      .subscribe((user: UserDetail) => {
        console.log(user);
        this.authenticationService
          .authenticate(this.userDetail.username, this.userDetail.password)
          .subscribe();
        this.router.navigate(["../"], { relativeTo: this.route });
      });
  }

  login(): void {}

  onCancel() {
    this.router.navigate(["../../"], { relativeTo: this.route });
  }
}
