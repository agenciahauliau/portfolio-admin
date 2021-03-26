import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Galeria } from '../../../helpers/types';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { GraphQlService } from '../../../services/graphql.service';

@Component({
  selector: 'app-criar-galeria',
  templateUrl: './criar-galeria.component.html',
  styleUrls: ['./criar-galeria.component.scss'],
})
export class CriarGaleriaComponent implements OnInit {
  faPlusSquare = faPlusSquare;
  faHome = faHome;

  form: Galeria = {
    nomeGaleria: '',
    arquivoDestaque: '',
    idImovel: [''],
    url: [''],
  };

  constructor(private accService: GraphQlService, private router: Router) {}

  ngOnInit(): void {}

  async onSubmit() {
    if (this.form.idImovel) {
      this.form.idImovel = this.separa(this.form.idImovel + '');
    }
    if (this.form.url) {
      this.form.url = this.separa(this.form.url + '');
      this.form.arquivoDestaque = this.form.url?.[0];
    }
    console.log('form', this.form);
    await this.accService.criarGaleria(this.form);
    setTimeout(() => {
      window.alert('Galeria Criada');
      this.voltar();
    }, 2000);
  }

  voltar() {
    this.router.navigate(['admin/galerias']);
  }

  separa(data: any) {
    return data.split(/\n+|\r+|,\s+/g).filter(Boolean);
  }
}
