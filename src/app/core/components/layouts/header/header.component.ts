import { Router } from "@angular/router";
import { BookService } from "src/app/shared/services/book.service";
import { BookStorageService } from "src/app/shared/services/book-storage.service";
import { Component, OnInit } from "@angular/core";
import { Book } from "src/app/shared/model/book.model";
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
    
    this.authenticationService
      .checkRoleAdmin()
      .subscribe((response: boolean) => {
        this.isAdmin = response;
      });
  }
}
