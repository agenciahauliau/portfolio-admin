import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { HttpHeaders } from '@angular/common/http';
import { TokenService } from '../helper/token.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    senha: null,
  };
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
    const { email, senha } = this.form;
    this.accService
      .login(email, senha)
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
