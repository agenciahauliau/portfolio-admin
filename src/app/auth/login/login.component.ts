import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { TokenService } from '../../helpers/token.service';
import { User } from 'src/app/helpers/types';
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
    private tokenStorage: TokenService
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit() {
    this.accService
      .login(this.form)
      .then((res) => {
        this.isLoginFailed = false;
        this.isLoggedIn = true;
      })
      .catch((err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        console.log(err);
      });
  }
}
