import { UserModule } from './modules/user/user.module';
import { AllBookModule } from "./modules/all-book/all-book.module";
import { MyBookModule } from "./modules/my-book/my-book.module";
import { LoginModule } from "./shared/modules/login/login.module";
import { SharedModule } from "src/app/shared/shared.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BasicAuthHttpInterceptorService } from "./shared/services/basic-auth-interceptor.service";
import { HeaderComponent } from "./core/components/layouts/header/header.component";
import { LogoutComponent } from "./core/components/layouts/logout/logout.component";
@NgModule({
  declarations: [AppComponent, LogoutComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    LoginModule,
    MyBookModule,
    AllBookModule,
    UserModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthHttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
