import { UserStorageService } from "./../../../shared/services/user-storage.service";
import { UserDetail } from "./../../../shared/model/user-detail.model";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { environment } from "src/environments/environment.prod";

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.scss"],
})
export class UserEditComponent implements OnInit {
  userDetail: UserDetail = new UserDetail();
  id: number;
  private fileToUpload: File = null;
  public editMode = false;
  private readonly environmentUrl = environment.baseUrl;

  constructor(
    private userStorageService: UserStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      console.log("edit mode: " + this.editMode);
      if (this.id != null) {
        this.userStorageService
          .getElementById(this.id)
          .subscribe((user: UserDetail) => {
            this.userDetail = user;
          });
      }
    });
  }

  public handleFileInput(files: FileList): void {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
  }

  onSaveUser() {
    if (this.editMode) {
      var updateUser$ = this.userStorageService.updateUser(
        this.userDetail.id,
        this.userDetail
      );
      if (this.fileToUpload != null && this.fileToUpload != undefined) {
        this.userStorageService
          .postFile(this.fileToUpload)
          .subscribe((response) => {
            this.userDetail.avatar =
              this.environmentUrl + "images/" + response.fileName;
            updateUser$.subscribe((response: UserDetail) => {
              console.log(response.avatar);
              this.userDetail = response;
              this.router.navigate(["../../"], { relativeTo: this.route });
            });
          });
      } else {
        updateUser$.subscribe((response: UserDetail) => {
          console.log(response.avatar);
          this.userDetail = response;
          this.router.navigate(["../../"], { relativeTo: this.route });
        });
      }
    } else {
      this.userStorageService.addUser(this.userDetail).subscribe();
          this.router.navigate(["../"], { relativeTo: this.route });
    }
  }

  onCancel() {
    this.router.navigate(["../../"], { relativeTo: this.route });
  }
}
