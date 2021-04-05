import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Galeria } from 'src/app/helpers/types';
import { GraphQlService } from 'src/app/services/graphql.service';

@Component({
  selector: 'app-criar-galeria',
  templateUrl: './criar-galeria.component.html',
  styleUrls: ['./criar-galeria.component.scss'],
})
export class CriarGaleriaComponent implements OnInit {
  galeriaForm!: Galeria & FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private gqlService: GraphQlService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.galeriaForm = this.formBuilder.group({
      nomeGaleria: ['', [Validators.required, Validators.minLength(4)]],
      arquivoDestaque: ['', [Validators.required]],
      idImovel: [[''], [Validators.required]],
      url: [[''], [Validators.required]],
    });
  }

  get getControl() {
    return this.galeriaForm.controls;
  }

  async onSubmit() {
    if (this.galeriaForm.value.idImovel) {
      this.galeriaForm.value.idImovel = this.separa(this.galeriaForm.value.idImovel + '');
    }
    if (this.galeriaForm.value.url) {
      this.galeriaForm.value.url = this.separa(this.galeriaForm.value.url + '');
      this.galeriaForm.value.arquivoDestaque = this.galeriaForm.value.url?.[0];
    }
    console.log(this.galeriaForm.value);
    await this.gqlService
      .criarGaleria(this.galeriaForm.value)
      .then((res: any) => {
        if (res.data) {
          console.log('Sucesso', res?.data?.createGaleria);
          window.alert('Galeria criada');
          this.voltar();
        }
        if (res.errors) {
          console.log('Erro', res?.errors[0]?.message);
          window.alert(`Erro: ${res.errors[0].message}`);
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  }

  voltar() {
    this.router.navigate(['admin/galerias']);
  }

  separa(data: any) {
    return data.split(/\n+|\r+|,\s+/g).filter(Boolean);
  }
}
