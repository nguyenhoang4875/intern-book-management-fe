import { LocalStorageEnum } from "./../enums/local-storage.enum";
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from "@angular/common/http";
import { User } from "../model/user.model";

@Injectable({
  providedIn: "root",
})
export class BasicAuthHttpInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const user = localStorage.getItem(LocalStorageEnum.USER);
    const currentUser = JSON.parse(user) as User;
    if (user) {
      req = req.clone({
        setHeaders: {
          Authorization: "Bearer " + currentUser.token,
        },
      });
    }

    return next.handle(req);
  }
}
