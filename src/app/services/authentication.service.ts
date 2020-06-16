import { environment } from './../../environments/environment.prod';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

export class User {
  constructor(public status: string) {}
}

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  url = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}
  // Provide username and password for authentication, and once authentication is successful,
  // store JWT token in session
  authenticate(username, password) {
    return this.httpClient
      .post<any>(this.url+"login", { username, password })
      .pipe(
        map((userData) => {
          sessionStorage.setItem("username", username);
          let tokenStr = "Bearer " + userData.token;
          sessionStorage.setItem("token", tokenStr);
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("username");
    console.log(!(user === null));
    return !(user === null);
  }

  logout() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("token");
  }
}
