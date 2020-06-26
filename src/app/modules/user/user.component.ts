import { UserDetail } from "./../../shared/model/user-detail.model";
import { UserStorageService } from "./../../shared/services/user-storage.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
  private users: Array<UserDetail> = [];

  constructor(private userStorageService: UserStorageService) {}

  ngOnInit() {
    this.userStorageService.fetchUsers().subscribe((response: UserDetail[]) => {
      console.log(response);
      this.users= response;
    })
  }
}
