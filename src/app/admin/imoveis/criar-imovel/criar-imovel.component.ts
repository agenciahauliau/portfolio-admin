import { Component, OnInit } from '@angular/core';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { GraphQlService } from '../../../services/graphql.service';
import { Imovel } from '../../../helpers/types';
import { environment } from '../../../../environments/environment';
import { UploadService } from 'src/app/services/upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-criar-imovel',
  templateUrl: './criar-imovel.component.html',
  styleUrls: ['./criar-imovel.component.scss', '../../admin.component.scss'],
})
export class CriarImovelComponent implements OnInit {
  //Para upload
  url = `${environment.API}files/`;
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  mainImg = '';
  plusImgs = [''];

  faPlusSquare = faPlusSquare;
  faHome = faHome;
  form: Imovel = {
    _id: '',
    nomeImovel: '',
    imagemPrincipal: '',
    categoriaImovel: '',
    jardins: false,
    descricaoImovel: '',
    tipoNegociacao: '',
    statusImovel: '',
    aceitaPermuta: false,
    mobiliado: false,
    valorImovel: 0,
    valorEntrada: 0,
    valorParcela: 0,
    valorIPTU: 0,
    valorCondominio: 0,
    areaTotal: 0,
    areaConstruida: 0,
    andarImovel: 0,
    qtdeQuarto: 0,
    qtdeBanheiro: 0,
    qtdeSuites: 0,
    qtdeVagas: 0,
    nomeConstrutora: '',
    cep: 0,
    logradouro: '',
    numeroLogradouro: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
    imagensAdicionais: [''],
    comodidadesImovel: [''],
    comodidadesCondominio: [''],
  };

  constructor(private gqlService: GraphQlService, private uploadService: UploadService) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.comodidadesImovel) {
      this.form.comodidadesImovel = this.separa(this.form.comodidadesImovel + '');
    }
    if (this.form.comodidadesCondominio) {
      this.form.comodidadesCondominio = this.separa(this.form.comodidadesCondominio + '');
    }
    this.form.imagemPrincipal = this.mainImg;
    this.gqlService.criarImovel(this.form);
  }

  //TODO: Verificar o pq que o array[0] não está sendo inserido no banco
  separa(data: any) {
    return data.split(/\n+|\r+|,\s+/g).filter(Boolean);
  }

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  uploadFiles(): void {
    this.message = [];
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    if (file) {
      this.uploadService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round((100 * event.loaded) / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = 'Arquivo enviado com sucesso ' + file.name;
            this.message.push(msg);
            this.mainImg = this.url + event.body[0];
            //this.plusImgs.push(this.url + event.body[0]);
            //this.plusImgs = this.plusImgs.filter((x) => x.trim() != '');
            //console.log(this.plusImgs);
          }
        },
        (error: any) => {
          this.progressInfos[idx].value = 0;
          const msg = `Não foi possível subir o arquivo: ${file.name}\n Possivel Causa: ${error}`;
          this.message.push(msg);
        },
      );
    }
  }
}
