import { UserStorageService } from "./../../../shared/services/user-storage.service";
import { UserDetail } from "./../../../shared/model/user-detail.model";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.scss"],
})
export class UserEditComponent implements OnInit {
  userDetail: UserDetail;
  id: number;
  editMode = false;

  constructor(
    private userStorageService: UserStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      this.userStorageService
        .getElementById(this.id)
        .subscribe((user: UserDetail) => {
          this.userDetail = user;
        });
    });
  }
  
  onSaveUser() {
    this.userStorageService
      .updateUser(this.userDetail.id, this.userDetail)
      .subscribe((response: UserDetail) => {
        this.userDetail = response;
        this.router.navigate(["../../"],{relativeTo: this.route})
      });
  }

  onCancel() {
    this.router.navigate(["../../"], { relativeTo: this.route });
  }
}
