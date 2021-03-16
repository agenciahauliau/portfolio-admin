import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    /*     const texto = 'Itamar  ,fazendo, deep ,fake da   , minha, cara de, cavalo';
    const format = texto.replace(/^\s+|\s+$/gm, '').split(',');
    const forwach = format.forEach((el) => {
      el.trim();
    });
    console.log('split', format);
    console.log('split', forwach); */
  }

  onSubmit() {
    console.log('form', this.form);
    this.accService.criarImovel(this.form);
  }

  toArray(value: string): void {
    this.form.comodidadesCondominio = value.split(/[\r\n]+/);
  }
}
