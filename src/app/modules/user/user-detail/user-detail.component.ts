import { User } from 'src/app/shared/model/user.model';
import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserStorageService } from 'src/app/shared/services/user-storage.service';
import { ActivatedRoute } from '@angular/router';
import { UserDetail } from 'src/app/shared/model/user-detail.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  user: UserDetail = new UserDetail();
  id: number;

  constructor(
    private userStorageService: UserStorageService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const userStorage: User = this.authenticationService.getUserFromLocalStorage();
    this.id = userStorage.id;
    this.userStorageService
      .getElementById(this.id)
      .subscribe((userDetail: UserDetail) => {
        this.user = userDetail;
      });
  }
  onEditUser() {
    this.router.navigate(['../users', this.id, 'edit'], {
      relativeTo: this.route,
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
