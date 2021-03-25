import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { GraphQlService } from '../../services/graphql.service';
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
    private gqlService: GraphQlService,
    private tokenStorage: TokenService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.redirect();
  }

  async onSubmit() {
    await this.gqlService
      .login(this.form)
      .then((res) => {
        console.log('Resultado no LoginComponent', res);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.redirect();
      })
      .catch((err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        console.log('Erro login no LoginComponent', err);
      });
  }

  redirect() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.router.navigate(['admin']);
    }
  }
}
