import { IRole } from './../model/user.model';
import { LocalStorageEnum } from './../enums/local-storage.enum';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../model/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  url = environment.baseUrl;
  public currentUser: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(private httpClient: HttpClient, private router: Router) {}

  public authenticate(username, password): Observable<User> {
    return this.httpClient
      .post<any>(this.url + 'login', { username, password })
      .pipe(
        map((userData) => {
          const newUser = new User(
            userData.id,
            userData.username,
            userData.token,
            userData.roles
          );
          localStorage.setItem(LocalStorageEnum.USER, JSON.stringify(newUser));
          this.currentUser.next(newUser);
          return userData;
        })
      );
  }

  public getUserFromLocalStorage(): User {
    const user = localStorage.getItem(LocalStorageEnum.USER);
    if (user && JSON.parse(user)) {
      this.currentUser.next(JSON.parse(user));
      return JSON.parse(user) as User;
    }
    return null;
  }

  public logout(): void {
    this.currentUser.next(null);
    localStorage.clear();
    this.router.navigate(['/logout']);
  }

  public isAdminRole(): boolean {
    const user = this.getUserFromLocalStorage();
    let isValid = false;
    if (user != null) {
      user.roles.forEach((role: IRole) => {
        if (role.name.localeCompare('ROLE_ADMIN') == 0) {
          isValid = true;
          return;
        }
      });
    }
    return isValid;
  }
}
