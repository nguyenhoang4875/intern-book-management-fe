import { BookService } from "src/app/shared/services/book.service";
import { BookStorageService } from "src/app/shared/services/book-storage.service";
import { Component, OnInit } from "@angular/core";
import { Book } from "src/app/shared/model/book.model";
import { AuthenticationService } from "src/app/shared/services/authentication.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  private isLogin: boolean;
  private isAdmin: boolean;
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.isLogin = this.authenticationService.isUserLoggedIn();
    this.authenticationService
      .checkRoleAdmin()
      .subscribe((response: boolean) => {
        this.isAdmin = response;
      });
  }
}
