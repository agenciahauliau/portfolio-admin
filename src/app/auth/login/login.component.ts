import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { TokenService } from '../../services/token.service';
import { User } from 'src/app/helpers/types';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: User = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    private accService: AccountService,
    private tokenStorage: TokenService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.redirect();
  }

  onSubmit() {
    this.accService
      .login(this.form)
      .then((res) => {
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.redirect();
      })
      .catch((err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        console.log(err);
      });
  }

  redirect() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.router.navigate(['admin']);
    }
  }
}
