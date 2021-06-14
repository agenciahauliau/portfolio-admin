import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faHome, faTrash } from '@fortawesome/free-solid-svg-icons';

import { GQL_BUSCAR_IMOVEL } from '../../../graphql/graphql';
import { Imovel } from '../../../helpers/types';
import { GraphQlService } from '../../../services/graphql.service';
import { environment } from '../../../../environments/environment';
import { UploadService } from '../../../services/upload.service';

import { NgxViacepService, Endereco, CEPError } from '@brunoc/ngx-viacep';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
@Component({
  selector: 'app-editar-imovel',
  templateUrl: '../form-imovel.component.html',
  styleUrls: ['../form-imovel.component.scss', '../../admin.component.scss'],
})
export class EditarImovelComponent implements OnInit, OnDestroy {
  @ViewChildren('inputGaleria') inputGaleria: any;

  /* Para upload */
  url = `${environment.API}files/`;
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  mainImg = '';
  imgPreview: any;

  /* Para Upload de Planta */
  selectedPlantaFiles?: FileList;
  progressInfosPlantaFiles: any = [];
  messagePlantaFiles: string[] = [];
  plantaFiles: any = [];
  imgPreviewPlantas: any;

  /* Filtros e mascaras */
  maskCep = '00000-000';
  maskPhone = '(00) 0 0000-0000';

  /* Para Upload de Galerias */
  selectedFilesGalerias!: FileList;
  progressInfosGalerias: any = [];
  messageGalerias = [{}];
  plusImgs: any = [];

  faPlusSquare = faPlusSquare;
  faHome = faHome;
  faTrash = faTrash;

  imovelForm!: Imovel & FormGroup;

  imovelQuery!: QueryRef<any>;
  loading = true;
  error: any;

  public isActive: boolean = false;
  public isActiveImgAdicionais: boolean = false;
  public isActiveImgPlantas: boolean = false;

