import { AuthenticationService } from "./../services/authentication.service";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(""),
    password: new FormControl(""),
  });

  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

  constructor(
    private router: Router,
    private loginService: AuthenticationService
  ) {}

  ngOnInit() {}

  login() {
    if (this.form.valid) {
      console.log(this.form.value);

      this.submitEM.emit(this.form.value);
    }
    this.loginService
      .authenticate(this.form.value.username, this.form.value.password)
      .subscribe(
        (data) => {
          this.router.navigate([""]);
        },
        (error) => {
          this.error = error.message;
        }
      );
  }
}
