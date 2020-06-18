import { AllBookModule } from './modules/allbook/allbook.module';
import { MyBookModule } from './modules/mybook/mybook.module';
import { LoginModule } from './modules/login/login.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LogoutComponent } from "./logout/logout.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BooksComponent } from "./books/books.component";
import { BookListComponent } from "./books/book-list/book-list.component";
import { BasicAuthHttpInterceptorService } from './shared/services/basic-auth-interceptor.service';
import { HeaderComponent } from './header/header.component';
@NgModule({
  declarations: [
    AppComponent,
    LogoutComponent,
    BooksComponent,
    BookListComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    LoginModule,
    MyBookModule,
    AllBookModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: BasicAuthHttpInterceptorService, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}