import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { GQL_BUSCAR_IMOVEL } from '../../../graphql/graphql';
import { Imovel } from '../../../helpers/types';
import { GraphQlService } from '../../../services/graphql.service';
import { environment } from '../../../../environments/environment';
import { UploadService } from '../../../services/upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-editar-imovel',
  templateUrl: './editar-imovel.component.html',
  styleUrls: ['./editar-imovel.component.scss', '../../admin.component.scss'],
})
export class EditarImovelComponent implements OnInit, OnDestroy {
  faPlusSquare = faPlusSquare;
  //Para upload
  url = `${environment.API}files/`;
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  mainImg = '';
  plusImgs = [''];

  editaForm: Imovel = {
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
  imovelQuery!: QueryRef<any>;
  loading = true;
  error: any;

  private querySubs = new Subscription();
  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router,
    private gqlService: GraphQlService,
    private uploadService: UploadService,
  ) {}

  ngOnInit(): void {
    const imovelId = this.route.snapshot.paramMap.get('id');
    this.imovelQuery = this.apollo.watchQuery<Imovel>({
      query: GQL_BUSCAR_IMOVEL,
      variables: {
        _id: imovelId,
      },
      errorPolicy: 'all',
    });

    this.querySubs = this.imovelQuery.valueChanges.subscribe(({ data, loading }) => {
      this.loading = loading;
      this.editaForm = data.imovel;
      this.mainImg = data.imagemPrincipal;
    });
  }

  onSubmit() {
    const imovelId = this.route.snapshot.paramMap.get('id');
    if (this.editaForm.comodidadesImovel) {
      this.editaForm.comodidadesImovel = this.separa(this.editaForm.comodidadesImovel + '');
    }
    if (this.editaForm.comodidadesCondominio) {
      this.editaForm.comodidadesCondominio = this.separa(this.editaForm.comodidadesCondominio + '');
    }
    console.log(JSON.stringify(imovelId));
    console.log(imovelId);
    console.log(this.editaForm);
    this.editaForm.imagemPrincipal = this.mainImg;
    this.gqlService.atualizaImovel(imovelId, this.editaForm);
  }

  refresh() {
    this.imovelQuery.refetch();
  }

  voltar() {
    this.router.navigate(['../']);
  }

  ngOnDestroy(): void {
    this.querySubs.unsubscribe();
  }

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
