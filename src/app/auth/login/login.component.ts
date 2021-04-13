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
  ano = new Date().getFullYear();

  constructor(
    private gqlService: GraphQlService,
    private tokenService: TokenService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.redirect();
  }

  async onSubmit() {
    await this.gqlService
      .login(this.form)
      .then((res: any) => {
        if (res.data) {
          this.tokenService.saveToken(res.data.login);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.redirect();
        }
        // Resolução de erros só por garantia. Tecnicamente o catch que vai fazer o trabalho.
        if (res.errors) {
          console.error(res.errors[0].message);
          this.isLoginFailed = true;
          this.errorMessage = res.errors[0].message;
        }
      })
      .catch((err) => {
        this.errorMessage = 'Erro de usuário/email ou senha';
        this.isLoginFailed = true;
        console.log('Erro login no LoginComponent', err);
      });
  }

  redirect() {
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
      this.router.navigate(['admin']);
    }
  }
}