  private querySubs = new Subscription();

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private gqlService: GraphQlService,
    private uploadService: UploadService,
    private viacep: NgxViacepService,
  ) {}

  ngOnInit(): void {
    this.imovelForm = this.formBuilder.group({
      nomeImovel: [''],
      imagemPrincipal: [''],
      categoriaImovel: [''],
      jardins: [false],
      descricaoImovel: [''],
      tipoNegociacao: [''],
      statusImovel: [''],
      aceitaPermuta: [false],
      mobiliado: [false],
      valorImovel: ['', [Validators.required, Validators.min(0)]],
      valorEntrada: ['', Validators.min(0)],
      valorParcela: ['', Validators.min(0)],
      valorIPTU: ['', [Validators.min(0)]],
      valorCondominio: ['', Validators.min(0)],
      areaTotal: ['', [Validators.required, Validators.min(0)]],
      areaConstruida: ['', Validators.min(0)],
      andarImovel: ['', Validators.min(0)],
      qtdeQuarto: ['', Validators.min(0)],
      qtdeBanheiro: ['', Validators.min(0)],
      qtdeSuites: ['', Validators.min(0)],
      qtdeVagas: ['', Validators.min(0)],
      nomeConstrutora: [''],
      nomeProprietario: [''],
      telefoneProprietario: [''],
      cep: ['', [Validators.min(0o1001000), Validators.max(99999999)]],
      logradouro: [''],
      numeroLogradouro: [''],
      complemento: [''],
      bairro: [''],
      cidade: [''],
      uf: [''],
      comodidadesImovel: [[]],
      comodidadesCondominio: [[]],
      statusLancamento: 'pendente',
      previsaoLancamento: 0,
      galerias: this.formBuilder.array([]),
      imgPlantaCondominio: [],
      tipologias: this.formBuilder.array([]),
    });

    const imovelId = this.route.snapshot.paramMap.get('id');
    this.imovelQuery = this.apollo.watchQuery<Imovel>({
      query: GQL_BUSCAR_IMOVEL,
      variables: {
        _id: imovelId,
      },
    });

    this.querySubs = this.imovelQuery.valueChanges.subscribe(({ data, loading }) => {
      this.loading = loading;
      this.imovelForm.patchValue(data.imovel);
      this.mainImg = data.imovel.imagemPrincipal;
      this.plantaFiles = [...data.imovel.imgPlantaCondominio];
      for (const i of data.imovel.tipologias) {
        this.tipologias.push(
          this.formBuilder.group({
            quartos: [i.quartos, Validators.min(0)],
            suites: [i.suites, Validators.min(0)],
            tamanho: [i.tamanho, Validators.min(0)],
            valorEntrada: [i.valorEntrada, Validators.min(0)],
            valorParcela: [i.valorParcela, Validators.min(0)],
          }),
        );
      }
      for (const i of data.imovel.galerias) {
        this.plusImgs.push({ arquivos: [...i.arquivos], arquivoDestaque: i.arquivoDestaque });
        this.galerias.push(
          this.formBuilder.group({
            tipoGaleria: [i.tipoGaleria],
            nomeGaleria: [i.nomeGaleria],
            arquivos: [[...i.arquivos]],
            arquivoDestaque: [i.arquivoDestaque],
          }),
        );
      }
      this.patchDadosImovelForm();
      this.imovelForm.patchValue({
        previsaoLancamento: this.converteData(data.imovel.previsaoLancamento),
      });
      this.imovelForm.patchValue({
        comodidadesCondominio: data.imovel.comodidadesCondominio.join(', '),
      });
      this.imovelForm.patchValue({
        comodidadesImovel: data.imovel.comodidadesImovel.join(', '),
      });
    });
  }

  get getControl() {
    return this.imovelForm.controls;
  }

  get tipologias() {
    return this.imovelForm.get('tipologias') as FormArray;
  }

  addTipologia() {
    this.tipologias.push(
      this.formBuilder.group({
        quartos: ['', Validators.min(0)],
        suites: ['', Validators.min(0)],
        tamanho: ['', Validators.min(0)],
        valorEntrada: ['', Validators.min(0)],
        valorParcela: ['', Validators.min(0)],
      }),
    );
  }

  removeTipologia(index: number): void {
    this.tipologias.removeAt(index);
  }

  /* Método get e função para adicionar ou remover uma nova galeria para planta do condomínio */
  get galerias() {
    return this.imovelForm.get('galerias') as FormArray;
  }

  addGaleria() {
    this.galerias.push(
      this.formBuilder.group({
        tipoGaleria: [''],
        nomeGaleria: [''],
        arquivos: [['']],
        arquivoDestaque: [''],
      }),
    );
  }

  removeGaleria(index: number): void {
    this.galerias.removeAt(index);
    this.plusImgs.splice(index, 1);
  }

  async buscaCEP() {
    this.viacep
      .buscarPorCep(this.imovelForm.value.cep)
      .pipe(
        catchError((error: CEPError) => {
          // Ocorreu algum erro :/
          alert(error.message);
          console.log(error.message);
          return EMPTY;
        }),
      )
      .subscribe((endereco: Endereco) => {
        // Endereço retornado :)
        console.log(endereco);
        this.imovelForm.patchValue({
          logradouro: endereco.logradouro,
          uf: endereco.uf,
          bairro: endereco.bairro,
          cidade: endereco.localidade,
        });
      });
  }

  async onSubmit() {
    const imovelId = this.route.snapshot.paramMap.get('id');
    this.patchDadosImovelForm();
    await this.gqlService
      .atualizaImovel(imovelId, this.imovelForm.value)
      .then((res: any) => {
        if (res.data) {
          window.alert('Imóvel atualizado');
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

  refresh() {
    this.imovelQuery.refetch();
  }

  voltar() {
    this.router.navigate(['../']);
  }

  ngOnDestroy(): void {
    this.querySubs.unsubscribe();
  }

  patchDadosImovelForm() {
    /* Tratamento de dados das comodidades de imóvel e de condomínio */
    if (this.imovelForm.value.comodidadesImovel) {
      this.imovelForm.value.comodidadesImovel = this.separa(
        this.imovelForm.value.comodidadesImovel + '',
      );
    }
    if (this.imovelForm.value.comodidadesCondominio) {
      this.imovelForm.value.comodidadesCondominio = this.separa(
        this.imovelForm.value.comodidadesCondominio + '',
      );
    }

    /* Checagem de números */
    if (!this.imovelForm.value.valorImovel) this.imovelForm.value.valorImovel = 0;
    if (!this.imovelForm.value.valorEntrada) this.imovelForm.value.valorEntrada = 0;
    if (!this.imovelForm.value.valorParcela) this.imovelForm.value.valorParcela = 0;
    if (!this.imovelForm.value.valorIPTU) this.imovelForm.value.valorIPTU = 0;
    if (!this.imovelForm.value.valorCondominio) this.imovelForm.value.valorCondominio = 0;
    if (!this.imovelForm.value.areaTotal) this.imovelForm.value.areaTotal = 0;
    if (!this.imovelForm.value.areaConstruida) this.imovelForm.value.areaConstruida = 0;
    if (!this.imovelForm.value.andarImovel) this.imovelForm.value.andarImovel = 0;
    if (!this.imovelForm.value.qtdeQuarto) this.imovelForm.value.qtdeQuarto = 0;
    if (!this.imovelForm.value.qtdeBanheiro) this.imovelForm.value.qtdeBanheiro = 0;
    if (!this.imovelForm.value.qtdeSuites) this.imovelForm.value.qtdeSuites = 0;
    if (!this.imovelForm.value.qtdeVagas) this.imovelForm.value.qtdeVagas = 0;

    /* Recebe as imagens */
    this.imovelForm.value.imagemPrincipal = this.mainImg;
    this.imovelForm.value.imgPlantaCondominio = this.plantaFiles;

    this.imovelForm.value.previsaoLancamento != 0
      ? (this.imovelForm.value.previsaoLancamento = Date.parse(
          this.imovelForm.value.previsaoLancamento,
        ))
      : (this.imovelForm.value.previsaoLancamento = 0);
  }

  separa(data: any) {
    return data.split(/\n+|\r+|,\s+|,/g).filter(Boolean);
  }

  converteData(data: number) {
    let ano = new Date(data).getUTCFullYear().toString();
    let mes = (new Date(data).getUTCMonth() + 1).toString();
    let dia = new Date(data).getUTCDate().toString();
    dia.length == 1 ? (dia = `0${dia}`) : dia;
    mes.length == 1 ? (mes = `0${mes}`) : mes;
    return `${ano}-${mes}-${dia}`;
  }

  limpaArrayImgs() {
    this.mainImg = '';
    this.plantaFiles = [''];
    this.plusImgs = [
      {
        arquivos: [''],
        arquivoDestaque: '',
      },
    ];
    this.progressInfos = [];
    this.progressInfosPlantaFiles = [];
    this.progressInfosGalerias = [];
  }

  selectFiles(event: any): void {
    if (this.mainImg) this.deletaImgPrincipal(this.mainImg);
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;

    /* Previsualização da imagem */
    let mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      alert('Campo somente para imagens.');
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (e) => {
      this.imgPreview = reader.result;
    };
  }

  /* Imagem principal */
  uploadFiles(): void {
    this.message = [];
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name, url: '' };
    if (file) {
      this.uploadService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round((100 * event.loaded) / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = 'Arquivo enviado com sucesso ' + file.name;
            this.progressInfos[idx].url = this.url + event.body[0];
            this.message.push(msg);
            this.mainImg = this.url + event.body[0];
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

  deletaImgPrincipal(imgUrl: string): void {
    this.uploadService
      .deletaArquivo(imgUrl)
      .then((res: any) => {
        if (res.data) {
          console.log('Sucesso', res?.data);
          this.message = [];
          this.progressInfos = [];
          this.mainImg = '';
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

  /* GALERIAS */
  selectFilesGalerias(event: any): void {
    this.messageGalerias = [];
    this.progressInfosGalerias = [];
    this.selectedFilesGalerias = event.target.files;
  }

  uploadFilesGalerias(index: number): void {
    this.message = [];
    if (this.selectedFilesGalerias) {
      if (!this.plusImgs[index]) {
        this.plusImgs[index] = {
          arquivos: [''],
          arquivoDestaque: '',
        };
      }
      if (!this.progressInfosGalerias[index]) {
        this.progressInfosGalerias[index] = {};
      }
      for (let i = 0; i < this.selectedFilesGalerias.length; i++) {
        this.uploadImagensGaleria(i, this.selectedFilesGalerias[i], index);
        this.galerias.at(index).get('arquivos')?.setValue(this.plusImgs[index].arquivos);
        this.patchDadosImovelForm();
        this.selectedFilesGalerias[i].slice(0);
      }
      this.inputGaleria._results[index].nativeElement.value = '';
    }
  }

  uploadImagensGaleria(idx: number, file: File, index: number): void {
    this.progressInfosGalerias[index][idx] = { value: 0, fileName: file.name, url: '' };
    if (file) {
      this.uploadService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfosGalerias[index][idx].value = Math.round(
              (100 * event.loaded) / event.total,
            );
          } else if (event instanceof HttpResponse) {
            const msg = 'Arquivo enviado com sucesso ' + file.name;
            const url = this.url + event.body[0];
            this.messageGalerias.push(msg);
            this.progressInfosGalerias[index][idx].url = url;
            this.plusImgs[index].arquivos.push(url);
          }
        },
        (error: any) => {
          this.progressInfosGalerias[index][idx].value = 0;
          const msg = `Não foi possível subir o arquivo: ${file.name}\n Possivel Causa: ${error}`;
          this.messageGalerias.push(msg);
        },
      );
      this.plusImgs[index].arquivos = this.plusImgs[index].arquivos.filter(
        (x: any) => x.trim() != '',
      );
    }
  }

  deletaImagemGaleria(imgUrl: string, idx?: any): void {
    for (let i = 0; i < this.plusImgs[idx]?.arquivos.length; i++) {
      if (this.plusImgs[idx]?.arquivos[i] === imgUrl) {
        this.plusImgs[idx]?.arquivos.splice(i, 1);
        this.galerias.at(idx).get('arquivos')?.patchValue(this.plusImgs[idx].arquivos);
        i--;
      }
    }
  }

  /* Planta imagens */
  selectFilesPlantaFiles(event: any): void {
    this.messagePlantaFiles = [];
    this.progressInfosPlantaFiles = [];
    this.selectedPlantaFiles = event.target.files;

    /* Previsualização da imagem */
    let mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      alert('Campo somente para imagens.');
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (e) => {
      this.imgPreviewPlantas = reader.result;
    };
  }

  uploadFilesPlantaFiles(): void {
    this.message = [];
    if (this.selectedPlantaFiles) {
      for (let i = 0; i < this.selectedPlantaFiles.length; i++) {
        this.uploadImgPlantas(i, this.selectedPlantaFiles[i]);
      }
    }
  }

  uploadImgPlantas(idx: number, file: File): void {
    this.progressInfosPlantaFiles[idx] = { value: 0, fileName: file.name, url: '' };
    if (file) {
      this.uploadService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfosPlantaFiles[idx].value = Math.round(
              (100 * event.loaded) / event.total,
            );
          } else if (event instanceof HttpResponse) {
            const msg = 'Arquivo enviado com sucesso ' + file.name;
            this.messagePlantaFiles.unshift(msg);
            this.progressInfosPlantaFiles[idx].url = this.url + event.body[0];
            this.plantaFiles = this.url + event.body[0];
          }
        },
        (error: any) => {
          this.progressInfosPlantaFiles[idx].value = 0;
          const msg = `Não foi possível subir o arquivo: ${file.name}\n Possivel Causa: ${error}`;
          this.messagePlantaFiles.unshift(msg);
        },
      );
    }
  }

  deletaImagensPlantas(imgUrl: string): void {
    this.removeLinkDoArray(this.plantaFiles, imgUrl);
    this.removeLinkDoArray(this.progressInfosPlantaFiles, imgUrl);
  }

  removeLinkDoArray(array: any, url: string) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === url) {
        array.splice(i, 1);
        i--;
      }
      if (array[i]?.url === url) {
        array.splice(i, 1);
        i--;
      }
    }
  }

  ativaModal(event: any) {
    if (event.target.id === 'complemento') {
      this.isActive ? (this.isActive = false) : (this.isActive = true);
    }
    if (event.target.id === 'complemento1') {
      this.isActiveImgAdicionais
        ? (this.isActiveImgAdicionais = false)
        : (this.isActiveImgAdicionais = true);
    }
    if (event.target.id === 'complemento2') {
      this.isActiveImgPlantas
        ? (this.isActiveImgPlantas = false)
        : (this.isActiveImgPlantas = true);
    }
  }
}
