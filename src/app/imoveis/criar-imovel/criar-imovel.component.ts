import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { Imovel } from '../../helpers/types';

@Component({
  selector: 'app-criar-imovel',
  templateUrl: './criar-imovel.component.html',
  styleUrls: ['./criar-imovel.component.scss'],
})
export class CriarImovelComponent implements OnInit {
  form: Imovel = {};

  constructor(private accService: AccountService) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.comodidadesImovel) {
      this.form.comodidadesImovel = this.separa(
        this.form.comodidadesImovel + ''
      );
    }
    if (this.form.comodidadesCondominio) {
      this.form.comodidadesCondominio = this.separa(
        this.form.comodidadesCondominio + ''
      );
    }
    console.log('form', this.form);
    this.accService.criarImovel(this.form);
  }

  //TODO: Verificar o pq que o array[0] não está sendo inserido no banco
  separa(data: any) {
    return data.split(/\n+|\r+|,\s+/g).filter(Boolean);
  }
}
