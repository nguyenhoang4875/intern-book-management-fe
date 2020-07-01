import { MatDialog } from '@angular/material';
import { UserDetail } from "./../../shared/model/user-detail.model";
import { UserStorageService } from "./../../shared/services/user-storage.service";
import { Component, OnInit } from "@angular/core";
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
  private users: Array<UserDetail> = [];

  constructor(private userStorageService: UserStorageService, private dialog: MatDialog) {}

  ngOnInit() {
    this.userStorageService.fetchUsers().subscribe((response: UserDetail[]) => {
      console.log(response);
      this.users = response;
    });
  }
  public deleteUse(id: number): void {

    console.log("user id: "+ id);
    let dialogRef = this.dialog.open(ConfirmationDialogComponent) ;
    dialogRef.afterClosed().subscribe((response: boolean) => {
      if(response == true){
        this.userStorageService.deleteUserById(id).subscribe();
        const index = this.users.findIndex((user)=> user.id === id);
        this.users.splice(index,1);
      }
    })
    
  }
}
